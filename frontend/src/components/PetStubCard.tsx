import { calculateAge } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { Cat } from "@/lib/definitions";

export function CatCard({ cat }: { cat: Cat }) {
  const age = calculateAge(cat.birthday);
  const photo = cat.photos[0];

  return (
    <Link to={`/cats/${cat.id}`} state={{ cat }} style={styles.link}>
      <div style={styles.card}>
        <div style={styles.imageContainer}>
          {photo ? (
            <img
              src={photo}
              alt={cat.name}
              style={styles.image}
            />
          ) : (
            <div style={styles.noPhoto}>
              No photo
            </div>
          )}
        </div>
        <div style={styles.content}>
          <h2 style={styles.name}>{cat.name}</h2>
          <p style={styles.age}>{age}</p>
          {cat.status === 'pending' && (
            <span style={styles.pendingBadge}>
              Adoption pending
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  imageContainer: {
    aspectRatio: '1',
    backgroundColor: '#f3f4f6',
    position: 'relative' as const,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  noPhoto: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
  },
  content: {
    padding: '1rem',
  },
  name: {
    fontWeight: 600,
    fontSize: '1.125rem',
    margin: 0,
  },
  age: {
    color: '#4b5563',
    fontSize: '0.875rem',
    margin: '0.25rem 0 0 0',
  },
  pendingBadge: {
    display: 'inline-block',
    marginTop: '0.5rem',
    fontSize: '0.75rem',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
  },
};
