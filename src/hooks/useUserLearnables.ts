import { useState, useEffect } from 'react';
import { Learnable } from '../types';

export const useUserLearnables = (token: string) => {
  const [userLearnables, setUserLearnables] = useState<Learnable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const base_ec_main_app_URL = import.meta.env.VITE_EC_MAIN_APP_API_BASE_URL;

  const fetchUserLearnables = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${base_ec_main_app_URL}/learnables`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        // 204 No Content, set learnables to an empty array
        console.log("fetched a 204");
        setUserLearnables([]);
      } else if (!response.ok) {
        throw new Error('Failed to fetch learnables');
      } else {
        const data = await response.json();
        setUserLearnables(Array.isArray(data) ? data : []);
        console.log("fetched learnables");
      }
    } catch (error) {
      setError('Error fetching learnables');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserLearnables();
    }
  }, [token]);

  return { userLearnables, loading, error, fetchUserLearnables };
};
