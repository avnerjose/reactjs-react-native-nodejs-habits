import { DayHabit } from "@prisma/client";

export interface IDayHabitRepository {
  create: (dayId: string, habitId: string) => Promise<DayHabit>;
  delete: (dayHabitId: string) => Promise<DayHabit>;
  findByDayIdAndHabitId: (
    dayId: string,
    habitId: string
  ) => Promise<DayHabit | null>;
}
