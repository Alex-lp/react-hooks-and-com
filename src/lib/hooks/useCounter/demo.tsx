import React from 'react';
import { useCounter } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';

interface DemoUseCounterProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseCounter: React.FC<DemoUseCounterProps> = ({ example }) => {
  const { count, increment, decrement, reset, setCount, isMin, isMax } = useCounter(example.options);
  
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-2xl font-bold text-gray-900">{count}</div>
          <div className="flex gap-2">
            <button onClick={decrement} disabled={isMin} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">-</button>
            <button onClick={increment} disabled={isMax} className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">+</button>
            <button onClick={reset} className="px-3 py-1 bg-gray-600 text-white rounded">重置</button>
          </div>
        </div>
        <div className="flex gap-2">
          <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="px-3 py-1 border border-gray-300 rounded w-20" />
          <span className="text-sm text-gray-600">直接输入数值</span>
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { count, increment, decrement, reset, setCount, isMin, isMax } = useCounter(${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''});`}</pre>
      </div>
    </div>
  );
};
