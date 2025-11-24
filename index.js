const express = require('express');
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');
require('dotenv').config()



const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vs8p1m5.mongodb.net/?appName=Cluster0`;
//const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.vs8p1m5.mongodb.net/?appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();


    const coffiesCollection = client.db('coffeeDB').collection('coffees')

    // here we implement the get data.

    app.get('/coffees', async (req, res) => {
      // const cursor = coffiesCollection.find()
      // const result = await cursor.toArray()

      const result = await coffiesCollection.find().toArray();
      res.send(result);
    })

    // here we implement the post data.

    app.post('/coffees', async (req, res) => {
      const newCoffeeData = req.body;
      console.log(newCoffeeData);
      const result = await coffiesCollection.insertOne(newCoffeeData)
      //console.log(result);
      res.send(result)
    })

    // for single coffee itam.

    app.get('/coffees/:_id', async (req, res) => {
      const id = req.params._id;
      const query = { _id: new ObjectId(id) }
      const result = await coffiesCollection.findOne(query);
      console.log(result);
      res.send(result);
    })

    // here we implement the update data.

    app.put('/coffees/:_id', async (req, res) => {
      const id = req.params._id;
      const query = { _id: new ObjectId(id) }
      const result = await coffiesCollection.updateOne(query, { $set: req.body })
      console.log(result);
      res.send(result)
    })



    // here we write the delete script.

    app.delete('/coffee/:_id', async (req, res) => {
      const id = req.params._id;
      const query = { _id: new ObjectId(id) }
      const result = await coffiesCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {

  res.send(' cup_story server is created.')
})

app.listen(port, () => {
  console.log(`The server is running on ${port}`)
})