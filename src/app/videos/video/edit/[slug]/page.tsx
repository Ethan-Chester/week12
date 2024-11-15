'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditVideoPage() {
  const { slug } = useParams(); 
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    director: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return; 

    const fetchVideo = async () => {
      const res = await fetch(`/api/videos/${slug}`);
      if (res.ok) {
        const video = await res.json();
        setFormData({
          name: video.name,
          genre: video.genre,
          director: video.director,
        });
      } else {
        alert('Failed to fetch video data');
      }
      setIsLoading(false);
    };

    fetchVideo();
  }, [slug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/videos/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      router.push('/videos');
    } else {
      alert('Failed to update video');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-5">Edit Video</h1>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Video Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-black p-2 rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full border border-black p-2 rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="director" className="block text-sm font-medium">
            Director
          </label>
          <input
            type="text"
            name="director"
            id="director"
            value={formData.director}
            onChange={handleChange}
            required
            className="w-full border border-black p-2 rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Video
        </button>
      </form>
    </div>
  );
}
