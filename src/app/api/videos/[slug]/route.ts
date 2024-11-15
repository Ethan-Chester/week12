import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const slug = pathname.split('/').pop();

  try {
    const video = await prisma.video.findUnique({
      where: { id: parseInt(slug || '', 10) }, // Assuming `id` is an integer
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { pathname } = new URL(request.url);
  const slug = pathname.split('/').pop();

  try {
    const { name, genre, director } = await request.json();

    if (!name || !genre || !director) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const updatedVideo = await prisma.video.update({
      where: { id: parseInt(slug || '', 10) },
      data: { name, genre, director },
    });

    return NextResponse.json({ message: 'Video updated successfully', video: updatedVideo });
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
  }
}
