'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/todo');
      const { todos } = await res.json();
      console.log('todos:', todos);
      setTodos(todos);
    };

    fetchData();
  }, []);

  if (todos.length === 0) return <p>Loading...</p>;

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
