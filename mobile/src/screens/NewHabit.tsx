import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import colors from "tailwindcss/colors";
import axios from "axios";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function NewHabit() {
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  const handleCreateNewHabit = async () => {
    try {
      if (!title.trim() || selectedWeekDays.length === 0) {
        Alert.alert(
          "New habit",
          "Inform the habit title and select at least one day"
        );
        return;
      }

      await axios.post("/habits", {
        title,
        weekDays: selectedWeekDays,
      });
    } catch (e) {
      console.log(e);
      Alert.alert("Ops!", "It wasn't possible to create a new habit");
    } finally {
      setTitle("");
      setSelectedWeekDays([]);
    }
  };

  const handleSelectWeekDay = (weekDayIndex: number) => {
    if (selectedWeekDays.includes(weekDayIndex)) {
      const newSelectedWeekDays = selectedWeekDays.filter(
        (day) => day != weekDayIndex
      );
      setSelectedWeekDays(newSelectedWeekDays);
    } else {
      setSelectedWeekDays((prev) => [...prev, weekDayIndex]);
    }
  };

  const weekDaysCheckboxList = weekDays.map((day, index) => {
    const isChecked = selectedWeekDays.includes(index);
    return (
      <Checkbox
        key={day}
        title={day}
        checked={isChecked}
        onPress={() => handleSelectWeekDay(index)}
      />
    );
  });

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Create habit
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          What is your commitment?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Exercises, sleeping well, etc..."
          placeholderTextColor={colors.zinc[400]}
          value={title}
          onChangeText={setTitle}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          What is the recurrence?
        </Text>
        {weekDaysCheckboxList}
        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
