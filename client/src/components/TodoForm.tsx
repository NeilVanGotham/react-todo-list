import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-16 py-4 text-lg border-2 border-gray-200 rounded-xl 
                   focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 
                   transition-all duration-200 outline-none
                   placeholder-gray-400 bg-white shadow-sm"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 
                   bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300
                   text-white p-2 rounded-lg transition-all duration-200
                   disabled:cursor-not-allowed hover:scale-105 active:scale-95
                   shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
        </button>
      </div>
    </form>
  );
};