import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");

  if (!name) {
    return NextResponse.json({ message: "no such name" }, {status: 400, statusText: "Не существует такого имени"});
  }

  const filepath = `${path.join(
    __dirname,
    `../../../../../../archives/`
  )}/vertices/${name}.bin`;
  let file;
  try {
    file = fs.readFileSync(filepath);
  } catch (err) {
    return NextResponse.json({
      error: "No such file",
      message: err,
    });
  }

  const headers = new Headers();
  headers.set("Content-type", "application/octet-stream");
  headers.set("Content-disposition", `attachment; filename=${name}.bin`);
  headers.set("Cache-Control", "no-cache, no-store, must-revalidate");

  return new Response(file, {
    status: 200,
    headers: headers,
  });
}