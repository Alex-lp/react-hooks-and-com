import React, { useRef, useState } from 'react';
import { useMouse } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseMouseProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseMouse: React.FC<DemoUseMouseProps> = ({ example }) => {
  const [isTracking, setIsTracking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { 
    position, 
    isInside, 
    isMoving, 
    reset 
  } = useMouse({
    target: containerRef.current,
    enabled: isTracking,
    ...example.options
  });

  const handleStartTracking = () => {
    setIsTracking(true);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{position.x}</div>
            <div className="text-sm text-gray-600">X 坐标</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{position.y}</div>
            <div className="text-sm text-gray-600">Y 坐标</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className={`px-2 py-1 rounded text-sm ${
              isInside ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isInside ? '在元素内' : '在元素外'}
            </div>
            <div className="text-sm text-gray-600">鼠标位置</div>
          </div>
          <div className="text-center">
            <div className={`px-2 py-1 rounded text-sm ${
              isMoving ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {isMoving ? '移动中' : '静止'}
            </div>
            <div className="text-sm text-gray-600">移动状态</div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button 
            onClick={handleStartTracking}
            disabled={isTracking}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            开始监听
          </button>
          <button 
            onClick={handleStopTracking}
            disabled={!isTracking}
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            停止监听
          </button>
          <button 
            onClick={reset}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            重置
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            详细坐标信息:
          </label>
          <div className="bg-white p-3 rounded border text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-600">页面坐标:</div>
                <div className="font-mono">({position.pageX}, {position.pageY})</div>
              </div>
              <div>
                <div className="text-gray-600">屏幕坐标:</div>
                <div className="font-mono">({position.screenX}, {position.screenY})</div>
              </div>
              <div>
                <div className="text-gray-600">客户端坐标:</div>
                <div className="font-mono">({position.clientX}, {position.clientY})</div>
              </div>
              <div>
                <div className="text-gray-600">相对坐标:</div>
                <div className="font-mono">({position.x}, {position.y})</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            在此区域移动鼠标查看坐标变化:
          </label>
          <div 
            ref={containerRef}
            className={`h-48 rounded-lg border-2 border-dashed transition-colors ${
              isInside 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 bg-gray-100'
            }`}
          >
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-700 mb-2">鼠标指针指示器</div>
                <div className="text-sm text-gray-600">
                  {isInside ? '鼠标在区域内' : '鼠标在区域外'}
                </div>
                {isInside && (
                  <div className="mt-2 text-xs text-gray-500">
                    坐标标签: ({position.x}, {position.y})
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { position, isInside, isMoving, reset } = useMouse({
  target: containerRef.current,
  enabled: isTracking,
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};
