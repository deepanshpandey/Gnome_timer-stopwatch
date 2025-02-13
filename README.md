# Timer & Stopwatch GNOME Extension

A simple GNOME Shell extension that adds a **Timer & Stopwatch** to the top bar.

## 🚀 Features

- **Two Modes:** ⌛ Timer & ⏱ Stopwatch
- **Start/Pause:** Single primary click
- **Reset:** Double primary click
- **Switch Modes:** Right-click (Timer ↔ Stopwatch)
- **Auto Pause/Resume:** When the screen locks and unlocks
- **Dynamic Time Display:**
  - Shows `mm:ss` format if under 1 hour
  - Shows `hh:mm:ss` format when over 1 hour
- **Dark Gray Text when Paused** / **White Text when Running**
- **Hover Effect:** Subtle background highlight

---

## 📌 Installation

### 1️⃣ **Manually Install the Extension**

```bash
mkdir -p ~/.local/share/gnome-shell/extensions/Gnome_timer-stopwatch@deepanshpandey
cd ~/.local/share/gnome-shell/extensions/Gnome_timer-stopwatch@deepanshpandey
```

Copy the following files into this directory:

- `metadata.json`
- `extension.js`
- `stylesheet.css`

---

### 2️⃣ **Enable the Extension**

```bash
gnome-extensions enable Gnome_timer-stopwatch@deepanshpandey
```

If the extension does not appear, restart GNOME Shell:

```bash
Alt + F2, type 'r', and press Enter
```
or simnply log out and log back in.

---

## 🛠 Usage

### **⌛ Timer Mode**

1. **Primary Click:** Start/Pause
2. **Double Primary Click:** Reset (allows setting a new time)
3. **Right Click:** Switch to Stopwatch mode

### **⏱️ Stopwatch Mode**

1. **Primary Click:** Start/Pause
2. **Double Primary Click:** Reset
3. **Right Click:** Switch back to Timer mode

---

## 🎨 Custom Styling

Modify `stylesheet.css` for:

- Font size & color
- Hover effects
- Background styling

---

## ❓ Troubleshooting

- **Extension not appearing?**

  - Run `gnome-extensions enable Gnome_timer-stopwatch@deepanshpandey`
  - Restart GNOME Shell: `Alt + F2`, type `r`, and hit Enter

- **Want to reset settings?**
  ```bash
  gnome-extensions reset Gnome_timer-stopwatch@deepanshpandey
  ```
