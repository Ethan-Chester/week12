'use client';

import Link from "next/link";
import { useState } from "react";

export default function VideosClient({ videos }: { videos: { id: number; name: string }[] }) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const id = formData.get("id") as string;

    setIsDeleting(parseInt(id, 10));

    const res = await fetch("/videos/video/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.reload(); 

    setIsDeleting(null); 
  };

  return (
    <div>
      <Link className="p-3" href={"videos/video/add"}>
        ADD VIDEO
      </Link>
      <h1 className="flex justify-center text-4xl mb-7 underline">All Videos</h1>

      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <div>
              <h2 className="flex justify-center text-3xl mb-1">{video.name}</h2>
              <div className="flex justify-center gap-5 text-blue-500 underline">
                <Link href={`/videos/video/${video.id}`} className="hover:text-blue-700">
                  View Video
                </Link>
                <Link href={`/videos/video/edit/${video.id}`} className="hover:text-blue-700">
                  Edit
                </Link>
                <form
                  onSubmit={handleFormSubmit}
                  style={{ display: "inline" }}
                >
                  <input type="hidden" name="id" value={video.id} />
                  <button
                    type="submit"
                    className="underline text-red-500 bg-transparent border-none cursor-pointer hover:text-red-700"
                    disabled={isDeleting === video.id}
                  >
                    {isDeleting === video.id ? "Deleting..." : "Delete"}
                  </button>
                </form>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
