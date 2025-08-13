import React, { useState } from 'react';
import { useClipboard } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';

interface DemoUseClipboardProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseClipboard: React.FC<DemoUseClipboardProps> = ({ example }) => {
  const [inputValue, setInputValue] = useState('Hello World!');
  const [customText, setCustomText] = useState('');

  const { 
    copiedText, 
    isCopied, 
    copyToClipboard, 
    canUseClipboardApi,
    error 
  } = useClipboard({
    onSuccess: (text) => console.log('复制成功:', text),
    onError: (err) => console.log('复制失败:', err),
    ...example.options
  });

  const handleCopyInput = async () => {
    await copyToClipboard(inputValue);
  };

  const handleCopyCustom = async () => {
    await copyToClipboard(customText);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isCopied ? 'text-green-600' : 'text-blue-600'}`}>
              {isCopied ? '已复制' : '未复制'}
            </div>
            <div className="text-sm text-gray-600">复制状态</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${canUseClipboardApi ? 'text-green-600' : 'text-orange-600'}`}>
              {canUseClipboardApi ? '原生支持' : '兼容模式'}
            </div>
            <div className="text-sm text-gray-600">浏览器支持</div>
          </div>
        </div>

        {!canUseClipboardApi && (
          <div className="mb-4 p-3 bg-orange-100 border border-orange-300 rounded">
            <div className="text-sm font-medium text-orange-800">兼容模式提示:</div>
            <div className="text-sm text-orange-700">
              当前浏览器不支持原生 Clipboard API，将使用兼容模式（execCommand）进行复制
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded">
            <div className="text-sm font-medium text-red-800">错误信息:</div>
            <div className="text-sm text-red-700">{error.message}</div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            预设文本:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入要复制的文本"
            />
            <button 
              onClick={handleCopyInput}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              复制文本
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            自定义文本:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入自定义文本"
            />
            <button 
              onClick={handleCopyCustom}
              disabled={!customText.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              复制自定义
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            当前剪贴板内容:
          </label>
          <div className="bg-white p-3 rounded border">
            <div className="text-sm font-mono text-gray-800">
              {copiedText || '暂无内容'}
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>• 支持现代浏览器的 Clipboard API</p>
          <p>• 兼容模式支持旧版浏览器（execCommand）</p>
          <p>• 可以复制任意文本内容</p>
          <p>• 提供复制成功/失败的回调</p>
          <p>• 自动检测浏览器支持状态</p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { copiedText, isCopied, copyToClipboard, canUseClipboardApi, error } = useClipboard({
  onSuccess: (text) => console.log('复制成功:', text),
  onError: (err) => console.log('复制失败:', err),
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};
