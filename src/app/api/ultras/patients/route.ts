import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  const dirPath = path.join(
    __dirname,
    `../../../../../../sonography/converted`
  );
  const fileNames: string[] = [];

  const files = fs.readdirSync(dirPath);
  files.forEach(function (file) {
    fileNames.push(file);
  });

  while (fileNames.indexOf("") !== -1) {
    fileNames.splice(fileNames.indexOf(""), 1);
  }

  return NextResponse.json(fileNames.join(","));
}
