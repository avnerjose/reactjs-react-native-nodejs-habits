import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface HabitsListProps {
  date: Date;
  onCompletedChanged: (p: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo | null>(null);

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  const fetchHabitsInfo = async () => {
    try {
      const { data } = await api.get("/day", {
        params: {
          date: date.toISOString(),
        },
      });

      setHabitsInfo(data);
    } catch (e) {
      console.log(e);
      alert("It wasn't possible to load habits info");
    }
  };

  const handleToggleHabit = async (habitId: string) => {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId);
      let completedHabits: string[] = [];

      if (isHabitCompleted) {
        completedHabits = habitsInfo!.completedHabits.filter(
          (id) => id !== habitId
        );
      } else {
        completedHabits = [...habitsInfo!.completedHabits, habitId];
      }
      setHabitsInfo({
        completedHabits,
        possibleHabits: habitsInfo!.possibleHabits,
      });
      console.log("Entrou");
      onCompletedChanged(completedHabits.length);
    } catch (e) {
      console.log(e);
      alert("It wasn't possible to toggle this habit");
    }
  };

  const habitsList =
    habitsInfo && habitsInfo.possibleHabits.length > 0 ? (
      habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          onCheckedChange={() => handleToggleHabit(habit.id)}
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))
    ) : (
      <span>There are no habits for this day</span>
    );

  useEffect(() => {
    fetchHabitsInfo();
  }, []);

  return <div className="mt-6 flex flex-col gap-3">{habitsList}</div>;
}
