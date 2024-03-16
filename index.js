const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const FormRouter = require("./router/formRouter");
dotenv.config();
const PORT = 3030;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const template_path = path.join(__dirname, "./templates/views");
app.set("views", template_path);
app.set("view engine", "hbs");
app.use("/api", FormRouter);

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((error) => {
      console.log(error);
    });
};
mongoose.set('debug', true);
app.get("/", (req, res) => {
  res.render("form");
});

app.listen(PORT, () => {
  connect();
  console.log(`Server running at ${PORT} `);
});
