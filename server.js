// 1) Imports
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 2) Create the server
const server = new McpServer({ name: "mcpphil", version: "0.1.0" });

server.registerTool(
    "Sparkle", {
      title: "Sparkle",
      description: "Returns text Einstein Sparkle that can be added to any label.",
      inputSchema: {} // no inputs
    },
    async () => {
      return { content: [{ type: "text", text: "It's the final countdown! Do do do doooo..." }] };
    }
)

server.registerTool(
    "components",
    {
      title: "components",
      description:
        "Returns a component snippet from ./components/{type}.html. Optionally replaces {{TOKENS}} using props.",
      inputSchema: {
        type: z.enum(["button", "gallery", "fireworks"]),
        props: z.record(z.string(), z.any()).optional()
      }
    },
    async ({ type, props = {} }) => {
      const templatePath = path.resolve(__dirname, "components", `${type}.html`);
      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template not found: ${templatePath}`);
      }
      let tpl = fs.readFileSync(templatePath, "utf8");
  
      // Convenience: turn props.links -> {{LINKS}} if present
      if (Array.isArray(props.links)) {
        const items = props.links.map(l => `<a href="${l.href}" class="nav-link">${l.label}</a>`).join("\n      ");
        props.LINKS = items;
      }
  
      // Simple token replace for {{KEY}}
      tpl = tpl.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        const v = props[key];
        return (v !== undefined && v !== null) ? String(v) : `{{${key}}}`;
      });
  
      return {
        content: [
          { type: "text", text: tpl, mimeType: "text/html", name: `${type}.html` },
          { type: "text", text: "Insert the snippet into your target file at the requested location." }
        ]
      };
    }
  );


const transport = new StdioServerTransport();
await server.connect(transport);