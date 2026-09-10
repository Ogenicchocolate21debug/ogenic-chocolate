import {existsSync, readFileSync, readdirSync} from "node:fs";
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
for(const token of ["assets/sequence/A3-story.png","assets/sequence/A6-story-end.png","Array.from({length:18}",".filter((_,i)=>i!==10)","hotpot-small.jpg","hotpot-medium.jpg","hotpot-large.jpg","line-logo"]){if(!html.includes(token))fail.push(`index missing ${token}`)}
if(html.includes('POSTERS=Array.from({length:18}')&&!html.includes('.filter((_,i)=>i!==10)')) fail.push("PT11 poster must remain excluded");
if(html.includes('"15"')) fail.push("legacy category 15 remains in index");
const catalogMatch=html.match(/const CATALOG=(\[[\s\S]*?\n  \]);/);
if(!catalogMatch) fail.push("index missing CATALOG data");
else {
  const catalog=JSON.parse(catalogMatch[1]);
  const productCount=catalog.reduce((sum,entry)=>sum+entry[2].length,0);
  if(productCount!==manifest.display_product_count) fail.push(`display product count ${productCount}/${manifest.display_product_count}`);
  const hotPots=catalog.find(entry=>entry[0]==="13")?.[2]?.slice(0,3) || [];
  const expectedHotPots=[["หมาล่าหม้อไฟ ไซซ์เล็ก","Mala Hot Pot Small","麻辣火鍋 スモール","399"],["หมาล่าหม้อไฟ ไซซ์กลาง","Mala Hot Pot Medium","麻辣火鍋 ミディアム","499"],["หมาล่าหม้อไฟ ไซซ์ใหญ่","Mala Hot Pot Large","麻辣火鍋 ラージ","599"]];
  if(JSON.stringify(hotPots)!==JSON.stringify(expectedHotPots)) fail.push("Drive hot-pot records or prices do not match");
}
const mediaCount=readdirSync("assets/catalog",{recursive:true}).filter(path=>/\.jpg$/i.test(path)).length;
if(mediaCount!==manifest.media_product_count) fail.push(`media product count ${mediaCount}/${manifest.media_product_count}`);
if(fail.length){console.error(fail.join("\n"));process.exit(1)}
console.log("Candy workflow A1-A6 verified");
console.log(`Catalog verified: ${manifest.display_product_count} items = ${manifest.media_product_count} media + ${manifest.text_only_product_count} text-only Drive records`);
