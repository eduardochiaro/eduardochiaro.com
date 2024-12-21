import * as React from 'react';
import classNames from '@/utils/classNames';

type Props = {
  children: React.ReactNode;
  className?: string;
}

const Button = ({children, className}: Props) => {
  return (
    <div className={classNames(`shadow-accent-300 hover:shadow-accent-200 hover:bg-accent-400 px-8 py-2 bg-accent-500 rounded-md text-primary-50 font-light transition duration-200 ease-linear`, className)}>
      {children}
    </div>
  )
}

export default Button;