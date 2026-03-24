/* ═══════════════════════════════════════════════════════════════════
   projects.js  —  Kathiravan's Project Portfolio
   ─────────────────────────────────────────────────────────────────
   4 CATEGORIES:
     "Learning"  → NxtWave / CCBP platform projects  (amber #F59E0B)
     "Beginner"  → HTML / CSS / JS projects           (blue  #3B82F6)
     "Master"    → Full-stack flagship projects        (violet #8B5CF6)

   FIELD REFERENCE:
     id          → unique kebab-case string
     title       → display name shown on card
     category    → "Learning" | "Beginner" | "Master"
     description → 1–2 sentences on card + modal
     stack       → tech chips array
     features    → bullet points in modal "Key Features"
     status      → card badge: "Live" | "Completed" | "In Progress"
     image       → screenshot path (null = initials placeholder)
     liveUrl     → deployed URL  (null = hides Explore Live button)
     github      → GitHub repo   (null = hides Source Code button)
     hasCrudDemo → true = shows interactive CRUD demo in modal
     featured    → true = shown first / highlighted

   ─────────────────────────────────────────────────────────────────
   ADD A NEW PROJECT — copy this block and fill in:

   {
     id:          "my-new-project",
     title:       "Project Title",
     category:    "Beginner",       // Learning | Beginner | Master
     description: "What this project does in one sentence.",
     stack:       ["HTML", "CSS", "JavaScript"],
     features:    [
       "Feature one",
       "Feature two",
       "Feature three",
     ],
     status:      "Completed",      // Live | Completed | In Progress
     image:       null,             // or "/assets/projects/screenshot.png"
     liveUrl:     "https://yourapp.vercel.app",
     github:      "https://github.com/Kathitavan/repo-name",
     hasCrudDemo: false,
     featured:    false,
   },
   ═══════════════════════════════════════════════════════════════════ */

