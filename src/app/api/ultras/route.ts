import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  const patient = req.nextUrl.searchParams.get("patient");

  if (!name) {
    return NextResponse.json({ message: "no such name" }, {status: 500});
  }

  const filepath = `${path.join(
    __dirname,
    `../../../../../public/sonography/`
  )}/converted/${patient}/${name}`;
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
  headers.set("Content-type", "video/avi");
  headers.set("Content-disposition", `attachment; filename=${name}`);
  headers.set("Cache-Control", "no-cache, no-store, must-revalidate");

  return new Response(Buffer.from(file), {
    status: 200,
    headers: headers,
  });
}

export async function POST(req: NextRequest) {
  let filename = "";

  try {
    const formData = await req.formData();
    const file = formData.get("archive") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    filename = file.name.substring(0, file.name.length - 4);

    await fsPromises.appendFile(
      path.join(__dirname, `../../../../../public/sonography/${file.name}`),
      buffer,
      { flag: "w" }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e }, {status: 500});
  }

  let command = `tar -xf ${path.join(
    __dirname,
    `../../../../../public/sonography/${filename}.zip`
  )} -C public/sonography/converted/`;

  console.log(command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return NextResponse.json({
        error: `Command execution failed: ${error.message}`,
      });
    }

    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
      return NextResponse.json({ error: `Command stderr: ${stderr}` });
    }

    // Return the output of the command
    console.log(`Command output: ${stdout}`);
    return NextResponse.json({ output: stdout }, {status: 200});
  });
  return NextResponse.json({ message: "Success" });
}
