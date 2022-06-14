require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
db.getConnection((err, connection) => {
  if (err) {
    return console.log(err);
  }
  console.log("DB ALIVE");
  connection.release();
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/get", (req, res) => {
  const sql = "SELECT * FROM `names`";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

app.get("/", (req, res) => {
  /* const sqlInsert = "INSERT INTO names (name, age,city) VALUES ('test',28,'test')";
    db.query(sqlInsert, (err, result) => {
        if (err) throw err;
        console.log(result);
    });*/
  res.send("Hello World!");
});

app.post("/api/add", (req, res) => {
  const { name, age, city } = req.body;
  const sqlInsert = "INSERT INTO names (name, age,city) VALUES (?,?,?)";
  db.query(sqlInsert, [name, age, city], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  res.send("Success");
});
app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlDelete = "DELETE FROM names WHERE id = ?";
  db.query(sqlDelete, [id], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  res.send("Success");
});

app.get("/api/get:id", (req, res) => {
  const { id } = req.params;
  const sqlGet= "SELECT * FROM names WHERE id = ?";
  db.query(sqlGet, id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});


  app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, city } = req.body;
    const sqlUpdate =
      "UPDATE names SET name = ?, age = ?, city = ? WHERE id = ?";
    db.query(sqlUpdate, [name, age, city, id], (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    res.send("Success");
  });


app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
