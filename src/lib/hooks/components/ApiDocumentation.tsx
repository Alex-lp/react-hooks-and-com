import React from 'react';
import { HookId, hookParamsMap, hookReturnsMap } from '@/lib/config/hooks';

interface ApiDocumentationProps {
  hookId: HookId;
}

export const ApiDocumentation: React.FC<ApiDocumentationProps> = ({ hookId }) => {
  const params = hookParamsMap[hookId] || [];
  const returns = hookReturnsMap[hookId] || [];

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <h4 className="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
        📚 API 文档
      </h4>
      
      <div className="space-y-6">
        <div>
          <h5 className="font-medium text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Hook ID
          </h5>
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
            <div className="text-sm font-mono text-blue-800 font-semibold">{hookId}</div>
          </div>
        </div>
        
        <div>
          <h5 className="font-medium text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            参数
          </h5>
          <div className="bg-green-50 border border-green-200 p-3 rounded-md">
            {params.length > 0 ? (
              <div className="space-y-2">
                {params.map((param, index) => (
                  <div key={index} className="text-sm text-green-800 font-mono bg-white px-2 py-1 rounded border">
                    {param}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-green-600 italic">无参数</div>
            )}
          </div>
        </div>
        
        <div>
          <h5 className="font-medium text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            返回值
          </h5>
          <div className="bg-purple-50 border border-purple-200 p-3 rounded-md">
            {returns.length > 0 ? (
              <div className="space-y-2">
                {returns.map((ret, index) => (
                  <div key={index} className="text-sm text-purple-800 font-mono bg-white px-2 py-1 rounded border">
                    {ret}
                  </div>
                  ))}
              </div>
            ) : (
              <div className="text-sm text-purple-600 italic">无返回值</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
