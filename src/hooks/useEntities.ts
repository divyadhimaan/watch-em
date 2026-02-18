import { useQuery } from "@tanstack/react-query";
import { entitiesApi } from "@store/catalogApi";

export const useEntityFilters = (slug: string) => {
  return useQuery({
    queryKey: ["entities", slug],
    queryFn: () => entitiesApi.getFiltersBySlug(slug),
    enabled: !!slug,
  });
};

