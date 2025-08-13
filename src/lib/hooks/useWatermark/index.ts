import { useRef, useEffect, useCallback } from 'react';

export interface WatermarkOptions {
  /** 水印文本 */
  text?: string;
  /** 水印图片 URL */
  image?: string;
  /** 水印字体大小 */
  fontSize?: number;
  /** 水印字体颜色 */
  color?: string;
  /** 水印透明度 */
  opacity?: number;
  /** 水印旋转角度 */
  rotate?: number;
  /** 水印间距 */
  gap?: [number, number];
  /** 水印偏移量 */
  offset?: [number, number];
  /** 水印层级 */
  zIndex?: number;
  /** 水印字体 */
  fontFamily?: string;
  /** 水印字体粗细 */
  fontWeight?: string;
  /** 水印宽度 */
  width?: number;
  /** 水印高度 */
  height?: number;
  /** 是否启用水印 */
  enabled?: boolean;
}

export interface UseWatermarkReturn {
  /** 要添加水印的元素引用 */
  ref: React.RefObject<HTMLElement | null>;
  /** 设置水印选项 */
  setOptions: (options: Partial<WatermarkOptions>) => void;
  /** 清除水印 */
  clear: () => void;
  /** 当前水印选项 */
  options: WatermarkOptions;
}

/**
 * 水印 Hook
 * 用于给 DOM 元素添加水印
 * 
 * @param options 水印配置选项
 * @returns 返回元素引用和水印控制方法
 * 
 * @example
 * ```tsx
 * const { ref, setOptions, clear } = useWatermark({
 *   text: '机密文件',
 *   fontSize: 16,
 *   color: '#999',
 *   opacity: 0.3,
 *   rotate: -15
 * });
 * 
 * return (
 *   <div ref={ref} className="p-4 border">
 *     <h1>重要文档</h1>
 *     <p>这是需要添加水印的内容...</p>
 *   </div>
 * );
 * ```
 */
export const useWatermark = (options: WatermarkOptions = {}): UseWatermarkReturn => {
  const {
    text = '水印',
    image,
    fontSize = 16,
    color = '#999',
    opacity = 0.3,
    rotate = -15,
    gap = [100, 100],
    offset = [0, 0],
    zIndex = 1000,
    fontFamily = 'Arial, sans-serif',
    fontWeight = 'normal',
    width = 200,
    height = 100,
    enabled = true
  } = options;

  const ref = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<WatermarkOptions>(options);

  // 更新选项引用
  useEffect(() => {
    optionsRef.current = { ...options };
  });

  // 创建水印元素
  const createWatermark = useCallback(() => {
    if (!ref.current || !enabled) return;

    // 清除现有水印
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = null;
    }

    const element = ref.current;
    const rect = element.getBoundingClientRect();
    
    // 创建水印容器
    const watermark = document.createElement('div');
    watermark.style.position = 'absolute';
    watermark.style.top = '0';
    watermark.style.left = '0';
    watermark.style.width = '100%';
    watermark.style.height = '100%';
    watermark.style.pointerEvents = 'none';
    watermark.style.zIndex = zIndex.toString();
    watermark.style.overflow = 'hidden';
    
    // 设置水印背景
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;
    
    // 设置画布样式
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 绘制水印
    if (image) {
      // 绘制图片水印
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();
        createWatermarkPattern();
      };
      img.src = image;
    } else {
      // 绘制文字水印
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.fillText(text, 0, 0);
      ctx.restore();
      createWatermarkPattern();
    }

    function createWatermarkPattern() {
      const dataURL = canvas.toDataURL();
      const pattern = `url(${dataURL})`;
      
      watermark.style.backgroundImage = pattern;
      watermark.style.backgroundRepeat = 'repeat';
      watermark.style.backgroundSize = `${gap[0]}px ${gap[1]}px`;
      watermark.style.backgroundPosition = `${offset[0]}px ${offset[1]}px`;
      
      element.style.position = 'relative';
      element.appendChild(watermark);
      watermarkRef.current = watermark;
    }
  }, [text, image, fontSize, color, opacity, rotate, gap, offset, zIndex, fontFamily, fontWeight, width, height, enabled]);

  // 清除水印
  const clear = useCallback(() => {
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = null;
    }
  }, []);

  // 设置水印选项
  const setOptions = useCallback((newOptions: Partial<WatermarkOptions>) => {
    Object.assign(optionsRef.current, newOptions);
    createWatermark();
  }, [createWatermark]);

  // 监听元素变化
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    // 创建水印
    createWatermark();

    // 监听元素尺寸变化
    const resizeObserver = new ResizeObserver(() => {
      createWatermark();
    });
    
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      clear();
    };
  }, [createWatermark, clear]);

  return {
    ref,
    setOptions,
    clear,
    options: optionsRef.current
  };
};
