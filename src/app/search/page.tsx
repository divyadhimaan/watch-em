"use client";

import { useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { EntityList } from "@/components/EntityList/EntityList";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";

  const { data, loading } = useSearch(query);

  return (
    <>
      <Header />

      <EntityList
        header={`Results for "${query}"`}
        entityType="search"
        mockData={[]}
        data={data}
        loading={loading}
        error={null}
      />

      <Footer />
    </>
  );
}