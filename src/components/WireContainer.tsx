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
  };

  const paddingArea = mapSize.paddingArea[type as keyof typeof mapSize.paddingArea];
  const wireWidth = mapSize.wireWidth[type as keyof typeof mapSize.wireWidth];
  const wireHeight = mapSize.wireHeight[type as keyof typeof mapSize.wireWidth];

  return (
    <div className={classNames(className, 'flex flex-col')}>
      {!hideTop && (
        <div className="flex">
          <div className={classNames(wireWidth, wireHeight, 'flex-none border-b border-r border-secondary-200 dark:border-secondary-800')}></div>
          <div className={classNames(wireHeight, 'grow border-b border-secondary-200 dark:border-secondary-800')}></div>
          <div className={classNames(wireWidth, wireHeight, 'flex-none border-b border-l border-secondary-200 dark:border-secondary-800')}></div>
        </div>
      )}
      <div className="flex">
        <div className={classNames(wireWidth, 'flex-none border-r border-secondary-200 dark:border-secondary-800')}></div>
        <div className={classNames(paddingArea, 'grow')}>{children}</div>
        <div className={classNames(wireWidth, 'flex-none border-l border-secondary-200 dark:border-secondary-800')}></div>
      </div>
      <div className="flex">
        <div className={classNames(wireWidth, wireHeight, 'flex-none border-r border-t border-secondary-200 dark:border-secondary-800')}></div>
        <div className={classNames(wireHeight, 'grow border-t border-secondary-200 dark:border-secondary-800')}></div>
        <div className={classNames(wireWidth, wireHeight, 'flex-none border-l border-t border-secondary-200 dark:border-secondary-800')}></div>
      </div>
    </div>
  );
}
