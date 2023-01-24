import { DaysRepository } from "../../repositories/DaysRepository";
import { HabitsRepository } from "../../repositories/HabitsRepository";
import { GetHabitsFromDayController } from "./GetHabitsFromDayController";
import { GetHabitsFromDayUseCase } from "./GetHabitsFromDayUseCase";

const habitsRepository = new HabitsRepository();
const daysRepository = new DaysRepository();

const getHabitsFromDayUseCase = new GetHabitsFromDayUseCase(
  habitsRepository,
  daysRepository
);
const getHabitsFromDayController = new GetHabitsFromDayController(
  getHabitsFromDayUseCase
);

export { getHabitsFromDayController };
