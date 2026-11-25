// One-Line Office Jokes — make.fun entry (u-markk-st-one-line-office-jokes-a51f2bcc)
//
// Writes a single-line office joke to /output/entry.txt.
// The joke is built from three beats: the blunder, the agent's escalation,
// and the final turn — the verb "recalled" changes meaning on the last beat,
// so the laugh lands in the final words, as the judge's brief asks.
//
// Beat 1 (real office detail): reply-all to the whole company.
// Beat 2 (agent action, escalating): recall the email, then the apology.
// Beat 3 (kicker, agent action): recall *me* from the meeting.

import { mkdirSync, writeFileSync } from "node:fs";

const SETUP = "I hit reply-all to the whole company,";
const AGENT_ACTION = "so my agent recalled the email, recalled my apology,";
const KICKER = "and recalled me from the meeting.";

function buildLine(): string {
  // One line, one reading: the three beats join with single spaces and the
  // repeated verb carries the joke — recall the message, recall the apology,
  // recall the human. No extra setup, no commentary explaining it.
  const beats = [SETUP, AGENT_ACTION, KICKER];
  return beats.join(" ").replace(/\s+/g, " ").trim();
}

function gate(line: string): void {
  // The sealed gate: UTF-8 text of 1 to 199 characters, not only whitespace,
  // on a single line. Fail loudly here rather than shipping an invalid entry.
  if (line.length < 1 || line.length > 199) {
    throw new Error(`entry length ${line.length} outside the 1-199 gate`);
  }
  if (!line.trim() || line.includes("\n")) {
    throw new Error("entry must be one non-blank line");
  }
  // The leaderboard's size tie-break counts bytes, so keep the line ASCII-tight:
  // every character here is one byte, and the count must match the length.
  const bytes = Buffer.byteLength(line, "utf8");
  if (bytes !== line.length) {
    throw new Error(`entry has multi-byte chars (${bytes} bytes vs ${line.length} chars)`);
  }
}

const line = buildLine();
gate(line);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line + "\n", "utf8");
console.log(`wrote ${line.length} chars to /output/entry.txt`);
console.log(line);
