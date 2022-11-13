import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavLink({ href, as, exact, activeClassName, className, type = 'sub', children, ...props }) {
  const { asPath } = useRouter();

  const child = React.Children.only(children);
  const asPathInitial = type == 'main' ? '/' + asPath.split('#')[0].split('/')[1] : asPath;

  const [classInUse, setClassInUse] = useState(className);

  useEffect(() => {
    const isActive = href == asPath || as == asPath || href == asPathInitial || as == asPathInitial;
    const classNameUse = isActive ? activeClassName : className;
    setClassInUse(classNameUse);
  }, [asPath, asPathInitial, href, as, activeClassName, className]);

  return (
    <Link href={href} as={as} {...props} legacyBehavior>
      {React.cloneElement(child, { className: classInUse })}
    </Link>
  );
}
