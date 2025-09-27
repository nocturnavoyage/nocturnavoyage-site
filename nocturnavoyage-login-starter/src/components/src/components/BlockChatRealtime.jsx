import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { parseMentions } from "./MentionParser";

export default function BlockChatRealtime({ blockId, session }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = session?.user?.id;

  useEffect(() => {
    if (!blockId) return;
    fetchMessages();

    const subscription = supabase
      .channel("realtime:chat")
      .on("postgres_changes", { event: "*", schema: "chat", table: "messages" }, (payload) => {
        if (payload.new.block_id === blockId) fetchMessages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [blockId]);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("chat.messages")
      .select("*")
      .eq("block_id", blockId)
      .order("created_at", { ascending: true });
    if (!error) setMessages(data);
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await supabase.from("chat.messages").insert({
      block_id: blockId,
      content: newMessage,
    });
    setNewMessage("");
  }

  return (
    <div className="p-4 bg-zinc-900 text-white rounded-xl">
      <h3 className="text-lg font-bold mb-2">💬 Live Comments</h3>
      <ul className="space-y-2 mb-4">
        {messages.map((msg) => (
          <li key={msg.id} className="bg-zinc-800 p-3 rounded">
            <div>{parseMentions(msg.content)}</div>
            <div className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 rounded bg-zinc-800 text-white"
          placeholder="Type a comment..."
        />
        <button className="bg-blue-600 px-4 rounded hover:bg-blue-700">Send</button>
      </form>
    </div>
  );
}