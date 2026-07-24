import { useQuery } from "@tanstack/react-query";
import { seriesApi } from "@store/catalogApi";

export const useSeriesByCategory = (category: string) => {
  return useQuery({
    queryKey: ["series", category],
    queryFn: () => {
      switch (category) {
        case "popular":
          return seriesApi.getPopular();
        case "on-air":
          return seriesApi.getOnAir();
        case "top-rated":
          return seriesApi.getTopRated();
        default:
          return seriesApi.getAll();
      }
    },
  });
};

export const useSeriesDetails = (id: number) => {
  return useQuery({
    queryKey: ["series", id],
    queryFn: () => seriesApi.getDetails(id),
    enabled: !!id,
  });
};

export const useFilteredSeries = (slug: string) => {
  return useQuery({
    queryKey: ["series", "filter", slug],
    queryFn: () => seriesApi.getByFilter(slug),
    enabled: !!slug,
  });
};
