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
export declare const useClipboard: (options?: UseClipboardOptions) => UseClipboardReturn;
//# sourceMappingURL=useClipboard.d.ts.map