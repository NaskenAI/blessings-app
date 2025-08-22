"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0];
    setImage(selectedImage);
    setVideo(null);
  };

  const handleCreateVideo = async () => {
    try {
      const response = await axios.post<{ video: Blob }>('/api/generate-video', {
        image: image,
      });
      setVideo(response.data.video);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    if (video) {
      const videoElement = document.getElementById('video') as HTMLVideoElement | null;
      if (videoElement) {
        videoElement.src = URL.createObjectURL(video);
      }
    }
  }, [video]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {image && (
        <img src={URL.createObjectURL(image)} alt="Uploaded Image" />
      )}
      <button onClick={handleCreateVideo}>Create Video</button>
      {video && (
        <video id="video" width="640" height="480" controls>
        </video>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UploadPage;
