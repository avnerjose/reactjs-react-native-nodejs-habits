import { prisma } from "../../lib/prisma";
import { GetSummaryController } from "./GetSummaryController";
import { GetSummaryUseCase } from "./GetSummaryUseCase";

const getSummaryUseCase = new GetSummaryUseCase(prisma);
const getSummaryController = new GetSummaryController(getSummaryUseCase);

export { getSummaryController };
