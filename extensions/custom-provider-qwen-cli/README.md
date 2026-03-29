# Pi OAuth provider for qwen-cli

Modified from [pi-mono upstream](https://github.com/badlogic/pi-mono/tree/9a4fe52654d95d70b40c5cf52d7b51c178fc98ff/packages/coding-agent/examples/extensions/custom-provider-qwen-cli) to add support for Qwen 3.5.

Provides access to Qwen models via OAuth authentication with chat.qwen.ai, using device code flow with PKCE.

## Install

Install the full package, then filter to just this extension in `~/.pi/agent/settings.json`:

```bash
pi install git:github.com/KenMacD/pi-extensions
```

```json
{
  "packages": [
    {
      "source": "git:github.com/KenMacD/pi-extensions",
      "extensions": ["extensions/custom-provider-qwen-cli"]
    }
  ]
}
```

Or copy it directly to your agent extensions directory:

```bash
cp -r custom-provider-qwen-cli ~/.pi/agent/extensions/
```

## Usage

After installing, authenticate with:

```
/login qwen-cli
```

Or set `QWEN_CLI_API_KEY` in your environment.

## Models

| Model ID      | Name          | Context Window   |
| ------------- | ------------- | ---------------- |
| `coder-model` | Qwen 3.5 Plus | 1,000,000 tokens |
