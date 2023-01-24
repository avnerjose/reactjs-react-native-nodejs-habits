import { FastifyInstance } from "fastify";

import { createHabitController } from "../useCases/CreateHabit";
import { toggleHabitController } from "../useCases/ToggleHabit";

export async function habitsRoutes(app: FastifyInstance) {
  app.post("/habits", (req, res) => createHabitController.handle(req, res));
  app.patch("/habits/:id/toggle", (req, res) =>
    toggleHabitController.handle(req, res)
  );
}
