import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Pets } from '@/pages/pets/Pets';
import { PetProfile } from '@/pages/pets/PetProfile';
import { AddPet } from '@/pages/pets/AddPet';
import { EditPet } from '@/pages/pets/EditPet';
import { Support } from '@/pages/Support';
import { Events } from '@/pages/Events';
import { Contact } from '@/pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/pets/add" element={<AddPet />} />
      <Route path="/pets/:id" element={<PetProfile />} />
      <Route path="/pets/:id/edit" element={<EditPet />} />
      <Route path="/support" element={<Support />} />
      <Route path="/events" element={<Events />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
