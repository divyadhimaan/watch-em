import ClientFilteredContent from "@/components/ClientFilteredContent/ClientFilteredContent";

interface PageProps {
  searchParams: Promise<{
    tag?: string;
  }>;
}

export default async function FilterPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const tag = params?.tag ?? "";

  return <ClientFilteredContent slug={tag} />;
}