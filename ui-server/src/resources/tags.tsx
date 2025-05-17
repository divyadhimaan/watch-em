
export interface Tag {
    label: string;
    value: string;
    icon: string;
    category: string;
    link: string;
    id?: number;
}const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
      name: "GitHub",
      icon: "github",
      link: "https://github.com/once-ui-system/nextjs-starter",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://www.linkedin.com/company/once-ui/",
    },
    {
      name: "X",
      icon: "x",
      link: "",
    },
    {
      name: "Email",
      icon: "email",
      link: "mailto:example@gmail.com",
    },
  ];

  export const TAGS: Tag[] = [
    // Category: Featured
    { label: "Trending", value: "trending", icon: "fire", category: "Featured", link: "/" },
    { label: "Recommended", value: "recommended", icon: "thumbsup", category: "Featured", link: "/" },
  
    // Category: Genre
    { label: "Action", value: "action", icon: "sword", category: "Genre", link: "/", id: 28 },
    { label: "Adventure", value: "adventure", icon: "compass", category: "Genre", link: "/", id: 12 },
    { label: "Animation", value: "animation", icon: "film", category: "Genre", link: "/", id: 16 },
    { label: "Comedy", value: "comedy", icon: "laugh", category: "Genre", link: "/", id: 35 },
    { label: "Crime", value: "crime", icon: "gavel", category: "Genre", link: "/", id: 80 },
    { label: "Drama", value: "drama", icon: "theatre", category: "Genre", link: "/", id: 18 },
    { label: "Documentary", value: "documentary", icon: "book", category: "Genre", link: "/", id: 99 },
    { label: "Fantasy", value: "fantasy", icon: "sparkles", category: "Genre", link: "/", id: 14 },
    { label: "History", value: "history", icon: "scroll", category: "Genre", link: "/", id: 36 },
    { label: "Horror", value: "horror", icon: "ghost", category: "Genre", link: "/", id: 27 },
    { label: "Music", value: "music", icon: "music", category: "Genre", link: "/", id: 10402 },
    { label: "Mystery", value: "mystery", icon: "search", category: "Genre", link: "/", id: 9648 },
    { label: "Romance", value: "romance", icon: "heart", category: "Genre", link: "/", id: 10749 },
    { label: "Sci Fi", value: "sci-fi", icon: "rocket", category: "Genre", link: "/", id: 878 },
    { label: "TV Movie", value: "tv-movie", icon: "tv", category: "Genre", link: "/", id: 10770 },
    { label: "Thriller", value: "thriller", icon: "alert-triangle", category: "Genre", link: "/", id: 53 },
    { label: "War", value: "war", icon: "shield", category: "Genre", link: "/", id: 10752 },
    
    // Category: Audience
    { label: "Family", value: "family", icon: "family", category: "Audience", link: "/", id: 10751 }
  ];
  