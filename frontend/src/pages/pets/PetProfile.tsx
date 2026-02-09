import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { calculateAge } from '@/lib/utils';
import type { Pet } from '@/lib/definitions';
import { fetchPetById } from '@/lib/data';

export function PetProfile() {
  const { id } = useParams();
  const location = useLocation();
  const [pet, setPet] = useState<Pet | null>(location.state?.pet || null);
  const [loading, setLoading] = useState(!location.state?.pet);

  useEffect(() => {
    // if we have the pet info from click-through, use it!
    if (location.state?.pet) {
      setLoading(false);
      return;
    }

    // no info, fetch pet data
    async function loadPet() {
      try {
        const data = await fetchPetById(id);
        setPet(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPet();
  }, [id, location.state?.pet]);

  if (loading) return <Layout><p>Loading...</p></Layout>;
  if (!pet) return <Layout><p>Pet not found</p></Layout>;

  const age = calculateAge(pet.birthday);

  return (
    <Layout>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ aspectRatio: '1', backgroundColor: '#f3f4f6', borderRadius: '8px', overflow: 'hidden', margin: '10px' }}>
          {pet.photos[0] ? (
            <img src={pet.photos[0]} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
              Photos coming soon!
            </div>
          )}
        </div>
        <div>
          <h1 style={{ fontSize: '8rem', fontWeight: 'bold', margin: '0', }}>{pet.name}</h1>
          <p style={{ fontSize: '3rem', color: '#4b5563', margin: '0', marginBottom: '1rem' }}>{age} old • {pet.sex}</p>
          {pet.status === 'pending' && (
            <span style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '0.875rem', backgroundColor: '#fef3c7', color: '#92400e', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>
              Adoption pending
            </span>
          )}
          <p style={{ fontSize: '2rem', color: '#1f2937', lineHeight: 1.6 }}>{pet.bio}</p>
          <a href={`/pets/${pet.id}/edit`}>Edit</a>
        </div>
      </div>
    </Layout>
  );
}
