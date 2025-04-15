import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/phase-change-diagram', (req: Request, res: Response) => {
  const pressure = Number(req.query.pressure);

  if (isNaN(pressure)) {
    return res.status(400).json({ error: 'Invalid pressure parameter' });
  }

  // Ejemplo básico según imagen para 10 MPa
  if (pressure === 10) {
    return res.json({
      specific_volume_liquid: 0.0035,
      specific_volume_vapor: 0.0035,
    });
  }

  // Puedes agregar más casos aquí si tienes más datos
  return res.status(404).json({ error: 'Pressure not found in database' });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
