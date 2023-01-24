import { IDaysRepository } from "./interfaces/IDaysRepository";
import { prisma } from "../lib/prisma";

class DaysRepository implements IDaysRepository {
  async create(date: Date) {
    return await prisma.day.create({
      data: {
        date,
      },
    });
  }

  async findByDate(date: Date) {
    return await prisma.day.findUnique({
      where: {
        date,
      },
    });
  }

  async findByDateWithDayHabits(date: Date) {
    return await prisma.day.findFirst({
      where: {
        date,
      },
      include: {
        dayHabits: true,
      },
    });
  }
}

export { DaysRepository };
