# KBM Frontend

Static frontend for the KBM (Knowledge Base Management) "Lessons Learned" platform, built for a school assignment. It replicates the reference UI design using mock data only — no backend calls are made yet.

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS v4 (dark theme by default, with a light theme toggle)

## Structure

```
src/
  features/
    lessons/      Lessons list, detail, and create pages + components
    chatbot/       AI Assistant chat page shell
  shared/
    components/    Navbar, Footer, Button, Input, Select, Avatar, StarRating, Badge, etc.
    layout/        AppLayout wrapping Navbar + Footer + page content
    theme/         Dark/light ThemeContext
```

## Backend

Designed to map cleanly onto the [KBM-Backend](https://github.com/ziadmohsen06/KBM-Backend) API (.NET, Clean Architecture, EF Core). Wiring up real API calls is a stretch goal — see `src/features/lessons/types.ts` and `mockData.ts` for the shapes used.

## Getting started

```bash
npm install
npm run dev
```
