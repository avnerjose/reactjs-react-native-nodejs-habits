import { Habit } from "@prisma/client";
import { ICreateHabitDTO } from "../../dtos/createHabitDTO";
import { IFindByNameAndWeekDay } from "../../dtos/findByDateAndWeekDayDTO";

export interface IHabitsRepository {
  create: ({ title, weekDays }: ICreateHabitDTO) => Promise<Habit>;
  findByDateAndWeekDay: ({
    date,
    weekDay,
  }: IFindByNameAndWeekDay) => Promise<Habit[]>;
}
