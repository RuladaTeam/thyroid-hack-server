import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const patient = req.nextUrl.searchParams.get("patient");
  const dirPath = path.join(
    __dirname,
    `../../../../../../public/sonography/converted/${patient}`
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
