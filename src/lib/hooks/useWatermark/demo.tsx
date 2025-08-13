import React, { useState } from 'react';
import { useWatermark } from '@/lib/hooks';
import { HookExampleConfig } from '../../config/hooks';

interface DemoUseWatermarkProps {
  example: HookExampleConfig['examples'][0];
}

export const DemoUseWatermark: React.FC<DemoUseWatermarkProps> = ({ example }) => {
  const [watermarkText, setWatermarkText] = useState('机密文件');
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState('#999');
  const [opacity, setOpacity] = useState(0.3);
  const [rotate, setRotate] = useState(-15);
  const [gapX, setGapX] = useState(100);
  const [gapY, setGapY] = useState(100);
  const [enabled, setEnabled] = useState(true);

  const { ref, setOptions, clear, options } = useWatermark({
    text: watermarkText,
    fontSize,
    color,
    opacity,
    rotate,
    gap: [gapX, gapY],
    enabled
  });

  const handleUpdateWatermark = () => {
    setOptions({
      text: watermarkText,
      fontSize,
      color,
      opacity,
      rotate,
      gap: [gapX, gapY],
      enabled
    });
  };

  const handleClear = () => {
    clear();
    setEnabled(false);
  };

  const handleEnable = () => {
    setEnabled(true);
    setOptions({ enabled: true });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{example.name}</h4>
      <p className="text-gray-600 mb-4">{example.description}</p>
      
      {/* 控制面板 */}
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 水印文本 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              水印文本
            </label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入水印文本"
            />
          </div>

          {/* 字体大小 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              字体大小: {fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="32"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 颜色 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              颜色
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>

          {/* 透明度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              透明度: {opacity}
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 旋转角度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              旋转角度: {rotate}°
            </label>
            <input
              type="range"
              min="-45"
              max="45"
              value={rotate}
              onChange={(e) => setRotate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 间距 X */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              水平间距: {gapX}px
            </label>
            <input
              type="range"
              min="50"
              max="200"
              value={gapX}
              onChange={(e) => setGapX(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 间距 Y */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              垂直间距: {gapY}px
            </label>
            <input
              type="range"
              min="50"
              max="200"
              value={gapY}
              onChange={(e) => setGapY(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleUpdateWatermark}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            更新水印
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            清除水印
          </button>
          <button
            onClick={handleEnable}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            启用水印
          </button>
        </div>
      </div>

      {/* 水印展示区域 */}
            <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-[300px] relative"
        style={{ position: 'relative' }}
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">重要文档</h2>
          <p className="text-gray-600">这是一个需要添加水印保护的文档内容</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold text-gray-800 mb-2">文档标题</h3>
            <p className="text-gray-600">
              这是一段示例文本，用于演示水印效果。水印会覆盖在整个文档区域上，
              提供视觉保护，防止未经授权的复制或截图。
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-semibold text-blue-800 mb-2">机密信息</h3>
            <p className="text-blue-600">
              这里包含了一些机密信息，通过水印可以清楚地标识文档的所有权和机密性。
              水印的样式可以根据需要进行自定义调整。
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded">
            <h3 className="font-semibold text-green-800 mb-2">使用说明</h3>
            <p className="text-green-600">
              你可以通过上方的控制面板来调整水印的各种属性，包括文本内容、字体大小、
              颜色、透明度、旋转角度和间距等。
            </p>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="bg-gray-100 p-3 rounded text-sm mt-4">
        <pre className="text-gray-800 overflow-x-auto">
{`const { ref, setOptions, clear } = useWatermark({
  text: '${watermarkText}',
  fontSize: ${fontSize},
  color: '${color}',
  opacity: ${opacity},
  rotate: ${rotate},
  gap: [${gapX}, ${gapY}],
  enabled: ${enabled}
});`}
        </pre>
      </div>
    </div>
  );
};
