'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
  href,
  as,
  activeClassName,
  className,
  type = 'sub',
  children,
  ...props
}: LinkProps & { activeClassName: string; className: string; type: string; children: ReactElement }) {
  const asPath = usePathname();

  const child = React.Children.only(children) as ReactElement<{ className?: string }>;
  const asPathInitial = type == 'main' ? '/' + asPath?.split('#')[0].split('/')[1] : asPath;

  const [classInUse, setClassInUse] = useState(className);

  useEffect(() => {
    const isActive = href == asPath || as == asPath || href == asPathInitial || as == asPathInitial;
    const classNameUse = isActive ? activeClassName : className;
    setClassInUse(classNameUse);
  }, [asPath, asPathInitial, href, as, activeClassName, className]);

  return (
    <Link href={href} as={as} {...props}>
      {React.cloneElement(child, { className: classInUse })}
    </Link>
  );
}
