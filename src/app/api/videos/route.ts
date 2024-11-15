import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, genre, director } = await request.json();

    if (!name || !genre || !director) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newVideo = await prisma.video.create({
      data: {
        name,
        genre,
        director
      },
    });

    return NextResponse.json({ message: 'Video added successfully', video: newVideo });
  } catch (error) {
    console.error('Error adding video:', error);
    return NextResponse.json({ error: 'Failed to add video' }, { status: 500 });
  }
}
