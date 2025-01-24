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
        'rounded-md bg-accent-500 px-8 py-2 font-light text-primary-50 shadow-accent-300 transition duration-200 ease-linear hover:bg-accent-400 hover:shadow-accent-200',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Button;
