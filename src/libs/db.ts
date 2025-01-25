import { MongoClient, ServerApiVersion } from 'mongodb';
const uri:any = "mongodb+srv://dams:dams@cluster0.fvwbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    
    
  },
});

export default async function run() {
  try {

    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    await client.close();
  }
}
