import React, { useState } from 'react';
import { useEventBus } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseEventBusProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseEventBus: React.FC<DemoUseEventBusProps> = ({ example }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [listenerCount, setListenerCount] = useState(0);
  
  const { 
    on, 
    emit, 
    once, 
    reset
  } = useEventBus('demo-event', {
    autoCleanup: true,
    ...example.options
  });

  const handleSendMessage = () => {
    const message = `消息 ${Date.now()}`;
    emit(message);
    setMessages(prev => [...prev.slice(-4), `发送: ${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleAddListener = () => {
    const listener = (data: unknown) => {
      setMessages(prev => [...prev.slice(-4), `监听器 ${listenerCount + 1}: ${new Date().toLocaleTimeString()}: ${JSON.stringify(data)}`]);
    };
    
    on(listener);
    setListenerCount(prev => prev + 1);
    setMessages(prev => [...prev.slice(-4), `添加监听器 ${listenerCount + 1}`]);
  };

  const handleAddOnceListener = () => {
    const listener = (data: unknown) => {
      setMessages(prev => [...prev.slice(-4), `一次性监听器: ${new Date().toLocaleTimeString()}: ${JSON.stringify(data)}`]);
    };
    
    once(listener);
    setMessages(prev => [...prev.slice(-4), '添加一次性监听器']);
  };

  const handleReset = () => {
    reset();
    setListenerCount(0);
    setMessages(prev => [...prev.slice(-4), '重置所有监听器']);
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{listenerCount}</div>
            <div className="text-sm text-gray-600">监听器数量</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{messages.length}</div>
            <div className="text-sm text-gray-600">消息数量</div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入消息内容:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="输入消息内容"
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              发送消息
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button 
            onClick={handleAddListener}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            添加监听器
          </button>
          <button 
            onClick={handleAddOnceListener}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            添加一次性监听器
          </button>
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            清空监听器
          </button>
          <button 
            onClick={handleClearMessages}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            清空消息
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            事件日志:
          </label>
          <div className="bg-white p-3 rounded border max-h-32 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-sm text-gray-500 text-center">暂无消息</div>
            ) : (
              <div className="space-y-1">
                {messages.map((message, index) => (
                  <div key={index} className="text-sm text-gray-700">{message}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>• 事件名称: demo-event</p>
          <p>• 支持字符串和对象类型的数据</p>
          <p>• 一次性监听器只会触发一次</p>
          <p>• 可以清空所有监听器</p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { on, emit, once, reset } = useEventBus('demo-event', {
  autoCleanup: true,
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};
