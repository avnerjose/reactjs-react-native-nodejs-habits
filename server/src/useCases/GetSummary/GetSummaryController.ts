import { FastifyReply, FastifyRequest } from "fastify";
import { GetSummaryUseCase } from "./GetSummaryUseCase";

class GetSummaryController {
  constructor(private getSummaryUseCase: GetSummaryUseCase) {}

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const summary = await this.getSummaryUseCase.execute();

      return res.status(200).send(summary);
    } catch (e) {
      return res.status(400).send({
        error: e,
      });
    }
  }
}

export { GetSummaryController };
