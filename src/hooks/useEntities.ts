import { useQuery } from "@tanstack/react-query";
import { entitiesApi } from "@store/catalogApi";
import type { EntityType } from "@app-types/Entity";
import type { TMDBMovie, TMDBSeries } from "@app-types/tmdb";

export const useEntityFilters = (
  type: EntityType,
  slug: string
) => {
  return useQuery<TMDBMovie[] | TMDBSeries[]>({
    queryKey: ["entities", type, slug],
    queryFn: () => entitiesApi.getFiltersBySlug(type, slug),
    enabled: !!slug,
  });
};

