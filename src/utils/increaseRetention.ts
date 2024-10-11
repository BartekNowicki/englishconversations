export const increaseRetention = async (id: number, token: string): Promise<void> => {
  const base_ec_main_app_URL = import.meta.env.VITE_EC_MAIN_APP_API_BASE_URL;

  try {
    const response = await fetch(`${base_ec_main_app_URL}/learnables/${id}/increase-retention`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to increase retention for Learnable ID: ${id}`);
      throw new Error('Failed to increase retention');
    }
  } catch (error) {
    console.error('Error increasing retention:', error);
    throw error;
  }
};
