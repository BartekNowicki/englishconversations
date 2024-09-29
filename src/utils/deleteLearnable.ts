export const deleteLearnable = async (id: number, token: string): Promise<void> => {
  const base_ec_main_app_URL = import.meta.env.VITE_EC_MAIN_APP_API_BASE_URL;

  try {
    const response = await fetch(`${base_ec_main_app_URL}/learnables/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to delete learnable with ID: ${id}`);
      throw new Error('Failed to delete learnable');
    }
  } catch (error) {
    console.error('Error deleting learnable:', error);
    throw error;
  }
};
