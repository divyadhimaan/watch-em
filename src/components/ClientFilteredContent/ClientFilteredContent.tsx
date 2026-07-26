'use client';

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { EntityList } from "@/components/EntityList/EntityList";
import { Button } from "@once-ui/components";
import { useEntityFilters } from '@/hooks/useEntities';
import type { EntityType } from "@app-types/Entity";

interface ClientFilteredContentProps {
  slug: string;
  entityType?: EntityType;
}

const ClientFilteredContent: React.FC<ClientFilteredContentProps> = ({ slug, entityType = 'movie' }) => {
  const normalizedSlug = slug.toLowerCase();

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEntityFilters(entityType, normalizedSlug);

  const seen = new Set<number | string>();
  const entities = (data?.pages.flatMap((p) => p.results) ?? []).filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });

  return (
    <>
      <Header />

      <EntityList
        header={`${entityType}s > ${slug}`}
        entityType={entityType}
        mockData={[]}
        data={entities}
        loading={isLoading}
        error={error}
      />

      {!isLoading && hasNextPage && (
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "3rem" }}>
          <Button
            label={isFetchingNextPage ? "Loading..." : "Load More"}
            variant="secondary"
            size="m"
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}

      <Footer />
    </>
  );
};

export default ClientFilteredContent;
