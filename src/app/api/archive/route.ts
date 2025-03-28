import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) {
    return NextResponse.json({ message: "no such name" });
  }
  const filepath = `${path.join(
    __dirname,
    `../../../../../archives/`
  )}/converted/${name}.stl`;
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
  headers.set("Content-type", "model/stl");
  headers.set("Content-disposition", `attachment; filename=${filepath}`);
  headers.set("Cache-Control", "no-cache, no-store, must-revalidate");

  console.log(
    `Requested name: ${name}, File path: ${filepath}, Fetched file: ${file.subarray(
      0,
      200
    )}}`
  );

  return new Response(Buffer.from(file), {
    status: 200,
    headers: headers,
  });
}

export async function POST(req: NextRequest) {
  let filename = "";
  const options = "--reduce 0.1 --clean-small 0.2 -a";

  try {
    const formData = await req.formData();
    const file = formData.get("archive") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    filename = file.name.substring(0, file.name.length - 4);

    await fsPromises.appendFile(
      path.join(__dirname, `../../../../../archives/${file.name}`),
      buffer,
      { flag: "w" }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e });
  }

  console.log("success");

  let command = "chcp 65001";

  exec(
    command,
    { env: { ...process.env, PYTHONIOENCODING: "utf-8" } },
    (error, stdout, stderr) => {
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
      return NextResponse.json({ output: stdout });
    }
  );

  command = `dicom2stl ${options} -o ${path.join(
    __dirname,
    "../../../../../archives"
  )}/converted/${filename}-MRI.stl ${path.join(
    __dirname,
    "../../../../../archives"
  )}/${filename}.zip`;

  exec(
    command,
    { env: { ...process.env, PYTHONIOENCODING: "utf-8" } },
    (error, stdout, stderr) => {
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
      return NextResponse.json({ output: stdout });
    }
  );

  command = `dicom2stl ${options} -t soft_tissue -o ${path.join(
    __dirname,
    "../../../../../archives"
  )}/converted/${filename}-CT.stl ${path.join(
    __dirname,
    "../../../../../archives"
  )}/${filename}.zip`;

  exec(
    command,
    { env: { ...process.env, PYTHONIOENCODING: "utf-8" } },
    (error, stdout, stderr) => {
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
      return NextResponse.json({ output: stdout });
    }
  );

  return NextResponse.json({ message: "Success" });
}
