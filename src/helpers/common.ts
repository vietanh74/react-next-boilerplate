import cx from 'classnames';

export const activeClassname = (always: string, add: boolean, activeClass: string = 'active') => {
  return add ? cx(always, activeClass) : always;
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export const isDevelopment = () => {
  return process.env.NODE_ENV !== 'development';
};

export const isServer = () => {
  return typeof window === 'undefined';
};

export const isBrowser = () => {
  return !isServer();
};

export const getOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'iOS';
  }

  return 'unknown';
};
