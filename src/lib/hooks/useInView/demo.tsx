import React from 'react';
import { useInView } from '@/lib/hooks';
import { HookExampleConfig } from '@/lib/config/hooks';


interface DemoUseInViewProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseInView: React.FC<DemoUseInViewProps> = ({ example }) => {
  const { ref, inView, entryCount } = useInView({
    threshold: 0.5,
    ...example.options
  });

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${inView ? 'text-green-600' : 'text-red-600'}`}>
              {inView ? '在视口中' : '不在视口中'}
            </div>
            <div className="text-sm text-gray-600">当前状态</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{entryCount}</div>
            <div className="text-sm text-gray-600">进入次数</div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-600 text-center mb-4">滚动到此区域上方查看效果</p>
          <div 
            ref={ref as React.Ref<HTMLDivElement>}
            className="bg-blue-100 border-2 border-blue-300 p-8 rounded-lg text-center"
          >
            <div className={`text-lg font-bold ${inView ? 'text-green-600' : 'text-red-600'}`}>
              {inView ? '元素在视口中！' : '元素不在视口中'}
            </div>
            <p className="text-sm text-gray-600 mt-2">滚动页面查看状态变化</p>
          </div>
          <p className="text-sm text-gray-600 text-center mt-4">滚动到此区域下方查看效果</p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded text-sm">
        <pre className="text-gray-800">{`const { ref, inView, entryCount } = useInView({
  threshold: 0.5,
  ${Object.keys(example.options).length > 0 ? JSON.stringify(example.options, null, 2) : ''}
});`}</pre>
      </div>
    </div>
  );
};
