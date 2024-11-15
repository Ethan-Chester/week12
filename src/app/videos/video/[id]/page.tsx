import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

interface VideoPageProps {
  params: { id: string };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const video = await prisma.video.findUnique({
    where: { id: parseInt(params.id, 10) },
  });

  if (!video) {
    return <h1>Video not found</h1>;
  }

  return (
    <div>
      <Link className="m-3 p-3 bg-red-500" href="/videos">
        BACK
      </Link>

      <h1 className="flex justify-center m-4">{video.name}</h1>
      <p className="flex justify-center m-4">Genre: {video.genre}</p>
      <p className="flex justify-center m-4">Director: {video.director}</p>
    </div>
  );
}
