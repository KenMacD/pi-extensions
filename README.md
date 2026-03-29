# pi-mono

Personal extensions for the [Pi coding agent](https://github.com/badlogic/pi-mono).

## Extensions

| Extension                                            | Description                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [container-guidance](extensions/container-guidance/) | Detects container environments and loads container-specific guidance into the system prompt |

## Install (pi package manager)

```bash
pi install git:github.com/KenMacD/pi-extensions
```

To enable only a subset, replace the package entry in `~/.pi/agent/settings.json` with a filtered one:

```json
{
  "packages": [
    {
      "source": "git:github.com/KenMacD/pi-extensions",
      "extensions": ["extensions/container-guidance"]
    }
  ]
}
```

## Quick Setup

If you keep a local clone, add extensions to your `~/.pi/agent/settings.json`:

```json
{
  "extensions": ["~/pi-extensions/extensions/container-guidance"]
}
```

See each extension's README for details.
