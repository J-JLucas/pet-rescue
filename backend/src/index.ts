import express from 'express';
import cors from 'cors';
import postgres from 'postgres';

type Pet = {
  id: string;
  name: string;
  pet_type: 'cat' | 'dog';
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


/* Return all pets */
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await sql`
      SELECT * FROM pets
      WHERE status != 'adopted'
      ORDER BY created_at DESC
    `;
    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

/* Return pet by ID */
app.get('/api/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pets = await sql`
      SELECT * FROM pets
      WHERE id = ${id}
    `;
    if (pets.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pets[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
});


/* Insert pet into DB */
app.post('/api/pets', async (req, res) => {
  try {
    const { name, pet_type, birthday, sex, bio, photos, } = req.body;

    const result = await sql`
      INSERT INTO pets (name, pet_type, birthday, sex, bio, photos, status)
      VALUES (${name}, ${pet_type}, ${birthday}, ${sex}, ${bio}, ${photos}, 'available')
      RETURNING *
    ;`
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create pet' });
  }
});


/* Update pet in DB */
app.put('/api/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pet_type, birthday, sex, bio, photos, status } = req.body;

    const result = await sql`
      UPDATE pets
      SET name = ${name},
          pet_type = ${pet_type},
          birthday = ${birthday},
          sex = ${sex},
          bio = ${bio},
          photos = ${photos},
          status = ${status},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update pet' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
