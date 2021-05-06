import express from 'express';
 
const app = express();
app.use(express.json());
import cartRoutes from './cart';

app.use("/", cartRoutes );

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});