import React, { useState } from 'react';
import { Check, Edit3, Trash2, X } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`group bg-white border border-gray-200 rounded-xl p-4 
                    transition-all duration-300 hover:shadow-md hover:border-gray-300
                    ${completed ? 'opacity-75' : ''}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 
                     transition-all duration-200 flex items-center justify-center
                     hover:scale-110 active:scale-95
                     ${completed 
                       ? 'bg-emerald-500 border-emerald-500 text-white' 
                       : 'border-gray-300 hover:border-emerald-400'}`}
        >
          {completed && <Check size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 
                       transition-all duration-200 outline-none"
              autoFocus
            />
          ) : (
            <span
              className={`block text-gray-800 cursor-pointer transition-all duration-200
                         ${completed ? 'line-through text-gray-500' : ''}
                         hover:text-indigo-600`}
              onClick={() => setIsEditing(true)}
            >
              {text}
            </span>
          )}
        </div>

        <div className="flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg 
                         transition-all duration-200 hover:scale-105"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg 
                         transition-all duration-200 hover:scale-105"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg 
                         transition-all duration-200 hover:scale-105"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => onDelete(id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg 
                         transition-all duration-200 hover:scale-105"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};