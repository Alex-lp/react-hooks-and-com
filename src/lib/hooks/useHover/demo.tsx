import React, { useState } from 'react';
import { useHover } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseHoverProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseHover: React.FC<DemoUseHoverProps> = ({ example }) => {
  const [hoverCount, setHoverCount] = useState(0);
  const [enterCount, setEnterCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);

  const { ref, isHovered, setHovered } = useHover<HTMLDivElement>({
    onEnter: () => {
      setEnterCount(prev => prev + 1);
      console.log('鼠标进入元素');
    },
    onLeave: () => {
      setLeaveCount(prev => prev + 1);
      console.log('鼠标离开元素');
    },
    ...example.options
  });

  // 当悬浮状态改变时更新计数
  React.useEffect(() => {
    if (isHovered) {
      setHoverCount(prev => prev + 1);
    }
  }, [isHovered]);

  const handleManualHover = () => {
    setHovered(true);
  };

  const handleManualUnhover = () => {
    setHovered(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isHovered ? 'text-green-600' : 'text-blue-600'}`}>
              {isHovered ? '悬浮中' : '未悬浮'}
            </div>
            <div className="text-sm text-gray-600">当前状态</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{enterCount}</div>
            <div className="text-sm text-gray-600">进入次数</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">{leaveCount}</div>
            <div className="text-sm text-gray-600">离开次数</div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            悬浮监听区域:
          </label>
          <div 
            ref={ref}
            className={`p-6 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer ${
              isHovered 
                ? 'border-green-500 bg-green-50 text-green-800' 
                : 'border-gray-300 bg-white text-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-lg font-medium mb-2">
                {isHovered ? '🎉 鼠标悬浮中！' : '🖱️ 将鼠标移到这里'}
              </div>
              <div className="text-sm">
                {isHovered 
                  ? '你可以看到颜色和文字的变化' 
                  : '移动鼠标到这个区域来测试悬浮效果'
                }
              </div>
              {isHovered && (
                <div className="mt-2 text-xs text-green-600">
                  悬浮状态变化次数: {hoverCount}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            手动控制:
          </label>
          <div className="flex gap-2">
            <button 
              onClick={handleManualHover}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              手动悬浮
            </button>
            <button 
              onClick={handleManualUnhover}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              手动取消悬浮
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            悬浮统计:
          </label>
          <div className="bg-white p-3 rounded border">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">{hoverCount}</div>
                <div className="text-xs text-gray-600">状态变化</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">{enterCount}</div>
                <div className="text-xs text-gray-600">鼠标进入</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">{leaveCount}</div>
                <div className="text-xs text-gray-600">鼠标离开</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>• 监听鼠标进入和离开事件</p>
          <p>• 支持延迟进入和离开时间</p>
          <p>• 提供手动控制悬浮状态的方法</p>
          <p>• 自动清理事件监听器</p>
          {(example.options as any).delayEnter && (
            <p>• 延迟进入: {(example.options as any).delayEnter}ms</p>
          )}
          {(example.options as any).delayLeave && (
            <p>• 延迟离开: {(example.options as any).delayLeave}ms</p>
          )}
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { ref, isHovered, setHovered } = useHover<HTMLDivElement>({
  onEnter: () => {
    setEnterCount(prev => prev + 1);
    console.log('鼠标进入元素');
  },
  onLeave: () => {
    setLeaveCount(prev => prev + 1);
    console.log('鼠标离开元素');
  },
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};
