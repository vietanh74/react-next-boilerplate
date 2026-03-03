'use client';

import { useState, useEffect, ReactNode, FC } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

const NoSSR: FC<Props> = ({ children, fallback }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default NoSSR;
