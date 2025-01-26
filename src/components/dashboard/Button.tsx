import * as React from 'react';
import classNames from '@/utils/classNames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Button = ({ children, className }: Props) => {
  return (
    <div
      className={classNames(
        'bg-accent-500 text-primary-50 shadow-accent-300 hover:bg-accent-400 hover:shadow-accent-200 rounded-md px-8 py-2 font-light transition duration-200 ease-linear',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Button;
