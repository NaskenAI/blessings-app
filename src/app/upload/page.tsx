'use client';

import React, { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError(null);
      setVideoUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a photo to upload.');
      return;
    }
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Get presigned URL from your API
      const presignRes = await fetch('/api/upload_url', {
        method: 'POST',
        body: JSON.stringify({ filename: file.name, type: file.type }),
        headers: { 'Content-Type': 'application/json' },
      });
      const { url, fields } = await presignRes.json();

      // Upload to S3 with progress
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('file', file);

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded / event.total) * 100));
          }
        };
        xhr.onload = () => {
          if (xhr.status === 204 || xhr.status === 200) {
            resolve();
          } else {
            reject(new Error('Upload failed'));
          }
        };
        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.send(formData);
      });

      // Trigger video generation (replace with your API)
      const generateRes = await fetch('/api/generate_video', {
        method: 'POST',
        body: JSON.stringify({ filename: fields.key }),
        headers: { 'Content-Type': 'application/json' },
      });
      const { videoUrl } = await generateRes.json();

      setVideoUrl(videoUrl);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">AI Jesus Hug Video Generator</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {previewUrl && (
        <div className="mb-4">
          <p className="text-sm mb-1">Preview:</p>
          <img src={previewUrl} alt="Preview" className="w-48 rounded" />
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Photo'}
      </button>
      {uploading && (
        <div className="w-full bg-gray-200 rounded mt-4">
          <div
            className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {videoUrl && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Your Video:</h2>
                  <video src={videoUrl} controls className="w-full rounded" />
                </div>
              )}
            </div>
          );
        }