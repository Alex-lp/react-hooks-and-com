import React from 'react';
import { useToggle } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';

interface DemoUseToggleProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseToggle: React.FC<DemoUseToggleProps> = ({ example }) => {
  const { value, toggle, setTrue, setFalse } = useToggle(example.options);
  
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-2xl font-bold text-gray-900">当前值: {String(value)}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={toggle} className="px-3 py-1 bg-blue-600 text-white rounded">切换</button>
          <button onClick={setTrue} className="px-3 py-1 bg-green-600 text-white rounded">设为真</button>
          <button onClick={setFalse} className="px-3 py-1 bg-red-600 text-white rounded">设为假</button>
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { value, toggle, setTrue, setFalse } = useToggle(${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''});`}</pre>
      </div>
    </div>
  );
};
