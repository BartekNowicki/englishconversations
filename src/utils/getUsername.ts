export const getUsername = (token: string): string | null => {
  try {
    const base64Url = token.split('.')[1]; // Extract the payload from the token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    const payload = JSON.parse(jsonPayload);

    return payload.username || null; // Extract username from the payload
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
