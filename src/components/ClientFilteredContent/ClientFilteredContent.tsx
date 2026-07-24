'use client';

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { EntityList } from "@/components/EntityList/EntityList";
import { useEntityFilters } from '@/hooks/useEntities';
import type { EntityType } from "@app-types/Entity";


interface ClientFilteredContentProps {
  slug: string;
  entityType?: EntityType;
}

const ClientFilteredContent: React.FC<ClientFilteredContentProps> = ({ slug, entityType = 'movie' }) => {
  const normalizedSlug = slug.toLowerCase();

  const { data, isLoading, error } =
    useEntityFilters(entityType, normalizedSlug);

  return (
    <>
      <Header />

      <EntityList
        header={`${entityType}s > ${slug}`}
        entityType={entityType}
        mockData={[]}
        data={data}
        loading={isLoading}
        error={error}
      />

      <Footer />
    </>
  );
};

export default ClientFilteredContent;
