import { useState, useEffect } from 'react';
import { Learnable } from '../types';

export const useLearnables = (token: string) => {
  const [learnables, setLearnables] = useState<Learnable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const base_ec_main_app_URL = import.meta.env.VITE_EC_MAIN_APP_API_BASE_URL;

  const fetchLearnables = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${base_ec_main_app_URL}/learnables`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch learnables');
      }

      const data = await response.json();
      setLearnables(data);
    } catch (error) {
      setError('Error fetching learnables');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLearnables();
    }
  }, [token]);

  return { learnables, loading, error, fetchLearnables };
};
