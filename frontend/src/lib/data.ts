import type { Cat } from "@/lib/definitions";

/* get all cats */
export async function fetchAllCats(): Promise<Cat[]> {
  const res = await fetch(`/api/cats`);

  if (!res.ok) throw new Error(`Failed to fetch cats`);

  return res.json();
}

/* get cat data by id */
export async function fetchCatById(id: string): Promise<Cat> {
  const res = await fetch(`/api/cats/${id}`);

  if (!res.ok) throw new Error(`Failed to fetch cat ${id}`);

  return res.json();
}


/* update cat data by id */
export async function updateCat(id: string, data: Partial<Cat>): Promise<boolean> {
  const res = await fetch(`/api/cats/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.ok;
}
