'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function AddVideoPage() {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    director: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/videos', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      router.push('/videos');
    } else {
      alert('Failed to add video');
    }
  };

  return (
    <div>
        <Link href="/videos" className='p-2'>BACK TO VIDEOS</Link>  
        <div className="max-w-md mx-auto mt-10">
        
            <h1 className="text-2xl font-bold text-center mb-5">Add a New Video</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full border border-black-300 p-2 rounded text-black"
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
                    className="w-full border border-black-300 p-2 rounded text-black"
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
                    className="w-full border border-black-300 p-2 rounded text-black"
                />
                </div>
                <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                Add Video
                </button>
            </form>
        </div>
    </div>
    
  );
}
