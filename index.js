const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dotenv = require("dotenv").config();
const URL = process.env.DB;
// Middleweare
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

let students = [];

app.get("/students", async function (req, res) {
  try {
    // Open the Connection
    const connection = await mongoClient.connect(URL);

    // Select the DB
    const db = connection.db("b35wd_tamil");

    // Select the collection and do the operation
    let students = await db.collection("students").find().toArray();

    // Close the connection
    await connection.close();

    res.json(students);
  } catch (error) {
    console.log(error);
  }
});

app.post("/student", async function (req, res) {
  try {
    // Open the Connection
    const connection = await mongoClient.connect(URL);

    // Select the DB
    const db = connection.db("b35wd_tamil");

    // Select the collection and do the operation
    await db.collection("students").insertOne(req.body);

    // Close the connection
    await connection.close();

    res.json({
      message: "Student added successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/student/:id", async function (req, res) {
  try {
    // Open the Connection
    const connection = await mongoClient.connect(URL);

    // Select the DB
    const db = connection.db("b35wd_tamil");

    // Select the collection and do the operation
    let student = await db
      .collection("students")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });

    // Close the connection
    await connection.close();

    res.json(student);
  } catch (error) {
    console.log(error);
  }
});

app.put("/student/:id", async function (req, res) {
  try {
    // Open the Connection
    const connection = await mongoClient.connect(URL);

    // Select the DB
    const db = connection.db("b35wd_tamil");

    // Select the collection and do the operation
    let student = await db
      .collection("students")
      .updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body });

    // Close the connection
    await connection.close();

    res.json({
      message: "Student updated successfully",
    });
  } catch (error) {
    console.log(error)
  }
});

app.delete("/student/:id", async function (req, res) {
  try {
    // Open the Connection
    const connection = await mongoClient.connect(URL);

    // Select the DB
    const db = connection.db("b35wd_tamil");

    // Select the collection and do the operation
    let student = await db
      .collection("students")
      .deleteOne({ _id: mongodb.ObjectId(req.params.id) });

    // Close the connection
    await connection.close();

    res.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3001);
