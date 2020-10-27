const { urlencoded } = require("express");
const express = require("express");
const router = require("./routes/todo");
const app = express();
const port = 3000;
app.use(urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});
