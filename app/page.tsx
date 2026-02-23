"use client";

import { useState } from "react";

export default function Home() {
  const [fileUrl, setFileUrl] = useState("");

  async function uploadFile(e: any) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setFileUrl(data.url);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>My PDF Storage</h1>

      <input type="file" accept="application/pdf" onChange={uploadFile} />

      {fileUrl && (
        <p>
          Uploaded File:
          <a href={fileUrl} target="_blank"> Open PDF</a>
        </p>
      )}
    </div>
  );
}
