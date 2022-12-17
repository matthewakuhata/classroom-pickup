import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: MongoMemoryReplSet | null = null;

const connectDB = async () => {
  mongo = await MongoMemoryReplSet.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
};

const dropCollections = async () => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
};

const dropDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await dropDB();
});

afterEach(async () => {
  await dropCollections();
});
