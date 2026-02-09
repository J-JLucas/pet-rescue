import type { Pet } from "@/lib/definitions";

/* get all pets*/
export async function fetchAllPets(): Promise<Pet[]> {
  const res = await fetch(`/api/pets`);

  if (!res.ok) throw new Error(`Failed to fetch pets`);

  return res.json();
}

/* get pet data by id */
export async function fetchPetById(id: string): Promise<Pet> {
  const res = await fetch(`/api/pets/${id}`);

  if (!res.ok) throw new Error(`Failed to fetch pet ${id}`);

  return res.json();
}

/* insert pet */
export async function addPet(data: Partial<Pet>): Promise<boolean> {
  const res = await fetch(`/api/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.ok;
}


/* update pet data by id */
export async function updatePet(id: string, data: Partial<Pet>): Promise<boolean> {
  const res = await fetch(`/api/pets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.ok;
}
