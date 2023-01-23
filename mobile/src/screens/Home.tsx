import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";

import { Header } from "../components/Header";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Loading } from "../components/Loading";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { api } from "../lib/axios";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumDatesAmount = 9 * 7;
const amountOfDatesToFill = minimumDatesAmount - datesFromYearBeginning.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary>([]);

  const fetchHabitsSummary = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/summary");
      setSummary(data);
    } catch (e) {
      Alert.alert("Ops", "It wasn't possible to load the habits summary");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const weekDaysRow = weekDays.map((day, i) => (
    <Text
      key={`${day}-${i}`}
      className="text-zinc-400 text-xl font-bold text-center mx-1"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    >
      {day}
    </Text>
  ));

  const habitDays = datesFromYearBeginning.map((date) => {
    const dayWithHabits = summary.find((day) =>
      dayjs(date).isSame(day.date, "day")
    );

    return (
      <HabitDay
        key={date.toISOString()}
        date={date}
        amount={dayWithHabits?.amount}
        completed={dayWithHabits?.completed}
        onPress={() =>
          navigate("habit", {
            date: date.toISOString(),
          })
        }
      />
    );
  });

  const datesToFill =
    amountOfDatesToFill > 0 &&
    Array.from({
      length: amountOfDatesToFill,
    }).map((_, i) => (
      <View
        key={i}
        className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-50"
        style={{ width: DAY_SIZE, height: DAY_SIZE }}
      />
    ));

  useFocusEffect(
    useCallback(() => {
      fetchHabitsSummary();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">{weekDaysRow}</View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="flex-row flex-wrap">
          {habitDays}
          {datesToFill}
        </View>
      </ScrollView>
    </View>
  );
}
