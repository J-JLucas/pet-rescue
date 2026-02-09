export type Pet = {
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

