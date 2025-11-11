'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Entity {
  id: string | number;
  title?: string;
  name?: string;
  poster_path?: string;
  image?: string;
  type?: 'movie' | 'series' | 'person';
}

interface UseEntitiesBySlugResult {
  data: Entity[];
  loading: boolean;
  error: string | null;
}
export type EntityType = 'movie' | 'series';
export const ENTITY_TYPES: EntityType[] = ['movie', 'series'];

export const useEntitiesBySlug = (slug: string): UseEntitiesBySlugResult => {
  const [data, setData] = useState<Entity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || slug.trim() === '') return;

    const entityTypes = ENTITY_TYPES;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        // fetch all entity types in parallel
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/entities/filters/${slug}`);
        console.log(res.data);
        setData(res.data);

      } catch (err: any) {
        setError(err.message || 'Failed to fetch entities');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [slug]);

  return { data, loading, error };
};

