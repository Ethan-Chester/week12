// app/videos/page.tsx
import { PrismaClient } from '@prisma/client';
import VideosClient from './VideosClient';

const prisma = new PrismaClient();

export default async function VideosPage() {
  const videos = await prisma.video.findMany({
    select: { id: true, name: true },
  });

  return <VideosClient videos={videos} />;
}
