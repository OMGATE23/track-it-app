import { P_AI_Task } from "./types";

const learnGo = [
  {
    description:
      "Begin with understanding the basics of Go syntax, data types, and control flow.",
    title: "Go Fundamentals",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Dive into functions, methods, and interfaces - key concepts in Go.",
    title: "Functions and Object-Oriented Concepts",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description: "Explore how Go handles errors and exceptions effectively.",
    title: "Error Handling and Best Practices",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Learn about concurrency in Go, including goroutines and channels.",
    title: "Concurrency in Go",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description: "Understand how to work with packages and modules in Go.",
    title: "Packages and Modules",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Build a simple project to apply your learning and solidify understanding.",
    title: "Hands-on Project: Building a Simple API",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Explore advanced topics like testing, debugging, and performance optimization.",
    title: "Advanced Go Concepts",
    startTime: 1020,
    endTime: 1140,
  },
];

const masterReact = [
  {
    description:
      "Learn the fundamentals of React, including components, props, and state.",
    title: "React Fundamentals",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Dive into advanced concepts like lifecycle methods, hooks (useState, useEffect), and context API.",
    title: "Advanced React Concepts",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Build a simple React application to solidify your understanding of the basics.",
    title: "Hands-on Project: Simple React App",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Explore popular React component libraries like Material UI or Ant Design for enhanced UI development.",
    title: "React Component Libraries",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Learn how to manage application state effectively using Redux or Zustand.",
    title: "State Management with Redux/Zustand",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Build a more complex React application, implementing advanced concepts and state management.",
    title: "Hands-on Project: Advanced React App",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Explore testing frameworks like Jest and React Testing Library to ensure code quality.",
    title: "Testing React Applications",
    startTime: 1020,
    endTime: 1140,
  },
];

const learnSpanish = [
  {
    description:
      "Start with the basics like greetings, numbers, and simple phrases. Use language learning apps like Duolingo or Memrise.",
    title: "Basic Spanish Vocabulary and Grammar",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Focus on expanding your vocabulary related to travel, such as asking for directions, booking accommodation, and ordering food.",
    title: "Travel-Specific Vocabulary",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Learn about present tense verb conjugations and practice using them in simple sentences.",
    title: "Present Tense Verb Conjugation",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Watch Spanish TV shows or movies with subtitles to immerse yourself in the language and pick up on pronunciation.",
    title: "Spanish Immersion Through Media",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Practice ordering food and drinks in Spanish, focusing on common food items and restaurant phrases.",
    title: "Dining Out in Spanish",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Learn how to ask for and understand directions in Spanish. Use maps and practice giving directions as well.",
    title: "Asking for Directions",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Have a conversation with a language partner or tutor to practice speaking and listening skills.",
    title: "Spanish Conversation Practice",
    startTime: 1020,
    endTime: 1140,
  },
];

const startABlog = [
  {
    description:
      "Choose a niche for your blog,  something you're passionate about and knowledgeable in. Research popular blogs in your niche.",
    title: "Niche Selection and Research",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Select a blogging platform like WordPress, Blogger, or Squarespace. Choose a domain name that reflects your blog's niche and create an account.",
    title: "Platform and Domain Setup",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Customize your blog's design, including the theme, logo, and layout.  Make sure it's visually appealing and user-friendly.",
    title: "Blog Design and Customization",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Write and publish your first blog post. Introduce yourself and your blog. Aim for high-quality content that provides value to your readers.",
    title: "First Blog Post Creation",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Promote your blog on social media platforms where your target audience hangs out.  Engage with other bloggers and readers in your niche.",
    title: "Social Media Promotion",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Explore different content formats like how-to guides, listicles, or personal stories. Plan future blog post ideas based on your niche and audience.",
    title: "Content Planning and Diversification",
    startTime: 1020,
    endTime: 1140,
  },
  {
    description:
      "Learn about SEO basics and apply them to your blog posts. Research keywords and optimize your content to improve search engine rankings.",
    title: "SEO Optimization",
    startTime: 1020,
    endTime: 1140,
  },
];

interface PremadeProject {
  title: string;
  description: string;
  tasks: Omit<P_AI_Task, "date">[];
}

export const premadeProjects: PremadeProject[] = [
  {
    title: "Learn Go Language",
    description: "I want to be an awesome backend developer.",
    tasks: learnGo,
  },
  {
    title: "Master React",
    description: "I want to go in-depth with frontend development.",
    tasks: masterReact,
  },
  {
    title: "Learn Spanish",
    description:
      "I want to become fluent in Spanish for travel and communication.",
    tasks: learnSpanish,
  },
  {
    title: "Start a Blog",
    description:
      "I want to create and maintain a successful blog on my favorite topics",
    tasks: startABlog,
  },
];
