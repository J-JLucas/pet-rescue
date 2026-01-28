import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { calculateAge } from '@/lib/utils';
import type { Cat } from '@/lib/definitions';

export function CatProfile() {
  const { id } = useParams();
  const location = useLocation();
  const [cat, setCat] = useState<Cat | null>(location.state?.cat || null);
  const [loading, setLoading] = useState(!location.state?.cat);

  useEffect(() => {
    if (!cat) {
      fetch(`http://localhost:3000/api/cats/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setCat(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, cat]);

  if (loading) return <Layout><p>Loading...</p></Layout>;
  if (!cat) return <Layout><p>Cat not found</p></Layout>;

  const age = calculateAge(cat.birthday);

  return (
    <Layout>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ aspectRatio: '1', backgroundColor: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
          {cat.photos[0] ? (
            <img src={cat.photos[0]} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
              No photo
            </div>
          )}
        </div>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{cat.name}</h1>
          <p style={{ color: '#4b5563', marginBottom: '1rem' }}>{age} • {cat.sex}</p>
          {cat.status === 'pending' && (
            <span style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '0.875rem', backgroundColor: '#fef3c7', color: '#92400e', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>
              Adoption pending
            </span>
          )}
          <p style={{ color: '#1f2937', lineHeight: 1.6 }}>{cat.bio}</p>
        </div>
      </div>
    </Layout>
  );
}
