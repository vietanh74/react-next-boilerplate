import cx from 'classnames';

export const activeClassname = (always: string, add: boolean, activeClass: string = 'active') => {
  return add ? cx(always, activeClass) : always;
};

export const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

export const isDev = () => {
  return process.env.NODE_ENV !== 'development';
};

export const isServer = () => {
  return typeof window === 'undefined';
};

export const isBrowser = () => {
  return !isServer();
};

export const jsonDecode = (str: any) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return null;
  }
};

export const jsonEncode = (data: any) => {
  try {
    return JSON.stringify(data);
  } catch (error) {
    return null;
  }
};
