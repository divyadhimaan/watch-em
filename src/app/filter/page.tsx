"use client";

import ClientFilteredContent from "@/components/ClientFilteredContent/ClientFilteredContent";
import { DetailDialog } from "@/components/DetailDialog";
import { useSearchParams } from "next/navigation";

export default function FilterPage() {
  const searchParams = useSearchParams();
  const tag = searchParams?.get("tag") ?? "";

  return (
    <>
      <ClientFilteredContent slug={tag} />
      <DetailDialog />
    </>
  );
}