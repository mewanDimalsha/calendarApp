import React, { useEffect } from "react";
import { View } from "react-native";
import PushNotification from "react-native-push-notification";

const App = () => {
  useEffect(() => {
    // Initialize PushNotification
    PushNotification.configure({
      // Add your configuration here based on your requirements
    });

    // Check for the initial notification when the app starts
    try {
      PushNotification.getInitialNotification().then((notification) => {
        if (notification) {
          // Handle the initial notification data here
          console.log("Initial notification:", notification);
        }
      });
    } catch (error) {
      // Handle the error if getInitialNotification() fails
      console.error("Error in getInitialNotification:", error);
    }
  }, []);

  // Rest of your App component code...

  return <View>{/* Your App UI */}</View>;
};

export default App;
