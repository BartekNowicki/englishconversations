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

      if (response.status === 204) {
        // 204 No Content, set learnables to an empty array
        console.log("fetched a 204");
        setLearnables([]);
      } else if (!response.ok) {
        throw new Error('Failed to fetch learnables');
      } else {
        const data = await response.json();
        setLearnables(Array.isArray(data) ? data : []);
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
      fetchLearnables();
    }
  }, [token]);

  return { learnables, loading, error, fetchLearnables };
};
