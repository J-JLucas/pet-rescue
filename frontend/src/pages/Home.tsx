import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { CatCard } from '@/components/PetStubCard';
import type { Cat } from '@/lib/definitions';
import { fetchAllCats } from '@/lib/data';
import '@/pages/Home.css'

export function Home() {
  return (
    <Layout>
    </Layout>
  );
}
