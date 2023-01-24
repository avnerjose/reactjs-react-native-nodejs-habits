// import { z } from "zod";

// const createHabitBody = z.object({
//   title: z.string(),
//   weekDays: z.array(z.number().min(0).max(6)),
// });

export interface ICreateHabitDTO {
  title: string;
  weekDays: number[];
}
