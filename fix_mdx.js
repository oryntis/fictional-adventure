const fs = require("fs");
const path = require("path");

const orionDir = path.join(__dirname, "docs", "orion");

function fixMDX(content) {
  let inCodeBlock = false;
  let result = "";

  // Split by ```
  const parts = content.split("```");

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      // Inside code block: preserve exactly
      result += "```" + parts[i] + "```";
    } else {
      // Outside code block: process inline code and text
      let text = parts[i];

      // We need to carefully split by inline code `
      // But only if it's a matching pair. A simple way is to split by `
      const inlineParts = text.split("`");
      let inlineResult = "";

      for (let j = 0; j < inlineParts.length; j++) {
        if (j % 2 === 1 && j < inlineParts.length - 1) {
          // Inside inline code
          inlineResult += "`" + inlineParts[j] + "`";
        } else if (j % 2 === 1 && j === inlineParts.length - 1) {
          // Unmatched `, treat as text
          let safeText = inlineParts[j]
            .replace(/</g, "&lt;")
            .replace(/\\{/g, "&#123;") // escape literal \{
            .replace(/\\}/g, "&#125;")
            .replace(/\{/g, "&#123;")
            .replace(/\}/g, "&#125;");
          inlineResult += "`" + safeText;
        } else {
          // Outside inline code
          let safeText = inlineParts[j]
            .replace(/</g, "&lt;")
            .replace(/\\{/g, "&#123;")
            .replace(/\\}/g, "&#125;")
            .replace(/\{/g, "&#123;")
            .replace(/\}/g, "&#125;");
          inlineResult += safeText;
        }
      }
      result += inlineResult;
    }
  }

  return result;
}

try {
  const files = fs.readdirSync(orionDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(orionDir, file);
    let content = fs.readFileSync(filePath, "utf8");

    // Quick fix: undo the previous sed replace of < to \&lt; so we don't double escape
    content = content.replace(/\\&lt;/g, "<");

    const fixedContent = fixMDX(content);
    fs.writeFileSync(filePath, fixedContent, "utf8");
    console.log(`Fixed MDX issues in ${file}`);
  }
} catch (err) {
  console.error("Error:", err);
}
