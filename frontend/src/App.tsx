import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Pets } from '@/pages/pets/Pets';
import { PetProfile } from '@/pages/pets/PetProfile';
import { AddPet } from '@/pages/pets/AddPet';
import { EditPet } from '@/pages/pets/EditPet';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/pets/add" element={<AddPet />} />
      <Route path="/pets/:id" element={<PetProfile />} />
      <Route path="/pets/:id/edit" element={<EditPet />} />
    </Routes>
  );
}

export default App;
