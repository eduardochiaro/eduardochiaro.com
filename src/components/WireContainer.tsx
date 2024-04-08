import classNames from '@/utils/classNames';

type Props = {
  children: React.ReactNode;
  type?: string;
  className?: string;
};

export default function WireContainer({ children, type = 'small', className = '' }: Props) {
  let paddingArea = 'p-1';
  let wireWidth = 'w-2';
  let wireHeight = 'h-2';
  switch (type) {
    case 'large':
      paddingArea = 'p-4';
      wireWidth = 'w-4';
      wireHeight = 'h-4';
      break;
  }

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <div className="flex">
        <div className={classNames(wireWidth, wireHeight, 'flex-none border-b border-r border-secondary-200 dark:border-secondary-800')}></div>
        <div className={classNames(wireHeight, 'grow border-b border-secondary-200 dark:border-secondary-800')}></div>
        <div className={classNames(wireWidth, wireHeight, 'flex-none border-b border-l border-secondary-200 dark:border-secondary-800')}></div>
      </div>
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
