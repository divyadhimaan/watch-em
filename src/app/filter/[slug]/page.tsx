import React from 'react';
import ClientFilteredContent from '@/components/ClientFilteredContent/ClientFilteredContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const FilteredContentPage = async ({ params }: PageProps) => {
  const { slug } = await params; // unwrap server params
  return <ClientFilteredContent slug={slug} />;
};

export default FilteredContentPage;
