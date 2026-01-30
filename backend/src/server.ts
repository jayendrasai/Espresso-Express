import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
//import { expressMiddleware } from "@apollo/server/express4";
import { expressMiddleware } from "@as-integrations/express4";


const app = express();
const PORT = 4000;

// Basic schema (temporary)
const typeDefs = `
  type Query {
    health: String
  }
`;

const resolvers = {
  Query: {
    health: () => "Espresso Express backend is running ☕"
  }
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server)
  );

  app.get("/health", (_req, res) => {
    res.send("OK");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}/graphql`);
  });
}

startServer();
