import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const fileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("file url:", file.url);
        }),
}; 