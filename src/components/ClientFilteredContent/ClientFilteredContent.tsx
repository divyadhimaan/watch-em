'use client';

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import EntityList from "@/components/EntityList/EntityList";
import { useEntityFilters } from '@/hooks/useEntities';

interface ClientFilteredContentProps {
  slug: string;
}

const ClientFilteredContent: React.FC<ClientFilteredContentProps> = ({ slug }) => {
  const normalizedSlug = slug.toLowerCase();

  const { data, isLoading, error } = useEntityFilters(normalizedSlug);

  return (
    <>
      <Header />

      <EntityList
        header={`Filter: ${slug}`}
        entityType="movie"
        mockData={[]}
        data={data ?? []}
        loading={isLoading}
        error={error}
      />

      <Footer />
    </>
  );
};

export default ClientFilteredContent;
