import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { ToggleHabitUseCase } from "./ToggleHabitUseCase";

class ToggleHabitController {
  constructor(private toggleHabitUseCase: ToggleHabitUseCase) {}
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const toggleHabitParams = z.object({
        id: z.string().uuid(),
      });

      const { id } = toggleHabitParams.parse(req.params);

      await this.toggleHabitUseCase.execute({ habitId: id });

      return res.status(200).send();
    } catch (e) {
      return res.status(400).send({
        error: e,
      });
    }
  }
}

export { ToggleHabitController };
