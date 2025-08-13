import { useState, useCallback } from 'react';

export interface UseClipboardOptions {
  /** 是否显示成功提示 */
  showSuccess?: boolean;
  /** 成功提示消息 */
  successMessage?: string;
  /** 错误提示消息 */
  errorMessage?: string;
  /** 成功提示回调 */
  onSuccess?: (text: string) => void;
  /** 错误提示回调 */
  onError?: (error: Error) => void;
  /** 复制超时时间（毫秒） */
  timeout?: number;
}

export interface UseClipboardReturn {
  /** 复制文本到剪贴板 */
  copyToClipboard: (text: string, options?: UseClipboardOptions) => Promise<void>;
  /** 从剪贴板读取文本 */
  readFromClipboard: () => Promise<string>;
  /** 是否正在复制 */
  isCopying: boolean;
  /** 是否已复制 */
  isCopied: boolean;
  /** 复制的文本 */
  copiedText: string | null;
  /** 错误信息 */
  error: Error | null;
  /** 是否支持剪贴板 API */
  canUseClipboardApi: boolean;
  /** 重置状态 */
  reset: () => void;
}

/**
 * 剪贴板功能 Hook
 * 提供复制和读取剪贴板的功能
 * 
 * @param options 配置选项
 * @returns 返回剪贴板操作相关的方法和状态
 * 
 * @example
 * ```tsx
 * const { copyToClipboard, readFromClipboard, isCopied, error } = useClipboard({
 *   showSuccess: true,
 *   successMessage: '复制成功！',
 *   onSuccess: (text) => console.log('复制成功:', text)
 * });
 * 
 * const handleCopy = async () => {
 *   await copyToClipboard('要复制的文本');
 * };
 * 
 * const handleRead = async () => {
 *   const text = await readFromClipboard();
 *   console.log('剪贴板内容:', text);
 * };
 * 
 * return (
 *   <div>
 *     <button onClick={handleCopy} disabled={isCopying}>
 *       {isCopying ? '复制中...' : '复制文本'}
 *     </button>
 *     <button onClick={handleRead}>读取剪贴板</button>
 *     {isCopied && <p>已复制: {copiedText}</p>}
 *     {error && <p>错误: {error.message}</p>}
 *   </div>
 * );
 * ```
 */
export const useClipboard = (options: UseClipboardOptions = {}): UseClipboardReturn => {
  const {
    showSuccess = true,
    successMessage = '已复制到剪贴板',
    errorMessage = '复制失败',
    onSuccess,
    onError,
    timeout = 3000
  } = options;

  const [isCopying, setIsCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // 检查浏览器是否支持 Clipboard API
  const canUseClipboardApi = 
    typeof navigator !== 'undefined' && 
    navigator.clipboard && 
    typeof navigator.clipboard.writeText === 'function';

  // 复制文本到剪贴板
  const copyToClipboard = useCallback(async (
    text: string, 
    copyOptions: UseClipboardOptions = {}
  ): Promise<void> => {
    const {
      showSuccess: showSuccessOverride = showSuccess,
      successMessage: successMessageOverride = successMessage,
      errorMessage: errorMessageOverride = errorMessage,
      onSuccess: onSuccessOverride = onSuccess,
      onError: onErrorOverride = onError,
      timeout: timeoutOverride = timeout
    } = copyOptions;

    try {
      setIsCopying(true);
      setError(null);
      setIsCopied(false);

      let copySuccessful = false;

      // 优先尝试使用 Clipboard API
      if (canUseClipboardApi) {
        try {
          await navigator.clipboard.writeText(text);
          copySuccessful = true;
        } catch (err) {
          console.warn('Clipboard API failed, trying fallback:', err);
        }
      }

      // 如果 Clipboard API 失败或不可用，使用降级方案
      if (!copySuccessful) {
        // 降级方案：使用 textarea 和 execCommand
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (successful) {
          copySuccessful = true;
        } else {
          throw new Error('Failed to copy via execCommand');
        }
      }

      if (!copySuccessful) {
        throw new Error('All copy methods failed');
      }

      setCopiedText(text);
      setIsCopied(true);
      
      if (showSuccessOverride) {
        // 使用浏览器原生提示或自定义提示
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(successMessageOverride);
        } else {
          console.log(successMessageOverride);
        }
      }

      onSuccessOverride?.(text);
    } catch (err) {
      const copyError = err instanceof Error ? err : new Error(String(err));
      console.error('Failed to copy text:', copyError);
      setError(copyError);
      
      if (showSuccessOverride) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(errorMessageOverride);
        } else {
          console.error(errorMessageOverride);
        }
      }

      onErrorOverride?.(copyError);
    } finally {
      setIsCopying(false);
      
      // 自动重置复制状态
      setTimeout(() => {
        setIsCopied(false);
        setCopiedText(null);
      }, timeoutOverride);
    }
  }, [canUseClipboardApi, showSuccess, successMessage, errorMessage, onSuccess, onError, timeout]);

  // 从剪贴板读取文本
  const readFromClipboard = useCallback(async (): Promise<string> => {
    try {
      setError(null);

      if (canUseClipboardApi && navigator.clipboard.readText) {
        return await navigator.clipboard.readText();
      } else {
        throw new Error('Clipboard read API not supported');
      }
    } catch (err) {
      const readError = err instanceof Error ? err : new Error(String(err));
      setError(readError);
      throw readError;
    }
  }, [canUseClipboardApi]);

  // 重置状态
  const reset = useCallback(() => {
    setIsCopying(false);
    setIsCopied(false);
    setCopiedText(null);
    setError(null);
  }, []);

  return {
    copyToClipboard,
    readFromClipboard,
    isCopying,
    isCopied,
    copiedText,
    error,
    canUseClipboardApi,
    reset
  };
};
