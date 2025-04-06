import { notFound } from "next/navigation";
import { Metadata } from "next";
import { movies, streamingImageMap } from "@/resources/movies";
import { Flex, Text, SmartImage, Line, Badge, ToggleButton, Row, Column, Grid } from "@/once-ui/components";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";



interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const movie = movies.find((m) => m.id === params.slug);
    return {
        title: movie?.title ?? "Movie not found",
        description: movie?.description ?? "",
    };
}

const MoviePage = async ({ params }: Props) => {
    const movie = movies.find((m) => m.id === params.slug);

    if (!movie) {
        notFound();
    }

    return (
        <>
            <Header />
            <Column fillWidth paddingY="xl" paddingX="l" horizontal="center" flex={1}>
                <Flex direction="column" gap="12" padding="24" fitWidth>

                    <Grid columns={2} style={{ gridTemplateColumns: "30% 70%" }}>
                        <SmartImage
                            src={movie.image}
                            alt={movie.title}
                            aspectRatio="3/4"
                            enlarge
                            radius="l"
                            style={{
                                borderRadius: "0.75rem",
                                overflow: "hidden",
                                width: "300px",
                                height: "400px",
                            }}
                        />
                        <div>
                            <Flex horizontal="space-between" align="center" >
                                <Flex horizontal="start" direction="column" gap="1">
                                    <Text as="h1" size="xl" weight="strong" align="start">
                                        {movie.title}
                                    </Text>
                                    <Text size="l" color="neutral-medium" weight="strong" paddingY="s">
                                        {movie["release-year"]}
                                    </Text>
                                </Flex>
                                <Flex gap="l" >
                                    <Flex
                                        background="overlay"
                                        padding="xs"
                                        // border="neutral-medium"
                                        radius="m-4"
                                        shadow="l"
                                        height="80"
                                        direction="column"
                                        horizontal="center"
                                        align="center"
                                        gap="2"
                                    >
                                        <Text size="l" weight="strong" color="neutral-medium">
                                            IMDb Rating
                                        </Text>
                                        <ToggleButton size="l" prefixIcon="star" label={`${movie.rating}/10`} selected={false} />
                                    </Flex>
                                    <Flex
                                        background="overlay"
                                        padding="s"
                                        // border="neutral-medium"
                                        radius="m-4"
                                        shadow="l"
                                        height="80"
                                        direction="column"
                                        horizontal="center"
                                        align="center"
                                        gap="2"
                                    >
                                        <Text size="l" weight="strong" color="neutral-medium">
                                            Your Rating?
                                        </Text>
                                        <ToggleButton cursor-interactive size="l" prefixIcon="hollowStar" label="RATE" selected={false} />
                                    </Flex>
                                </Flex>


                            </Flex>
                            <Flex wrap gap="8" >
                                {movie.genre?.map((genre) => (
                                    <Badge
                                        key={genre}
                                        title={genre}
                                        arrow={false}
                                        effect={false}
                                        paddingX="12"
                                        paddingY="8"
                                        background="brand-weak"
                                        border="brand-strong"
                                    />
                                ))}
                            </Flex>
                            <Flex paddingY="l" color="neutral-strong" align="start" >
                                {movie.description}
                            </Flex>
                        </div>


                    </Grid>

                    <Text as="h3" size="xl" weight="strong" align="start">
                        Streaming
                    </Text>
                    {movie.streaming && (
                        <Flex gap="12" wrap align="center">
                            {movie.streaming.map((platform) => {
                                const imgSrc = streamingImageMap[platform];
                                console.log("imgSrc", imgSrc);
                                return imgSrc ? (
                                    <>

                                        <SmartImage
                                            src={imgSrc}
                                            alt={platform}
                                            aspectRatio="3/4"
                                            radius="l"
                                            style={{
                                                borderRadius: "0.75rem",
                                                overflow: "hidden",
                                                width: "160px",
                                                height: "80px",
                                            }}
                                        />
                                    </>
                                ) : (
                                    <Text key={platform} size="s" color="neutral-medium">
                                        {platform}
                                    </Text>
                                );
                            })}
                        </Flex>
                    )}





                </Flex>

            </Column>
            <Footer />
        </>

    );
};

export default MoviePage;
