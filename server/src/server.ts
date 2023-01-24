import Fastify from "fastify";
import cors from "@fastify/cors";

import { habitsRoutes } from "./routes/habits.routes";
import { daysRoutes } from "./routes/days.routes";
import { summaryRoutes } from "./routes/summary.routes";

const app = Fastify();

app.register(cors);
app.register(habitsRoutes);
app.register(daysRoutes);
app.register(summaryRoutes);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("App Running");
  });
