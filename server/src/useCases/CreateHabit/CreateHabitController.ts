import { FastifyReply, FastifyRequest } from "fastify";
import { CreateHabitUseCase } from "./CreateHabitUseCase";
import { z } from "zod";

class CreateHabitController {
  constructor(private createHabitUseCase: CreateHabitUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const createHabitBody = z.object({
        title: z.string(),
        weekDays: z.array(z.number().min(0).max(6)),
      });

      const { title, weekDays } = createHabitBody.parse(req.body);

      const habit = await this.createHabitUseCase.execute({
        title,
        weekDays,
      });

      return res.status(201).send(JSON.stringify(habit));
    } catch (e) {
      return res.status(400).send({
        error: e,
      });
    }
  }
}

export { CreateHabitController };
