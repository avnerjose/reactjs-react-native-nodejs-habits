import { useEffect, useState } from "react";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill =
  minimumSummaryDatesSize - datesFromYearBeginning.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  const handleFetchSummary = async () => {
    try {
      const { data } = await api.get("/summary");

      setSummary(data);
    } catch (e) {
      console.log(e);
      alert("It wasn't possible to fetch summary");
    }
  };

  const weekDaysColumn = weekDays.map((day, i) => (
    <div
      key={`${day}-${i}`}
      className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
    >
      {day}
    </div>
  ));

  const habitDays =
    summary.length > 0 &&
    datesFromYearBeginning.map((date) => {
      const dayInSummary = summary.find((day) =>
        dayjs(date).isSame(day.date, "day")
      );
      return (
        <HabitDay
          key={date.toISOString()}
          date={date}
          amount={dayInSummary?.amount}
          defaultCompleted={dayInSummary?.completed}
        />
      );
    });

  const daysToFill =
    amountOfDaysToFill > 0 &&
    Array.from({ length: amountOfDaysToFill }).map((_, i) => (
      <div
        key={i}
        className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
      ></div>
    ));

  useEffect(() => {
    handleFetchSummary();
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDaysColumn}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {habitDays}
        {daysToFill}
      </div>
    </div>
  );
}
