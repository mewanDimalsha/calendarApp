import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return <GiftedChat messages={messages} onSend={onSend} user={{ _id: 1 }} />;
};

export default Chat;
