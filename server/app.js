require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const routes = require("./routes/");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => {
	console.log(`connected to http://localhost:${port}/`);
});
