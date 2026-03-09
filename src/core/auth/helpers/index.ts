import { get } from 'lodash';
import { includes } from 'lodash';

import { jsonDecode, jsonEncode } from '@/helpers';
import { IdStorageName, ID_STORAGE_ALL } from '@/shared/constants';
import { oidc } from '@/shared/constants';

export const APP_ACCESS_TOKEN = 'app_access_token';
export const APP_REFRESH_TOKEN = 'app_refresh_token';

export const authGuard = async ({
  to,
}): Promise<{
  canAccess: boolean;
  redirectTo: any;
}> => {
  return {
    canAccess: true,
    redirectTo: {},
  };
};

export const authLogout = async (): Promise<void> => {
  spreadIdStorage();
  const primaryAuth = new window['gmjs'].primaryAuth(oidc);

  try {
    await primaryAuth.signOut({
      revokeAccessToken: true,
      postLogoutRedirectUri: `${oidc.authnUrl}/sign-out?continue=${window.location.origin}`,
    });
  } catch (e) {
    window.location.href = `${oidc.authnUrl}/sign-out?continue=${window.location.origin}`;
  } finally {
    localStorage.clear();
  }
};

export const getIdAccessToken = (): string | undefined => {
  const tokenStorage = jsonDecode(localStorage.getItem(IdStorageName.PrimaryTokenStorage));

  return get(tokenStorage, 'accessToken.accessToken');
};

export const moveIdStorage = (): void => {
  const allStorage = {};

  Object.keys(IdStorageName).forEach((key) => {
    allStorage[key] = jsonDecode(localStorage.getItem(IdStorageName[key]));
    localStorage.removeItem(IdStorageName[key]);
  });

  localStorage.setItem(ID_STORAGE_ALL, jsonEncode(allStorage) || '{}');
};

export const spreadIdStorage = (): void => {
  const allStorage = jsonDecode(localStorage.getItem(ID_STORAGE_ALL));

  Object.keys(allStorage).forEach((key) => {
    localStorage.setItem(IdStorageName[key], jsonEncode(allStorage[key]) || '');
  });
};

export const getAppAccessToken = (): string | null => {
  return localStorage.getItem(APP_ACCESS_TOKEN);
};

export const getAppRefreshToken = (): string | null => {
  return localStorage.getItem(APP_REFRESH_TOKEN);
};

export const isNoTokenPresent = (): boolean => {
  const accessToken = getAppAccessToken();
  const refreshToken = getAppRefreshToken();

  return !accessToken && !refreshToken;
};

export const setAppToken = (authInfo: any): void => {
  localStorage.setItem(APP_ACCESS_TOKEN, authInfo.access_token);
  localStorage.setItem(APP_REFRESH_TOKEN, authInfo.refresh_token);
};

export const removeAppToken = (): void => {
  localStorage.removeItem(APP_ACCESS_TOKEN);
  localStorage.removeItem(APP_REFRESH_TOKEN);
};

export const canUpdate = (scopes: string[], role: string) => {
  if (includes(scopes, role) || includes(scopes, `${role}.update`)) {
    return true;
  }

  return false;
};

export const onlyView = (scopes: string[], role: string) => {
  if (includes(scopes, role) || includes(scopes, `${role}.update`)) return false;

  return includes(scopes, `${role}.view`);
};

export const viewLimit = (scopes: string[], role: string) => {
  if (includes(scopes, `${role}.update`) || includes(scopes, `${role}.view`)) return false;

  return true;
};

export const getAccessTokenPrimary = (): string | undefined => {
  const tokenStorage = jsonDecode(localStorage.getItem(ID_STORAGE_ALL));

  return get(tokenStorage, 'PrimaryTokenStorage.accessToken.accessToken');
};

export const getIdExpiredTime = (): number => {
  const tokenStorage = jsonDecode(localStorage.getItem(ID_STORAGE_ALL));

  return get(tokenStorage, 'PrimaryTokenStorage.accessToken.expiresAt');
};
