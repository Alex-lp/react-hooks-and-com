import React, { useState } from 'react';
import { useClickAway } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';

interface DemoUseClickAwayProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseClickAway: React.FC<DemoUseClickAwayProps> = ({ example }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const { ref } = useClickAway({
    onClickAway: () => {
      setIsVisible(false);
      setClickCount(prev => prev + 1);
    },
    ...example.options
  });

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-lg font-bold text-gray-900">
            点击外部次数: {clickCount}
          </div>
          <div className={`px-2 py-1 rounded text-sm ${
            isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isVisible ? '弹窗显示中' : '弹窗已关闭'}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIsVisible(true)} 
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            显示弹窗
          </button>
        </div>

        {isVisible && (
          <div 
            ref={ref as React.Ref<HTMLDivElement>}
            className="mt-4 p-4 bg-white border border-gray-300 rounded shadow-lg"
          >
            <h5 className="font-medium text-gray-900 mb-2">弹窗内容</h5>
            <p className="text-gray-600 mb-3">点击弹窗外部区域会关闭此弹窗</p>
            <button 
              onClick={() => setIsVisible(false)}
              className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
            >
              关闭弹窗
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { ref } = useClickAway({
  onClickAway: () => setIsVisible(false),
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};
