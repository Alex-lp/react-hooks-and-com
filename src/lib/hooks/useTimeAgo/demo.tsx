import React, { useState } from 'react';
import { useTimeAgo } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseTimeAgoProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseTimeAgo: React.FC<DemoUseTimeAgoProps> = ({ example }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now() - 3600000)); // 1小时前
  const { timeAgo, diffInMs, isUpdating } = useTimeAgo(selectedDate, {
    interval: 10000, // 10秒更新一次
    ...example.options
  });

  const presetDates = [
    { label: '1小时前', value: new Date(Date.now() - 3600000) },
    { label: '1分钟前', value: new Date(Date.now() - 60000) },
    { label: '5分钟前', value: new Date(Date.now() - 300000) },
    { label: '1天前', value: new Date(Date.now() - 86400000) },
    { label: '1周前', value: new Date(Date.now() - 604800000) },
    { label: '1个月前', value: new Date(Date.now() - 2592000000) },
    { label: '1年前', value: new Date(Date.now() - 31536000000) },
  ];

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{timeAgo}</div>
            <div className="text-sm text-gray-600">相对时间</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {Math.floor(diffInMs / 1000)}秒
            </div>
            <div className="text-sm text-gray-600">时间差</div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择时间:
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {presetDates.map((preset, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(preset.value)}
                className={`px-3 py-2 text-sm rounded ${
                  selectedDate.getTime() === preset.value.getTime()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={selectedDate.toISOString().slice(0, 16)}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500 self-center">自定义时间</span>
          </div>
        </div>

        <div className="text-center">
          <div className={`px-3 py-1 rounded text-sm inline-block ${
            isUpdating ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {isUpdating ? '正在更新时间' : '相对时间'}
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>• 原始时间: {selectedDate.toLocaleString()}</p>
          <p>• 自动每10秒更新一次</p>
          <p>• 支持自定义时间选择</p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { timeAgo, diffInMs, isUpdating } = useTimeAgo(selectedDate, {
  interval: 10000,
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};
