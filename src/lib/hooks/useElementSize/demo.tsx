import React, { useState } from 'react';
import { useElementSize } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseElementSizeProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseElementSize: React.FC<DemoUseElementSizeProps> = ({ example }) => {
  const [resizeMode, setResizeMode] = useState<'width' | 'height' | 'both'>('both');

  const { ref, size, isObserving, startObserving, stopObserving, updateSize } = useElementSize<HTMLDivElement>({
    includePadding: true,
    includeBorder: true,
    ...example.options
  });

  const handleResize = (type: 'width' | 'height' | 'both') => {
    setResizeMode(type);
    if (ref.current) {
      const element = ref.current;
      if (type === 'width' || type === 'both') {
        element.style.width = `${Math.random() * 200 + 100}px`;
      }
      if (type === 'height' || type === 'both') {
        element.style.height = `${Math.random() * 200 + 100}px`;
      }
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{size.width}</div>
            <div className="text-sm text-gray-600">宽度 (px)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{size.height}</div>
            <div className="text-sm text-gray-600">高度 (px)</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <div className={`px-2 py-1 rounded text-sm ${
              isObserving ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {isObserving ? '监听中' : '已停止'}
            </div>
            <div className="text-sm text-gray-600">监听状态</div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={startObserving}
              disabled={isObserving}
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              开始监听
            </button>
            <button 
              onClick={stopObserving}
              disabled={!isObserving}
              className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              停止监听
            </button>
            <button 
              onClick={updateSize}
              className="px-3 py-1 bg-gray-600 text-white rounded"
            >
              手动更新
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            调整元素尺寸:
          </label>
          <div className="flex gap-2">
            <button 
              onClick={() => handleResize('width')}
              className="px-3 py-1 bg-purple-600 text-white rounded"
            >
              调整宽度
            </button>
            <button 
              onClick={() => handleResize('height')}
              className="px-3 py-1 bg-purple-600 text-white rounded"
            >
              调整高度
            </button>
            <button 
              onClick={() => handleResize('both')}
              className="px-3 py-1 bg-purple-600 text-white rounded"
            >
              同时调整
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            被监听的元素:
          </label>
          <div 
            ref={ref}
            className="bg-white border-2 border-dashed border-gray-300 p-4 rounded"
            style={{ 
              width: '200px', 
              height: '150px'
            }}
          >
            <div className="text-sm text-gray-600">
              点击上方按钮调整尺寸
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            详细尺寸信息:
          </label>
          <div className="bg-white p-3 rounded border text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-600">边框宽度:</div>
                <div className="font-mono">{size.borderWidth}px</div>
              </div>
              <div>
                <div className="text-gray-600">边框高度:</div>
                <div className="font-mono">{size.borderHeight}px</div>
              </div>
              <div>
                <div className="text-gray-600">内边距宽度:</div>
                <div className="font-mono">{size.paddingWidth}px</div>
              </div>
              <div>
                <div className="text-gray-600">内边距高度:</div>
                <div className="font-mono">{size.paddingHeight}px</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { ref, size, isObserving, startObserving, stopObserving, updateSize } = useElementSize<HTMLDivElement>({
  includePadding: true,
  includeBorder: true,
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};

