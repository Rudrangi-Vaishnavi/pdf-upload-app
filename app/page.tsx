"use client";

import { useState, useEffect } from "react"; // Added useEffect

export default function Home() {
  // 1. Change to an Array [] instead of a single string ""
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Load existing files from your new API when the page opens
  useEffect(() => {
    async function loadFiles() {
      try {
        const res = await fetch("/api/list");
        const data = await res.json();
        setFiles(data); // This fills the list with your Vercel Blobs
      } catch (error) {
        console.error("Failed to load files", error);
      } finally {
        setLoading(false);
      }
    }
    loadFiles();
  }, []);

  async function uploadFile(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    
    // 3. Instead of overwriting, add the new file to the existing list
    setFiles((prev) => [data, ...prev]); 
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>My PDF Storage</h1>

      <div style={{ marginBottom: 20, padding: 20, border: '1px dashed #ccc' }}>
        <h3>Upload New PDF</h3>
        <input type="file" accept="application/pdf" onChange={uploadFile} />
      </div>

      <hr />

      <h2>Your Stored Files</h2>
      
      {loading && <p>Loading your PDFs...</p>}

      {/* 4. Loop through the array to show ALL files */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {files.length === 0 && !loading && <p>No files uploaded yet.</p>}
        
        {files.map((file, index) => (
          <li key={index} style={{ marginBottom: 10, padding: 10, background: '#f4f4f4', borderRadius: 5 }}>
            <strong>{file.pathname || "Uploaded File"}</strong> 
            <br />
            <a href={file.url} target="_blank" rel="noreferrer" style={{ color: 'blue' }}>
              View PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
