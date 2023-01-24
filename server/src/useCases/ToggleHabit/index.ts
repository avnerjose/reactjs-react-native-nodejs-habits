import { DayHabitRepository } from "../../repositories/DayHabitRepository";
import { DaysRepository } from "../../repositories/DaysRepository";
import { ToggleHabitController } from "./ToggleHabitController";
import { ToggleHabitUseCase } from "./ToggleHabitUseCase";

const daysRepository = new DaysRepository();
const dayHabitRepository = new DayHabitRepository();

const toggleHabitUseCase = new ToggleHabitUseCase(
  daysRepository,
  dayHabitRepository
);

const toggleHabitController = new ToggleHabitController(toggleHabitUseCase);

export { toggleHabitController };
