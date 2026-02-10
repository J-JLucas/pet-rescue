import postgres from 'postgres';

const sql = postgres('postgresql://dev:dev@localhost:5432/pet_adoption');

async function seed() {
  // Drop existing table if you want a fresh start
  await sql`DROP TABLE IF EXISTS pets`;

  // Create new pets table with pet_type field
  await sql`
    CREATE TABLE pets (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      pet_type VARCHAR(50) NOT NULL DEFAULT 'cat',
      birthday DATE,
      sex VARCHAR(20) NOT NULL DEFAULT 'unknown',
      bio TEXT NOT NULL DEFAULT '',
      photos TEXT[] NOT NULL DEFAULT '{}',
      status VARCHAR(20) NOT NULL DEFAULT 'available',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Seed data
  const pets = [
    {
      name: 'Whiskers',
      pet_type: 'cat',
      birthday: '2022-03-15',
      sex: 'male',
      bio: 'A friendly orange tabby who loves chin scratches and sunny windowsills.',
      photos: ['/pets/whiskers-1.jpg'],
      status: 'available',
    },
    {
      name: 'Luna',
      pet_type: 'cat',
      birthday: '2023-07-22',
      sex: 'female',
      bio: 'Playful black cat with bright green eyes. Gets along great with other cats.',
      photos: ['/pets/luna-1.jpg', '/pets/luna-2.jpg'],
      status: 'available',
    },
    {
      name: 'Old Man Jenkins',
      pet_type: 'cat',
      birthday: '2015-01-10',
      sex: 'male',
      bio: 'Senior gentleman looking for a quiet retirement home. Loves laps and long naps.',
      photos: ['/pets/jenkins-1.jpg'],
      status: 'pending',
    },
    {
      name: 'Mystery',
      pet_type: 'cat',
      birthday: null,
      sex: 'unknown',
      bio: 'Found as a stray. Shy at first but warms up quickly with patience.',
      photos: [],
      status: 'available',
    },
  ];

  for (const pet of pets) {
    await sql`
      INSERT INTO pets (name, pet_type, birthday, sex, bio, photos, status)
      VALUES (${pet.name}, ${pet.pet_type}, ${pet.birthday}, ${pet.sex}, ${pet.bio}, ${pet.photos}, ${pet.status})
    `;
  }

  console.log('Seeded successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
