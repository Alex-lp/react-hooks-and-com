import React from 'react';
import { HookId, HookExampleConfig } from '@/lib/config/hooks';
import { DemoUseCounter } from '@/lib/hooks/useCounter/demo';
import { DemoUsePrevious } from '@/lib/hooks/usePrevious/demo';
import { DemoUseToggle } from '@/lib/hooks/useToggle/demo';
import { DemoUseWindowSize } from '@/lib/hooks/useWindowSize/demo';
import { DemoUseLocalStorage } from '@/lib/hooks/useLocalStorage/demo';
import { DemoUseDebounce } from '@/lib/hooks/useDebounce/demo';
import { DemoUseThrottle } from '@/lib/hooks/useThrottle/demo';
import { DemoUseClickAway } from '@/lib/hooks/useClickAway/demo';
import { DemoUseInView } from '@/lib/hooks/useInView/demo';
import { DemoUseTimeAgo } from '@/lib/hooks/useTimeAgo/demo';
import { DemoUseQueue } from '@/lib/hooks/useQueue/demo';
import { DemoUsePolling } from '@/lib/hooks/usePolling/demo';
import { DemoUseMouse } from '@/lib/hooks/useMouse/demo';
import { DemoUseFullscreen } from '@/lib/hooks/useFullscreen/demo';
import { DemoUseEventBus } from '@/lib/hooks/useEventBus/demo';
import { DemoUseElementSize } from '@/lib/hooks/useElementSize/demo';
import { DemoUseClipboard } from '@/lib/hooks/useClipboard/demo';
import { DemoUseHover } from '@/lib/hooks/useHover/demo';
import { DemoUseScrolling } from '@/lib/hooks/useScrolling/demo';
import { DemoUseWatermark } from '@/lib/hooks/useWatermark/demo';

interface HookExampleProps {
  example: HookExampleConfig['examples'][0];
  hookId: HookId;
}

export const HookExample: React.FC<HookExampleProps> = ({ example, hookId }) => {
  switch (hookId) {
    case 'useCounter':
      return <DemoUseCounter example={example} />;
    case 'usePrevious':
      return <DemoUsePrevious example={example} />;
    case 'useToggle':
      return <DemoUseToggle example={example} />;
    case 'useWindowSize':
      return <DemoUseWindowSize example={example} />;
    case 'useLocalStorage':
      return <DemoUseLocalStorage example={example} />;
    case 'useDebounce':
      return <DemoUseDebounce example={example} />;
    case 'useThrottle':
      return <DemoUseThrottle example={example} />;
    case 'useClickAway':
      return <DemoUseClickAway example={example} />;
    case 'useInView':
      return <DemoUseInView example={example} />;
    case 'useTimeAgo':
      return <DemoUseTimeAgo example={example} />;
    case 'useQueue':
      return <DemoUseQueue example={example} />;
    case 'usePolling':
      return <DemoUsePolling example={example} />;
    case 'useMouse':
      return <DemoUseMouse example={example} />;
    case 'useFullscreen':
      return <DemoUseFullscreen example={example} />;
    case 'useEventBus':
      return <DemoUseEventBus example={example} />;
    case 'useElementSize':
      return <DemoUseElementSize example={example} />;
    case 'useClipboard':
      return <DemoUseClipboard example={example} />;
    case 'useHover':
      return <DemoUseHover example={example} />;
    case 'useScrolling':
      return <DemoUseScrolling example={example} />;
    case 'useWatermark':
      return <DemoUseWatermark example={example} />;
    default:
      return (
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-2">Hook 示例</h4>
          <p className="text-gray-600 mb-4">Hook ID: {hookId}</p>
          <p className="text-gray-600 mb-4">示例名称: {example.name}</p>
          <p className="text-gray-600 mb-4">示例描述: {example.description}</p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">示例组件正在开发中...</p>
          </div>
        </div>
      );
  }
};
