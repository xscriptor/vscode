# XGlass for VS Code

An extension that makes your editor look like glass by adjusting the window’s transparency—**only when you ask it to**.

![Preview](https://raw.githubusercontent.com/xscriptor/vscode/main/extensions/xglass/images/preview.png)

## Features

* Change the window transparency via **commands** or **keyboard shortcuts**.
* Configure default level and step size in **Settings**.
* Works on **Windows** (native Win32 API via in-memory C# helper) and **Linux (X11/Xorg)**.

---

## Requirements

**Windows**

* Windows 10 or later.
* PowerShell available in PATH (standard on Windows).

**Linux (X11/Xorg)**

* An Xorg session (Wayland is **not supported**).
* `xprop` installed:

  ```bash
  # Fedora
  sudo dnf install xorg-x11-utils
  # Debian/Ubuntu
  sudo apt install x11-utils
  # Arch
  sudo pacman -S xorg-xprop
  ```

---

## Activation (Opt-In)

XGlass **does not run automatically**. It only activates when you invoke one of its commands:

### Command Palette

1. Open the Command Palette (`Ctrl+Shift+P`)
2. Type “xglass” and select one of:

   * **xglass: Enable Transparency Mode** — sets default transparency (**150**)
   * **xglass: + transparency** — increase transparency (more transparent)
   * **xglass: - transparency** — decrease transparency (less transparent)
   * **xglass: full transparency** — minimum alpha (most transparent)
   * **xglass: No transparency** — restores full opacity

### Keyboard Shortcuts

* `Ctrl+Alt+Z` → **+ transparency**
* `Ctrl+Alt+C` → **- transparency**
* `Ctrl+Alt+X` → **No transparency**

> You can change shortcuts in **File → Preferences → Keyboard Shortcuts**.

---

## Settings

* `xglass.alpha` — Transparency level **1–255** (1 = most transparent, 255 = opaque).
* `xglass.step` — Step size used by the increase/decrease commands (default: **10**).

The “Enable Transparency Mode” command uses alpha **150** by default.

---

## How It Works

### Windows (Win32 API via PowerShell + C#)

* On first use, the extension loads an **in-memory C# type** using PowerShell’s `Add-Type`.
* The C# helper uses P/Invoke into `user32.dll` to:

  * add `WS_EX_LAYERED` to the window’s extended style, and
  * call `SetLayeredWindowAttributes(hwnd, 0, alpha, LWA_ALPHA)`.

**Key calls (conceptual):**

```csharp
// mark window as layered
WS windowLong = User32.GetWindowLong(hWnd, GWL.EXSTYLE);
User32.SetWindowLong(hWnd, GWL.EXSTYLE, windowLong | WS.EX_LAYERED);

// apply alpha (0–255)
User32.SetLayeredWindowAttributes(hWnd, 0, alpha, LWA.ALPHA);
```

**Why this approach?**
It’s the standard Windows mechanism for per-window opacity; the helper runs in-memory (no extra binaries) and targets only the current VS Code process.

### Linux (X11/Xorg + xprop)

* Detects VS Code windows by process id (`pgrep 'code'` + `_NET_WM_PID`).
* Sets `_NET_WM_WINDOW_OPACITY` using `xprop`:

```bash
xprop -id <windowId> -f _NET_WM_WINDOW_OPACITY 32c \
  -set _NET_WM_WINDOW_OPACITY $(printf 0x%x $((0xffffffff * <alpha> / 255)))
```

**Why this approach?**
`_NET_WM_WINDOW_OPACITY` is the EWMH standard for opacity on X11; `xprop` is the canonical tool to set it.

> **Note:** Some window managers/compositors may ignore or override opacity settings.

---

## Security & Privacy

* **Activation model:** The extension **only activates on command** (`xglass.enable`, `xglass.increase`, `xglass.decrease`, `xglass.max`, `xglass.min`). It **does not** auto-run at startup.
* **No telemetry / data collection:** No network calls, no personal data stored or transmitted.
* **No elevation:** Does **not** require admin rights. Does **not** modify VS Code binaries.
* **Scope:** Only adjusts **window attributes** (opacity) of the current VS Code process.
* **Windows:** Loads a small **in-memory C# helper** via PowerShell (`Add-Type`). No additional files are written.
* **Linux:** Uses `xprop` (X11 only). **Wayland not supported**.
* **This extension deos not acces, modify, or interact with any process or window outside of the current VS Code instance.**
---

## Compatibility & Limitations

* **Windows 10+**: Supported.
* **Linux (X11/Xorg)**: Requires `xprop`; Wayland is **not** supported.
* Certain WMs/compositors may not honor `_NET_WM_WINDOW_OPACITY`.
* Accessibility: high transparency can reduce contrast; consider your theme/contrast needs.

---

## Troubleshooting

### Windows

* If you hit an execution policy error, ensure PowerShell can load in-memory types for the current session.
* Ensure PowerShell is available in PATH (default on Windows).

### Linux

* Confirm you’re running **X11/Xorg**, not Wayland.
* Ensure `xprop` is installed and callable from PATH.
* If nothing changes, your WM/compositor may ignore opacity—check its settings or try another compositor.

### Uninstall / Reset

* Run **“xglass: No transparency”** to restore full opacity (255).
* Disable or uninstall the extension from the Extensions view.

---

## Installation

* From VSIX:

  ```bash
  code --install-extension xglass-1.0.2.vsix
  ```
* Or search **“XGlass”** in the Extensions view and install.

---

## License

[MIT](./LICENSE.md)

**Repository:** [https://github.com/xscriptor/vscode](https://github.com/xscriptor/vscode)

---
