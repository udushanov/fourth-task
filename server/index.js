import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
  db.query(
    "SELECT * FROM user WHERE email = ?",
    [req.body.email],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found");

      if (req.body.password !== data[0].password) {
        return res.status(400).json("Wrong password");
      }

      if (data[0].status === "blocked") {
        return res.status(400).json("User is blocked");
      }

      res.status(200).json(data[0]);
    }
  );
});

app.patch("/", (req, res) => {
  db.query(
    "UPDATE user SET lastlogineddate = ? WHERE id = ?",
    [req.body.lastlogineddate, req.body.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been updated successfully");
    }
  );
});

app.get("/main", (req, res) => {
  db.query("SELECT * FROM user", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

app.post("/main", (req, res) => {
  res.status(200).json("User has been logged out");
});

app.patch("/main", (req, res) => {
  db.query(
    "UPDATE user SET status = ? WHERE id = ?",
    [req.body.status, req.body.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json("User has been blocked/unblocked successfully");
    }
  );
});

app.delete("/main", (req, res) => {
  db.query("DELETE FROM user WHERE id = ?", [req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.listen(process.env.PORT || 8800, () => {
  console.log("The server is running");
});
