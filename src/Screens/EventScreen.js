import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Calendar from "../components/Calendar";
import * as Contacts from "expo-contacts";
import PushNotification from "react-native-push-notification";

const ContactButton = ({ contact, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(contact)}
      style={{
        backgroundColor: isSelected ? "blue" : "gray",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: "white" }}>{contact.firstName}</Text>
    </TouchableOpacity>
  );
}; // <-- Closing bracket for ContactButton

const EventScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const onDatePress = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName],
      });
      setContacts(data);
    }
  };

  // Inside the createEvent function
  const onCreateEvent = () => {
    // ...

    // Convert moment date to string
    const formattedDate = selectedDate.format("YYYY-MM-DD");

    // Navigate to ChatScreen with the formatted date
    navigation.navigate("ChatScreen", {
      date: selectedDate, // Pass the moment object
      eventTitle: eventName,
    });

    // Send push notifications to selected contacts
    selectedContacts.forEach((contact) => {
      const message = `You have been invited to the event: ${eventName}. Event details: ${eventDetails}`;
      PushNotification.localNotification({
        message,
        title: "Event Invitation",
        vibration: 300,
        playSound: true,
        soundName: "default",
      });
    });

    setSelectedContacts([]); // Clear the selected contacts after sending notifications
  };

  const toggleContactSelection = (contact) => {
    if (selectedContacts.some((c) => c.id === contact.id)) {
      setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  return (
    <View>
      <Calendar onDatePress={onDatePress} />

      <Button
        title="Create Event"
        onPress={onCreateEvent}
        disabled={!selectedDate}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
            >
              Create Event
            </Text>
            <TextInput
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
              style={{
                marginBottom: 10,
                borderBottomWidth: 1,
                borderColor: "gray",
              }}
            />
            <TextInput
              placeholder="Event Details"
              value={eventDetails}
              onChangeText={setEventDetails}
              style={{
                marginBottom: 10,
                borderBottomWidth: 1,
                borderColor: "gray",
              }}
            />
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ContactButton
                  contact={item}
                  onPress={toggleContactSelection}
                  isSelected={selectedContacts.some((c) => c.id === item.id)}
                />
              )}
            />
            <Button
              title="Create"
              onPress={() => {
                createEvent();
                setModalVisible(false);
              }}
            />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="gray"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EventScreen;
