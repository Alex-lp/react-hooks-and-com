import React, { useState } from 'react';
import { usePolling } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUsePollingProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUsePolling: React.FC<DemoUsePollingProps> = ({ example }) => {
  const [logs, setLogs] = useState<string[]>([]);
  
  const addLog = (message: string) => {
    // console.log("log")
    setLogs(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const mockApiCall = async (): Promise<string> => {
    // 模拟API调用，有10%的失败率
    if (Math.random() < 0.1) {
      throw new Error('模拟API调用失败');
    }
    return `数据 ${Date.now()}`;
  };

  const { 
    data, 
    isPolling, 
    start, 
    stop, 
    restart, 
    error, 
    retryCount 
  } = usePolling(mockApiCall, {
    interval: 3000, 
    immediate:false,
    onSuccess: (result) => addLog(`成功: ${result}`),
    onError: (err) => addLog(`失败: ${err.message}`),
    ...example.options
  });

  const handleStart = () => {
    addLog('开始轮询');
    start();
  };

  const handleStop = () => {
    addLog('停止轮询');
    stop();
  };

  const handleRestart = () => {
    addLog('重启轮询');
    restart();
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isPolling ? 'text-green-600' : 'text-red-600'}`}>
              {isPolling ? '轮询中' : '已停止'}
            </div>
            <div className="text-sm text-gray-600">轮询状态</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{retryCount}</div>
            <div className="text-sm text-gray-600">重试次数</div>
          </div>
          <div className="text-center">
            <div className={`px-2 py-1 rounded text-sm ${
              data ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {data ? '有数据' : '无数据'}
            </div>
            <div className="text-sm text-gray-600">数据状态</div>
          </div>
        </div>

        {data && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              最新数据:
            </label>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm font-mono text-gray-800">{data}</div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded">
            <div className="text-sm font-medium text-red-800">错误信息:</div>
            <div className="text-sm text-red-700">{error.message}</div>
          </div>
        )}

        <div className="flex gap-2 mb-4">
          <button 
            onClick={handleStart}
            disabled={isPolling}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            开始轮询
          </button>
          <button 
            onClick={handleStop}
            disabled={!isPolling}
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            停止轮询
          </button>
          <button 
            onClick={handleRestart}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            重启轮询
          </button>
          <button 
            onClick={clearLogs}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            清空日志
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            轮询日志:
          </label>
          <div className="bg-white p-3 rounded border max-h-32 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-sm text-gray-500 text-center">暂无日志</div>
            ) : (
              <div className="space-y-1">
                {logs.map((log, index) => (
                  <div key={index} className="text-sm text-gray-700 font-mono">{log}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>• 轮询间隔: 3秒</p>
          <p>• 模拟API调用有10%的失败率</p>
          <p>• 失败时会自动重试</p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { data, isPolling, start, stop, restart, error, retryCount } = usePolling(mockApiCall, {
  interval: 3000,
  onSuccess: (result) => addLog(\`成功: \${result}\`),
  onError: (err) => addLog(\`失败: \${err.message}\`),
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};
