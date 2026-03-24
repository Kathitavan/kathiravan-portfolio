/* ═══════════════════════════════════════════════════════════════════
   certificates.js  —  Final version · Kathiravan
   26 certificates · 4 categories · Exact filenames matched
   ───────────────────────────────────────────────────────────────────

   QUICK ADD TEMPLATE — copy and paste at the end of the array:
   ─────────────────────────────────────────────────────────────────
   {
     id:        "unique-kebab-id",
     title:     "Certificate Title",
     issuer:    "Issuing Organisation",
     category:  "NxtWave",          // NxtWave | College | Internship | Others
     year:      "2025",
     skills:    ["Skill 1", "Skill 2", "Skill 3"],
     verifyUrl: "#",
     pdfUrl:    "/assets/certificates/filename.pdf",   // null if image
     image:     null,                                  // or ".../filename.png"
     gradient:  "from-blue-500/25 to-cyan-600/20",
     featured:  false,
   },
   ─────────────────────────────────────────────────────────────────
   FILE TYPE RULES:
     PDF  → set pdfUrl to path, keep image: null
     PNG  → set image to path, keep pdfUrl: null
     BOTH → set both (modal shows two tabs)
   ═══════════════════════════════════════════════════════════════════ */

export const certificatesData = [

  /* ══════════════════════════════════════════════════════════════
     NXTWAVE  —  Platform course certificates (PDF)
     ══════════════════════════════════════════════════════════════ */
  {
    id:        "html-css",
    title:     "HTML & CSS Certification",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2023",
    skills:    ["HTML5", "CSS3", "Flexbox", "Grid", "Responsive Design", "Web Fundamentals"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    null,
    image:     null,
    gradient:  "from-orange-500/25 to-amber-500/20",
    featured:  false,
    // Add file when available:
    // pdfUrl: "/assets/certificates/html-css.pdf",
  },
  {
    id:        "static-website",
    title:     "Build Your Own Static Website",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2023",
    skills:    ["HTML", "CSS", "Static Pages", "File Structure", "Web Publishing"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    "/assets/certificates/BUILD YOUR OWN STATIC WEBSITE.pdf",
    image:     null,
    gradient:  "from-orange-400/25 to-amber-500/20",
    featured:  false,
  },
  {
    id:        "responsive-website",
    title:     "Build Your Own Responsive Website",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2023",
    skills:    ["Responsive Design", "Media Queries", "Mobile-First", "Bootstrap", "CSS Flexbox"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    "/assets/certificates/BUILD YOUR OWN RESPONSIVE WEBSITE.pdf",
    image:     null,
    gradient:  "from-blue-400/25 to-indigo-500/20",
    featured:  false,
  },
  {
    id:        "dynamic-webapp",
    title:     "Build Your Own Dynamic Web Application",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2024",
    skills:    ["JavaScript", "DOM Manipulation", "Event Handling", "Fetch API", "Dynamic UI"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    "/assets/certificates/BUILD YOUR OWN DYNAMIC WEB APPLICATION.pdf",
    image:     null,
    gradient:  "from-violet-500/25 to-purple-600/20",
    featured:  false,
  },
  {
    id:        "python",
    title:     "Programming Foundations with Python",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2024",
    skills:    ["Python", "Functions", "Loops", "OOP", "Data Structures", "Problem Solving"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    "/assets/certificates/PROGRAMMING FOUNDATIONS WITH PYTHON.pdf",
    image:     null,
    gradient:  "from-yellow-500/25 to-green-500/20",
    featured:  true,
  },
  {
    id:        "databases",
    title:     "Introduction to Databases",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2024",
    skills:    ["SQL", "SQLite", "Database Design", "CRUD", "Queries", "Joins", "Aggregation"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    "/assets/certificates/INTRODUCTION TO DATABASES.pdf",
    image:     null,
    gradient:  "from-green-500/25 to-teal-500/20",
    featured:  false,
  },
  {
    id:        "javascript",
    title:     "JavaScript Essentials",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2024",
    skills:    ["ES6+", "DOM", "Async/Await", "Promises", "Fetch API", "Closures", "Modules"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    null,
    image:     null,
    gradient:  "from-yellow-400/25 to-orange-500/20",
    featured:  false,
    // pdfUrl: "/assets/certificates/javascript.pdf",
  },
  {
    id:        "react",
    title:     "React.js Development",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2024",
    skills:    ["React", "Hooks", "State Management", "JSX", "Component Design", "React Router"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    null,
    image:     null,
    gradient:  "from-cyan-500/25 to-blue-600/20",
    featured:  true,
    // pdfUrl: "/assets/certificates/react.pdf",
  },
  {
    id:        "git",
    title:     "Git & GitHub Version Control",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2024",
    skills:    ["Git", "GitHub", "Version Control", "Branching", "Merging", "Pull Requests"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    null,
    image:     null,
    gradient:  "from-gray-500/25 to-orange-500/20",
    featured:  false,
    // pdfUrl: "/assets/certificates/git.pdf",
  },
  {
    id:        "nxtwave-achievement",
    title:     "NxtWave Achievement Certificate",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2024",
    skills:    ["Full Stack Development", "CCBP 4.0", "Milestone", "Achievement", "Program Completion"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    "/assets/certificates/I am sharing _HSAP3KFU47_ with you.pdf",
    image:     null,
    gradient:  "from-lime-500/25 to-green-600/20",
    featured:  false,
  },
  {
    id:        "nxtwave-completion",
    title:     "NxtWave Course Completion Certificate",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2024",
    skills:    ["Full Stack", "Web Development", "CCBP 4.0", "Course Completion"],
    verifyUrl: "https://learning.ccbp.in/progress/public?uid=aec82096-1024-4dc8-911d-26f9f0d147b1",
    pdfUrl:    "/assets/certificates/SCHOBYBQIV.pdf",
    image:     null,
    gradient:  "from-amber-500/25 to-yellow-600/20",
    featured:  false,
  },

  /* ══════════════════════════════════════════════════════════════
     NXTWAVE  —  Workshops & Events (PNG images)
     ══════════════════════════════════════════════════════════════ */
  {
    id:        "genai-workshop",
    title:     "Generative AI Mega Workshop 2.0",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2025",
    skills:    ["Generative AI", "LLMs", "Prompt Engineering", "AI Tools", "ChatGPT", "AI Workflows"],
    verifyUrl: "#",
    pdfUrl:    null,
    image:     "/assets/certificates/NxtWave Certificates/Generative Al Mega Workshop 2.0.png",
    gradient:  "from-purple-500/25 to-pink-500/20",
    featured:  true,
  },
  {
    id:        "genai-buildthon",
    title:     "India's Biggest GenAI Buildthon",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2025",
    skills:    ["Generative AI", "Hackathon", "AI Building", "Innovation", "Problem Solving"],
    verifyUrl: "#",
    pdfUrl:    null,
    image:     "/assets/certificates/NxtWave Certificates/Indias Biggest GenAi Bulidthon.png",
    gradient:  "from-pink-500/25 to-rose-500/20",
    featured:  false,
  },
  {
    id:        "mcp-workshop",
    title:     "Model Context Protocol Mega Workshop",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2025",
    skills:    ["MCP", "AI Agents", "Claude API", "Tool Use", "Context Management", "AI Integration"],
    verifyUrl: "#",
    pdfUrl:    null,
    image:     "/assets/certificates/NxtWave Certificates/Model Context Protocol MEGA WORKSHAP.png",
    gradient:  "from-cyan-500/25 to-blue-600/20",
    featured:  true,
  },
  {
    id:        "nxtcode-7under7",
    title:     "NxtCode — 7 Under 7 Challenge",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2024",
    skills:    ["Coding Challenge", "Algorithms", "Speed Coding", "JavaScript", "Problem Solving"],
    verifyUrl: "#",
    pdfUrl:    null,
    image:     "/assets/certificates/NxtWave Certificates/NxtCode- 7 Under 7 Challenge.png",
    gradient:  "from-amber-500/25 to-orange-600/20",
    featured:  false,
  },
  {
    id:        "nxtcode-ai-challenge",
    title:     "NxtCode — AI-Powered Challenge, 25 Under 5",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2025",
    skills:    ["AI-Powered Coding", "LLM Tools", "Speed Development", "Productivity", "Challenge"],
    verifyUrl: "#",
    pdfUrl:    null,
    image:     "/assets/certificates/NxtWave Certificates/NxtCode- Al-Powered Challenge 25 Under 5.png",
    gradient:  "from-violet-500/25 to-fuchsia-600/20",
    featured:  false,
  },
  {
    id:        "uiux-workshop",
    title:     "UI/UX Mega Workshop",
    issuer:    "NxtWave",
    category:  "NxtWave",
    year:      "2025",
    skills:    ["UI Design", "UX Design", "Figma", "User Research", "Wireframing", "Prototyping"],
    verifyUrl: "#",
    pdfUrl:    null,
    image:     "/assets/certificates/NxtWave Certificates/UIUX Mega Workshop.png",
    gradient:  "from-rose-500/25 to-pink-500/20",
    featured:  false,
  },

  /* ══════════════════════════════════════════════════════════════
     COLLEGE  —  Varuvan Vadivelan Institute of Technology
     ══════════════════════════════════════════════════════════════ */
  {
    id:        "seminar-fullstack",
    title:     "Full Stack Development Seminar",
    issuer:    "Varuvan Vadivelan IT",
    category:  "College",
    year:      "2024",
    skills:    ["Full Stack", "MERN Stack", "Web Architecture", "REST APIs", "Database Design"],
    verifyUrl: "#",
    pdfUrl:    "/assets/certificates/Full stack seminar certificate.pdf",
    image:     null,
    gradient:  "from-indigo-500/25 to-blue-600/20",
    featured:  false,
  },
  {
    id:        "k-kathiravan-seminar",
    title:     "Technical Seminar Participation",
    issuer:    "Varuvan Vadivelan IT",
    category:  "College",
    year:      "2024",
    skills:    ["Technical Knowledge", "Communication", "Participation", "Networking"],
    verifyUrl: "#",
    pdfUrl:    "/assets/certificates/K Kathiravan seminar Certificate .pdf",
    image:     null,
    gradient:  "from-fuchsia-500/25 to-pink-600/20",
    featured:  false,
  },
  {
    id:        "symposium",
    title:     "Technical Symposium Certificate",
    issuer:    "Varuvan Vadivelan IT",
    category:  "College",
    year:      "2024",
    skills:    ["Technical Presentation", "Problem Solving", "Symposium", "Team Work", "Innovation"],
    verifyUrl: "#",
    pdfUrl:    "/assets/certificates/symposium certificate KATHIRAVAN .pdf",
    image:     null,
    gradient:  "from-violet-500/25 to-purple-600/20",
    featured:  false,
  },

  /* ══════════════════════════════════════════════════════════════
     INTERNSHIP  —  Inspire AI Pvt Ltd, Bangalore
     ══════════════════════════════════════════════════════════════ */
  {
    id:        "inspire-fsd",
    title:     "Full Stack Development Internship",
    issuer:    "Inspire AI Pvt Ltd",
    category:  "Internship",
    year:      "2024",
    skills:    ["React", "Node.js", "Express", "MongoDB", "REST APIs", "Real Projects", "Team Work"],
    verifyUrl: "#",
    pdfUrl:    "/assets/certificates/KATHIRAVAN K Full stack Certificate.pdf",
    image:     null,
    gradient:  "from-blue-500/25 to-purple-500/20",
    featured:  true,
  },
  {
    id:        "inspire-datascience",
    title:     "Data Science Internship",
    issuer:    "Inspire AI Pvt Ltd",
    category:  "Internship",
    year:      "2024",
    skills:    ["Data Science", "Python", "Pandas", "NumPy", "Data Analysis", "Machine Learning"],
    verifyUrl: "#",
    pdfUrl:    "/assets/certificates/KATHIRAVAN K Data Science.pdf",
    image:     null,
    gradient:  "from-teal-500/25 to-emerald-600/20",
    featured:  true,
  },

  /* ══════════════════════════════════════════════════════════════
     OTHERS  —  External platforms & courses
     ══════════════════════════════════════════════════════════════ */
  {
    id:        "ai-agents-google",
    title:     "5-Day AI Agents Intensive Course",
    issuer:    "Google & Kaggle",
    category:  "Others",
    year:      "2025",
    skills:    ["AI Agents", "Google AI", "Agentic Systems", "Prompt Engineering", "Tool Use", "LangChain"],
    verifyUrl: "#",
    pdfUrl:    null,
    image:     "/assets/certificates/5-Day AI Agents Intensive Course with Google.png",
    gradient:  "from-blue-500/25 to-cyan-600/20",
    featured:  true,
  },
  {
    id:        "blockchain",
    title:     "Blockchain Basics & Web3",
    issuer:    "Coursera",
    category:  "Others",
    year:      "2025",
    skills:    ["Blockchain", "Cryptography", "Smart Contracts", "Decentralization", "Web3"],
    verifyUrl: "#",
    pdfUrl:    null,
    image:     null,
    gradient:  "from-purple-500/25 to-pink-500/20",
    featured:  false,
    // pdfUrl: "/assets/certificates/blockchain.pdf",
  },

];

/* ═══════════════════════════════════════════════════════════════════
   CERTIFICATE COUNT SUMMARY
   ─────────────────────────────────────────────────────────────────
   NxtWave      17   (11 PDF · 6 PNG)
   College       3   (all PDF)
   Internship    2   (all PDF · Inspire AI Pvt Ltd, Bangalore)
   Others        2   (1 PNG · 1 pending)
   TOTAL        24
   ─────────────────────────────────────────────────────────────────
   FEATURED BADGES (featured: true)
   Python Programming, React.js, MCP Workshop,
   GenAI Workshop 2.0, AI Agents (Google),
   Inspire AI FSD Internship, Inspire AI Data Science
   ═══════════════════════════════════════════════════════════════════ */