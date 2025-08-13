import { Button } from '@/lib/components/Button';

export interface ComponentConfig {
  id: string;
  name: string;
  description: string;
  component: unknown;
  props: Record<string, unknown>;
  variants?: Array<{
    name: string;
    props: Record<string, unknown>;
  }>;
  sizes?: Array<{
    name: string;
    props: Record<string, unknown>;
  }>;
}

export const components: ComponentConfig[] = [
  {
    id: 'button',
    name: 'Button 按钮',
    description: '一个可定制的按钮组件',
    component: Button,
    props: {
      children: '点击我',
      variant: 'primary' as const,
      size: 'md' as const,
    },
    variants: [
      { name: 'Primary', props: { variant: 'primary' as const } },
      { name: 'Secondary', props: { variant: 'secondary' as const } },
      { name: 'Outline', props: { variant: 'outline' as const } },
    ],
    sizes: [
      { name: 'Small', props: { size: 'sm' as const } },
      { name: 'Medium', props: { size: 'md' as const } },
      { name: 'Large', props: { size: 'lg' as const } },
    ],
  },
];

export const componentPropsTable = {
  button: [
    {
      prop: 'children',
      type: 'ReactNode',
      defaultValue: '-',
      description: '按钮内容',
    },
    {
      prop: 'variant',
      type: "'primary' | 'secondary' | 'outline'",
      defaultValue: "'primary'",
      description: '按钮样式变体',
    },
    {
      prop: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: '按钮尺寸',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '是否禁用',
    },
    {
      prop: 'onClick',
      type: '() => void',
      defaultValue: '-',
      description: '点击事件处理函数',
    },
  ],
};
