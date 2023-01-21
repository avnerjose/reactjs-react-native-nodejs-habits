import { ScrollView, Text, View } from "react-native";
import { Header } from "../components/Header";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumDatesAmount = 9 * 7;
const amountOfDatesToFill = minimumDatesAmount - datesFromYearBeginning.length;

export function Home() {
  const weekDaysRow = weekDays.map((day, i) => (
    <Text
      key={`${day}-${i}`}
      className="text-zinc-400 text-xl font-bold text-center mx-1"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    >
      {day}
    </Text>
  ));

  const habitDays = datesFromYearBeginning.map((date) => (
    <HabitDay key={date.toISOString()} />
  ));

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
