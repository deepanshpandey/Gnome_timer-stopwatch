const { St, Clutter, GLib, Gio } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const ExtensionUtils = imports.misc.extensionUtils;

let TimerStopwatch;

class TimerStopwatchIndicator extends PanelMenu.Button {
    constructor() {
        super(0.0, "Timer & Stopwatch");

        // Create UI Elements
        this.icon = new St.Icon({
            icon_name: "hourglass-symbolic", // Default: Timer Mode
            style_class: "system-status-icon"
        });

        this.label = new St.Label({
            text: "⌛ 00:00",
            y_align: Clutter.ActorAlign.CENTER
        });

        let box = new St.BoxLayout({ vertical: false });
        box.add_child(this.icon);
        box.add_child(this.label);
        this.add_child(box);

        // Initial State
        this.running = false;
        this.isTimerMode = true; // True = Timer, False = Stopwatch
        this.timeLeft = 0;
        this.elapsedTime = 0;
        this.startTime = 0;
        this.timeout = null;

        // Set initial style
        this.label.add_style_class_name("timer-stopwatch-paused");

        // Event Listeners
        this.connect("button-press-event", this._onButtonPress.bind(this));
    }

    _onButtonPress(actor, event) {
        let button = event.get_button();

        if (button === 1) { 
            if (event.get_click_count() === 2) {
                this._reset();
            } else {
                this._toggleStartPause();
            }
        } else if (button === 3) { 
            this._toggleMode();
        }
    }

    _toggleStartPause() {
        this.running = !this.running;

        if (this.running) {
            this.startTime = GLib.get_monotonic_time() / 1000000;
            this._updateTime();
            this.label.remove_style_class_name("timer-stopwatch-paused");
        } else {
            this._clearTimeout();
            this.label.add_style_class_name("timer-stopwatch-paused");
        }
    }

    _reset() {
        this.running = false;
        this._clearTimeout();
        this.label.add_style_class_name("timer-stopwatch-paused");

        if (this.isTimerMode) {
            this.timeLeft = 0;
            this.label.set_text("⌛ 00:00");
        } else {
            this.elapsedTime = 0;
            this.label.set_text("⏱ 00:00");
        }
    }

    _toggleMode() {
        this._reset();
        this.isTimerMode = !this.isTimerMode;
        this.icon.set_icon_name(this.isTimerMode ? "hourglass-symbolic" : "chronometer-symbolic");
        this.label.set_text(this.isTimerMode ? "⌛ 00:00" : "⏱ 00:00");
    }

    _updateTime() {
        if (!this.running) return;

        let now = GLib.get_monotonic_time() / 1000000;
        let elapsed = now - this.startTime;

        if (this.isTimerMode) {
            this.timeLeft = Math.max(0, this.timeLeft - elapsed);
            if (this.timeLeft <= 0) {
                this.running = false;
                this.timeLeft = 0;
            }
        } else {
            this.elapsedTime += elapsed;
        }

        this.startTime = now;
        this._updateDisplay();
        this.timeout = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 1, this._updateTime.bind(this));
    }

    _updateDisplay() {
        let time = this.isTimerMode ? this.timeLeft : this.elapsedTime;
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = Math.floor(time % 60);

        let timeString = hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` :
                        `${minutes}:${seconds.toString().padStart(2, '0')}`;

        this.label.set_text(this.isTimerMode ? `⌛ ${timeString}` : `⏱ ${timeString}`);
    }

    _clearTimeout() {
        if (this.timeout) {
            GLib.source_remove(this.timeout);
            this.timeout = null;
        }
    }

    enable() {
        Main.panel.addToStatusArea("timerStopwatch", this);
    }

    disable() {
        this.running = false;
        this._clearTimeout();
        this.destroy();
    }
}

function init() {}

function enable() {
    TimerStopwatch = new TimerStopwatchIndicator();
    TimerStopwatch.enable();
}

function disable() {
    if (TimerStopwatch) {
        TimerStopwatch.disable();
        TimerStopwatch = null;
    }
}
