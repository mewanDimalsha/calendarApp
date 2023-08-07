import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";

const CustomCalendar = ({ currentDate = moment(), onDatePress }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onDayPress = (day) => {
    setSelectedDate(moment(day.dateString, "YYYY-MM-DD"));
    onDatePress(moment(day.dateString, "YYYY-MM-DD"));
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={currentDate.format("YYYY-MM-DD")}
        onDayPress={onDayPress}
        markedDates={
          selectedDate
            ? {
                [selectedDate.format("YYYY-MM-DD")]: {
                  selected: true,
                  selectedColor: "blue",
                },
              }
            : {}
        }
      />
      {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>
            Selected Date: {selectedDate.format("YYYY-MM-DD")}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  selectedDateContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  selectedDateText: {
    fontWeight: "bold",
  },
});

export default CustomCalendar;
