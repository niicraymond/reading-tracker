const app = require("./index.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
