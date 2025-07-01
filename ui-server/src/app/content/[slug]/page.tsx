'use client';


import { notFound } from "next/navigation";
import { Metadata } from "next";
import { streamingImageMap } from "@/resources/movies";
import { Flex, Text, SmartImage, Line, Badge, ToggleButton, Row, Column, Grid } from "@/once-ui/components";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useMovieById } from '@/hooks/useMovieById';
import { useParams } from "next/navigation";
import { getImageUrl } from "@/utils/getImageUrl";




const ContentPage = () => {
    const params = useParams();
    const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';

    console.log("fetch movie for slug:", slug);
    const { movie, loading } = useMovieById(slug);


    if (loading) return <div>Loading...</div>;
    console.log("movie:", movie);
    if (!movie) return notFound();

    const flatrate = movie?.watch_providers?.flatrate;
    console.log(flatrate)

    return (
        <>
            <Header />
            <Column fillWidth paddingY="xl" paddingX="l" horizontal="center" flex={1}>
                <Flex direction="column" gap="12" padding="24" fitWidth>

                    <Grid columns={2} style={{ gridTemplateColumns: "30% 70%" }}>
                        <SmartImage
                            src={getImageUrl(movie?.poster_path)}
                            alt={movie?.title}
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
                                        {movie?.title}
                                    </Text>
                                    <Text size="l" color="neutral-medium" weight="strong" paddingY="s">
                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
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
                                        <ToggleButton size="l" prefixIcon="star" label={movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} selected={false} />
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
                                {movie?.genres.map((genre) => (
                                    <Badge
                                        key={genre.id}
                                        title={genre.name}
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
                                {movie?.overview}
                            </Flex>
                        </div>


                    </Grid>
                    {(flatrate ?? []).length > 0  ? (
                        <>
                            <Text as="h3" size="xl" weight="strong" align="start">
                                Available to Stream (India)
                            </Text>
                            <Flex gap="12" wrap align="center">
                                {flatrate!.map((provider) => {
                                    const imgSrc = getImageUrl(provider.logo_path, "w185");
                                    return (
                                        <SmartImage
                                            key={provider.provider_id}
                                            src={imgSrc}
                                            alt={provider.provider_name}
                                            aspectRatio="3/4"
                                            radius="l"
                                            style={{
                                                borderRadius: "0.75rem",
                                                overflow: "hidden",
                                                objectFit: "contain",
                                                width: "120px",
                                                height: "100px",
                                            }}
                                        />
                                    );
                                })}
                            </Flex>
                        </>
                    ) : (
                        <Text size="m" color="neutral-medium">
                            Not available for streaming in India.
                        </Text>
                    )}
                </Flex>

            </Column>
            <Footer />
        </>

    );
};

export default ContentPage;
