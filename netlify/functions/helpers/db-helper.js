import { MongoClient } from "mongodb"

export const createClient = () => {

  const dbName = process.env.MONGODB;
  const client = new MongoClient(process.env.MONGODB_URI);

/* 
 * We add a usersCollection function to the client object,
 * this way neither login or signup need to know the name
 * of the database or the users collection.
 */
  client.usersCollection = function() {

    return this.db(dbName).collection("users");
    
  };

  client.notesCollection = function() {

    return this.db(dbName).collection("notes");
    
  };

  return client;

};
