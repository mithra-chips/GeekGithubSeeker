# GeekGithubSeeker
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![GitHub License](https://img.shields.io/github/license/mithra-chips/GeekGithubSeeker)
![GitHub top language](https://img.shields.io/github/languages/top/mithra-chips/GeekGithubSeeker)

![gif display](https://raw.githubusercontent.com/mithra-chips/images/refs/heads/main/initiate-ezgif.com-optimize.gif)
## Overview
### 🎯 Goals
- Help developers and tech-leaders who need to quickly find reliable, popular, and well-maintained repositories.

### Core Features
- Pagination for large result sets(Only 30 results per page is supported now.)
- Display Quality indicators (stars, forks, last updated, etc.)

## Functions
### Repository Search
- input search keywords to search repositories

### Pagination
- display 30 items per page by default
- show at most 1000 results due to official API limitations.

### Filtering
- provide language filter checkboxes
- provide star count, forks,etc. range filter (e.g., `stars:500...1000`)<br />
※ combine filters using ` ` space concatenation to avoid complex operators(` ` equals to `AND`)

### Search Results Display

### Error Handling
![Basic Image](https://raw.githubusercontent.com/mithra-chips/images/refs/heads/main/error.png)
- handle API rate limits (10 requests/minute for unauthenticated)and show error popup on the screen
- show timeout warning popup(`incomplete_results = true`) ,suggesting narrowing search scope
- validate search query length (max 256 characters) and show error popup on the screen if exceeded
- Other error statuses are retrieved from responses, and message popups are shown on the screen.
### Technical Stack
- React + TypeScript + Vite for creating 
- react-router for routing
- UI components: MUI (Material UI)
- Octokit.js for requests and pagination