import { FC, ReactNode } from 'react';

import { AppProvider } from '@/core';
import '@/assets/styles/app.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Default title',
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <html lang="vi">
        <head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body suppressHydrationWarning>{children}</body>
      </html>
    </AppProvider>
  );
};

export default RootLayout;
