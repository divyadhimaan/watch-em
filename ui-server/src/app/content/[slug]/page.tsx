import { notFound } from "next/navigation";
import { Metadata } from "next";
import { streamingImageMap } from "@/resources/movies";
import { Flex, Text, SmartImage, Line, Badge, ToggleButton, Row, Column, Grid } from "@/once-ui/components";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { allContent } from "@/resources/allContent";



interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const item = allContent.find((m) => m.id === params.slug);
    return {
        title: item?.title ?? "Movie not found",
        description: item?.description ?? "",
    };
}

const ContentPage = async ({ params }: Props) => {
    const item = allContent.find((m) => m.id === params.slug);

    if (!item) {
        notFound();
    }

    return (
        <>
            <Header />
            <Column fillWidth paddingY="xl" paddingX="l" horizontal="center" flex={1}>
                <Flex direction="column" gap="12" padding="24" fitWidth>

                    <Grid columns={2} style={{ gridTemplateColumns: "30% 70%" }}>
                        <SmartImage
                            src={item.image}
                            alt={item.title}
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
                                        {item.title}
                                    </Text>
                                    <Text size="l" color="neutral-medium" weight="strong" paddingY="s">
                                        {item["release-year"]}
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
                                        <ToggleButton size="l" prefixIcon="star" label={`${item.rating}/10`} selected={false} />
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
                                {item.genre?.map((genre) => (
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
                                {item.description}
                            </Flex>
                        </div>


                    </Grid>

                    <Text as="h3" size="xl" weight="strong" align="start">
                        Streaming
                    </Text>
                    {item.streaming && (
                        <Flex gap="12" wrap align="center">
                            {item.streaming.map((platform) => {
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

export default ContentPage;
