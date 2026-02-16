import { use } from "react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

import '../styles/flowbuddy.css'

export default function FlowBuddy() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(
        "http://localhost:8081/chat/1"
      );

      const data = await response.json();

      const formatted = data.map(msg => ({
        role: msg.sender === "flowbuddy" ? "assistant" : "user",
        content: msg.message
      }));

      setMessages(formatted);
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8081/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: 1,
          chatId: 1,
          message: input
        })
      });

      const data = await res.json();

      const aiMessage = {
        role: "assistant",
        content: data.reply
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong 😢"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flowbuddy-root">
      <div className="flowbuddy-header">
        <h2 className="flowbuddy-title">FlowBuddy</h2>
      </div>

      <div className="flowbuddy-body">
        <div className="flowbuddy-chat">
          <div className="chat-lane">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-row ${msg.role}`}>
                <div className={`chat-bubble ${msg.role}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>


        <div className="flowbuddy-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Talk to FlowBuddy..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "Thinking…" : "Send 💗"}
          </button>

        </div>

      </div>
    </div>

  );

}