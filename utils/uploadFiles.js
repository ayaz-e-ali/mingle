export const uploadFiles = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return data.urls; // return array of file URLs
};