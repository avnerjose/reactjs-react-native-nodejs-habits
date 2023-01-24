import { HabitsRepository } from "../../repositories/HabitsRepository";
import { CreateHabitController } from "./CreateHabitController";
import { CreateHabitUseCase } from "./CreateHabitUseCase";

const habitsRepository = new HabitsRepository();
const createHabitUseCase = new CreateHabitUseCase(habitsRepository);
const createHabitController = new CreateHabitController(createHabitUseCase);

export { createHabitController };
