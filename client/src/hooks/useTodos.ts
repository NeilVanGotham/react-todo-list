import { useCallback, useEffect, useState } from "react";
import { Todo } from "../types/Todo";

const API_URL = "https://localhost:7290/todos";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = useCallback(async (text: string) => {
    const newTodo = { text: text.trim(), completed: false };
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    const created = await res.json();
    setTodos((prev) => [created, ...prev]);
  }, []);

  const toggleTodo = useCallback(
    async (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      const updated = { ...todo, completed: !todo.completed };
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const result = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? result : t)));
    },
    [todos]
  );

  const updateTodo = useCallback(
    async (id: string, text: string) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      const updated = { ...todo, text: text.trim() };
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const result = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? result : t)));
    },
    [todos]
  );

  const deleteTodo = useCallback(async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { todos, addTodo, toggleTodo, updateTodo, deleteTodo };
};
