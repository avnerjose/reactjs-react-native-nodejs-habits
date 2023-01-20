import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get("/", (req, res) => {
  return {
    message: "Hello World",
  };
});

app.listen({
  port: 3333,
});
