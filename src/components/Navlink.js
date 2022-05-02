import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavLink({ href, as, exact, activeClassName, className, children, ...props }) {
  const { asPath } = useRouter();

  const child = React.Children.only(children);

  const [classInUse, setClassInUse] = useState(className);

  useEffect(() => {
    const isActive = href == asPath || as == asPath;
    const classNameUse = isActive ? activeClassName : className ;
    setClassInUse(classNameUse);
  }, [asPath, href, as, activeClassName, className]);

  return (
    <Link href={href} as={as} {...props}>
      {React.cloneElement(child, { className: classInUse })}
    </Link>
  );
}