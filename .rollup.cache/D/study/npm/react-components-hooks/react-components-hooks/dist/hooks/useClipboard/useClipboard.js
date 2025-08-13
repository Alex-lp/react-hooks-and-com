import { useState, useCallback } from 'react';
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
export const useClipboard = (options = {}) => {
    const { showSuccess = true, successMessage = '已复制到剪贴板', errorMessage = '复制失败', onSuccess, onError, timeout = 3000 } = options;
    const [isCopying, setIsCopying] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [copiedText, setCopiedText] = useState(null);
    const [error, setError] = useState(null);
    // 检查浏览器是否支持 Clipboard API
    const canUseClipboardApi = typeof navigator !== 'undefined' &&
        !!navigator.clipboard &&
        !!navigator.clipboard.writeText;
    // 复制文本到剪贴板
    const copyToClipboard = useCallback(async (text, copyOptions = {}) => {
        const { showSuccess: showSuccessOverride = showSuccess, successMessage: successMessageOverride = successMessage, errorMessage: errorMessageOverride = errorMessage, onSuccess: onSuccessOverride = onSuccess, onError: onErrorOverride = onError, timeout: timeoutOverride = timeout } = copyOptions;
        try {
            setIsCopying(true);
            setError(null);
            setIsCopied(false);
            if (canUseClipboardApi) {
                await navigator.clipboard.writeText(text);
            }
            else {
                // 降级方案：使用 textarea 和 execCommand
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                textarea.style.pointerEvents = 'none';
                document.body.appendChild(textarea);
                textarea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);
                if (!successful) {
                    throw new Error('Failed to copy via execCommand');
                }
            }
            setCopiedText(text);
            setIsCopied(true);
            if (showSuccessOverride) {
                // 使用浏览器原生提示或自定义提示
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification(successMessageOverride);
                }
                else {
                    console.log(successMessageOverride);
                }
            }
            onSuccessOverride?.(text);
        }
        catch (err) {
            const copyError = err instanceof Error ? err : new Error(String(err));
            console.error('Failed to copy text:', copyError);
            setError(copyError);
            if (showSuccessOverride) {
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification(errorMessageOverride);
                }
                else {
                    console.error(errorMessageOverride);
                }
            }
            onErrorOverride?.(copyError);
        }
        finally {
            setIsCopying(false);
            // 自动重置复制状态
            setTimeout(() => {
                setIsCopied(false);
                setCopiedText(null);
            }, timeoutOverride);
        }
    }, [canUseClipboardApi, showSuccess, successMessage, errorMessage, onSuccess, onError, timeout]);
    // 从剪贴板读取文本
    const readFromClipboard = useCallback(async () => {
        try {
            setError(null);
            if (canUseClipboardApi && navigator.clipboard.readText) {
                return await navigator.clipboard.readText();
            }
            else {
                throw new Error('Clipboard read API not supported');
            }
        }
        catch (err) {
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
//# sourceMappingURL=useClipboard.js.map