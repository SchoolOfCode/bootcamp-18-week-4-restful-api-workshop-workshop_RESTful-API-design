import app from '../app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
