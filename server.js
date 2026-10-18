const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Dados do setlist final - 4 músicas
const setlist = [
  { id: 1, titulo: "Debaixo do Meu Pé", artista: "CEIZS", tom: "A", file: "index.html#musica1", cor: "#FFCC00" },
  { id: 2, titulo: "Em Teus Braços", artista: "Laura Souguellis", tom: "C", file: "index.html#musica2", cor: "#00D4FF" },
  { id: 3, titulo: "Coração Igual ao Teu", artista: "Diante do Trono", tom: "F", file: "index.html#musica3", cor: "#FF5A5A" },
  { id: 4, titulo: "É Tudo Sobre Você", artista: "MORADA", tom: "Am", file: "index.html#musica4", cor: "#A855F7" }
];

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API - retorna setlist completo
app.get('/api/setlist', (req, res) => {
  res.json(setlist);
});

// API - retorna uma música específica
app.get('/api/musica/:id', (req, res) => {
  const musica = setlist.find(m => m.id === parseInt(req.params.id));
  if (!musica) return res.status(404).json({ erro: "Música não encontrada" });
  res.json(musica);
});

app.listen(PORT, () => {
  console.log(`\n---------------------------------------`);
  console.log(`🔥 SETLIST LOUVO NO AR!`);
  console.log(`👉 Local: http://localhost:${PORT}`);
  console.log(`📖 4 louvores: Debaixo, Em Teus Braços, Coração, É Tudo Sobre Você`);
  console.log(`---------------------------------------\n`);
});