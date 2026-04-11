# SkillPath AI 🎯

> An AI-powered placement preparation platform that helps students and job seekers get placement-ready with personalized roadmaps, mock interviews, resume analysis, and real job market insights.

---
## 🚀 Features

| Feature | Description |
|---|---|
| 🗺️ **AI Roadmap Generator** | Enter your skills and target role — AI generates a personalized 8-week learning roadmap |
| 📈 **Progress Tracker** | Mark weeks as done and watch your Job Readiness % grow |
| 📄 **Resume Gap Checker** | Paste your resume — AI finds missing skills for your target role |
| 🎤 **AI Mock Interview** | Practice with AI interviewer, get instant feedback and scores |
| 💼 **Job Market Data** | Real-time job market insights, salary data and top companies |
| 🏢 **Company Specific Prep** | Tailored interview prep for Google, Amazon, TCS, Infosys and more |
| 📊 **Placement Statistics** | Beautiful charts showing your progress over time |
| 📥 **PDF Export** | Download your roadmap as a PDF to share with mentors |
| 🌙 **Dark/Light Mode** | Toggle between dark and light themes |
| 📱 **Mobile Responsive** | Works perfectly on all screen sizes |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — UI framework
- **Tailwind CSS** — Styling
- **React Router** — Navigation
- **Axios** — API calls
- **Recharts** — Data visualization
- **jsPDF** — PDF generation
- **Vite** — Build tool

### Backend
- **Node.js** — Runtime
- **Express.js** — Web framework
- **MongoDB** — Database
- **Mongoose** — ODM
- **JWT** — Authentication
- **bcryptjs** — Password hashing

### AI & APIs
- **Google Gemini AI** — Roadmap generation, resume analysis, interview questions
- **OpenRouter API** — AI model routing

---

## 📁 Project Structure

```
skillpath-ai/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Roadmap.jsx
│   │   │   ├── ResumeChecker.jsx
│   │   │   ├── MockInterview.jsx
│   │   │   ├── JobMarket.jsx
│   │   │   ├── CompanyPrep.jsx
│   │   │   ├── Statistics.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── services/
│   │       └── api.js
│   └── .env
│
└── server/                    # Node.js Backend
    ├── controllers/
    │   ├── authController.js
    │   ├── roadmapController.js
    │   ├── resumeController.js
    │   ├── interviewController.js
    │   ├── jobController.js
    │   └── companyController.js
    ├── models/
    │   ├── User.js
    │   ├── Roadmap.js
    │   └── Interview.js
    ├── routes/
    │   ├── auth.js
    │   ├── roadmap.js
    │   ├── resume.js
    │   ├── interview.js
    │   ├── jobs.js
    │   └── company.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── utils/
    │   └── geminiHelper.js
    └── .env
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- OpenRouter API key
- Git

### 1. Clone the repository
```bash
git clone https://github.com/adityaraj9798/skillpath-ai.git
cd skillpath-ai
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_openrouter_api_key
PORT=5000
```

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=https://skillpath-ai-nine.vercel.app/
```

Start the frontend:
```bash
npm run dev
```

### 4. Open the app
```
https://skillpath-ai-nine.vercel.app/
```

---

## 🔑 Environment Variables

### Server
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GEMINI_API_KEY` | OpenRouter API key for AI features |
| `PORT` | Server port (default: 5000) |

### Client
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL |

---

## 🚀 Deployment

### Backend (Render)
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repo
3. Set Root Directory: `server`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add environment variables

### Frontend (Vercel)
1. Import project on [Vercel](https://vercel.com)
2. Set Root Directory: `client`
3. Add environment variable: `VITE_API_URL=your_render_url/api`
4. Deploy!

---

## 🤝 API Endpoints

### Auth
```
POST /api/auth/register    — Register new user
POST /api/auth/login       — Login user
GET  /api/auth/me          — Get current user
PUT  /api/auth/profile     — Update profile
```

### Roadmap
```
POST /api/roadmap/generate — Generate AI roadmap
GET  /api/roadmap/get      — Get user roadmap
POST /api/roadmap/complete — Mark week complete
```

### Resume
```
POST /api/resume/check     — Analyze resume
```

### Interview
```
POST /api/interview/start   — Start mock interview
POST /api/interview/answer  — Submit answer
GET  /api/interview/history — Get interview history
```

### Jobs
```
GET /api/jobs/market        — Get job market data
```

### Company
```
POST /api/company/prep      — Get company prep data
POST /api/company/practice  — Practice question
```

---

## 👨‍💻 Author

**Aditya Raj**  
- GitHub: [@yourusername](https://github.com/adityaraj9798)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/aditya-raj-187566275)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

> Built with ❤️ for placement preparation
