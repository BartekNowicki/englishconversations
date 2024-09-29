export const saveLearnable = async (
  learnableData: { phrase: string; translation: string; comment?: string; retention?: number },
  token: string,
  isEditing = false,
  id?: number
): Promise<void> => {
  const base_ec_main_app_URL = import.meta.env.VITE_EC_MAIN_APP_API_BASE_URL;
  const url = isEditing && id ? `${base_ec_main_app_URL}/learnables/${id}` : `${base_ec_main_app_URL}/learnables`;

  const defaultLearnableData = {
    translation: learnableData.translation,
    comment: learnableData.comment || '',
    retention: learnableData.retention || 0,
    phrase: learnableData.phrase,
  };

  try {
    const response = await fetch(url, {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(defaultLearnableData),
    });

    if (!response.ok) {
      console.error(`Failed to save phrase: ${JSON.stringify(learnableData.phrase)}`);
      throw new Error('Failed to save phrase');
    }
  } catch (error) {
    console.error('Error saving phrase:', error);
    throw error;
  }
};
