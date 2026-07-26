import { useInfiniteQuery } from "@tanstack/react-query";
import { entitiesApi } from "@store/catalogApi";
import type { EntityType } from "@app-types/Entity";

export const useEntityFilters = (type: EntityType, slug: string) => {
  return useInfiniteQuery({
    queryKey: ["entities", type, slug],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      entitiesApi.getFiltersBySlug(type, slug, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.results.length > 0 && allPages.length < lastPage.totalPages
        ? allPages.length + 1
        : undefined,
    enabled: !!slug,
  });
};
