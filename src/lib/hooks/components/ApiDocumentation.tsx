import React from 'react';
import { HookId } from '@/lib/config/hooks';

interface ApiDocumentationProps {
  hookId: HookId;
}

export const ApiDocumentation: React.FC<ApiDocumentationProps> = ({ hookId }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">API 文档</h4>
      
      <div className="space-y-4">
        <div>
          <h5 className="font-medium text-gray-800 mb-2">Hook ID</h5>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm font-mono text-gray-700">{hookId}</div>
          </div>
        </div>
        
        <div>
          <h5 className="font-medium text-gray-800 mb-2">返回值</h5>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">查看控制台输出了解返回值结构</div>
          </div>
        </div>
      </div>
    </div>
  );
};
