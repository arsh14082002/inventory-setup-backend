import app from './src/app.js';
import { connectDB } from './src/config/db.js';

connectDB();

const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
