# KBM Frontend

Frontend for the KBM (Knowledge Base Management) "Lessons Learned" platform, built for a school assignment. It replicates the reference UI design and now optionally connects to the real [KBM-Backend](https://github.com/ziadmohsen06/KBM-Backend) API — falling back to static mock data whenever the API isn't reachable.

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS v4 (dark theme by default, with a light theme toggle)

## Structure

```
src/
  features/
    lessons/      Lessons list, detail, and create pages + components, live API client, mock data
    chatbot/       AI Assistant chat page shell
  shared/
    api/           fetch client, DTO types mirroring the backend, auth + catalog requests
    auth/          AuthContext (login/register/logout, JWT stored in localStorage)
    components/    Navbar, Footer, Button, Input, Select, Avatar, StarRating, Badge, etc.
    layout/        AppLayout wrapping Navbar + Footer + page content
    theme/         Dark/light ThemeContext
```

## Getting started

```bash
npm install
npm run dev
```

By default the app tries to reach the API at `https://localhost:7119/api/v1` (the backend's HTTPS dev port) and silently falls back to the bundled mock data — with a small "Could not reach the KBM API" banner — if it can't connect. Copy `.env.example` to `.env` to point at a different backend URL.

**Use the HTTPS port (7119), not HTTP (5081).** The backend has `app.UseHttpsRedirection()`, which 307-redirects every HTTP request to HTTPS. A browser's CORS preflight (the automatic `OPTIONS` request sent ahead of most real requests) is not allowed to follow redirects, so pointing at port 5081 fails with a CORS error before the request even reaches the CORS policy — it looks like a CORS misconfiguration but is really just the wrong port. Since 7119 serves a self-signed local dev certificate, the first time the frontend calls it your browser may need you to visit `https://localhost:7119` directly once and accept the certificate warning before requests from the frontend will go through.

## Connecting to KBM-Backend

1. Clone and run [KBM-Backend](https://github.com/ziadmohsen06/KBM-Backend) (`dotnet run` from the `KBM-Backend` project, after `dotnet ef database update` and setting `Jwt:Key` via `dotnet user-secrets`).
2. **Enable CORS on the backend.** As of this writing, `Program.cs` has no CORS policy, so the browser will block every request coming from the Vite dev server (a different origin). Add something like this before `app.MapControllers()`:

   ```csharp
   builder.Services.AddCors(options =>
       options.AddDefaultPolicy(policy =>
           policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));
   // ...
   app.UseCors();
   ```

   Adjust the origin if your Vite dev server runs on a different port. This wasn't added here since the task instructions were not to modify the backend repo.
3. Set `VITE_API_BASE_URL` in `.env` if the backend isn't running on the default `https://localhost:7119/api/v1`.

### Known gaps between the UI and the current API

The reference design includes a few things the backend doesn't model yet, so they degrade gracefully when lessons come from the live API instead of mock data:

- **Ratings/reviews** — no rating system in the backend; cards show "No reviews yet" instead of stars.
- **Attachments / quick links / keywords** — not part of `LessonDto`; shown as empty ("No attachments.", etc.). Keywords in the filter bar are sourced from `Functions` as the closest available concept.
- **Author** — `LessonDto` doesn't expose the creator's identity, so `personToContact` is used as the displayed author.
- **Create Lesson** — the backend requires `departmentId` and `functionId` in addition to `industryId`, so those two dropdowns were added to the Basic Information section (sourced from `/departments` and `/functions`) beyond what the original static design specified. Submitting requires being logged in (`/login`) since lesson creation is JWT-protected.
