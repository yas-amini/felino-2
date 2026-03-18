"use client";
import { useEffect, useState } from "react";
import AdminButton from "../../../components/admin/shared/AdminButton";
import "./AdminHomeTodoList.css";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const STORAGE_KEY = "admin-home-todos";

const defaultTodos = (): Todo[] => [
  { id: crypto.randomUUID(), text: "Kontrollera kvällens bokningar", done: false },
  { id: crypto.randomUUID(), text: "Uppdatera dagens lunch", done: false },
  { id: crypto.randomUUID(), text: "Se över produkter utan bild", done: false },
  { id: crypto.randomUUID(), text: "Bekräfta nya beställningar", done: false },
];

export default function AdminHomeTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: Todo[] = JSON.parse(saved);
        setTodos(parsed);
      } else {
        setTodos(defaultTodos());
      }
    } catch (error) {
      console.error("Kunde inte läsa todos från localStorage", error);
      setTodos(defaultTodos());
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Kunde inte spara todos i localStorage", error);
    }
  }, [todos]);

  const addTodo = (): void => {
    const trimmed = newTodo.trim();
    if (!trimmed) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      done: false,
    };

    setTodos((prev) => [...prev, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: string): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: string): void => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="admin-home-todo">
      <ul className="admin-home-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <label className="admin-home-list__label">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </label>

            <button
              type="button"
              className="todo-delete"
              onClick={() => removeTodo(todo.id)}
              aria-label={`Ta bort ${todo.text}`}
              title="Ta bort uppgift"
            >
              ✕
            </button>
          </li>
        ))}

        <li className="add-row">
          <input
            type="text"
            placeholder="Lägg till uppgift..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />

          <AdminButton variant="field">Lägg till</AdminButton>
        </li>
      </ul>
    </div>
  );
}