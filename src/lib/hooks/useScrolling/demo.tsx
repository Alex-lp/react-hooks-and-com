import React, { useState } from 'react';
import { useScrolling } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseScrollingProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseScrolling: React.FC<DemoUseScrollingProps> = ({ example }) => {
  const [scrollStartCount, setScrollStartCount] = useState(0);
  const [scrollEndCount, setScrollEndCount] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);

  const { ref, isScrolling, scrollDirection, scrollPosition, setScrolling } = useScrolling<HTMLDivElement>({
    onScrollStart: () => {
      setScrollStartCount(prev => prev + 1);
      console.log('开始滚动');
    },
    onScrollEnd: () => {
      setScrollEndCount(prev => prev + 1);
      console.log('结束滚动');
    },
    onScroll: () => {
      setScrollCount(prev => prev + 1);
    },
    ...example.options
  });

  const handleManualScroll = () => {
    setScrolling(true);
  };

  const handleManualStop = () => {
    setScrolling(false);
  };

  // 生成测试内容
  const generateContent = () => {
    const items = [];
    for (let i = 1; i <= 50; i++) {
      items.push(
        <div key={i} className="p-4 border-b border-gray-200">
          <div className="font-medium">项目 {i}</div>
          <div className="text-sm text-gray-600">
            这是第 {i} 个项目的内容，用于测试滚动功能。滚动这个区域来查看效果。
          </div>
        </div>
      );
    }
    return items;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isScrolling ? 'text-green-600' : 'text-blue-600'}`}>
              {isScrolling ? '滚动中' : '未滚动'}
            </div>
            <div className="text-sm text-gray-600">当前状态</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{scrollStartCount}</div>
            <div className="text-sm text-gray-600">开始次数</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">{scrollEndCount}</div>
            <div className="text-sm text-gray-600">结束次数</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">{scrollCount}</div>
            <div className="text-sm text-gray-600">滚动次数</div>
          </div>
        </div>

        {scrollDirection && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded">
            <div className="text-sm font-medium text-blue-800">滚动方向:</div>
            <div className="text-lg font-bold text-blue-900">
              {scrollDirection === 'horizontal' && '水平滚动'}
              {scrollDirection === 'vertical' && '垂直滚动'}
              {scrollDirection === 'both' && '双向滚动'}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            滚动监听区域:
          </label>
          <div 
            ref={ref}
            className={`border-2 border-dashed rounded-lg transition-all duration-200 ${
              isScrolling 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 bg-white'
            }`}
            style={{ 
              height: '300px', 
              overflow: 'auto',
              maxWidth: '100%'
            }}
          >
            <div className="p-4">
              <div className="text-center mb-4">
                <div className="text-lg font-medium mb-2">
                  {isScrolling ? '🔄 正在滚动！' : '📜 滚动测试区域'}
                </div>
                <div className="text-sm text-gray-600">
                  {isScrolling 
                    ? '你可以看到颜色和状态的变化' 
                    : '滚动这个区域来测试滚动监听功能'
                  }
                </div>
              </div>
              
              <div className="space-y-2">
                {generateContent()}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            滚动位置信息:
          </label>
          <div className="bg-white p-3 rounded border text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-gray-700">垂直滚动:</div>
                <div className="text-gray-600">
                  {scrollPosition.scrollTop} / {scrollPosition.scrollHeight - scrollPosition.clientHeight}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-700">水平滚动:</div>
                <div className="text-gray-600">
                  {scrollPosition.scrollLeft} / {scrollPosition.scrollWidth - scrollPosition.clientWidth}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-700">容器尺寸:</div>
                <div className="text-gray-600">
                  {scrollPosition.clientWidth} × {scrollPosition.clientHeight}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-700">内容尺寸:</div>
                <div className="text-gray-600">
                  {scrollPosition.scrollWidth} × {scrollPosition.scrollHeight}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            手动控制:
          </label>
          <div className="flex gap-2">
            <button 
              onClick={handleManualScroll}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              手动开始滚动
            </button>
            <button 
              onClick={handleManualStop}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              手动停止滚动
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>• 监听元素的滚动事件</p>
          <p>• 检测滚动开始和结束状态</p>
          <p>• 识别滚动方向（水平/垂直/双向）</p>
          <p>• 提供详细的滚动位置信息</p>
          <p>• 支持自定义滚动结束延迟</p>
          <p>• 鼠标离开时自动停止滚动状态</p>
          <p>• 提供手动控制滚动状态的方法</p>
          {(example.options as any).scrollEndDelay && (
            <p>• 滚动结束延迟: {(example.options as any).scrollEndDelay}ms</p>
          )}
          {(example.options as any).horizontal !== undefined && (
            <p>• 水平滚动监听: {(example.options as any).horizontal ? '启用' : '禁用'}</p>
          )}
          {(example.options as any).vertical !== undefined && (
            <p>• 垂直滚动监听: {(example.options as any).vertical ? '启用' : '禁用'}</p>
          )}
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { ref, isScrolling, scrollDirection, scrollPosition, setScrolling } = useScrolling<HTMLDivElement>({
  onScrollStart: () => {
    setScrollStartCount(prev => prev + 1);
    console.log('开始滚动');
  },
  onScrollEnd: () => {
    setScrollEndCount(prev => prev + 1);
    console.log('结束滚动');
  },
  onScroll: () => {
    setScrollCount(prev => prev + 1);
  },
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};
