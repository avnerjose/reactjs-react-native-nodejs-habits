import { ICreateHabitDTO } from "../dtos/createHabitDTO";
import { IHabitsRepository } from "./interfaces/IHabitsRepository";
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";
import { IFindByNameAndWeekDay } from "../dtos/findByDateAndWeekDayDTO";

class HabitsRepository implements IHabitsRepository {
  async create({ title, weekDays }: ICreateHabitDTO) {
    const today = dayjs().startOf("day").toDate();

    const habit = await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => ({
            week_day: weekDay,
          })),
        },
      },
    });
    
    return habit;
  }

  async findByDateAndWeekDay({ date, weekDay }: IFindByNameAndWeekDay) {
    const habits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    return habits;
  }
}

export { HabitsRepository };
