const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        authors: [Author!]!,
        author(id: Int!): Author!,
        book(id: Int!): Book!
    }
   
    type Author {
        id: ID!
        name: String!
        books: [Book!]
    }

    type Book {
        id: ID!
        title: String!
        published: Boolean!
        year: Int!
        link: String
        rating: Float!
        author: Author!
    }

    type Mutation {
        createAuthor(name: String!): Author
    }
`);

module.exports = schema;

