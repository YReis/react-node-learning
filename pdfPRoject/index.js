const express = require("express");
const app = express();
const port = 3000;
const pdfreader = require("./functions/pdfReader");

app.get("/", () => {});

app.get("/leitor", (req, res) => {
  let pdfValues = req.query.pdf;
  pdfreader.leitor(pdfValues, (data) => {
    console.log(data);
    return res.send(data);
  });
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
