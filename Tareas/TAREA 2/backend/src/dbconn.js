import { MongoClient } from 'mongodb';

// Connection URI
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Function to close the MongoDB connection
async function closeMongoDBConnection() {
  try {
    await client.close();
    console.log('Closed MongoDB connection');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

export { connectToMongoDB, closeMongoDBConnection, client };
