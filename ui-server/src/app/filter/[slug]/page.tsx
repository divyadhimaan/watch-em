

import { Card, Grid, SmartImage, Flex } from "@/once-ui/components";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { allContent } from "@/resources/allContent";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const genres = new Set<string>();
  const platforms = new Set<string>();
  const years = new Set<string>();

  allContent.forEach((item) => {
    item.genre.forEach((g) => genres.add(g.toLowerCase()));
    item.streaming.forEach((s) => platforms.add(s.toLowerCase()));
    years.add(item["release-year"].toString());
  });

  const tags = [...genres, ...platforms, ...years];
  return tags.map((tag) => ({ slug: tag }));
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
interface PageProps {
  params: Promise<{ slug: string }>;
}
const FilteredContentPage = async ({ params }: PageProps) => {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.toLowerCase();

  const filteredContent = allContent.filter(
    (item) =>
      item.genre.map((g) => g.toLowerCase()).includes(slug) ||
      item.streaming.map((s) => s.toLowerCase()).includes(slug) ||
      item["release-year"].toString() === slug
  );

  if (filteredContent.length === 0) {
    notFound();
  }

  const shuffledContent = shuffleArray(filteredContent);

  return (
    <>
      <Header />
      <Flex
        direction="column"
        className="px-6 py-10 max-w-6xl mx-auto"
        gap="m"
        paddingY="xl"
        paddingX="l"
      >
        <h1 className="text-3xl font-bold capitalize mb-6">
          Movies for: {slug.replace(/-/g, " ")}
        </h1>
        <Grid columns={6} gap="12">
          {shuffledContent.map((item) => (
            <Card
              key={item.id}
              className="p-0 rounded-xl shadow-md border-none overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative w-full aspect-[2/3] group">
                <SmartImage
                  src={item.image}
                  alt={item.title}
                  aspectRatio="3/4"
                  enlarge
                  radius="l"
                  style={{
                    overflow: "hidden",
                    width: "200px",
                    height: "300px",
                  }}
                />
              </div>
            </Card>
          ))}
        </Grid>
      </Flex>
      <Footer />
    </>
  );
};

export default FilteredContentPage;
