"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  const uploadFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    await fetch("/api/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: data.url }),
    });

    setFiles((prev) => [...prev, data.url]);
  };

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        My PDF Storage
      </h1>

      <input type="file" accept="application/pdf" onChange={uploadFile} />

      <div className="mt-6">
        {files.map((url, i) => (
          <div key={i}>
            <a href={url} target="_blank">
              Open PDF {i + 1}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}