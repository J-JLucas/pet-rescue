import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { fetchCatById, updateCat } from "@/lib/data";

export function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    birthday: '',
    sex: 'unknown',
    bio: '',
    photos: '',
    status: 'available',
  });

  useEffect(() => {
    async function loadCat() {
      try {
        const data = await fetchCatById(id);
        setForm({
          name: data.name || '',
          birthday: data.birthday?.split('T')[0] || '',
          sex: data.sex || 'unknown',
          bio: data.bio || '',
          photos: data.photos?.join(', ') || '',
          status: data.status || 'available',
        });
      } catch (err) {
        console.error(err);
      }
      finally {
        setLoading(false);
      }
    }
    loadCat();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const success = await updateCat(id, {
        ...form,
        birthday: form.birthday || null,
        photos: form.photos ? form.photos.split(',').map(p => p.trim()) : [],
      });
      if (success) {
        navigate(`/pets/${id}`);
      } else {
        console.error('Failed to update cat');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1>Edit {form.name}</h1>
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
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="adopted">Adopted</option>
          </select>
        </label>
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </Layout>
  );
}
