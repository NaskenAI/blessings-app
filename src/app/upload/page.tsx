"use client";

import React, { useState } from 'react';
import './upload/styles.css'; 
import axios from 'axios';

const UploadPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0];
    setImage(selectedImage);
  };

  const handleCreateVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-video', {
        image: image,
      });
      const data = response.data as { video: Blob };
      setVideo(data.video);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Jesus Hug Video Generator</h1>
      <p>Upload an image to generate a video</p>
      <div className="upload-container">
        <input type="file" onChange={handleFileChange} />
        {image && (
          <img src={URL.createObjectURL(image)} alt="Uploaded Image" />
        )}
      </div>
      <button onClick={handleCreateVideo} disabled={loading}>
        {loading ? 'Generating...' : 'Create Video'}
      </button>
      {video && (
        <div className="video-container">
          <video width="640" height="480" controls>
            <source src={URL.createObjectURL(video)} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default UploadPage;