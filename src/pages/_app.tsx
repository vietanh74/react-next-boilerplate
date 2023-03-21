import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/vi_VN';

import store from '../store/configureStore';

require('@/assets/styles/antd/antd.less');
require('@/assets/styles/app.scss');

function MyApp({ Component, pageProps }: AppProps) {
  console.log(123);

  return (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}

export default MyApp;
