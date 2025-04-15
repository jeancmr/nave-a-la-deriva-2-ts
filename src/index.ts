import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/phase-change-diagram', (req, res) => {
  const pressure = parseFloat(req.query.pressure as string);

  if (isNaN(pressure)) {
    return res.status(400).json({ error: 'Invalid pressure value' });
  }

  // Simulación básica basada en el gráfico (puedes agregar más valores si tienes más puntos)
  const data: Record<number, { specific_volume_liquid: number; specific_volume_vapor: number }> = {
    0.05: {
      specific_volume_liquid: 0.00105,
      specific_volume_vapor: 0.03,
    },
    10: {
      specific_volume_liquid: 0.0035,
      specific_volume_vapor: 0.0035,
    },
  };

  const result = data[pressure];
  if (!result) {
    return res.status(404).json({ error: 'Pressure value not found in diagram' });
  }

  res.json(result);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
