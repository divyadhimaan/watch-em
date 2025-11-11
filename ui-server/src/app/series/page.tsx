'use client';

import { series as mockSeries } from "@/resources/series";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import EntityList from "@/components/EntityList/EntityList";
import { useEntity } from '@/hooks/useEntity';


export default function AllSeriesPage() {
  const { data, loading, error } = useEntity('series');

  return (
    <>
    <Header />
    <EntityList
      entityType="series"
      mockData={mockSeries}
      data={data}
      loading={loading}
      error={error}
    />
    <Footer />
    </>
  );
}