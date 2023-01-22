import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";

import { ProgressBar } from "./ProgressBar";
interface HabitDayProps {
  completed: number;
  amount: number;
}

export function HabitDay({ amount, completed }: HabitDayProps) {
  const completionPercentage = Math.round((completed / amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("w-10 h-10 border-2 rounded-lg", {
          "bg-violet-500 border-violet-400": completionPercentage >= 80,
          "bg-violet-600 border-violet-500":
            completionPercentage >= 60 && completionPercentage < 80,
          "bg-violet-700 border-violet-500":
            completionPercentage >= 40 && completionPercentage < 60,
          "bg-violet-800 border-violet-600":
            completionPercentage >= 20 && completionPercentage < 40,
          "bg-violet-900 border-violet-700":
            completionPercentage >= 0 && completionPercentage < 20,
          "bg-zinc-900 border-zinc-800": completionPercentage === 0,
        })}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-bold text-zinc-400">Wednesday</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            17/01
          </span>

          <ProgressBar progress={completionPercentage} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
