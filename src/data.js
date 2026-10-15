/**
 * Portfolio Data Configuration for Yadnesh
 * "Code & Cupcakes — thoughtfully crafted software."
 *
 * Edit this file to update profile links, resume, project details, and timeline.
 */

export const portfolioData = {
  profile: {
    name: "Yadnesh More",
    fullNamePlaceholder: "Yadnesh ",
    title: "Aspiring Software Engineer | Java & React Developer",
    location: "Pune, India",
    availableForInternships: true,
    tagline: "Crafting code. Adding a little delight.",
    introduction: "Computer Engineering student turning curiosity into practical software through Java, web development, and thoughtful problem solving.",
    bioLong: "I am a computer engineering undergraduate with a focus on structured object-oriented programming, core system design, and responsive web applications. I enjoy translating complex algorithmic challenges into reliable, user-friendly solutions — balancing robust architectural logic with thoughtful user experiences.",
    focusAreas: [
      "Object-Oriented Programming & Clean Architecture",
      "Full-Stack Development with React & Spring Boot",
      "Algorithmic Thinking & Practical Problem Solving"
    ]
  },

  education: {
    degree: "B.E. Computer Engineering",
    institution: "Trinity Academy of Engineering, Pune",
    university: "Savitribai Phule Pune University",
    duration: "2024–Present",
    cgpa: "8.91 / 10",
    highlights: [
      "Consistent academic performance with 8.91/10 CGPA",
      "Active participant in collegiate hackathons & technical problem-solving forums",
      "Core coursework in Data Structures, OOP, DBMS, and Software Engineering"
    ]
  },

  // Configurable external links. Leave empty ("") to trigger honest fallback notices.
  links: {
    github: "https://github.com/yadnesh-19", // Set your real GitHub URL or leave empty
    linkedin: "https://www.linkedin.com/in/yadnesh-more-8a6a1732b/?isSelfProfile=true", // Set your real LinkedIn URL or leave empty
    leetcode: "https://leetcode.com", // Set your LeetCode profile URL or leave empty
    email: "yadneshmore2006@gmail.com", // Configurable email for mailto drafts
    resumePdf: "Yadnesh_CV.pdf" // Set to "/assets/resume.pdf" when your PDF is placed in public/assets/
  },

  skillsCategories: [
    { id: "all", label: "All Ingredients" },
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "databases", label: "Databases" },
    { id: "tools", label: "Tools" },
    { id: "core", label: "Core CS" }
  ],

  skills: [
    // Languages
    {
      id: "java",
      name: "Java",
      category: "languages",
      icon: "Code2",
      badge: "Primary Language",
      description: "Core OOP, Swing GUI desktop applications, Collections framework, multithreading, and stream APIs."
    },
    {
      id: "python",
      name: "Python",
      category: "languages",
      icon: "Terminal",
      badge: "Scripting & Automation",
      description: "Rapid prototyping, automation scripts, screen text analysis, and AI API integrations."
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "languages",
      icon: "FileCode",
      badge: "Web Standards",
      description: "Modern ES6+ syntax, asynchronous programming, DOM manipulation, and interactive component logic."
    },

    // Frontend
    {
      id: "react",
      name: "React",
      category: "frontend",
      icon: "Layers",
      badge: "Component UI",
      description: "State management, component lifecycles, hooks, responsive layouts, and modern single-page interfaces."
    },
    {
      id: "html5",
      name: "HTML5",
      category: "frontend",
      icon: "Layout",
      badge: "Semantic Structure",
      description: "Accessible landmark markup, SEO standards, ARIA disclosure patterns, and clean document structure."
    },
    {
      id: "css3",
      name: "CSS3",
      category: "frontend",
      icon: "Palette",
      badge: "Responsive Styling",
      description: "Flexbox, CSS Grid, custom properties (CSS variables), microinteractions, and fluid dark-mode themes."
    },

    // Backend
    {
      id: "nodejs",
      name: "Node.js",
      category: "backend",
      icon: "Server",
      badge: "Runtime Environment",
      description: "Building lightweight backend APIs, Express routing, and npm package orchestration."
    },
    {
      id: "springboot",
      name: "Spring Boot",
      category: "backend",
      icon: "Cpu",
      badge: "Currently Learning",
      description: "Actively studying enterprise Java RESTful web services, dependency injection, and Spring Data."
    },

    // Databases
    {
      id: "mongodb",
      name: "MongoDB",
      category: "databases",
      icon: "Database",
      badge: "NoSQL",
      description: "Document-oriented schema modeling, flexible collections, and integration with Node.js backends."
    },
    {
      id: "mysql",
      name: "MySQL",
      category: "databases",
      icon: "Table",
      badge: "Relational",
      description: "Relational table schemas, primary/foreign key constraints, query indexing, and SQL normalization."
    },

    // Tools
    {
      id: "git",
      name: "Git",
      category: "tools",
      icon: "GitBranch",
      badge: "Version Control",
      description: "Branching workflows, atomic commits, conflict resolution, and version tracking."
    },
    {
      id: "github",
      name: "GitHub",
      category: "tools",
      icon: "Github",
      badge: "Collaboration",
      description: "Remote repository hosting, issue tracking, markdown documentation, and project showcase."
    },
    {
      id: "vscode",
      name: "VS Code",
      category: "tools",
      icon: "Laptop",
      badge: "Primary Editor",
      description: "Configured development environment with language servers, debugging tooling, and extensions."
    },

    // Core CS Fundamentals
    {
      id: "oop",
      name: "OOP",
      category: "core",
      icon: "Boxes",
      badge: "System Design",
      description: "Encapsulation, inheritance, polymorphism, and abstraction applied across Java software architectures."
    },
    {
      id: "dsa",
      name: "DSA",
      category: "core",
      icon: "Binary",
      badge: "Data Structures & Algos",
      description: "Arrays, Linked Lists, Trees, Stacks, Queues, sorting, searching, and algorithmic complexity analysis."
    },
    {
      id: "dbms",
      name: "DBMS",
      category: "core",
      icon: "HardDrive",
      badge: "Database Concepts",
      description: "Relational algebra, ACID properties, transaction integrity, indexing, and normalization forms."
    },
    {
      id: "problem-solving",
      name: "Problem Solving",
      category: "core",
      icon: "Lightbulb",
      badge: "Analytical Mindset",
      description: "Deconstructing ambiguous problems into systematic testable steps and edge-case resilient algorithms."
    }
  ],

  projects: [
    {
      id: "bank-management-system",
      title: "Bank Management System",
      type: "Desktop Application",
      status: "Completed Academic Project",
      statusType: "completed",
      icon: "Landmark",
      tagline: "Robust desktop banking workflow simulation with structured account operations and input validation.",
      summary: "A desktop banking application simulating core financial operations including account creation, deposits, withdrawals, and real-time balance inquiries with rigorous input validation.",
      technologies: ["Java", "Swing GUI", "OOP Principles", "Input Validation"],
      repoUrl: "", // Configurable: leave empty to show helpful setup notice
      demoUrl: "", // Real demo only if exists
      caseStudy: {
        problem: "Real-world banking software demands fault-tolerant financial logic, atomic transaction handling, and airtight user input validation to prevent negative balances or corrupted ledger state.",
        approach: "Architected modular Java classes separating user presentation (Swing event listeners) from core domain business rules (Account, Transaction ledger). Employed defensive programming against invalid numerical formats, boundary overflows, and unauthorized actions.",
        mainFeatures: [
          "New account registration with automatic unique account number allocation",
          "Secure deposit and withdrawal processing with strict non-negative balance enforcement",
          "Real-time balance lookup and formatted audit trail log of session transactions",
          "Defensive field validation ensuring clean inputs across all customer input dialogs"
        ],
        implementationStatus: "Complete standalone Java desktop application built with Java Swing and Object-Oriented Design principles.",
        whatILearned: "Deepened practical understanding of separation of concerns in Java, event-driven Swing UI thread handling, rigorous edge-case testing, and defensive state management."
      }
    },
    {
      id: "library-management-system",
      title: "Library Management System",
      type: "System Application",
      status: "Completed Academic Project",
      statusType: "completed",
      icon: "BookMarked",
      tagline: "Clean, object-oriented book and membership lifecycle management system using Java Collections.",
      summary: "A modular Java application handling book catalogs, member registrations, student and administrator roles, borrowing workflows, and return tracking using Java Collections.",
      technologies: ["Java", "OOP", "Collections Framework", "Data Structures"],
      repoUrl: "",
      demoUrl: "",
      caseStudy: {
        problem: "Managing physical academic book inventories requires fast catalog searches, accurate borrowing checkout records, due-date tracking, and distinct authorization tiers for students versus librarians.",
        approach: "Engineered clean inheritance hierarchies across User, Student, and Librarian classes. Implemented Java Collections (HashMaps, ArrayLists) for efficient O(1) book lookup keys, dynamic inventory management, and structured checkout queues.",
        mainFeatures: [
          "Dual-tier role operations separating administrative inventory controls from student borrowing privileges",
          "Comprehensive book inventory indexing: ISBN cataloging, category tags, and real-time availability status",
          "Automated book issue and return tracking with borrowing duration tracking",
          "Structured in-memory persistence and formatted console/UI summary reports"
        ],
        implementationStatus: "Fully functional core application developed with Java OOP principles and the Java Collections Framework.",
        whatILearned: "Mastered practical data structure selection within the Java Collections API, polymorphically dispatched user roles, and designed clean interfaces for reusable data operations."
      }
    },
    {
      id: "smart-alumni-network",
      title: "Smart Centralized Alumni Network",
      type: "Web Architecture Concept",
      status: "Internal Hackathon-Selected Concept",
      statusType: "concept",
      icon: "Users2",
      tagline: "Architectural blueprint and collegiate networking concept connecting students with alumni mentors.",
      summary: "An architectural blueprint and hackathon-selected concept uniting university graduates and current undergraduates for mentorship, career opportunities, and campus events.",
      technologies: ["React", "Node.js", "Express", "MongoDB (Proposed)"],
      repoUrl: "",
      demoUrl: "",
      caseStudy: {
        problem: "Collegiate institutions frequently lose active contact with graduating alumni cohorts, depriving current undergraduates of verified industry mentorship, referral pipelines, and institutional guidance.",
        approach: "Drafted a centralized full-stack architecture proposal: an accessible React web interface paired with a Node.js/Express REST API and a MongoDB document database designed for evolving user profiles, opportunity feeds, and mentorship request queues.",
        mainFeatures: [
          "Verified alumni onboarding tied to institutional graduation credentials (Planned)",
          "1-on-1 student-alumni mentorship dispatch and inquiry scheduling (Planned)",
          "Centralized collegiate opportunity board for internships, tech talks, and job referrals (Planned)",
          "Interactive event calendar for alumni reunions and technical webinars (Planned)"
        ],
        implementationStatus: "Concept stage. Architecture proposal selected in an internal college hackathon; full-stack implementation planned as full-stack skills are expanded.",
        whatILearned: "Learned end-to-end web system architecture planning, RESTful endpoint modeling, document database schema design, and communicating technical roadmaps to review panels."
      }
    },
    {
      id: "screen-text-translator",
      title: "Automated Screen Text Translator & Responder",
      type: "Exploratory Automation Tool",
      status: "Exploratory Prototype",
      statusType: "prototype",
      icon: "Sparkles",
      tagline: "Desktop automation script exploring on-screen text recognition and assisted draft response workflows.",
      summary: "An exploratory Python prototype investigating automated capture of on-screen text regions, passing extracted content to AI APIs for translation and assisted response drafting.",
      technologies: ["Python", "Automation Scripting", "AI API Integrations"],
      repoUrl: "",
      demoUrl: "",
      caseStudy: {
        problem: "Navigating foreign-language technical docs or incoming messages often forces users into repetitive copy-paste context switches between active windows and external translation tools.",
        approach: "Experimented with Python desktop automation scripts to capture bounding screen regions, parse text, query AI API endpoints with structured prompts for contextual translation, and synthesize draft responses.",
        mainFeatures: [
          "Targeted screen region capture and lightweight optical text pre-processing",
          "Context-aware multilingual translation requests via API prompts",
          "Automated draft reply suggestions tailored to tone and technical context",
          "Convenient clipboard integration for fast reply insertion"
        ],
        implementationStatus: "Exploratory prototype. Developed for personal workflow testing; not deployed for production or general distribution.",
        whatILearned: "Explored Python desktop automation boundaries, asynchronous API request handling, prompt engineering for multilingual translation accuracy, and handling OCR edge cases."
      }
    }
  ],

  journey: [
    {
      period: "2024",
      title: "Started B.E. in Computer Engineering",
      subtitle: "Trinity Academy of Engineering, Pune (SPPU)",
      description: "Commenced formal engineering education under Savitribai Phule Pune University. Built a strong academic foundation with an ongoing 8.91/10 CGPA.",
      icon: "GraduationCap",
      tags: ["Computer Engineering", "SPPU", "Academic Excellence"]
    },
    {
      period: "Milestone",
      title: "Java & Python Foundations",
      subtitle: "Object-Oriented Design & Scripting",
      description: "Immersed in object-oriented programming principles in Java (inheritance, encapsulation, polymorphism) while building computational problem-solving and scripting workflows in Python.",
      icon: "Code2",
      tags: ["Java", "Python", "OOP"]
    },
    {
      period: "Milestone",
      title: "Built Java OOP Desktop Applications",
      subtitle: "Bank & Library Management Systems",
      description: "Engineered desktop applications using Java Swing and the Java Collections Framework. Practiced rigorous input validation, state consistency, and user event handling.",
      icon: "Laptop",
      tags: ["Java Swing", "Collections", "Desktop Apps"]
    },
    {
      period: "Milestone",
      title: "DSA & Technology Learning Events",
      subtitle: "Algorithmic Challenges & Campus Tech",
      description: "Actively practiced data structures and algorithms, analyzed algorithmic time/space complexities, and participated in college tech workshops and coding events.",
      icon: "Binary",
      tags: ["DSA", "Problem Solving", "Hackathons"]
    },
    {
      period: "Milestone",
      title: "College Hackathon Selection",
      subtitle: "Smart Centralized Alumni Network",
      description: "Formulated and pitched the Smart Centralized Alumni Network architecture. Selected in an internal college hackathon for its practical approach to collegiate community building.",
      icon: "Trophy",
      tags: ["System Architecture", "Hackathon Selection", "React Concept"]
    },
    {
      period: "Current Focus",
      title: "Learning Spring Boot & Full-Stack Expansion",
      subtitle: "Modern Web & Enterprise Java",
      description: "Deepening practical capabilities in Spring Boot REST APIs, relational/NoSQL databases, and pairing backend services with reactive frontend components in React.",
      icon: "Cpu",
      tags: ["Spring Boot", "React", "Full-Stack Development"]
    }
  ],

  frostingFlavors: [
    {
      id: "violet",
      name: "Violet Velvet",
      hex: "#8B5CF6",
      threeColor: 0x8B5CF6,
      ambient: "#A78BFA",
      description: "Primary signature violet"
    },
    {
      id: "strawberry",
      name: "Strawberry Cream",
      hex: "#F472B6",
      threeColor: 0xF472B6,
      ambient: "#FBCFE8",
      description: "Soft dessert pink"
    },
    {
      id: "cyan",
      name: "Cyan Glaze",
      hex: "#06B6D4",
      threeColor: 0x06B6D4,
      ambient: "#67E8F9",
      description: "Secondary signature cyan"
    }
  ]
};
