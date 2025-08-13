import React from 'react';
import { ComponentConfig } from '../../config/components';

interface ComponentDemoProps {
  component: ComponentConfig;
}

export const ComponentDemo: React.FC<ComponentDemoProps> = ({ component }) => {
  const Component = component.component as React.ComponentType<Record<string, unknown>>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {component.name}
      </h1>
      <p className="text-gray-600 mb-6">
        {component.description}
      </p>

      {/* Basic Demo */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-3">基础用法</h3>
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <Component {...component.props} />
        </div>
        <div className="mt-3 text-sm text-gray-600">
          <pre className="bg-gray-100 p-2 rounded">
            {`<${component.name.split(' ')[0]} ${Object.entries(component.props)
              .map(([key, value]) => `${key}="${value}"`)
              .join(' ')} />`}
          </pre>
        </div>
      </div>

      {/* Variants */}
      {component.variants && component.variants.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">变体</h3>
          <div className="flex gap-3 mb-3">
            {component.variants.map((variant) => (
              <Component key={variant.name} {...variant.props}>
                {variant.name}
              </Component>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {component.sizes && component.sizes.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">尺寸</h3>
          <div className="flex items-center gap-3 mb-3">
            {component.sizes.map((size) => (
              <Component key={size.name} {...size.props}>
                {size.name}
              </Component>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
