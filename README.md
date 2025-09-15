# GeekGithubSeeker

## Overview
### Goals
- Help developers and tech-leaders who need to quickly find reliable, popular, and well-maintained repositories

### Core Features
- Pagination for large result sets
- Display Quality indicators (stars, forks, last updated, etc.)

## Functions
### Repository Search
- input search keywords to search repositories
- provide sorting options (best match by default, stars, etc.)

### Pagination
- display 30 items per page by default
- show at most 1000 results

### Filtering
- provide language filter checkboxes (e.g., if typescript is checked, `language:typescript` is included in query parameters)
- provide star count, forks,etc. range filter (e.g., `stars:500...1000`)<br />
※ combine filters using `+` concatenation to avoid complex operators(`+` equals to `AND`)

### Search Results Display
- display repository name, description, stars, forks, issues, language, license
- show last updated time

### Error Handling
- handle API rate limits (10 requests/minute for unauthenticated)and show error popup on the screen
- show timeout warning popup(`incomplete_results = true`) ,suggesting narrowing search scope
- validate search query length (max 256 characters) and show error popup on the screen if exceeded
- Other error statuses are retrieved from responses, and message popups are shown on the screen.

### Technical Stack
- React + TypeScript + Vite for creating 
- UI components: MUI (Material UI)
- Octokit.js for requests and pagination
- React Hook Form
- ESLint + Prettier