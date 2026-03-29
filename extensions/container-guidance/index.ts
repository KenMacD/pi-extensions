/**
 * Container Guidance Extension
 *
 * Detects if the agent is running within a container environment by checking
 * for the existence of /run/.containerenv or /.dockerenv files. If running in
 * a container, loads AGENTS-container.md from the agent directory and appends
 * its content to the system prompt.
 *
 * Usage:
 * 1. Copy this file to ~/.pi/agent/extensions/ or your project's .pi/extensions/
 * 2. Create an AGENTS-container.md file in your agent directory
 * 3. Add container-specific guidance to that file
 *
 * The AGENTS-container.md file should contain instructions that are relevant
 * when the agent is running in a containerized environment, such as:
 * - Path mappings between host and container
 * - Container-specific tools or commands
 * - Resource constraints
 * - Security considerations
 * - Network configuration
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { getAgentDir } from "@mariozechner/pi-coding-agent";

/** Container environment marker files */
const CONTAINER_MARKERS = [
  "/run/.containerenv", // Podman containers
  "/.dockerenv", // Docker containers
];

/** Name of the container guidance file */
const CONTAINER_GUIDANCE_FILE = "AGENTS-container.md";

export default function containerGuidanceExtension(pi: ExtensionAPI) {
  let isContainer: boolean = false;
  let guidanceFile: string = "";
  let guidanceContent: string = "";

  /**
   * Check if running in a container environment
   */
  function detectContainer(): boolean {
    return CONTAINER_MARKERS.some((marker) => fs.existsSync(marker));
  }

  /**
   * Load container guidance file if it exists
   * Looks in the agent directory returned by getAgentDir()
   */
  function loadGuidance(): string {
    const agentDir = getAgentDir();
    const guidancePath = path.join(agentDir, CONTAINER_GUIDANCE_FILE);

    if (fs.existsSync(guidancePath)) {
      try {
        return fs.readFileSync(guidancePath, "utf-8");
      } catch (error) {
        console.error(`Failed to read ${CONTAINER_GUIDANCE_FILE}:`, error);
        return "";
      }
    }
    return "";
  }

  // Detect container environment and load guidance on session start
  pi.on("session_start", async (_event, ctx) => {
    isContainer = detectContainer();
    guidanceContent = "";

    if (isContainer) {
      guidanceFile = path.join(getAgentDir(), CONTAINER_GUIDANCE_FILE);
      guidanceContent = loadGuidance();

      if (guidanceContent) {
        ctx.ui.notify(
          `Container environment detected. Loaded ${CONTAINER_GUIDANCE_FILE}`,
          "info",
        );
      } else {
        ctx.ui.notify(
          `Container environment detected, but ${CONTAINER_GUIDANCE_FILE} not found`,
          "warning",
        );
      }
    }
  });

  // Append container guidance to system prompt when in a container
  pi.on("before_agent_start", async (event) => {
    if (!isContainer || !guidanceContent) {
      return;
    }

    return {
      systemPrompt:
        event.systemPrompt +
        `

## Container Environment Guidance

The agent is currently running within a containerized environment.

${guidanceContent}
`,
    };
  });
}
