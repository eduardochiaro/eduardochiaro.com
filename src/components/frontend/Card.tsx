import classNames from '@/utils/classNames';

type Props = {
  children: React.ReactNode;
  type?: 'small' | 'medium' | 'large';
  className?: String;
};

export default function Card({ children, className, type = 'medium' }: Props) {
  const appendClass = (type: string) => {
    switch (type) {
      case 'small':
        return 'rounded-lg';
      default:
      case 'medium':
        return 'rounded-xl';
      case 'large':
        return '';
    }
  };

  return (
    <div
      className={classNames(
        'border border-primary-200 bg-primary-50 p-6 font-mono shadow-lg dark:border-primary-900 dark:bg-primary-800',
        className,
        appendClass(type),
      )}
    >
      {children}
    </div>
  );
}
