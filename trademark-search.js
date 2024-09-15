export default function handler(req, res) {
    const { query, filters } = JSON.parse(req.body);
  
    // Mock search result
    const mockResults = [
      { name: 'Trademark 1' },
      { name: 'Trademark 2' },
      { name: 'Trademark 3' }
    ];
  
    // Respond with some results
    res.status(200).json({ results: mockResults });
  }
  