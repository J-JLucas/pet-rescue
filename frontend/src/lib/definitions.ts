export type Cat = {
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


