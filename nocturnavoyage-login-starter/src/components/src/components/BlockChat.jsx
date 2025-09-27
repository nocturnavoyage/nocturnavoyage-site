// src/components/BlockChat.jsx

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function BlockChat({ blockId, session }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!blockId) return;
    fetchMessages();
  }, [blockId]);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("chat.messages")
      .select("*")
      .eq("block_id", blockId)
      .order("created_at", { ascending: true });

    if (error) console.error("Error loading messages:", error);
    else setMessages(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);

    if (editingMessageId) {
      const { error } = await supabase
        .from("chat.messages")
        .update({ content: newMessage })
        .eq("id", editingMessageId)
        .eq("user_id", userId);

      if (error) console.error("Update failed:", error);
      else {
        setEditingMessageId(null);
        setNewMessage("");
        fetchMessages();
      }
    } else {
      const { error } = await supabase.from("chat.messages").insert({
        block_id: blockId,
        content: newMessage,
      });

      if (error) console.error("Insert failed:", error);
      else {
        setNewMessage("");
        fetchMessages();
      }
    }

    setLoading(false);
  }

  function handleEdit(msgId, content) {
    setEditingMessageId(msgId);
    setNewMessage(content);
  }

  function handleCancelEdit() {
    setEditingMessageId(null);
    setNewMessage("");
  }

  async function handleDelete(msgId) {
    const { error } = await supabase
      .from("chat.messages")
      .delete()
      .eq("id", msgId)
      .eq("user_id", userId);

    if (error) console.error("Delete failed:", error);
    else fetchMessages();
  }

  return (
    <div className="p-4 bg-zinc-900 rounded-xl text-white">
      <h3 className="text-lg font-bold mb-2">💬 Block Comments</h3>

      {messages.length === 0 ? (
        <p className="text-gray-400 italic">No comments yet.</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {messages.map((msg) => (
            <li key={msg.id} className="bg-zinc-800 p-3 rounded-lg relative">
              <div className="text-sm text-gray-300">{msg.content}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.created_at).toLocaleString()}
              </div>
              {msg.user_id === userId && (
                <div className="absolute top-2 right-2 space-x-2 text-xs">
                  <button
                    onClick={() => handleEdit(msg.id, msg.content)}
                    className="text-blue-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          className="bg-zinc-800 p-2 rounded-lg resize-none text-white"
          rows={3}
          placeholder="Write a comment..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <div className="flex gap-2 justify-end">
          {editingMessageId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-yellow-400 hover:underline"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg"
          >
            {editingMessageId ? "Update" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}