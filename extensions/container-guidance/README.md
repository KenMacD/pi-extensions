# Container Guidance Extension

Detects when the agent is running inside a container (Docker or Podman) and automatically loads container-specific guidance into the system prompt.

## How It Works

1. On session start, checks for container marker files (`/.dockerenv` or `/run/.containerenv`)
2. If detected, loads `AGENTS-container.md` from the agent directory (`~/.pi/agent/`)
3. Appends the guidance content to the system prompt via the `before_agent_start` event
4. Shows a notification when a container environment is detected (on `/new` only, not `/reload`)

## Installation

Install the full package, then filter to just this extension in `~/.pi/agent/settings.json`:

```bash
pi install git:github.com/KenMacD/pi-extensions
```

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

Or copy it directly to your agent extensions directory:

```bash
cp index.ts ~/.pi/agent/extensions/container-guidance.ts
```

Or keep it as a project-local extension at `.pi/extensions/container-guidance/index.ts`.

## Configuration

Create an `AGENTS-container.md` file in your agent directory (typically `~/.pi/agent/`):

```bash
cp .pi/agent/AGENTS-container.md ~/.pi/agent/AGENTS-container.md
```

Customize it with container-specific guidance such as:

- File system paths and persistence rules
- Resource constraints (CPU, memory, disk)
- Available tools and package management
- Network access limitations
- Debugging tips
