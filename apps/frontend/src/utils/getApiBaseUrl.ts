export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side (browser)
    return 'https://api.smartlist.gr';
  }
  
  // Server-side (SSR/SSG)
  return process.env.NEXT_PUBLIC_API_URL || 'http://backend:8080';
};