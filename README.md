# CareerNest

**CareerNest** is a full-stack job portal that connects job seekers with recruiters. Students can discover roles, apply with their profile and resume, and track applications. Recruiters can manage companies, post jobs, and review applicants — all from a modern, responsive web app.

> Find, apply, and build your dream career.

---

## Features

### For Job Seekers (Students)
- **Browse & search jobs** — filter by title, location, job type, and more
- **Job details** — view salary, experience level, requirements, and company info
- **One-click apply** — submit applications directly from job listings
- **Profile management** — update bio, skills, profile photo, and resume
- **Application tracking** — see status of all applied jobs (pending, accepted, rejected)

### For Recruiters
- **Company setup** — create and configure company profiles with logo and details
- **Job posting** — publish full-time, part-time, internship, or contract roles
- **Job management** — edit listings and manage openings
- **Applicant review** — view and update application status for each job

### Platform
- JWT-based authentication with secure HTTP-only cookies
- Role-based access (student vs recruiter)
- Resume and image uploads via Cloudinary
- Responsive UI built with Tailwind CSS and shadcn/ui components

---

## Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,redux,tailwind,js" alt="Frontend" title="Frontend" />
</p>
<p align="center"><sub>React · Vite · Redux Toolkit · Tailwind CSS · JavaScript</sub></p>

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,npm" alt="Backend" title="Backend" />
</p>
<p align="center"><sub>Node.js · Express · MongoDB · Mongoose</sub></p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon" />
</p>

---

## Project Structure

```
CareerNest/
├── backend/
│   ├── controllers/     # Route handlers (user, job, company, application)
│   ├── middlewares/     # Auth & file upload middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API route definitions
│   └── utils/           # DB connection, Cloudinary, helpers
├── frontend/
│   ├── src/
│   │   ├── components/  # UI pages & shared components
│   │   ├── hooks/       # Custom data-fetching hooks
│   │   ├── redux/       # Global state (auth, jobs, companies, applications)
│   │   └── utils/       # API endpoint constants
│   └── public/
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [Cloudinary](https://cloudinary.com/) account (for resume and image uploads)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/CareerNest.git
cd CareerNest
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

The API runs at `http://localhost:8000` by default.

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

> **Note:** API URLs are configured in `frontend/src/utils/apiConstants.js`. Ensure the port matches your backend `PORT` value.

---

## API Overview

| Base Path | Description |
|-----------|-------------|
| `/api/v1/user` | Registration, login, logout, profile updates |
| `/api/v1/company` | Company CRUD for recruiters |
| `/api/v1/job` | Job listing, search, create, update, delete |
| `/api/v1/application` | Apply to jobs and manage applicant status |

---

## User Roles

| Role | Description |
|------|-------------|
| **Student** | Browse jobs, apply, manage personal profile and resume |
| **Recruiter** | Create companies, post jobs, review and update applicant status |

Recruiter-only routes under `/admin/*` are protected and require authentication with the recruiter role.

---

## Scripts

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with Nodemon (hot reload) |

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Future Improvements

The following enhancements are planned to make CareerNest more powerful and community-driven:

1. **Community Blog & Experience Sharing** — Add a dedicated blogging section where users can write and publish posts about their job search journey, interview tips, company reviews, and overall experience using CareerNest. Users could share success stories, lessons learned, and advice with the community, with options to like, comment, and share posts.

2. **Real-time notifications** — Email or in-app alerts when application status changes or new matching jobs are posted.

3. **Advanced job filters** — Salary range sliders, remote/hybrid toggles, and multi-select skill filters.

4. **Saved jobs & bookmarks** — Let students save interesting listings and revisit them later.

5. **Application analytics dashboard** — Charts and insights for recruiters (applicant funnel, time-to-hire, etc.).

6. **OAuth login** — Sign in with Google or LinkedIn for faster onboarding.

7. **Job recommendations** — AI-powered suggestions based on skills, profile, and application history.

8. **Dark mode** — Full theme support across the application.

9. **Mobile app** — React Native or PWA version for on-the-go job searching.

10. **Admin moderation panel** — Review flagged content, manage users, and oversee platform health.

---

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request with improvements, bug fixes, or new features.
