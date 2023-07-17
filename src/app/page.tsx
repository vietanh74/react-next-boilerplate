import { Metadata } from 'next';

import Home from '@/modules/home';

export const metadata: Metadata = {
  title: 'Hello world',
};

const Page = () => {
  return <Home />;
};

export default Page;
