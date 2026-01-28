import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";

export function AddPet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    birthday: '',
    sex: 'unknown',
    bio: '',
    photos: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement
    | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/cats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          birthday: form.birthday || null,
          photos: form.photos ? form.photos.split(',').map(p => p.trim()) : [],
        }),
      });

      if (res.ok) {
        navigate('/');
      } else {
        console.error('Failed to add cat');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Add a new pet</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          Name *
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Birthday
          <input
            type="date"
            name="birthday"
            value={form.birthday}
            onChange={handleChange}
          />
        </label>

        <label>
          Sex
          <select name="sex" value={form.sex} onChange={handleChange}>
            <option value="unknown">Unknown</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label>
          Bio
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
          />
        </label>

        <label>
          Photos (comma-separated URLs)
          <input
            type="text"
            name="photos"
            value={form.photos}
            onChange={handleChange}
            placeholder="/cats/photo1.jpg, /cats/photo2.jpg"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Cat'}
        </button>
      </form>
    </Layout>
  );
} 
