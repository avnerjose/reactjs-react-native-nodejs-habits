import dayjs from "dayjs";

import { IDayHabitRepository } from "../../repositories/interfaces/IDayHabitRepository";
import { IDaysRepository } from "../../repositories/interfaces/IDaysRepository";
import { IToggleHabitDTO } from "../../dtos/toggleHabitDTO";

class ToggleHabitUseCase {
  constructor(
    private daysRepository: IDaysRepository,
    private dayHabitRepository: IDayHabitRepository
  ) {}

  async execute({ habitId }: IToggleHabitDTO) {
    const today = dayjs().startOf("day").toDate();

    let day = await this.daysRepository.findByDate(today);

    if (!day) {
      day = await this.daysRepository.create(today);
    }

    const dayHabit = await this.dayHabitRepository.findByDayIdAndHabitId(
      day.id,
      habitId
    );

    if (dayHabit) {
      await this.dayHabitRepository.delete(dayHabit.id);
    } else {
      await this.dayHabitRepository.create(day.id, habitId);
    }
  }
}

export { ToggleHabitUseCase };
