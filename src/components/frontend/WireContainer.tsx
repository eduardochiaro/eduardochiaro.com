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
          <div className={classNames(wireWidth, wireHeight, 'border-secondary-200 dark:border-secondary-800 flex-none border-r border-b')}></div>
          <div className={classNames(wireHeight, 'border-secondary-200 dark:border-secondary-800 grow border-b')}></div>
          <div className={classNames(wireWidth, wireHeight, 'border-secondary-200 dark:border-secondary-800 flex-none border-b border-l')}></div>
        </div>
      )}
      <div className="flex">
        <div className={classNames(wireWidth, 'border-secondary-200 dark:border-secondary-800 flex-none border-r')}></div>
        <div className={classNames(paddingArea, 'grow')}>{children}</div>
        <div className={classNames(wireWidth, 'border-secondary-200 dark:border-secondary-800 flex-none border-l')}></div>
      </div>
      <div className="flex">
        <div className={classNames(wireWidth, wireHeight, 'border-secondary-200 dark:border-secondary-800 flex-none border-t border-r')}></div>
        <div className={classNames(wireHeight, 'border-secondary-200 dark:border-secondary-800 grow border-t')}></div>
        <div className={classNames(wireWidth, wireHeight, 'border-secondary-200 dark:border-secondary-800 flex-none border-t border-l')}></div>
      </div>
    </div>
  );
}
