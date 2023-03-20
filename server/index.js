import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "5130921a",
  database: "users",
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM user", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/register", (req, res) => {
  db.query(
    "SELECT * FROM user WHERE email = ?",
    [req.body.email],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User alreay exist");

      const values = [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.regisrtydate,
        req.body.lastlogineddate,
        req.body.status,
      ];

      db.query(
        "INSERT INTO user (`username`, `email`, `password`, `regisrtydate`, `lastlogineddate`, `status`) VALUES (?)",
        [values],
        (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("User has been created");
        }
      );
    }
  );
});

app.post("/", (req, res) => {
  const values = [req.body.email];

  db.query(
    "SELECT * FROM user WHERE email = ?",
    [values],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found");

      if (req.body.password !== data[0].password) {
        return res.status(400).json('Wrong password')
      }
    }
  );
});

app.listen(process.env.PORT || 8800, () => {
  console.log("The server is running");
});
