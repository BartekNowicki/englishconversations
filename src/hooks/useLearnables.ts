import { useState, useEffect } from 'react';
import { Learnable } from '../types';

export const useLearnables = (token: string) => {
  const [learnables, setLearnables] = useState<Learnable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const base_ec_main_app_URL = import.meta.env.VITE_EC_MAIN_APP_API_BASE_URL;

  useEffect(() => {
    if (token) {
      const fetchLearnables = async () => {
        setLoading(true);

        const requestOptions: RequestInit = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

//         console.log("Fetching learnables with the following request:");
//         console.log("URL:", 'http://localhost:8080/learnables');
//         console.log("Request Options:", requestOptions);

        try {
            console.log(`YO: ${base_ec_main_app_URL}/learnables`);
//           const response = await fetch('http://localhost:8080/learnables', requestOptions);
          const response = await fetch(`${base_ec_main_app_URL}/learnables`, requestOptions);

          if (response.ok) {
            const data: Learnable[] = await response.json();
            console.log("Learnables data fetched successfully:", data);
            setLearnables(data);
          } else {
            const errorText = await response.text().catch(() => 'Unknown error');
            setError(`Failed to fetch learnables: ${response.status} - ${errorText}`);
            console.error(`Error fetching learnables: ${response.status}`, errorText);
          }
        } catch (error) {
          setError('An unexpected error occurred while fetching learnables.');
          console.error('Unexpected error:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchLearnables();
    }
  }, [token]);

  return { learnables, loading, error };
};
