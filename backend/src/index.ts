import express from 'express';
import cors from 'cors';
import postgres from 'postgres';

type Cat = {
  id: string;
  name: string;
  birthday: string | null;
  sex: 'male' | 'female' | 'unknown';
  bio: string;
  photos: string[];
  status: 'available' | 'pending' | 'adopted';
  created_at: string;
  updated_at: string;
};

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const sql = postgres('postgresql://dev:dev@localhost:5432/pet_adoption');

app.get('/api/cats', async (req, res) => {
  try {
    const cats = await sql`
      SELECT * FROM cats
      WHERE status != 'adopted'
      ORDER BY created_at DESC
    `;
    res.json(cats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cats' });
  }
});

app.get('/api/cats/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cats = await sql`
      SELECT * FROM cats
      WHERE id = ${id}
    `;
    if (cats.length === 0) {
      return res.status(404).json({ error: 'Cat not found' });
    }
    res.json(cats[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cat' });
  }
});

app.post('/api/cats', async (req, res) => {
  try {
    const { name, birthday, sex, bio, photos, } = req.body;

    const result = await sql`
      INSERT INTO cats (name, birthday, sex, bio, photos, status)
      VALUES (${name}, ${birthday}, ${sex}, ${bio}, ${photos}, 'available')
      RETURNING *
    ;`
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create cat' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
