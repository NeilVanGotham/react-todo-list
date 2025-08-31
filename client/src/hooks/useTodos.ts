import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types/Todo';
import { loadTodos, saveTodos } from '../utils/storage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  }, []);

  const updateTodo = useCallback((id: string, text: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, text: text.trim(), updatedAt: new Date() }
        : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
};