import fs from "fs";
import path from "path";

function readIfExists(filePath: string) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

export function getPortfolioContext() {
  return `
Hailey is an early-career software developer based in Newcastle, Australia.

Main project: LinkUp
LinkUp is a location-based social meetup application designed to help people discover nearby activities and connect offline.

Problem it solves:
- Reduces social isolation
- Helps users discover local meetups such as coffee meetups, study groups, hobby gatherings, and casual social events
- Encourages real-world connection through location-based event discovery

What Hailey built in LinkUp:
- Meetup discovery flow
- Explore screen for nearby meetups
- Meetup detail views
- User profile features
- Authentication flow
- Saved meetups / user interaction flows
- Chat-related interface structure
- Mobile-first UI and interaction design
- Supabase-backed data structure and app integration

Technology stack used in LinkUp:
- React Native
- TypeScript
- Expo
- Supabase
- PostgreSQL
- GitHub
- Vercel for portfolio/web deployment

Why she used this stack:
- React Native and Expo allowed fast cross-platform mobile development
- TypeScript improved code safety and maintainability
- Supabase provided authentication, database, and backend services with faster setup
- PostgreSQL supported structured relational data for users, meetups, and interactions

What this project shows about Hailey:
- Strong user focus
- Product thinking
- Ability to build real user-facing applications
- Willingness to learn new tools quickly
- Practical problem solving through design and engineering decisions

Career direction:
Hailey is looking for junior software engineer, graduate developer, or early-career product-focused development roles where she can continue building real user-facing products.
`;
}
