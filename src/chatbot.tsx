import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

// Replace with your actual Gemini API key
const API_KEY = "AIzaSyA69S3qSoZ6PuUN4uWbtSlr49oKd90Hy5c";

// System message that defines Gemini's behavior
const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

// TypeScript interface for messages
interface ChatMessage {
  message: string;
  sender: "Chatbot" | "user"; // Updated sender types to include "Chatbot"
  direction?: "outgoing" | "incoming";
  sentTime?: string;
}

function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      message: "Hello, I'm Chatbot! Ask me anything!",
      sentTime: "just now",
      sender: "Chatbot",
    },
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Handle sending message
  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToGemini(newMessages);
  };

  // Function to send message to Gemini API
  async function processMessageToGemini(chatMessages: ChatMessage[]) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "Chatbot" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gemini-model", // Adjust the model name if necessary
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(
        "https://api.gemini.com/v1/chat/completions", // Gemini API endpoint
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          sender: "Chatbot", // Updated to "Chatbot"
        },
      ]);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      setMessages([
        ...chatMessages,
        {
          message: "Error: Unable to fetch response from Gemini.",
          sender: "Chatbot",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Gemini is typing..." />
                ) : null
              }
            >
              {messages.map((message, i) => (
                <Message
                  key={i}
                  model={{
                    message: message.message,
                    sentTime: message.sentTime,
                    sender: message.sender,
                    direction: message.direction as any,
                    position: "normal",
                  }}
                />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatbot;
