const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors({ origin: true, credentials: true }));

app.post('/computeCone', (req, res) => {
  const { height, radius, segments } = req.body;

  // Вычисления для треугольной сетки конуса
  const triangles = [];
  const coneHeight = parseFloat(height);
  const coneRadius = parseFloat(radius);
  const numSegments = parseInt(segments);

  for (let i = 0; i < numSegments; i++) {
    const angle1 = (i / numSegments) * 2 * Math.PI;
    const angle2 = ((i + 1) / numSegments) * 2 * Math.PI;

    const vertex1 = [
      coneRadius * Math.cos(angle1),
      coneRadius * Math.sin(angle1),
      0,
    ];
    const vertex2 = [
      coneRadius * Math.cos(angle2),
      coneRadius * Math.sin(angle2),
      0,
    ];
    const vertex3 = [0, 0, coneHeight];

    triangles.push(vertex1, vertex2, vertex3);
  }

  res.json({ triangles });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
