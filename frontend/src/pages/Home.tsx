import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { CatCard } from '@/components/PetStubCard';
import type { Cat } from '@/lib/definitions';

import '@/pages/Home.css'

export function Home() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/cats')
      .then((res) => res.json())
      .then((data) => {
        setCats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='cat-grid'>
          {cats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      )}
    </Layout>
  );
}
