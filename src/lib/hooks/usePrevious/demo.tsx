import React, { useState } from 'react';
import { usePrevious } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUsePreviousProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUsePrevious: React.FC<DemoUsePreviousProps> = ({ example }) => {
  const [value, setValue] = useState(0);
  const previousValue = usePrevious(value);
  
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-2xl font-bold text-gray-900">当前值: {value}</div>
          <div className="text-lg text-gray-600">前一个值: {previousValue ?? 'undefined'}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setValue((prev) => prev + 1)} className="px-3 py-1 bg-blue-600 text-white rounded">增加</button>
          <button onClick={() => setValue((prev) => prev - 1)} className="px-3 py-1 bg-blue-600 text-white rounded">减少</button>
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const [value, setValue] = useState(0);\nconst previousValue = usePrevious(value);`}</pre>
      </div>
    </div>
  );
};
