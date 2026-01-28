import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { CatProfile } from '@/pages/PetProfile';
import { AddPet } from '@/pages/AddPet';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cats/:id" element={<CatProfile />} />
      <Route path="/addPet" element={<AddPet />} />
    </Routes>
  );
}

export default App;
