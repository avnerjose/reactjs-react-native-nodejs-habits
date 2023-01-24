import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GetHabitsFromDayUseCase } from "./GetHabitsFromDayUseCase";

class GetHabitsFromDayController {
  constructor(private getHabitsFromDayUseCase: GetHabitsFromDayUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const getDayParams = z.object({
        date: z.coerce.date(),
      });

      const { date } = getDayParams.parse(req.query);

      const { completedHabits, possibleHabits } =
        await this.getHabitsFromDayUseCase.execute({ date });

      return res.status(200).send({
        possibleHabits,
        completedHabits,
      });
    } catch (e) {
      return res.status(400).send({
        error: e,
      });
    }
  }
}

export { GetHabitsFromDayController };
