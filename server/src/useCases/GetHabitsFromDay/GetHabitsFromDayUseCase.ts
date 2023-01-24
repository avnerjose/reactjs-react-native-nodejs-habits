import dayjs from "dayjs";
import { IGetHabitsFromDayDTO } from "../../dtos/getHabitsFromDayDTO";
import { IDaysRepository } from "../../repositories/interfaces/IDaysRepository";
import { IHabitsRepository } from "../../repositories/interfaces/IHabitsRepository";

class GetHabitsFromDayUseCase {
  constructor(
    private habitsRepository: IHabitsRepository,
    private daysRepository: IDaysRepository
  ) {}

  async execute({ date }: IGetHabitsFromDayDTO) {
    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day");

    const possibleHabits = await this.habitsRepository.findByDateAndWeekDay({
      date,
      weekDay,
    });

    const day = await this.daysRepository.findByDateWithDayHabits(
      parsedDate.toDate()
    );

    const completedHabits =
      day?.dayHabits.map((dayHabit) => dayHabit.habit_id) ?? [];

    return {
      possibleHabits,
      completedHabits,
    };
  }
}

export { GetHabitsFromDayUseCase };
