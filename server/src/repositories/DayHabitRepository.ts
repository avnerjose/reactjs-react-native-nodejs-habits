import { DayHabit } from "@prisma/client";
import { IDayHabitRepository } from "./interfaces/IDayHabitRepository";
import { prisma } from "../lib/prisma";

class DayHabitRepository implements IDayHabitRepository {
  async create(dayId: string, habitId: string) {
    return await prisma.dayHabit.create({
      data: {
        day_id: dayId,
        habit_id: habitId,
      },
    });
  }
  async delete(dayHabitId: string) {
    return await prisma.dayHabit.delete({
      where: {
        id: dayHabitId,
      },
    });
  }
  async findByDayIdAndHabitId(dayId: string, habitId: string) {
    return await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: dayId,
          habit_id: habitId,
        },
      },
    });
  }
}

export { DayHabitRepository };
