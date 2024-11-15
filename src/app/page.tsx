import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

export default async function Home() {
  redirect('/videos');

  return (
    <div></div>
  );
}