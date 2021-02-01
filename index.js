// import express from "express";
// import cors from "cors";
// import monk from "monk";
// import shortId from "shortid";
// import * as admin from "firebase-admin";
// import serviceAccount from "./mews-7e6e6-firebase-adminsdk-35caf-cf74f43552.js";
const express = require("express");
const cors = require("cors");
const shortId = require("shortid");
const admin = require("firebase-admin");
const serviceAccount = require("./mews-7e6e6-firebase-adminsdk-35caf-cf74f43552.json");

const app = express();

//FIREBASE
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const mews = admin.firestore();

//MONGODB
// const URL_MONGODB = "localhost:27017/db";
// const db = monk(process.env.MONGO_URL || URL_MONGODB);
// db.then(() => {
//   console.log("Server monk connected");
// });
const port = 3000;

app.use(express.json());
app.use(cors());

// const mews = db.get("mews");

app.get("/", (req, res) => {
  res.json("Hello meowers");
});

app.get("/mews", async (req, res) => {
  const mewsRef = mews.collection("mews");
  const snapshot = await mewsRef.get();
  let data = [];
  snapshot.forEach((doc) => data.push({ id: doc.id, values: doc.data() }));
  res.json([...data]);
});

app.post("/mews", async (req, res) => {
  const data = await mews
    .collection("mews")
    .doc(Date.now().toString())
    .set({ ...req.body });
  res.json(data);
});

app.listen(port, () => console.log("Server listening on port " + port));
