
export interface Tag {
    label: string;
    value: string;
    icon: string;
    category: string;
}

export const TAGS: Tag[] = [
    // Category: Featured
    { label: "Trending", value: "trending", icon: "flame", category: "Featured" },
    { label: "Recommended", value: "recommended", icon: "thumbsup", category: "Featured" },

    // Category: Genre
    { label: "Action", value: "action", icon: "sword", category: "Genre" },
    { label: "Adventure", value: "adventure", icon: "compass", category: "Genre" },
    { label: "Sci Fi", value: "sci-fi", icon: "rocket", category: "Genre" },
    { label: "Fantasy", value: "fantasy", icon: "sparkles", category: "Genre" },
    { label: "Horror", value: "horror", icon: "ghost", category: "Genre" },
    { label: "Crime", value: "crime", icon: "gavel", category: "Genre" },
    { label: "Drama", value: "drama", icon: "theatre", category: "Genre" },
    { label: "Biography", value: "biography", icon: "biography", category: "Genre" },
    { label: "Romance", value: "romance", icon: "heart", category: "Genre" },
    { label: "Comedy", value: "comedy", icon: "laugh", category: "Genre" },
    { label: "Animation", value: "animation", icon: "film", category: "Genre" },

    // Category: Audience
    { label: "Family", value: "family", icon: "family", category: "Audience" },
];
