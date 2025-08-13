import React from 'react';
import { useWindowSize } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseWindowSizeProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseWindowSize: React.FC<DemoUseWindowSizeProps> = ({ example }) => {
  const size = useWindowSize(example.options);
  
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{size.width}</div>
            <div className="text-sm text-gray-600">宽度 (px)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{size.height}</div>
            <div className="text-sm text-gray-600">高度 (px)</div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">调整浏览器窗口大小来查看效果</p>
      </div>
      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const size = useWindowSize(${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''});`}</pre>
      </div>
    </div>
  );
};
