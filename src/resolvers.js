const resolvers = {

    authors: async (_, context) => {
      const { db } = await context();
      return db
        .collection("authors")
        .find()
        .toArray();
    },

    author: async ({ id }, context) => {
      const { db } = await context();
      return db.collection("authors").findOne({ id });
    },

    createAuthor: async ({name}, context) => {
      const { db } = await context();
      var id = await db.collection("authors").estimatedDocumentCount() + 1;
      db.collection("authors").insertOne({id: id, name: name});
      return db.collection("authors").findOne({ id });
    }
    
  };
  
  module.exports = resolvers;