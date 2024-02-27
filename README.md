# Web Audio on Server

Proof-of-concept demonstrating the usage of [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) on server using [Playwright](https://github.com/microsoft/playwright).

## How it works

The core audio rendering logic put in [src/renderAudio.ts](./src/renderAudio.ts) script, which uses [OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext) to generate audio buffer. Then it's being taken by some wrapping code to put it into an HTML page wrapper to be opened by Playwright browser to download the resulting audio file.

The key benefit of Playwright is that it allows to run this logic on any platform, preserving all of the features of Web Audio API. So there's no need of some custom Web Audio API re-implementation solution for server, which is a very difficult task to complete.

## Getting started

Prerequisites:

- [Node.js](https://nodejs.org) v20 or later
- [Bun](https://bun.sh/) v1 or later

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run build
bun run render
```

---

This project was created using `bun init` in bun v1.0.29. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
