"use client";

import { useState, useRef, useEffect } from "react";
import { Course } from "@/FirebaseTools/CreateCourse";
import { Syllabus } from "@/GeminiTools/getSyllabus";
// Import the async functions instead of the class
import { answerQuestion, generateFollowUpSuggestions } from "@/GeminiTools/GenerateAnswers";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface CourseChatbotProps {
  course: Course;
  courseId: string;
}

export default function CourseChatbot({ course, courseId }: CourseChatbotProps) {
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
    async function generateWelcomeMessage() {
      setLoadingWelcome(true);
      try {
        // Compose a prompt to get a welcome message in the course language
        const welcomePrompt = `You are a friendly and helpful course assistant. Write a warm welcome message to a student starting the course "${course.name}". Use ${course.language} language. Keep it simple, encouraging, and supportive.`;

        const welcomeMessage = await answerQuestion(course.language, course.name, welcomePrompt);

        setMessages([
          {
            id: "welcome",
            content: welcomeMessage ,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        setMessages([
          {
            id: "welcome",
            content: `Hello! I'm your course assistant for ${course.name}. I can help you with questions about the course topics, explain concepts, and provide additional learning support. What would you like to know?`,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoadingWelcome(false);
      }
    }

    generateWelcomeMessage();
  }, [course.language, course.name]);

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
      // Call the async function directly with language and topic
      const response = await answerQuestion(course.language, course.name, userMessage.content);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Optionally you can generate follow-up suggestions here and do something with them
      // const followUps = await generateFollowUpSuggestions(course.language, course.name, userMessage.content);
      // console.log(followUps);

    } catch (error) {
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
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b bg-blue-50">
        <div>
          <h3 className="font-semibold text-gray-800">Course Assistant</h3>
          <p className="text-sm text-gray-600">
            Ask me about {course.name} topics: {getTopicsDisplay(course.topics)}
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
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
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
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about the course..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading || loadingWelcome}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || loadingWelcome}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function getTopicsDisplay(topics: Set<Syllabus> | Syllabus[]): string {
  const topicsArray = Array.isArray(topics) ? topics : Array.from(topics);
  const displayTopics = topicsArray.slice(0, 3);
  const topicNames = displayTopics.map((topic) => getSyllabusDisplayName(topic));
  return topicNames.join(", ") + (topicsArray.length > 3 ? "..." : "");
}

function getSyllabusDisplayName(topic: Syllabus): string {
  if (typeof topic === "string") return topic;
  const possibleNames = ["title", "name", "topic", "subject", "text", "content", "description"];
  for (const prop of possibleNames) {
    if (prop in topic && typeof (topic as any)[prop] === "string") return (topic as any)[prop];
  }
  const values = Object.values(topic).filter((val) => typeof val === "string");
  if (values.length > 0) return values[0];
  return "Topic";
}
