[![Releases](https://img.shields.io/github/v/release/iamsohelaktar/mymediatracker-frontend?label=Releases&color=blue)](https://github.com/iamsohelaktar/mymediatracker-frontend/releases)

# MyMediaTracker Frontend — React UI for Movies, TV, Books

🎬 📚 📺 — Frontend client for tracking anime, movies, TV shows, and books. Built with React and standard web tech. Uses Jikan, TVmaze, and Open Library APIs for rich metadata and cover art.

Badges
- Topics: `anime` `books` `css` `html` `javascript` `jikan-api` `lists` `movies` `openlibrary-api` `react` `tv-series` `tv-shows` `tvmaze-api`
- Build: `npm` and modern toolchain
- Releases: direct link to packaged builds and installers at https://github.com/iamsohelaktar/mymediatracker-frontend/releases (download the release file and execute it)

Hero image
![Media grid hero](https://images.unsplash.com/photo-1514894781122-6e2f94b2b7d3?auto=format&fit=crop&w=1200&q=60)

Table of contents
- Overview
- Key features
- Screenshots
- Tech stack
- API integrations
- File layout
- Install and run
- Release package (download & execute)
- Development notes
- Component map
- Data model
- Tests
- Accessibility and performance
- Contributing
- Roadmap
- FAQ
- License

Overview
MyMediaTracker Frontend holds the client files for a media tracking web app. The UI lets users create and manage lists for anime, TV shows, movies, and books. It pulls metadata and cover art from public APIs and saves user lists to a backend (or local storage for demo mode). The app uses React for UI, modular CSS for styles, and lightweight data caching for fewer API calls.

Key features
- Unified lists: track anime, TV series, movies, and books in one place.
- Multi-source metadata: Jikan for Anime (MyAnimeList), TVmaze for shows, Open Library for books, and OMDb or TMDb patterns for movies.
- Custom lists: create, rename, reorder, and delete lists.
- Item-level controls: set progress, rating, status, notes, and tags.
- Local caching: reduce API requests and speed up navigation.
- Offline mode: read cached lists when offline.
- Responsive UI: desktop, tablet, mobile layouts included.
- Keyboard shortcuts: list navigation and quick actions.
- Import/export: JSON export and import for backups.
- Theming: light and dark themes, with easy theme overrides.

Screenshots
- Home dashboard
![Dashboard](https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1200&q=60)
- Anime list view
![Anime list](https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=60)
- Book details
![Book details](https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?auto=format&fit=crop&w=1200&q=60)

Tech stack
- UI: React (functional components + hooks)
- State: React Context + reducer (or Redux if opted)
- Router: React Router
- Styles: CSS Modules and a small utility stylesheet
- HTTP: fetch + lightweight wrapper for retries and cache
- Build: Vite or Create React App (config included)
- Testing: Jest + React Testing Library
- Linting: ESLint + Prettier

API integrations
- Jikan API: anime metadata, episodes, cover art
- TVmaze API: series, episodes, cast
- Open Library API: books metadata and covers
- Optional: TMDb or OMDb for movie data (API key required)
- Authentication: client supports token headers for a backend that stores lists

File layout (high level)
- public/ — static assets and index.html
- src/
  - components/ — reusable UI components (List, Card, Modal, Forms)
  - pages/ — routed views (Dashboard, ItemDetail, Settings)
  - api/ — wrappers for Jikan, TVmaze, OpenLibrary, and movie APIs
  - hooks/ — custom hooks (useFetch, useLocalCache, useKeyboard)
  - context/ — app-level state providers
  - styles/ — global CSS and variables
  - utils/ — helpers (formatters, validators)
  - assets/ — icons and SVGs
- tests/ — unit and integration tests
- package.json
- README.md

Install and run (developer)
1. Clone repository: `git clone https://github.com/iamsohelaktar/mymediatracker-frontend.git`
2. Enter folder: `cd mymediatracker-frontend`
3. Install deps: `npm install` or `yarn`
4. Run dev server: `npm run dev` or `npm start`
5. Open: `http://localhost:3000` (or the port shown in terminal)

Build for production
- `npm run build`
- Serve the `dist` or `build` folder with any static host or CDN.

Release package — download and execute
The repository provides packaged releases for quick installs. Visit or download a release here: https://github.com/iamsohelaktar/mymediatracker-frontend/releases. Download the release archive (zip or tar) that matches your platform. After download, extract the archive and run the included start script or install script. Typical steps:
- Unzip the release: `unzip mymediatracker-frontend-vX.Y.Z.zip`
- Enter directory: `cd mymediatracker-frontend`
- Install bundled dependencies if needed: `npm ci`
- Run packaged app: `npm run start` or execute the provided `start` script file

If the release link does not work in your environment, check the "Releases" section on the project page for available packages and platform-specific instructions.

Development notes
- API keys: store keys in a `.env` file. Use `REACT_APP_` prefix for CRA or Vite env vars.
- Rate limits: implement exponential backoff and caching for Jikan and TVmaze.
- Pagination: lists use cursor-based or page-based pagination, configurable in settings.
- Local demo mode: set `USE_DEMO_DATA=true` to use static JSON fixtures.
- TypeScript: optional type definitions provided in `types/` if you opt-in.

Component map (core components)
- AppShell — main layout with header, nav, footer
- Dashboard — overview of lists and recent activity
- MediaList — generic list renderer for any media type
- MediaCard — compact card that shows cover, title, and quick actions
- ItemDetail — full page with metadata, episodes/chapters, and notes
- ListEditor — CRUD for user lists
- SearchBar — multi-source search with intelligent fallbacks
- SettingsPanel — user preferences, API keys, and theme

Data model (simplified)
- User
  - id
  - name
  - email
- List
  - id
  - name
  - items: [ListItem]
- ListItem
  - id
  - mediaType: 'anime'|'tv'|'movie'|'book'
  - sourceId: external API id
  - title
  - progress
  - status: 'plan'|'watching'|'completed'|'dropped'
  - rating
  - tags: []
  - notes
  - metadata: {cover, synopsis, genres, episodes, authors}

Tests
- Unit tests for hooks and utils with Jest
- Component tests with React Testing Library
- E2E tests optional with Playwright or Cypress

Accessibility and performance
- Semantic HTML and ARIA attributes for interactive components
- Keyboard navigation for lists and dialogs
- Lazy load images with low-res placeholder
- Memoize heavy render lists to avoid re-renders
- Lighthouse score targets: >90 performance, >90 accessibility

Contributing
- Open an issue for bugs or feature requests.
- Fork the repo, create a branch (`feature/xyz`), implement, and submit a pull request.
- Follow commit message style: `feat:`, `fix:`, `chore:`, `docs:`.
- Run tests locally: `npm test`
- Format code: `npm run lint` and `npm run format`

Roadmap
- Add user accounts and sync to cloud storage
- Implement user-shared lists and public list search
- Add mobile PWA installability and push notifications
- Add watchlist recommendations based on tags and ratings
- Add direct import from CSV, MAL, Trakt, and Goodreads

FAQ
Q: What APIs power the app?
A: Jikan for anime metadata, TVmaze for TV shows, Open Library for books. Movies can use TMDb/OMDb if you supply a key.

Q: Do I need an API key?
A: Jikan and TVmaze do not require keys for basic access. Some movie APIs do. Put keys in `.env`.

Q: How do I backup my lists?
A: Use the export feature to download a JSON snapshot. Import restores your lists.

Q: Where are releases and packaged builds?
A: Visit the release page at https://github.com/iamsohelaktar/mymediatracker-frontend/releases. Download a release file and execute the included start/install script as described in the Release package section.

Legal
- License: MIT (update `LICENSE` file as needed)
- Third-party APIs follow their own terms of service. Respect rate limits.

Contacts and links
- Releases: https://github.com/iamsohelaktar/mymediatracker-frontend/releases
- Issues: Create a GitHub issue on the repository
- Pull requests: Submit PRs against the `main` branch

Emoji legend
- 🎬 movie or TV related
- 📚 book related
- 📺 TV series related
- 🔁 sync or import/export
- ⚙️ settings or configuration

Thank you for checking out the frontend client.