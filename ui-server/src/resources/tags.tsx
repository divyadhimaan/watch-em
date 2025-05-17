
export interface Tag {
    label: string;
    value: string;
    icon: string;
    category: string;
    link: string;
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
    { label: "Recommended", value: "recommended", icon: "thumbsup", category: "Featured", link: "/"  },

    // Category: Genre
    { label: "Action", value: "action", icon: "sword", category: "Genre", link: "/"  },
    { label: "Adventure", value: "adventure", icon: "compass", category: "Genre", link: "/"  },
    { label: "Animation", value: "animation", icon: "film", category: "Genre", link: "/"  },
    { label: "Comedy", value: "comedy", icon: "laugh", category: "Genre", link: "/"  },
    { label: "Crime", value: "crime", icon: "gavel", category: "Genre", link: "/"  },
    { label: "Drama", value: "drama", icon: "theatre", category: "Genre", link: "/"  },
    { label: "Documentary", value: "documentary", icon: "book", category: "Genre", link: "/" },
    { label: "Fantasy", value: "fantasy", icon: "sparkles", category: "Genre", link: "/"  },
    { label: "History", value: "history", icon: "scroll", category: "Genre", link: "/" },
    { label: "Horror", value: "horror", icon: "ghost", category: "Genre", link: "/" },
    { label: "Music", value: "music", icon: "music", category: "Genre", link: "/" },
    { label: "Mystery", value: "mystery", icon: "search", category: "Genre", link: "/" },
    { label: "Romance", value: "romance", icon: "heart", category: "Genre", link: "/"  },
    { label: "Sci Fi", value: "sci-fi", icon: "rocket", category: "Genre", link: "/"  },
    { label: "TV Movie", value: "tv-movie", icon: "tv", category: "Genre", link: "/" },
    { label: "Thriller", value: "thriller", icon: "alert-triangle", category: "Genre", link: "/" },
    { label: "War", value: "war", icon: "shield", category: "Genre", link: "/" },
 
    // Category: Audience
    { label: "Family", value: "family", icon: "family", category: "Audience", link: "/"  },
];
