import React from 'react';
import { useDebounce } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseDebounceProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseDebounce: React.FC<DemoUseDebounceProps> = ({ example }) => {
  const { value, setValue, debouncedValue, isPending } = useDebounce('', { delay: 500, ...example.options });

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入值:
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入文字查看效果"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{value || '空'}</div>
            <div className="text-sm text-gray-600">输入值</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{debouncedValue || '空'}</div>
            <div className="text-sm text-gray-600">防抖值</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className={`px-3 py-1 rounded text-sm ${
            isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {isPending ? '防抖中' : '已稳定'}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { value, setValue, debouncedValue, isPending } = useDebounce('', { delay: 500, ...example.options });`}</pre>
      </div>
    </div>
  );
};

