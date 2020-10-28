require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const routes = require("./routes/");

//body parser
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
	console.log(`connected to http://localhost:${PORT}/`);
});
