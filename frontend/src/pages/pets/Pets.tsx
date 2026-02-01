import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { CatCard } from '@/components/PetStubCard';
import type { Cat } from '@/lib/definitions';
import { fetchAllCats } from '@/lib/data';
import '@/pages/pets/Pets.css'

export function Pets() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCats() {
      try {
        const data = await fetchAllCats();
        setCats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCats();
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
