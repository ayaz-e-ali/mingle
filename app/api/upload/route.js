import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files");

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }

        const urls = [];
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Ensure the upload directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        for (const file of files) {
            if (typeof file === "object" && "arrayBuffer" in file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.name)}`;
                const filePath = path.join(uploadDir, uniqueName);

                await fs.writeFile(filePath, buffer);
                urls.push(`/uploads/${uniqueName}`);
            }
        }

        return NextResponse.json({ message: "Files uploaded successfully", urls }, { status: 200 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Error uploading files" }, { status: 500 });
    }
}