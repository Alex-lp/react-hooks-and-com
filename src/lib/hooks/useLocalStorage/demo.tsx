import React, { useState } from 'react';
import { useLocalStorage } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseLocalStorageProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseLocalStorage: React.FC<DemoUseLocalStorageProps> = ({ example }) => {
  const [inputValue, setInputValue] = useState('');
  const { value, setValue, removeValue, isStored } = useLocalStorage('demo-storage', '默认值', example.options);
  
  const handleSetValue = () => {
    if (inputValue.trim()) {
      setValue(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="mb-4">
          <div className="text-center mb-2">
            <div className="text-2xl font-bold text-blue-600">{value}</div>
            <div className="text-sm text-gray-600">存储值</div>
          </div>
          <div className="text-center">
            <div className={`px-2 py-1 rounded text-sm ${
              isStored ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {isStored ? '已存储' : '未存储'}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入新值:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入要存储的值"
            />
            <button 
              onClick={handleSetValue}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              存储
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={removeValue} className="px-4 py-2 bg-red-600 text-white rounded">清除</button>
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { value, setValue, removeValue, isStored } = useLocalStorage('demo-storage', '默认值', ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''});`}</pre>
      </div>
    </div>
  );
};
