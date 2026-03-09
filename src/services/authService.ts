import { apiClient } from '@/core/service/client';

class AuthService {
  async refreshToken() {
    return await apiClient.post('auth/refresh-token', null, {
      withCredentials: true,
    });
  }
}

export const authService = new AuthService();
