import React from 'react';
import { useFullscreen } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseFullscreenProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseFullscreen: React.FC<DemoUseFullscreenProps> = ({ example }) => {
  const { 
    elementRef, 
    isFullscreen, 
    enterFullscreen, 
    exitFullscreen, 
    toggleFullscreen, 
    isSupported, 
    error 
  } = useFullscreen({
    onEnter: () => console.log('进入全屏'),
    onExit: () => console.log('退出全屏'),
    ...example.options
  });

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isFullscreen ? 'text-green-600' : 'text-blue-600'}`}>
              {isFullscreen ? '全屏中' : '非全屏'}
            </div>
            <div className="text-sm text-gray-600">全屏状态</div>
          </div>
          <div className="text-center">
            <div className={`px-2 py-1 rounded text-sm ${
              isSupported ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isSupported ? '支持' : '不支持'}
            </div>
            <div className="text-sm text-gray-600">浏览器支持</div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded">
            <div className="text-sm font-medium text-red-800">错误信息:</div>
            <div className="text-sm text-red-700">{error.message}</div>
          </div>
        )}

        <div className="flex gap-2 mb-4">
          <button 
            onClick={enterFullscreen}
            disabled={!isSupported || isFullscreen}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            进入全屏
          </button>
          <button 
            onClick={exitFullscreen}
            disabled={!isSupported || !isFullscreen}
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            退出全屏
          </button>
          <button 
            onClick={toggleFullscreen}
            disabled={!isSupported}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            切换全屏
          </button>
        </div>

        <div className="mb-4">
          <div className="text-center mb-2">
            <div className={`px-3 py-2 rounded text-sm ${
              isFullscreen ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {isFullscreen ? '全屏模式' : '普通模式'}
            </div>
          </div>
          
          {isFullscreen && (
            <div className="text-center mb-4">
              <div className="text-sm text-green-700">
                当前处于全屏状态，按 ESC 或点击退出按钮可退出全屏
              </div>
            </div>
          )}
          
          {!isFullscreen && (
            <div className="text-center mb-4">
              <div className="text-sm text-blue-700">
                点击上方按钮进入全屏模式
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            全屏元素 ID:
          </label>
          <div className="bg-white p-3 rounded border">
            <div className="text-sm font-mono text-gray-800">
              {elementRef.current?.id || '未设置'}
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>• 支持现代浏览器的全屏 API</p>
          <p>• 可以通过按钮或 ESC 键退出全屏</p>
          <p>• 全屏时会隐藏浏览器界面</p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { elementRef, isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen, isSupported, error } = useFullscreen({
  onEnter: () => console.log('进入全屏'),
  onExit: () => console.log('退出全屏'),
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>

      <div 
        ref={elementRef}
        className="mt-4 p-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg text-white text-center"
      >
        <h5 className="text-lg font-bold mb-2">全屏演示区域</h5>
        <p className="text-sm opacity-90">这个区域可以进入全屏模式</p>
      </div>
    </div>
  );
};
