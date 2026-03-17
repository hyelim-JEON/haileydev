export type ProjectCategory = "all" | "web" | "mobile" | "uxui" | "team" | "personal";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  category: Exclude<ProjectCategory, "all">[];
  image: string;
  shortDescription: string;
  role: string;
  stack: string[];
  features: string[];
  problem: string;
  solution: string;
  learned: string[];
  github?: string;
  demo?: string;
  caseStudy?: string;
};

export const projects: Project[] = [
  {
    id: "linkup",
    name: "LinkUp",
    tagline: "location-based social meetup app",
    category: ["mobile", "uxui", "personal"],
    image: "/projects/linkup.png",
    shortDescription: "A location-based social meetup app designed to help people connect through shared interests and nearby events.",
    role: "Designed and developed the product experience, mobile UI, and backend-connected features.",
    stack: ["React Native", "Expo", "TypeScript", "Supabase"],
    features: ["Map-based meetup discovery", "Interactive meetup detail flow", "Category filtering", "Realtime chat"],
    problem: "People often struggle to find and join nearby social activities that match their interests.",
    solution: "LinkUp helps users discover local meetups through a map-based, user-friendly mobile experience.",
    learned: [
      "How to design mobile-first user flows",
      "How to structure scalable frontend components",
      "How to integrate realtime backend features into product UX",
    ],
    github: "https://github.com/hyelim-JEON",
    demo: "",
    caseStudy: "",
  },
  {
    id: "movie-review",
    name: "Movie Review",
    tagline: "responsive movie community platform",
    category: ["web", "team"],
    image: "/projects/movie-review.png",
    shortDescription: "A responsive movie review platform where users can discover films, leave ratings, and explore content by genre.",
    role: "Built frontend features, responsive layouts, and user-facing interactions.",
    stack: ["React", "Tailwind CSS", "React Query", "JavaScript"],
    features: ["Movie search", "Genre-based browsing", "User ratings and reviews", "Responsive UI"],
    problem: "Users needed a simple and engaging way to search and review movies in one place.",
    solution: "The platform combines movie discovery, review features, and responsive design for a smooth browsing experience.",
    learned: [
      "How to improve perceived performance in React apps",
      "How to design responsive UI for multiple breakpoints",
      "How to structure reusable frontend components in a team project",
    ],
    github: "https://github.com/hyelim-JEON",
    demo: "",
    caseStudy: "",
  },
  {
    id: "edu-talent",
    name: "EDU Talent",
    tagline: "teacher recruitment platform concept",
    category: ["uxui", "team", "web"],
    image: "/projects/edu-talent.png",
    shortDescription: "A teacher recruitment platform concept focused on improving visibility and access for rural and regional schools.",
    role: "Contributed to concept design, platform direction, research analysis, and project planning.",
    stack: ["Figma", "Research", "UX Design", "System Planning"],
    features: ["Recruitment platform concept", "Map-oriented discovery approach", "User-centered planning", "Industry-informed design direction"],
    problem: "Rural schools often face difficulty attracting qualified teachers due to visibility and access challenges.",
    solution: "EDU Talent was designed to make teacher opportunities more discoverable and user-friendly through digital tools.",
    learned: [
      "How research informs product direction",
      "How to communicate design concepts clearly",
      "How to connect business needs with user problems",
    ],
    github: "https://github.com/hyelim-JEON",
    demo: "",
    caseStudy: "",
  },
];
