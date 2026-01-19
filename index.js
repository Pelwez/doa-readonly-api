const express = require("express");
const cors = require("cors");
const data = require("./characters.json");

const app = express();
app.use(cors());

// 🔒 Block all non-GET methods
app.use((req, res, next) => {
  if (req.method !== "GET") {
    return res.status(403).json({
      error: "Read-only API. Write operations are disabled."
    });
  }
  next();
});

// GET all characters
app.get("/api/characters", (req, res) => {
  res.json(data.characters);
});

// GET character by ID
app.get("/api/characters/:id", (req, res) => {
  const id = Number(req.params.id);
  const character = data.characters.find(c => c.id === id);

  if (!character) return res.status(404).json({ error: "Character not found" });

  res.json(character);
});

// GET character by name
app.get("/api/characters/name/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const character = data.characters.find(c => c.name.toLowerCase() === name);

  if (!character) return res.status(404).json({ error: "Character not found" });

  res.json(character);
});

// GET all fighting styles
app.get("/api/styles", (req, res) => {
  const styles = [...new Set(data.characters.map(c => c.fighting_style))];
  res.json(styles);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Read-only API running on port ${PORT}`));
