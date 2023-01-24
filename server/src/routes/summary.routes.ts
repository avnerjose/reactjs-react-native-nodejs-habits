import { FastifyInstance } from "fastify";

import { getSummaryController } from "../useCases/GetSummary";

export async function summaryRoutes(app: FastifyInstance) {
  app.get("/summary", (req, res) => getSummaryController.handle(req, res));
}
