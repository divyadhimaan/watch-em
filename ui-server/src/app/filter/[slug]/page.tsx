import { Card, Grid, SmartImage, Flex } from "@/once-ui/components";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { allContent } from "@/resources/allContent";


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

type Props = {
  params: {
    slug: string;
  };
};

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const FilteredContentPage = async ({ params }: Props) => {
  const slug = params.slug.toLowerCase();

  const filteredContent = allContent.filter(
    (item) =>
      item.genre.map((g) => g.toLowerCase()).includes(slug) ||
      item.streaming.map((s) => s.toLowerCase()).includes(slug) ||
      item["release-year"].toString() === slug
  );

  const shuffledContent = shuffleArray(filteredContent);

  return (
    <>
      <Header />
      <Flex direction="column" className="px-6 py-10 max-w-6xl mx-auto" gap="m" paddingY="xl" paddingX="l">
        {slug && (
          <h1 className="text-3xl font-bold capitalize mb-6">
            Movies for: {slug.replace(/-/g, " ")}
          </h1>
        )}
        {Array.isArray(allContent) && allContent.length > 0 ? (
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
        ) : (
          <p>No items found for this tag.</p>
        )}

      </Flex>
      <Footer />
    </>
  );
}

export default FilteredContentPage;
