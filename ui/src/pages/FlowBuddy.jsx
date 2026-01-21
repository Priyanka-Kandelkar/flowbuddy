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
    bottomRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8081/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: updatedMessages
        })
      });

      const data = await res.json();

      const aiMessage = {
        role: "assistant",
        content: data.reply
      };

      setMessages([...updatedMessages, aiMessage]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
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