import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { PetCard } from '@/components/PetStubCard';
import type { Pet } from '@/lib/definitions';
import { fetchAllPets } from '@/lib/data';
import '@/pages/pets/Pets.css'

export function Pets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPets() {
      try {
        const data = await fetchAllPets();
        setPets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPets();
  }, []);

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='cat-grid'>
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </Layout>
  );
}
