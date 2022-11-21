"use client";
import PocketBase from "pocketbase";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCharacter() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const create = async () => {
    const data = {
      name: title,
      cls: content,
    };
    const db = new PocketBase("http://127.0.0.1:8090");
    await db.collection("characters").create(data);
    setContent("");
    setTitle("");
    router.refresh()
  };

  return (
    <form onSubmit={create}>
      <h3>Create a new Character</h3>
      <input
        type="text"
        placeholder="Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Class"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create Character</button>
    </form>
  );
}
