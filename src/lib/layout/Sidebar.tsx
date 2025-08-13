import React from 'react';

interface SidebarItem {
  id: string;
  name: string;
}

interface SidebarProps {
  title: string;
  items: SidebarItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  maxHeight?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  title, 
  items, 
  selectedId, 
  onSelect, 
  maxHeight = "max-h-96" 
}) => {
  return (
    <div className="w-64 flex-shrink-0">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className={`space-y-2  overflow-y-auto w-full`}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedId === item.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
