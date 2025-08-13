import React, { useState } from 'react';
import { useQueue } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseQueueProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseQueue: React.FC<DemoUseQueueProps> = ({ example }) => {
  const [inputValue, setInputValue] = useState('');
  const { 
    queue, 
    enqueue, 
    dequeue, 
    peek, 
    peekLast, 
    size, 
    isEmpty, 
    clear,
    isFull
  } = useQueue<number>({
    maxSize: 10,
    ...example.options
  });

  const handleEnqueue = () => {
    if (inputValue.trim() && !isNaN(Number(inputValue))) {
      enqueue(Number(inputValue));
      setInputValue('');
    }
  };

  const handleBatchEnqueue = () => {
    const numbers = [1, 2, 3, 4, 5];
    numbers.forEach(num => enqueue(num));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{size()}</div>
            <div className="text-sm text-gray-600">队列长度</div>
          </div>
          <div className="text-center">
            <div className={`px-2 py-1 rounded text-sm ${
              isEmpty() ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {isEmpty() ? '空' : '非空'}
            </div>
            <div className="text-sm text-gray-600">队列状态</div>
          </div>
          <div className="text-center">
            <div className={`px-2 py-1 rounded text-sm ${
              isFull() ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {isFull() ? '已满' : '未满'}
            </div>
            <div className="text-sm text-gray-600">容量状态</div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            队列内容:
          </label>
          <div className="bg-white p-3 rounded border min-h-[60px]">
            {isEmpty() ? (
              <div className="text-sm text-gray-500 text-center">队列为空</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {queue.map((item, index) => (
                  <div key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{peek() ?? '无'}</div>
            <div className="text-sm text-gray-600">队首元素</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{peekLast() ?? '无'}</div>
            <div className="text-sm text-gray-600">队尾元素</div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            单个入队:
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入数字"
            />
            <button 
              onClick={handleEnqueue}
              disabled={!inputValue.trim() || isNaN(Number(inputValue)) || isFull()}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              入队
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleBatchEnqueue}
            disabled={isFull()}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            批量入队
          </button>
          <button 
            onClick={dequeue}
            disabled={isEmpty()}
            className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            出队
          </button>
          <button 
            onClick={clear}
            disabled={isEmpty()}
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            清空
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { queue, enqueue, dequeue, peek, peekLast, size, isEmpty, clear, isFull } = useQueue<number>({
  maxSize: 10,
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};
