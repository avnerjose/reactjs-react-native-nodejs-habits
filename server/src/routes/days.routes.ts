import { FastifyInstance } from "fastify";

import { getHabitsFromDayController } from "../useCases/GetHabitsFromDay";

export async function daysRoutes(app: FastifyInstance) {
  app.get("/day", (req, res) => getHabitsFromDayController.handle(req, res));
}
