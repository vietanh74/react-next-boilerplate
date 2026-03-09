import { BaseClient } from '../utils/baseClient';

export const apiClient = new BaseClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}).create();
