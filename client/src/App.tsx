import React from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Add Todo Form */}
        <TodoForm onAddTodo={addTodo} />

        {/* Active Tasks */}
        {activeTodos.length > 0 && (
          <div className="mb-8">
            <div className="space-y-3">
              {activeTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={toggleTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTodos.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-600 mb-4">Completed</h3>
            <div className="space-y-3">
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={toggleTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {todos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No tasks yet. Add one above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;