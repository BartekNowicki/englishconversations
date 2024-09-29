export const savePhrase = async (phrase: string, token: string): Promise<void> => {
  const base_ec_main_app_URL = import.meta.env.VITE_EC_MAIN_APP_API_BASE_URL;

  const learnableData = { phrase, translation: '', comment: '', retention: 0 };

  try {
    const response = await fetch(`${base_ec_main_app_URL}/learnables`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(learnableData),
    });

    if (!response.ok) {
      console.error(`Failed to save phrase: ${phrase}`);
      throw new Error('Failed to save phrase');
    }
  } catch (error) {
    console.error('Error saving phrase:', error);
    throw error;
  }
};
