import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);

  const handleCreateNewHabit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || selectedWeekDays.length === 0) {
      return;
    }

    await api.post("/habits", {
      title,
      weekDays: selectedWeekDays,
    });

    setTitle("");
    setSelectedWeekDays([]);

    alert("Hábito criado com sucesso!");
  };

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if (selectedWeekDays.includes(weekDayIndex)) {
      const newSelectedWeekDays = selectedWeekDays.filter(
        (day) => day !== weekDayIndex
      );
      setSelectedWeekDays(newSelectedWeekDays);
    } else {
      setSelectedWeekDays((prev) => [...prev, weekDayIndex]);
    }
  };

  const weekDaysCheckboxList = weekDays.map((day, index) => (
    <Checkbox.Root
      key={day}
      className="flex items-center gap-3 group focus:outline-none"
      onCheckedChange={() => handleToggleWeekDay(index)}
      checked={selectedWeekDays.includes(index)}
    >
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background">
        <Checkbox.Indicator>
          <Check size={20} className="text-white" />
        </Checkbox.Indicator>
      </div>
      <span className="text-white leading-tight">{day}</span>
    </Checkbox.Root>
  ));

  return (
    <form onSubmit={handleCreateNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What is your commitment?
      </label>
      <input
        type="text"
        id="title"
        placeholder="Exercises, sleeping well, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        What is the recurrence?
      </label>

      <div className="flex flex-col gap-2 mt-3">{weekDaysCheckboxList}</div>

      <button
        type="submit"
        className="flex items-center justify-center mt-6 rounded-lg p-4 gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  );
}
