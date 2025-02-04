import classNames from '@/utils/classNames';

type Props = {
  children: React.ReactNode;
  type?: 'small' | 'medium' | 'large';
  className?: String;
  padding?: String;
};

export default function Card({ children, className, type = 'medium', padding }: Props) {
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
        'border-primary-200 bg-primary-50 dark:border-primary-900 dark:bg-primary-800 border font-mono shadow-xs',
        padding ? padding : 'p-6',
        className,
        appendClass(type),
      )}
    >
      {children}
    </div>
  );
}
