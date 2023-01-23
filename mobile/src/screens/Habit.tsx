import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";
import dayjs from "dayjs";
import clsx from "clsx";

import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { BackButton } from "../components/BackButton";
import { Loading } from "../components/Loading";
import { HabitsEmpty } from "../components/HabitsEmpty";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { api } from "../lib/axios";
interface RouteParams {
  date: string;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo | null>(null);
  const route = useRoute();
  const { date } = route.params as RouteParams;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const habitsProgress =
    habitsInfo!.possibleHabits.length > 0
      ? generateProgressPercentage(
          habitsInfo!.possibleHabits.length,
          habitsInfo!.completedHabits.length
        )
      : 0;

  const fetchHabitsInfo = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/day", {
        params: {
          date,
        },
      });

      setHabitsInfo(data);
    } catch (e) {
      console.log(e);
      Alert.alert("Ops", "It wasn't possible to load habits info");
    } finally {
      setLoading(false);
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
    } catch (e) {
      console.log(e);
      alert("It wasn't possible to update this habit");
    }
  };

  const habitsList =
    habitsInfo!.possibleHabits.length > 0 ? (
      habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox
          key={habit.id}
          title={habit.title}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          onPress={() => handleToggleHabit(habit.id)}
          disabled={isDateInPast}
        />
      ))
    ) : (
      <HabitsEmpty />
    );

  useEffect(() => {
    fetchHabitsInfo();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />
        <Text className="mt-6 text-zinc-400 font-semibold text-base capitalize">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl ">
          {dayAndMonth}
        </Text>
        <ProgressBar progress={habitsProgress} />
        <View
          className={clsx("mt-6", {
            "opacity-50": isDateInPast,
          })}
        >
          {habitsList}
        </View>
      </ScrollView>
    </View>
  );
}
