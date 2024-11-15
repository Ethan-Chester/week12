import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
  const videos = await prisma.video.findMany();

  return (
    <div id="videos" >
      {videos.map((video) => (
        <h1 className='flex justify-center m-5' key={video.id}>{video.name}</h1>
      ))}
    </div>
  );
}