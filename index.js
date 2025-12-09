import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db-connection.js';
import routes from './routes/routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/api", routes);

async function startServer() {
  await connectDB(); // se conecta a MongoDB
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
}

startServer();
