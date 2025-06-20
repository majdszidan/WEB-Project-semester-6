"use client";

import { useState, useRef, useEffect } from "react";
import { Course } from "@/FirebaseTools/CreateCourse";
import { answerQuestion } from "@/GeminiTools/GenerateAnswers";
import { SendHorizonalIcon } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function CourseChatbot({ course }: { course: Course }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingWelcome, setLoadingWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Generate the welcome message once on mount
  useEffect(() => {
    setLoadingWelcome(true);
    if (!course) return;
    const welcomePrompt = `You are a friendly and helpful course assistant. Write a short one sentence warm welcome message to a student studing these topics: \`\`\`json\n${JSON.stringify(
      course.topics
    )}\`\`\`. Use ${
      course.language
    } language. Keep it simple, encouraging, and supportive.`;
    answerQuestion(course.language, Array.from(course.topics), welcomePrompt)
      .then((welcomeMessage) => {
        setMessages([
          {
            id: "welcome",
            content: welcomeMessage,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      })
      .catch(() => {
        setMessages([
          {
            id: "welcome",
            content: `Hello! I'm your course assistant for ${course.name}. I can help you with questions about the course topics, explain concepts, and provide additional learning support. What would you like to know?`,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      })
      .finally(() => {
        setLoadingWelcome(false);
      });
  }, [course]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || loadingWelcome) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await answerQuestion(
        course.language,
        Array.from(course.topics),
        userMessage.content
      );

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-200px)] flex flex-col bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b bg-blue-50 ">
        <div>
          <h3 className="font-semibold text-gray-800 ">Course Assistant</h3>
          <p className="text-sm text-gray-600 max-w-2xl text-nowrap truncate text-ellipsis">
            Ask me about {course.name}
            <br />
            topics:{" "}
            {Array.from(course.topics)
              .map((topic) => topic.title)
              .join(", ")}
          </p>
        </div>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loadingWelcome && (
          <div className="text-gray-500 text-center mt-10">
            Loading welcome message...
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.isUser ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isLoading && !loadingWelcome && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="اسال اسالة عن الكورس..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading || loadingWelcome}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || loadingWelcome}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SendHorizonalIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
