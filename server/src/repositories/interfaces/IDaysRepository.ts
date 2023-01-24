import { Day, DayHabit } from "@prisma/client";

export interface IDaysRepository {
  create: (date: Date) => Promise<Day>;
  findByDate: (date: Date) => Promise<Day | null>;
  findByDateWithDayHabits: (date: Date) => Promise<
    | (Day & {
        dayHabits: DayHabit[];
      })
    | null
  >;
}
