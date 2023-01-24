import { ICreateHabitDTO } from "../../dtos/createHabitDTO";
import { IHabitsRepository } from "../../repositories/interfaces/IHabitsRepository";

class CreateHabitUseCase {
  constructor(private habitsRepository: IHabitsRepository) {}

  async execute(payload: ICreateHabitDTO) {
    const { title, weekDays } = payload;

    const habit = await this.habitsRepository.create({
      title,
      weekDays,
    });

    return habit;
  }
}

export { CreateHabitUseCase };
