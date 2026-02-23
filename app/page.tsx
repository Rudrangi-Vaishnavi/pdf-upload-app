"use client";

import { useState } from "react";

export default function Home() {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  // ✅ Upload function (uploads to Vercel Blob)
  const uploadFile = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setFileUrl(data.url);
    setUploading(false);
  };

  // ✅ When user selects file
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return;
    await uploadFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 p-6">
      <h1 className="text-3xl font-bold">
        📄 PDF Upload Storage
      </h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="border p-2 rounded"
      />

      {uploading && <p>Uploading...</p>}

      {fileUrl && (
        <div className="text-center">
          <p className="text-green-600 font-medium">
            ✅ Uploaded Successfully!
          </p>

          <a
            href={fileUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            Open PDF
          </a>
        </div>
      )}
    </div>
  );
}