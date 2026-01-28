// get cat data by id
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
