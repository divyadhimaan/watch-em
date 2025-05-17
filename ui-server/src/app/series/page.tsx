import { series } from "@/resources/series";
import { Card, SmartImage, Grid, Flex } from "@/once-ui/components";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function AllSeriesPage() {
  return (
    <>
    <Header />
    <Flex direction="column" className="px-6 py-10 max-w-6xl mx-auto" gap="l" paddingY="xl" paddingX="l">
      <h1 className="text-3xl font-bold capitalize mb-6">All Series</h1>
      {Array.isArray(series) && series.length > 0 ? (
        <Grid columns={6} gap="8">
          {series.map((serie) => (
            <Card
              key={serie.id}
              href={`/content/${serie.id}`}
              className="p-0 rounded-xl shadow-md border-none overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative w-full aspect-[2/3] group">
                <SmartImage
                  src={serie.image}
                  alt={serie.title}
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
        <p>No series available.</p>
      )}
    </Flex>
    <Footer />
    </>
  );
}
