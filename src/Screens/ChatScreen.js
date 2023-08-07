import React, { useEffect } from "react";
import { View, Text } from "react-native";
import moment from "moment"; // Add the moment import
import Chat from "../components/Chat";

const ChatScreen = ({ route, navigation }) => {
  const { date, eventTitle } = route.params;

  // Parse the formatted date string back to moment object
  const parsedDate = moment(date, "YYYY-MM-DD");

  useEffect(() => {
    // Use 'navigation.setOptions' to set non-serializable options dynamically
    navigation.setOptions({
      title: "Chat",
      date: parsedDate.format("ddd D"), // Use the parsed date instead
      // other options...
    });
  }, [navigation, parsedDate]); // Add parsedDate to the dependency array

  return (
    <View>
      <Text>Chat Screen</Text>
      <Text>Date: {parsedDate.format("ddd D")}</Text>
      <Text>Event Title: {eventTitle}</Text>
      <Chat />
    </View>
  );
};

export default ChatScreen;
