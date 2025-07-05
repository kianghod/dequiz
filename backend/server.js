const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Sample quiz data
const quizData = {
  design: [
    {
      id: 1,
      question: "What is the primary purpose of white space in design?",
      choices: [
        "To fill empty areas",
        "To create visual hierarchy and improve readability",
        "To save ink and paper",
        "To make designs look minimal"
      ],
      correct: 1,
      tags: ["Design Principles", "Typography"]
    },
    {
      id: 2,
      question: "Which color combination creates the highest contrast?",
      choices: [
        "Red and Green",
        "Blue and Yellow",
        "Black and White",
        "Purple and Orange"
      ],
      correct: 2,
      tags: ["Color Theory", "Accessibility"]
    },
    {
      id: 3,
      question: "What does UX stand for in design?",
      choices: [
        "User Experience",
        "User Extension",
        "User Execution",
        "User Expression"
      ],
      correct: 0,
      tags: ["UX/UI", "Design Terminology"]
    },
    {
      id: 4,
      question: "Which design principle focuses on creating visual connections between elements?",
      choices: [
        "Contrast",
        "Alignment",
        "Proximity",
        "Repetition"
      ],
      correct: 2,
      tags: ["Design Principles", "Layout"]
    },
    {
      id: 5,
      question: "What is the golden ratio in design?",
      choices: [
        "1:1.618",
        "1:2",
        "1:1.5",
        "1:3"
      ],
      correct: 0,
      tags: ["Design Principles", "Proportions"]
    },
    {
      id: 6,
      question: "What is the purpose of a wireframe in design?",
      choices: [
        "To show final colors and images",
        "To create a basic layout structure",
        "To add animations and interactions",
        "To write content for the design"
      ],
      correct: 1,
      tags: ["UX/UI", "Wireframing"]
    },
    {
      id: 7,
      question: "Which design principle creates a sense of movement?",
      choices: [
        "Balance",
        "Rhythm",
        "Emphasis",
        "Unity"
      ],
      correct: 1,
      tags: ["Design Principles", "Visual Flow"]
    },
    {
      id: 8,
      question: "What is the difference between UI and UX?",
      choices: [
        "UI is about looks, UX is about functionality",
        "UI is about functionality, UX is about looks",
        "They are the same thing",
        "UI is for mobile, UX is for desktop"
      ],
      correct: 0,
      tags: ["UX/UI", "Design Terminology"]
    },
    {
      id: 9,
      question: "What is a persona in UX design?",
      choices: [
        "A fictional character representing target users",
        "A design tool for creating layouts",
        "A type of color scheme",
        "A software for prototyping"
      ],
      correct: 0,
      tags: ["UX/UI", "User Research"]
    },
    {
      id: 10,
      question: "Which type of font is best for body text?",
      choices: [
        "Decorative fonts",
        "Serif or sans-serif fonts",
        "Script fonts",
        "Display fonts"
      ],
      correct: 1,
      tags: ["Typography", "Readability"]
    },
    {
      id: 11,
      question: "What is the purpose of a mood board?",
      choices: [
        "To organize project files",
        "To collect visual inspiration and establish design direction",
        "To create final designs",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Process", "Inspiration"]
    },
    {
      id: 12,
      question: "What is the rule of thirds in design?",
      choices: [
        "A grid system dividing space into three equal parts",
        "A color theory principle",
        "A typography rule",
        "A spacing guideline"
      ],
      correct: 0,
      tags: ["Design Principles", "Composition"]
    },
    {
      id: 13,
      question: "What is the purpose of a call-to-action button?",
      choices: [
        "To fill empty space",
        "To guide users toward a specific action",
        "To show navigation options",
        "To display information"
      ],
      correct: 1,
      tags: ["UX/UI", "User Interface"]
    },
    {
      id: 14,
      question: "What is the difference between vector and raster graphics?",
      choices: [
        "Vector is for print, raster is for web",
        "Vector scales without quality loss, raster becomes pixelated",
        "Vector is always smaller in file size",
        "Raster is always better quality"
      ],
      correct: 1,
      tags: ["Design Tools", "Graphics"]
    },
    {
      id: 15,
      question: "What is the purpose of a style guide?",
      choices: [
        "To track project deadlines",
        "To maintain consistent design standards",
        "To organize team meetings",
        "To create project budgets"
      ],
      correct: 1,
      tags: ["Design Process", "Branding"]
    },
    {
      id: 16,
      question: "What is the purpose of user testing?",
      choices: [
        "To make designs look better",
        "To identify usability issues and improve user experience",
        "To save money on development",
        "To impress clients"
      ],
      correct: 1,
      tags: ["UX/UI", "User Research"]
    },
    {
      id: 17,
      question: "What is the purpose of a grid system?",
      choices: [
        "To make designs look organized",
        "To create consistent layouts and improve readability",
        "To save time in design",
        "To make designs look modern"
      ],
      correct: 1,
      tags: ["Design Principles", "Layout"]
    },
    {
      id: 18,
      question: "What is the purpose of a prototype?",
      choices: [
        "To show final designs",
        "To test functionality and user interactions",
        "To create marketing materials",
        "To organize project files"
      ],
      correct: 1,
      tags: ["UX/UI", "Prototyping"]
    },
    {
      id: 19,
      question: "What is the purpose of accessibility in design?",
      choices: [
        "To make designs look better",
        "To ensure designs are usable by people with disabilities",
        "To save money on development",
        "To make designs load faster"
      ],
      correct: 1,
      tags: ["Accessibility", "Inclusive Design"]
    },
    {
      id: 20,
      question: "What is the purpose of responsive design?",
      choices: [
        "To make designs look good on all devices",
        "To save money on development",
        "To make designs load faster",
        "To create animations"
      ],
      correct: 0,
      tags: ["UX/UI", "Responsive Design"]
    },
    {
      id: 21,
      question: "What is the purpose of a design system?",
      choices: [
        "To organize project files",
        "To create consistent, reusable design components",
        "To track project progress",
        "To create project budgets"
      ],
      correct: 1,
      tags: ["Design Process", "Design Systems"]
    },
    {
      id: 22,
      question: "What is the purpose of a user journey map?",
      choices: [
        "To show final designs",
        "To visualize user interactions and identify pain points",
        "To create marketing materials",
        "To organize project files"
      ],
      correct: 1,
      tags: ["UX/UI", "User Research"]
    },
    {
      id: 23,
      question: "What is the purpose of a design sprint?",
      choices: [
        "To create final designs quickly",
        "To solve design problems in a structured, time-limited process",
        "To organize team meetings",
        "To create project budgets"
      ],
      correct: 1,
      tags: ["Design Process", "Design Sprints"]
    },
    {
      id: 24,
      question: "What is the purpose of a design critique?",
      choices: [
        "To make designers feel bad",
        "To provide constructive feedback and improve designs",
        "To organize team meetings",
        "To create project budgets"
      ],
      correct: 1,
      tags: ["Design Process", "Feedback"]
    },
    {
      id: 25,
      question: "What is the purpose of a design brief?",
      choices: [
        "To organize project files",
        "To define project goals, requirements, and constraints",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Process", "Project Management"]
    },
    {
      id: 26,
      question: "What is the purpose of a design audit?",
      choices: [
        "To make designs look better",
        "To evaluate design quality and identify improvement opportunities",
        "To save money on development",
        "To create marketing materials"
      ],
      correct: 1,
      tags: ["Design Process", "Quality Assurance"]
    },
    {
      id: 27,
      question: "What is the purpose of a design workshop?",
      choices: [
        "To organize team meetings",
        "To collaborate, ideate, and solve design problems",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Process", "Collaboration"]
    },
    {
      id: 28,
      question: "What is the purpose of a design portfolio?",
      choices: [
        "To organize project files",
        "To showcase design work and skills",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Portfolio"]
    },
    {
      id: 29,
      question: "What is the purpose of a design mentor?",
      choices: [
        "To organize team meetings",
        "To provide guidance, feedback, and career development",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Mentorship"]
    },
    {
      id: 30,
      question: "What is the purpose of a design community?",
      choices: [
        "To organize team meetings",
        "To share knowledge, network, and support fellow designers",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Community"]
    },
    {
      id: 31,
      question: "What is the purpose of a design conference?",
      choices: [
        "To organize team meetings",
        "To learn, network, and stay updated with industry trends",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Networking"]
    },
    {
      id: 32,
      question: "What is the purpose of a design blog?",
      choices: [
        "To organize project files",
        "To share insights, tutorials, and industry knowledge",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Content Creation"]
    },
    {
      id: 33,
      question: "What is the purpose of a design podcast?",
      choices: [
        "To organize team meetings",
        "To learn, get inspired, and stay updated with industry trends",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Learning"]
    },
    {
      id: 34,
      question: "What is the purpose of a design book?",
      choices: [
        "To organize project files",
        "To learn fundamental principles and advanced techniques",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Education"]
    },
    {
      id: 35,
      question: "What is the purpose of a design course?",
      choices: [
        "To organize team meetings",
        "To learn new skills and advance design knowledge",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Education"]
    },
    {
      id: 36,
      question: "What is the purpose of a design certification?",
      choices: [
        "To organize project files",
        "To validate skills and enhance professional credibility",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Certification"]
    },
    {
      id: 37,
      question: "What is the purpose of a design internship?",
      choices: [
        "To organize team meetings",
        "To gain practical experience and learn from professionals",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Experience"]
    },
    {
      id: 38,
      question: "What is the purpose of a design apprenticeship?",
      choices: [
        "To organize project files",
        "To learn from experienced designers through hands-on training",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Learning"]
    },
    {
      id: 39,
      question: "What is the purpose of a design mentorship program?",
      choices: [
        "To organize team meetings",
        "To provide structured guidance and career development",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Mentorship"]
    },
    {
      id: 40,
      question: "What is the purpose of a design scholarship?",
      choices: [
        "To organize project files",
        "To support education and reduce financial barriers",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Education"]
    },
    {
      id: 41,
      question: "What is the purpose of a design grant?",
      choices: [
        "To organize team meetings",
        "To fund creative projects and research",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Funding"]
    },
    {
      id: 42,
      question: "What is the purpose of a design award?",
      choices: [
        "To organize project files",
        "To recognize excellence and innovation in design",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Recognition"]
    },
    {
      id: 43,
      question: "What is the purpose of a design competition?",
      choices: [
        "To organize team meetings",
        "To showcase skills and win recognition",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Competition"]
    },
    {
      id: 44,
      question: "What is the purpose of a design hackathon?",
      choices: [
        "To organize project files",
        "To collaborate and create innovative solutions quickly",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Innovation"]
    },
    {
      id: 45,
      question: "What is the purpose of a design meetup?",
      choices: [
        "To organize team meetings",
        "To network, learn, and share knowledge locally",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Networking"]
    },
    {
      id: 46,
      question: "What is the purpose of a design workshop?",
      choices: [
        "To organize project files",
        "To learn new skills through hands-on practice",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Learning"]
    },
    {
      id: 47,
      question: "What is the purpose of a design webinar?",
      choices: [
        "To organize team meetings",
        "To learn from experts remotely",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Education"]
    },
    {
      id: 48,
      question: "What is the purpose of a design masterclass?",
      choices: [
        "To organize project files",
        "To learn advanced techniques from industry experts",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Education"]
    },
    {
      id: 49,
      question: "What is the purpose of a design bootcamp?",
      choices: [
        "To organize team meetings",
        "To learn design skills intensively in a short time",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Education"]
    },
    {
      id: 50,
      question: "What is the purpose of a design degree?",
      choices: [
        "To organize project files",
        "To gain comprehensive education and theoretical foundation",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Education"]
    },
    {
      id: 51,
      question: "What is the purpose of a design thesis?",
      choices: [
        "To organize team meetings",
        "To conduct research and contribute to design knowledge",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Research"]
    },
    {
      id: 52,
      question: "What is the purpose of a design dissertation?",
      choices: [
        "To organize project files",
        "To conduct extensive research and advance design theory",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Research"]
    },
    {
      id: 53,
      question: "What is the purpose of a design journal?",
      choices: [
        "To organize team meetings",
        "To publish research and share academic knowledge",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Research"]
    },
    {
      id: 54,
      question: "What is the purpose of a design conference paper?",
      choices: [
        "To organize project files",
        "To present research findings to the academic community",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Research"]
    },
    {
      id: 55,
      question: "What is the purpose of a design patent?",
      choices: [
        "To organize team meetings",
        "To protect intellectual property and innovations",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Intellectual Property"]
    },
    {
      id: 56,
      question: "What is the purpose of a design trademark?",
      choices: [
        "To organize project files",
        "To protect brand identity and prevent confusion",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Intellectual Property"]
    },
    {
      id: 57,
      question: "What is the purpose of a design copyright?",
      choices: [
        "To organize team meetings",
        "To protect original creative works",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Intellectual Property"]
    },
    {
      id: 58,
      question: "What is the purpose of a design license?",
      choices: [
        "To organize project files",
        "To grant permission to use design work",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Intellectual Property"]
    },
    {
      id: 59,
      question: "What is the purpose of a design contract?",
      choices: [
        "To organize team meetings",
        "To define terms, scope, and legal obligations",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Legal"]
    },
    {
      id: 60,
      question: "What is the purpose of a design agreement?",
      choices: [
        "To organize project files",
        "To establish mutual understanding and expectations",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Legal"]
    },
    {
      id: 61,
      question: "What is the purpose of a design proposal?",
      choices: [
        "To organize team meetings",
        "To outline approach, timeline, and costs",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Business"]
    },
    {
      id: 62,
      question: "What is the purpose of a design estimate?",
      choices: [
        "To organize project files",
        "To provide cost projections and timelines",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Business"]
    },
    {
      id: 63,
      question: "What is the purpose of a design invoice?",
      choices: [
        "To organize team meetings",
        "To request payment for completed work",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Business"]
    },
    {
      id: 64,
      question: "What is the purpose of a design receipt?",
      choices: [
        "To organize project files",
        "To provide proof of payment",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Business"]
    },
    {
      id: 65,
      question: "What is the purpose of a design budget?",
      choices: [
        "To organize team meetings",
        "To plan and track financial resources",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Business"]
    },
    {
      id: 66,
      question: "What is the purpose of a design timeline?",
      choices: [
        "To organize project files",
        "To plan and track project milestones",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Project Management"]
    },
    {
      id: 67,
      question: "What is the purpose of a design milestone?",
      choices: [
        "To organize team meetings",
        "To mark important project achievements",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Project Management"]
    },
    {
      id: 68,
      question: "What is the purpose of a design deliverable?",
      choices: [
        "To organize project files",
        "To provide completed work to clients",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Project Management"]
    },
    {
      id: 69,
      question: "What is the purpose of a design review?",
      choices: [
        "To organize team meetings",
        "To evaluate work quality and provide feedback",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Project Management"]
    },
    {
      id: 70,
      question: "What is the purpose of a design approval?",
      choices: [
        "To organize project files",
        "To get client or stakeholder sign-off",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Project Management"]
    },
    {
      id: 71,
      question: "What is the purpose of a design revision?",
      choices: [
        "To organize team meetings",
        "To make changes based on feedback",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Project Management"]
    },
    {
      id: 72,
      question: "What is the purpose of a design iteration?",
      choices: [
        "To organize project files",
        "To improve designs through repeated cycles",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Project Management"]
    },
    {
      id: 73,
      question: "What is the purpose of a design version?",
      choices: [
        "To organize team meetings",
        "To track different stages of design development",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Project Management"]
    },
    {
      id: 74,
      question: "What is the purpose of a design backup?",
      choices: [
        "To organize project files",
        "To protect work from loss or corruption",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Project Management"]
    },
    {
      id: 75,
      question: "What is the purpose of a design archive?",
      choices: [
        "To organize team meetings",
        "To store completed projects for future reference",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Project Management"]
    },
    {
      id: 76,
      question: "What is the purpose of a design template?",
      choices: [
        "To organize project files",
        "To provide reusable design structures",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Efficiency"]
    },
    {
      id: 77,
      question: "What is the purpose of a design library?",
      choices: [
        "To organize team meetings",
        "To store reusable design components",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Efficiency"]
    },
    {
      id: 78,
      question: "What is the purpose of a design asset?",
      choices: [
        "To organize project files",
        "To provide reusable design elements",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Efficiency"]
    },
    {
      id: 79,
      question: "What is the purpose of a design resource?",
      choices: [
        "To organize team meetings",
        "To provide tools and materials for design work",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Efficiency"]
    },
    {
      id: 80,
      question: "What is the purpose of a design tool?",
      choices: [
        "To organize project files",
        "To create, edit, and manipulate design elements",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Tools"]
    },
    {
      id: 81,
      question: "What is the purpose of a design software?",
      choices: [
        "To organize team meetings",
        "To provide digital tools for design creation",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Tools"]
    },
    {
      id: 82,
      question: "What is the purpose of a design plugin?",
      choices: [
        "To organize project files",
        "To extend software functionality",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Tools"]
    },
    {
      id: 83,
      question: "What is the purpose of a design extension?",
      choices: [
        "To organize team meetings",
        "To add features to existing software",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Tools"]
    },
    {
      id: 84,
      question: "What is the purpose of a design add-on?",
      choices: [
        "To organize project files",
        "To enhance software capabilities",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Tools"]
    },
    {
      id: 85,
      question: "What is the purpose of a design script?",
      choices: [
        "To organize team meetings",
        "To automate repetitive tasks",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Automation"]
    },
    {
      id: 86,
      question: "What is the purpose of a design macro?",
      choices: [
        "To organize project files",
        "To record and replay actions",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Automation"]
    },
    {
      id: 87,
      question: "What is the purpose of a design workflow?",
      choices: [
        "To organize team meetings",
        "To streamline design processes",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Efficiency"]
    },
    {
      id: 88,
      question: "What is the purpose of a design pipeline?",
      choices: [
        "To organize project files",
        "To manage design production stages",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Efficiency"]
    },
    {
      id: 89,
      question: "What is the purpose of a design automation?",
      choices: [
        "To organize team meetings",
        "To reduce manual work and increase efficiency",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Automation"]
    },
    {
      id: 90,
      question: "What is the purpose of a design optimization?",
      choices: [
        "To organize project files",
        "To improve performance and efficiency",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Efficiency"]
    },
    {
      id: 91,
      question: "What is the purpose of a design performance?",
      choices: [
        "To organize team meetings",
        "To measure and improve design effectiveness",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Analytics"]
    },
    {
      id: 92,
      question: "What is the purpose of a design metric?",
      choices: [
        "To organize project files",
        "To quantify design success and impact",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Analytics"]
    },
    {
      id: 93,
      question: "What is the purpose of a design analytics?",
      choices: [
        "To organize team meetings",
        "To analyze user behavior and design performance",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Analytics"]
    },
    {
      id: 94,
      question: "What is the purpose of a design insight?",
      choices: [
        "To organize project files",
        "To understand user needs and behavior patterns",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Analytics"]
    },
    {
      id: 95,
      question: "What is the purpose of a design report?",
      choices: [
        "To organize team meetings",
        "To communicate findings and recommendations",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Communication"]
    },
    {
      id: 96,
      question: "What is the purpose of a design presentation?",
      choices: [
        "To organize project files",
        "To showcase work and communicate ideas",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Communication"]
    },
    {
      id: 97,
      question: "What is the purpose of a design story?",
      choices: [
        "To organize team meetings",
        "To communicate design decisions and rationale",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Communication"]
    },
    {
      id: 98,
      question: "What is the purpose of a design narrative?",
      choices: [
        "To organize project files",
        "To explain design process and outcomes",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Communication"]
    },
    {
      id: 99,
      question: "What is the purpose of a design case study?",
      choices: [
        "To organize team meetings",
        "To document design process and outcomes",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Documentation"]
    },
    {
      id: 100,
      question: "What is the purpose of a design portfolio piece?",
      choices: [
        "To organize project files",
        "To showcase specific design work and skills",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Portfolio"]
    },
    {
      id: 101,
      question: "What is the purpose of a design showcase?",
      choices: [
        "To organize team meetings",
        "To display and celebrate design achievements",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Recognition"]
    },
    {
      id: 102,
      question: "What is the purpose of a design exhibition?",
      choices: [
        "To organize project files",
        "To publicly display and share design work",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Recognition"]
    },
    {
      id: 103,
      question: "What is the purpose of a design gallery?",
      choices: [
        "To organize team meetings",
        "To curate and display design collections",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Recognition"]
    },
    {
      id: 104,
      question: "What is the purpose of a design museum?",
      choices: [
        "To organize project files",
        "To preserve and educate about design history",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Education"]
    },
    {
      id: 105,
      question: "What is the purpose of a design archive?",
      choices: [
        "To organize team meetings",
        "To preserve and organize historical design materials",
        "To create project budgets",
        "To track project progress"
      ],
      correct: 1,
      tags: ["Design Career", "Preservation"]
    }
  ],
  color: [
    {
      id: 1,
      question: "Which color is complementary to red?",
      choices: [
        "Blue",
        "Green",
        "Yellow",
        "Cyan"
      ],
      correct: 1,
      tags: ["Color Theory", "Complementary Colors"]
    },
    {
      id: 2,
      question: "What color scheme uses three colors equally spaced on the color wheel?",
      choices: [
        "Monochromatic",
        "Analogous",
        "Triadic",
        "Split-complementary"
      ],
      correct: 2,
      tags: ["Color Theory", "Color Schemes"]
    },
    {
      id: 3,
      question: "Which color represents trust and stability?",
      choices: [
        "Red",
        "Blue",
        "Green",
        "Yellow"
      ],
      correct: 1,
      tags: ["Color Psychology", "Branding"]
    },
    {
      id: 4,
      question: "What is the RGB value for pure white?",
      choices: [
        "0,0,0",
        "255,255,255",
        "128,128,128",
        "100,100,100"
      ],
      correct: 1,
      tags: ["Color Theory", "RGB"]
    },
    {
      id: 5,
      question: "Which color temperature is considered warm?",
      choices: [
        "Blue",
        "Green",
        "Red",
        "Purple"
      ],
      correct: 2,
      tags: ["Color Theory", "Color Temperature"]
    }
  ]
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'DeQuiz API is running!' });
});

// Get quiz questions by type
app.get('/api/quiz/:type', (req, res) => {
  const { type } = req.params;
  
  if (!quizData[type]) {
    return res.status(404).json({ error: 'Quiz type not found' });
  }
  
  res.json({
    type,
    questions: quizData[type]
  });
});

// Get all available quiz types
app.get('/api/quiz-types', (req, res) => {
  const quizTypes = Object.keys(quizData).map(type => ({
    id: type,
    name: type === 'design' ? 'Design Quiz' : 'Color Matching',
    description: type === 'design' 
      ? 'Test your knowledge about design principles, UI/UX, and creative concepts.'
      : 'Challenge yourself with color theory, palettes, and matching exercises.',
    icon: type === 'design' ? '🎨' : '🌈'
  }));
  
  res.json(quizTypes);
});

// Submit quiz results
app.post('/api/quiz/submit', (req, res) => {
  const { quizType, score, totalQuestions, answeredQuestions, timeLimit } = req.body;
  
  if (!quizType || score === undefined || !totalQuestions) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Here you would typically save to a database
  const result = {
    id: Date.now(),
    quizType,
    score,
    totalQuestions,
    accuracy: Math.round((score / totalQuestions) * 100),
    answeredQuestions,
    timeLimit,
    timestamp: new Date().toISOString()
  };
  
  res.json({
    message: 'Quiz results saved successfully',
    result
  });
});

// Get quiz statistics
app.get('/api/stats', (req, res) => {
  // Mock statistics - in a real app, this would come from a database
  const stats = {
    totalQuizzes: 1250,
    averageScore: 3.2,
    mostPopularType: 'design',
    recentActivity: [
      { type: 'design', score: 4, timestamp: new Date(Date.now() - 300000).toISOString() },
      { type: 'color', score: 3, timestamp: new Date(Date.now() - 600000).toISOString() },
      { type: 'design', score: 5, timestamp: new Date(Date.now() - 900000).toISOString() }
    ]
  };
  
  res.json(stats);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`DeQuiz server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
}); 