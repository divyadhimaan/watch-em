import React from 'react';
import ClientFilteredContent from '@/components/ClientFilteredContent/ClientFilteredContent';

interface PageProps {
  params: { slug: string };
}

const FilteredContentPage = async ({ params }: PageProps) => {
  const { slug } = params;
  return <ClientFilteredContent slug={slug} />;
};

export default FilteredContentPage;
