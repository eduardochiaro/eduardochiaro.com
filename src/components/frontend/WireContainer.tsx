import classNames from '@/utils/classNames';
import { pad } from 'cypress/types/lodash';

type Props = {
  children: React.ReactNode;
  type?: string;
  className?: string;
  hideTop?: boolean;
};

export default function WireContainer({ children, type = 'small', className = '', hideTop = false }: Props) {
  const mapSize = {
    paddingArea: {
      large: 'p-4',
      medium: 'p-2',
      small: 'p-1',
    },
    wireWidth: {
      large: 'w-4',
      medium: 'w-3',
      small: 'w-2',
    },
    wireHeight: {
      large: 'h-4',
      medium: 'h-3',
      small: 'h-2',
    },
    wireHeightSmall: {
      large: 'h-3',
      medium: 'h-2',
      small: 'h-1',
    },
    wireWidthSmall: {
      large: 'w-3',
      medium: 'w-2',
      small: 'w-1',
    },
  };

  const paddingArea = mapSize.paddingArea[type as keyof typeof mapSize.paddingArea];
  const wireWidth = mapSize.wireWidth[type as keyof typeof mapSize.wireWidth];
  const wireHeight = mapSize.wireHeight[type as keyof typeof mapSize.wireWidth];
  const wireHeightSmall = mapSize.wireHeightSmall[type as keyof typeof mapSize.wireHeight];
  const wireWidthSmall = mapSize.wireWidthSmall[type as keyof typeof mapSize.wireWidth];

  return (
    <div className={classNames(className, 'flex flex-col')}>
      {!hideTop && (
        <div className="flex items-baseline">
          <div className={classNames(wireWidth, wireHeightSmall, 'flex-none border-r border-b border-dashed border-zinc-500 dark:border-zinc-400')}></div>
          <div className={classNames(wireHeight, 'grow border-b border-zinc-500 dark:border-zinc-400')}></div>
          <div className={classNames(wireWidthSmall, wireHeight, 'flex-none border-b border-l border-dashed border-zinc-500 dark:border-zinc-400')}></div>
          <div className="w-1"></div>
        </div>
      )}
      <div className="flex">
        <div className={classNames(wireWidth, 'flex-none border-r border-zinc-500 dark:border-zinc-400')}></div>
        <div className={classNames(paddingArea, 'grow')}>{children}</div>
        <div className={classNames(wireWidth, 'flex-none border-l border-zinc-500 dark:border-zinc-400')}></div>
      </div>
      <div className="flex items-start">
        <div className="w-1"></div>
        <div className={classNames(wireWidthSmall, wireHeight, 'flex-none border-t border-r border-dashed border-zinc-500 dark:border-zinc-400')}></div>
        <div className={classNames(wireHeight, 'grow border-t border-zinc-500 dark:border-zinc-400')}></div>
        <div className={classNames(wireWidth, wireHeightSmall, 'flex-none border-t border-l border-dashed border-zinc-500 dark:border-zinc-400')}></div>
      </div>
    </div>
  );
}
