#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const jsonFile = process.argv[2] || "/home/ubuntu/redesign_tabs_screens.json";
const results = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

let written = 0;
let skipped = 0;

for (const item of results.results) {
  if (item.error || !item.output?.new_content || !item.output?.file_path) {
    console.log(`⚠️  SKIP (error): ${item.input}`);
    skipped++;
    continue;
  }
  
  const filePath = item.output.file_path;
  const content = item.output.new_content;
  
  // Validate it's a real TSX file with imports
  if (!content.includes("import") || content.length < 200) {
    console.log(`⚠️  SKIP (invalid content): ${filePath}`);
    skipped++;
    continue;
  }
  
  try {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ ${path.relative("/home/ubuntu/travi-app", filePath)}`);
    written++;
  } catch (e) {
    console.log(`❌ FAILED: ${filePath} — ${e.message}`);
    skipped++;
  }
}

console.log(`\n✅ Written: ${written} | ⚠️  Skipped: ${skipped}`);
