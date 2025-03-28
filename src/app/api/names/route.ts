import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  const dirPath = path.join(__dirname, `../../../../../archives/converted`);
  const fileNames: string[] = [];

  const files = fs.readdirSync(dirPath);
  files.forEach(function (file) {
    fileNames.push(file.substring(0, file.indexOf(".")));
  });

  while (fileNames.indexOf("") !== -1) {
    fileNames.splice(fileNames.indexOf(""), 1);
  }

  return NextResponse.json(fileNames.join(","));
}
