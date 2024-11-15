import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function Home() {
  redirect('/videos');

  return (
    <div></div>
  );
}