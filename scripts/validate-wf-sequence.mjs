import {existsSync, readFileSync} from "node:fs";
const manifest=JSON.parse(readFileSync("wf-sequence.manifest.json","utf8"));
const required=["A1","A2","A3","A4","A5","A6"];
const fail=[];
if(JSON.stringify(manifest.canonical_sequence)!==JSON.stringify(required)) fail.push("canonical_sequence must be A1-A6");
for(const step of required){
  const files=manifest.steps?.[step];
  if(!Array.isArray(files)||!files.length) fail.push(`${step} has no files`);
  for(const path of files||[]) if(!existsSync(path)) fail.push(`${step}: missing ${path}`);
}
const html=readFileSync("index.html","utf8");
for(const token of ["assets/sequence/A3-story.png","assets/sequence/A6-story-end.png","Array.from({length:18}"]){if(!html.includes(token))fail.push(`index missing ${token}`)}
if(html.includes('"15"')) fail.push("legacy category 15 remains in index");
if(fail.length){console.error(fail.join("\n"));process.exit(1)}
console.log("Candy workflow A1-A6 verified");
