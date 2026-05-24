const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");
const TurndownService = require("turndown");

const flowDir = path.join(__dirname, "flow");
const outDir = path.join(__dirname, "docs", "orion");

// Create output directory if it doesn't exist
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

async function convertDocs() {
  try {
    const files = fs.readdirSync(flowDir).filter((f) => f.endsWith(".docx"));

    // Sort files to try and establish a somewhat logical order
    files.sort();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(flowDir, file);
      const fileBaseName = path.basename(file, ".docx");

      console.log(`Processing: ${file}`);

      // Extract HTML from Docx
      const result = await mammoth.convertToHtml({ path: filePath });
      const html = result.value;
      const messages = result.messages;

      if (messages.length > 0) {
        console.warn(`Warnings for ${file}:`, messages);
      }

      // Convert HTML to Markdown
      let markdown = turndownService.turndown(html);

      // Generate a Title from the filename
      // e.g., orion_00_master_index_v9 -> Orion 00 Master Index V9
      const title = fileBaseName
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Add Docusaurus Frontmatter
      const frontmatter = `---
title: "${title}"
sidebar_position: ${i + 1}
---

`;

      const finalContent = frontmatter + markdown;

      const outPath = path.join(outDir, `${fileBaseName}.md`);
      fs.writeFileSync(outPath, finalContent, "utf8");

      console.log(`Created: docs/orion/${fileBaseName}.md`);
    }

    console.log("Conversion complete!");
  } catch (err) {
    console.error("Error during conversion:", err);
  }
}

convertDocs();
