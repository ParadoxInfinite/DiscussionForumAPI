require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { connect } from "mongoose";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