export const projectsData = [

  /* ══════════════════════════════════════════════════════════════
     MASTER  —  Full-stack flagship projects
     Deployed, production-grade, most complex work
     ══════════════════════════════════════════════════════════════ */
  {
    id:          "portfolio",
    title:       "Developer Portfolio v2",
    category:    "Master",
    description:
      "Current luxury dark-themed portfolio — built with React, Tailwind CSS, Framer Motion and GSAP. Features KathirX AI assistant (Claude API), animated hero, certificate gallery, and command palette.",
    stack:       ["React", "Tailwind CSS", "Framer Motion", "GSAP", "Vite", "Claude API", "Lenis"],
    features:    [
      "KathirX — AI portfolio assistant powered by Claude Sonnet API",
      "Animated hero with particle system and orbital MERN tech icons",
      "Certificate gallery with PDF viewer and category filter tabs",
      "Glass peek effect and animated section background per filter",
      "Command palette (Cmd+K) for instant section navigation",
      "Mobile-first responsive design with Lenis smooth scroll",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/portfolio.png",  // add your screenshot here
    liveUrl:     "https://kathir-portfolio-mu.vercel.app/",
    github:      "https://github.com/Kathitavan/kathir",
    hasCrudDemo: false,
    featured:    true,
  },
  {
    id:          "e-voting",
    title:       "E-Voting System",
    category:    "Master",
    description:
      "Secure electronic voting platform with voter authentication, real-time vote counting, and an admin dashboard. Ensures strict one-vote-per-user integrity with JWT sessions.",
    stack:       ["React", "Node.js", "Express", "MongoDB", "JWT", "REST APIs"],
    features:    [
      "Secure voter registration with JWT-based authentication",
      "One-vote-per-user enforcement with server-side session guards",
      "Real-time vote count updates and live result display",
      "Admin dashboard to manage candidates and election state",
      "Vote receipt confirmation and audit trail logging",
      "Responsive UI works across desktop and mobile devices",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/e-voting.png",  // add your screenshot here
    liveUrl:     "https://e-voting-alpha-mauve.vercel.app/",
    github:      "https://github.com/Kathitavan/E-Voting/tree/main",
    hasCrudDemo: false,
    featured:    true,
  },

  /* ══════════════════════════════════════════════════════════════
     BEGINNER  —  HTML / CSS / JavaScript projects
     Real deployed projects, clean vanilla web development
     ══════════════════════════════════════════════════════════════ */
  {
    id:          "tourism-website",
    title:       "Tourism Explorer",
    category:    "Beginner",
    description:
      "A fully responsive tourism platform showcasing destinations with interactive cards, booking inquiry form, and mobile-first layout — built with pure HTML, CSS and JavaScript.",
    stack:       ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Bootstrap"],
    features:    [
      "Interactive destination cards with hover animations",
      "Mobile-first responsive layout across all screen sizes",
      "Booking inquiry form with client-side validation",
      "Custom CSS animations and smooth scroll navigation",
      "Clean semantic HTML structure and fast load performance",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/tourism.png",  // add your screenshot here
    liveUrl:     "https://tourism-sage-iota.vercel.app",
    github:      "https://github.com/Kathitavan/tourism",
    hasCrudDemo: false,
    featured:    false,
  },
  {
    id:          "howto-app",
    title:       "How-To Guide Portal",
    category:    "Beginner",
    description:
      "A step-by-step how-to guide portal where users can browse and follow structured tutorials across multiple categories, with a clean reading layout and intuitive navigation.",
    stack:       ["HTML5", "CSS3", "JavaScript", "REST APIs", "Responsive Design"],
    features:    [
      "Browse and follow step-by-step how-to guides",
      "Category-based filtering and intuitive navigation",
      "Clean reading layout optimised for all screen sizes",
      "Dynamic content rendering via JavaScript",
      "CRUD operations demonstrated in live interactive demo",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/howto.png",  // add your screenshot here
    liveUrl:     "https://docportal.vercel.app",
    github:      "https://github.com/Kathitavan/How-To",
    hasCrudDemo: true,
    featured:    false,
  },

  /* ══════════════════════════════════════════════════════════════
     LEARNING  —  NxtWave CCBP platform projects
     Built during the CCBP 4.0 Full Stack program
     Each has a live ccbp.tech subdomain
     ══════════════════════════════════════════════════════════════ */
  {
    id:          "nxtwave-cash",
    title:       "KathirCash — Finance Tracker",
    category:    "Learning",
    description:
      "A personal finance tracker built during the NxtWave CCBP program. Manage income, expenses, and view transaction summaries in a clean dashboard UI.",
    stack:       ["React", "JavaScript", "CSS3", "NxtWave CCBP"],
    features:    [
      "Add and categorise income and expense transactions",
      "Real-time running balance and summary stats",
      "Filter transactions by type and date range",
      "Responsive dashboard layout with clean card UI",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/kathircash.png",  // add your screenshot here
    liveUrl:     "https://kathircash.ccbp.tech",
    github:      null,    // NxtWave CCBP platform projects — source code not public
    hasCrudDemo: false,
    featured:    false,
  },
  {
    id:          "nxtwave-p5",
    title:       "React App — Growth Cycle 5",
    category:    "Learning",
    description:
      "Advanced React project from NxtWave CCBP Growth Cycle 5 — applying hooks, client-side routing with React Router, and REST API integration with loading/error states.",
    stack:       ["React", "React Router", "REST APIs", "Fetch API", "CSS3"],
    features:    [
      "React functional components with useState and useEffect hooks",
      "Multi-page routing with React Router v6",
      "REST API integration with async fetch and error handling",
      "Reusable component architecture with props-driven design",
      "Responsive CSS layout with mobile-first approach",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/nxtwave-p5.png",  // add your screenshot here
    liveUrl:     "https://kathir5.ccbp.tech",
    github:      null,    // NxtWave CCBP platform projects — source code not public
    hasCrudDemo: false,
    featured:    false,
  },
  {
    id:          "nxtwave-p4",
    title:       "React App — Growth Cycle 4",
    category:    "Learning",
    description:
      "Intermediate React project from NxtWave CCBP Level 4 — state management, dynamic rendering, and REST API integration with real-world data.",
    stack:       ["React", "REST APIs", "JavaScript", "CSS3"],
    features:    [
      "State management with useState and useEffect hooks",
      "Dynamic list rendering with live filter and search",
      "REST API integration with async/await and JSON handling",
      "Conditional rendering and component-level CSS modules",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/nxtwave-p4.png",  // add your screenshot here
    liveUrl:     "https://kathir4.ccbp.tech",
    github:      null,    // NxtWave CCBP platform projects — source code not public
    hasCrudDemo: false,
    featured:    false,
  },
  {
    id:          "nxtwave-p3",
    title:       "CCBP Project — Level 3",
    category:    "Learning",
    description:
      "A JavaScript and DOM manipulation project from NxtWave CCBP Level 3, implementing interactive UI features and event-driven programming.",
    stack:       ["JavaScript", "HTML5", "CSS3", "DOM API", "NxtWave CCBP"],
    features:    [
      "Interactive DOM manipulation with vanilla JavaScript",
      "Event-driven UI with click, input, and form handling",
      "Dynamic content updates without page reload",
      "Local state management using JavaScript variables",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/nxtwave-p3.png",  // add your screenshot here
    liveUrl:     "https://kathir3.ccbp.tech",
    github:      null,    // NxtWave CCBP platform projects — source code not public
    hasCrudDemo: false,
    featured:    false,
  },
  {
    id:          "nxtwave-p2",
    title:       "CCBP Project — Level 2",
    category:    "Learning",
    description:
      "A CSS and responsive design project from NxtWave CCBP Level 2, applying Flexbox, Grid, and media query techniques to build a polished web layout.",
    stack:       ["HTML5", "CSS3", "Flexbox", "Grid", "NxtWave CCBP"],
    features:    [
      "Modern CSS layout with Flexbox and Grid",
      "Fully responsive across mobile, tablet, and desktop",
      "Custom CSS animations and hover transitions",
      "Semantic HTML5 structure with accessible markup",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/nxtwave-p2.png",  // add your screenshot here
    liveUrl:     "https://kathir2.ccbp.tech",
    github:      null,    // NxtWave CCBP platform projects — source code not public
    hasCrudDemo: false,
    featured:    false,
  },
  {
    id:          "nxtwave-p1",
    title:       "CCBP Project — Level 1",
    category:    "Learning",
    description:
      "The foundational HTML and CSS project from NxtWave CCBP Level 1 — building static web pages with proper structure, styling, and layout fundamentals.",
    stack:       ["HTML5", "CSS3", "NxtWave CCBP"],
    features:    [
      "Well-structured HTML5 semantic markup",
      "CSS styling with typography, colors, and spacing",
      "Basic responsive layout with percentage widths",
      "Foundation of web development skills applied",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/nxtwave-p1.png",  // add your screenshot here
    liveUrl:     "https://kathir1.ccbp.tech",
    github:      null,    // NxtWave CCBP platform projects — source code not public
    hasCrudDemo: false,
    featured:    false,
  },
  {
    id:          "nxtwave-feature",
    title:       "Feature Showcase App",
    category:    "Learning",
    description:
      "A feature showcase built on NxtWave's CCBP platform demonstrating UI components, interactive features, and JavaScript functionality in a structured demo format.",
    stack:       ["React", "JavaScript", "CSS3", "NxtWave CCBP"],
    features:    [
      "Multi-component React application structure",
      "Showcase of reusable UI components and patterns",
      "Interactive features with state-driven behavior",
      "Clean responsive layout with component isolation",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/nxtwave-feature.png",  // add your screenshot here
    liveUrl:     "https://fetaure.ccbp.tech",
    github:      null,    // NxtWave CCBP platform projects — source code not public
    hasCrudDemo: false,
    featured:    false,
  },
  {
    id:          "nxtwave-validates",
    title:       "Form Validation App",
    category:    "Learning",
    description:
      "A form validation project from the NxtWave CCBP program demonstrating client-side input validation, error messaging, and UX-friendly form design patterns.",
    stack:       ["JavaScript", "HTML5", "CSS3", "DOM API", "NxtWave CCBP"],
    features:    [
      "Real-time client-side input validation",
      "Custom error messages per field with clear UX",
      "Form submission guard — only passes when all fields valid",
      "Regex-based email and phone number validation",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/nxtwave-validates.png",  // add your screenshot here
    liveUrl:     "https://validates.ccbp.tech",
    github:      null,    // NxtWave CCBP platform projects — source code not public
    hasCrudDemo: false,
    featured:    false,
  },
  {
    id:          "nxtwave-tourvibes",
    title:       "TourVibes — Travel UI",
    category:    "Learning",
    description:
      "A travel-themed UI project built on CCBP platform, showcasing responsive card layouts, image grids, and travel destination presentation with modern CSS styling.",
    stack:       ["HTML5", "CSS3", "JavaScript", "Flexbox", "NxtWave CCBP"],
    features:    [
      "Responsive travel destination card grid layout",
      "Image-rich UI with CSS overlay effects",
      "Smooth hover animations on destination cards",
      "Mobile-optimised layout with fluid grid system",
    ],
    status:      "Live",
    image:       "/assets/images/project imgs/tourvibes.png",  // add your screenshot here
    liveUrl:     "https://tourvibes.ccbp.tech",
    github:      null,    // NxtWave CCBP platform projects — source code not public
    hasCrudDemo: false,
    featured:    false,
  },

];

/* ─── Filter tab categories — keep in sync with category values above ── */
export const projectCategories = [
  "All",
  "Master",     // violet — flagship full-stack work
  "Beginner",   // blue   — HTML/CSS/JS projects
  "Learning",   // amber  — NxtWave CCBP platform projects
];