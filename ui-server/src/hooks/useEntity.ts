import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Entity {
  id: string | number;
  title?: string;
  name?: string;
  poster_path?: string;
  image?: string;
}

interface UseEntityResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export const useEntity = <T extends Entity>(entityType: string): UseEntityResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log(`Fetching ${entityType}...`);

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/${entityType}/all`);
        console.log(`${entityType} fetched successfully:`, res.data);
        setData(res.data);
      } catch (err: any) {
        setError(err.message || `Failed to fetch ${entityType}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [entityType]);

  return { data, loading, error };
};
