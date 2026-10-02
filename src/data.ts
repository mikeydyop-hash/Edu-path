export interface RiasecCode {
  code: string;
  name: string;
  description: string;
  vibe: string;
}

export const RIASEC_CODES: RiasecCode[] = [
  {
    code: "R",
    name: "Realistic (The Doers)",
    description: "Likes working with hands, machines, tools, animals, or outdoors. Practical and active.",
    vibe: "Hands-on, building, mechanical, athletic"
  },
  {
    code: "I",
    name: "Investigative (The Thinkers)",
    description: "Likes studying, researching, solving math/science problems, and analytical thinking.",
    vibe: "Scientific, research, abstract, coding"
  },
  {
    code: "A",
    name: "Artistic (The Creators)",
    description: "Likes self-expression, music, art, design, writing, and creative problem-solving.",
    vibe: "Design, writing, music, visual arts"
  },
  {
    code: "S",
    name: "Social (The Helpers)",
    description: "Likes teaching, nursing, counseling, helping others, and team-based cooperation.",
    vibe: "Coaching, therapy, teaching, community"
  },
  {
    code: "E",
    name: "Enterprising (The Persuaders)",
    description: "Likes leading, speaking, marketing, starting projects, and driving initiatives.",
    vibe: "Leadership, business, public speaking, politics"
  },
  {
    code: "C",
    name: "Conventional (The Organizers)",
    description: "Likes working with data, numbers, records, spreadsheets, and structured systems.",
    vibe: "Data analysis, finance, operations, database"
  }
];

export const CURRICULA = [
  { id: "cbe-kenya", name: "CBE Kenya (Competency Based Education - Grade 10-12)" },
  { id: "844-kenya", name: "Kenyan 8-4-4 (Secondary/KCSE Level)" },
  { id: "british", name: "British Curriculum (IGCSE & A-Levels)" },
  { id: "american", name: "American Curriculum (AP & SATs)" },
  { id: "waec", name: "West African Curriculum (WAEC/WASSCE)" },
  { id: "generic", name: "Generic High School (GPA & Standard Coursework)" }
];

export const COUNTRIES = [
  { code: "KE", name: "Kenya" },
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "ZA", name: "South Africa" },
  { code: "UG", name: "Uganda" },
  { code: "RW", name: "Rwanda" },
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "IN", name: "India" },
  { code: "OTHER", name: "Other / International" }
];

export const TARGET_REGIONS = [
  "Local Region (Stay in home country)",
  "East Africa (Kenya, Uganda, Rwanda, Tanzania)",
  "West Africa (Nigeria, Ghana)",
  "Southern Africa (South Africa, Mauritius)",
  "United Kingdom",
  "North America (United States & Canada)",
  "Europe (Germany, France, Netherlands)",
  "Middle East (UAE, Qatar)",
  "Asia-Pacific (Australia, Malaysia, Singapore, India)"
];

export const SOFT_SKILLS = [
  "Critical Thinking",
  "Analytical Problem Solving",
  "Public Speaking & Debate",
  "Creative Design / Writing",
  "Leadership & Team Delegation",
  "Interpersonal Communication",
  "Empathy & Active Listening",
  "Time Management & Planning",
  "Collaboration & Collective Work",
  "Adaptability & Resilience",
  "Technical Troubleshooting",
  "Data Visualization"
];

export const CERTIFICATIONS_EXTRACURRICULARS = [
  "Robotics / Coding STEM Club",
  "Student Council / Prefect / Class Rep",
  "Music / Art Graded Certification",
  "First Aid / St. John Ambulance / Red Cross",
  "Model United Nations (MUN)",
  "School Sports Team / Athlete",
  "Community Volunteer Project Leader",
  "Junior Achievement / Business Challenge",
  "Debate Club / Drama Club",
  "Young Farmers / Science Congress"
];

// Subjects list indexed by curriculum ID
export const CURRICULUM_SUBJECTS: Record<string, string[]> = {
  "cbe-kenya": [
    "Mathematics",
    "English",
    "Kiswahili",
    "Biology",
    "Chemistry",
    "Physics",
    "General Science",
    "History & Citizenship",
    "Geography",
    "Business Studies",
    "Agriculture",
    "Computer Science",
    "Art & Design",
    "Music",
    "Home Science",
    "Foreign Languages (French/German/Arabic)"
  ],
  "844-kenya": [
    "Mathematics",
    "English",
    "Kiswahili",
    "Biology",
    "Chemistry",
    "Physics",
    "History & Government",
    "Geography",
    "Christian Religious Education (CRE)",
    "Islamic Religious Education (IRE)",
    "Business Studies",
    "Agriculture",
    "Computer Studies",
    "Home Science",
    "French / German / Arabic",
    "Music",
    "Art & Design"
  ],
  "british": [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English Language & Literature",
    "History",
    "Geography",
    "Computer Science / ICT",
    "Economics & Business Studies",
    "Art & Design",
    "French / Spanish / German",
    "Further Mathematics",
    "Sociology / Psychology"
  ],
  "american": [
    "AP Calculus (AB/BC)",
    "AP Physics (1/2/C)",
    "AP Chemistry",
    "AP Biology",
    "AP Computer Science A / Principles",
    "AP English Language & Composition",
    "AP US / European / World History",
    "AP Macro/Microeconomics",
    "AP Psychology",
    "Pre-Calculus / Algebra 2",
    "Creative Writing & Literature",
    "Environmental Science",
    "Art & Graphic Design"
  ],
  "waec": [
    "General Mathematics",
    "English Language",
    "Civic Education",
    "Biology",
    "Chemistry",
    "Physics",
    "Agricultural Science",
    "Geography",
    "Government & History",
    "Economics",
    "Financial Accounting",
    "Technical Drawing / Metalwork",
    "Literature-in-English",
    "Christian Religious Knowledge / Islamic Studies",
    "Computer Studies"
  ],
  "generic": [
    "Mathematics (Algebra, Geometry, Calculus)",
    "English Language & Composition",
    "General Science / Physical Science",
    "Biology",
    "Chemistry",
    "Physics",
    "World History & Civics",
    "Geography",
    "Social Studies",
    "Computer Science / Coding",
    "Economics & Finance",
    "Fine Arts / Music",
    "Foreign Languages"
  ]
};

// Standard grades options for mapping
export const GRADES_BY_CURRICULUM: Record<string, string[]> = {
  "cbe-kenya": ["Exceeding Expectation (EE)", "Meeting Expectation (ME)", "Approaching Expectation (AE)", "Below Expectation (BE)"],
  "844-kenya": ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "E"],
  "british": ["A*", "A", "B", "C", "D", "E", "U"],
  "american": ["A", "B", "C", "D", "F", "AP 5", "AP 4", "AP 3", "AP 2", "AP 1"],
  "waec": ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"],
  "generic": ["A / 4.0", "A- / 3.7", "B+ / 3.3", "B / 3.0", "B- / 2.7", "C+ / 2.3", "C / 2.0", "D / 1.0", "F / 0.0"]
};

export interface UniversityInfo {
  name: string;
  rank: string;
  type: string;
  keyPrograms: string[];
  description: string;
  logoText: string;
}

export const TOP_UNIVERSITIES_BY_COUNTRY: Record<string, UniversityInfo[]> = {
  KE: [
    { name: "Strathmore University", rank: "#1 Private Tech-Business University", type: "Private", keyPrograms: ["BSc. Informatics & Computer Science", "BBIT", "Law"], description: "Renowned for state-of-the-art facilities, direct industry connections, and robust entrepreneurship incubation systems.", logoText: "SU" },
    { name: "University of Nairobi", rank: "#1 National Research University", type: "Public", keyPrograms: ["Medicine & Surgery", "Civil Engineering", "Computer Science"], description: "The premier public institution producing leading policy makers, medical scholars, and technical specialists across East Africa.", logoText: "UoN" },
    { name: "Jomo Kenyatta University (JKUAT)", rank: "#1 Engineering Hub", type: "Public", keyPrograms: ["Mechatronic Engineering", "Architecture", "Software Engineering"], description: "Highly practical, technical powerhouse producing Kenya's top systems engineers and builders.", logoText: "JKU" },
    { name: "United States International University (USIU-Africa)", rank: "#1 Liberal Arts & Global Studies", type: "Private", keyPrograms: ["International Relations", "Psychology", "Global Business"], description: "Dual-accredited in US & Kenya, offering a highly diverse multicultural campus environment.", logoText: "USIU" }
  ],
  NG: [
    { name: "University of Ibadan", rank: "#1 Historic Academic Pioneer", type: "Public", keyPrograms: ["Medicine & Surgery", "Political Science", "Mechanical Engineering"], description: "Nigeria's oldest and most prestigious university, highly celebrated for post-graduate medical research.", logoText: "UI" },
    { name: "University of Lagos (UNILAG)", rank: "#1 Commercial Tech Hub Partner", type: "Public", keyPrograms: ["Computer Engineering", "Finance & Accounting", "Mass Communication"], description: "Situated in the tech capital Lagos, hosting exceptional startup accelerators and highly connected career tracks.", logoText: "UL" },
    { name: "Covenant University", rank: "#1 High-Impact Private Pioneer", type: "Private", keyPrograms: ["Information & Comm. Technology", "Petroleum Engineering", "Business Admin"], description: "Known for rigorous discipline, top-tier global research output, and exceptional modern computing labs.", logoText: "CU" }
  ],
  GH: [
    { name: "University of Ghana (Legon)", rank: "#1 National Landmark", type: "Public", keyPrograms: ["Business Administration", "Law", "Computer Science"], description: "The premier research institution of Ghana with gorgeous historic campuses and leading liberal science curricula.", logoText: "UG" },
    { name: "Ashesi University", rank: "#1 Liberal Arts & Tech Innovator", type: "Private", keyPrograms: ["Computer Science", "Mechanical Engineering", "Management Info Systems"], description: "World-class private college focusing on ethics, entrepreneurial leadership, and high-quality modern engineering.", logoText: "AU" },
    { name: "KNUST", rank: "#1 Science & Tech Powerhouse", type: "Public", keyPrograms: ["Aerospace Engineering", "Architecture", "Pharmacy"], description: "The epicenter of technological and scientific progress in West Africa, with highly practical laboratories.", logoText: "KN" }
  ],
  ZA: [
    { name: "University of Cape Town", rank: "#1 in Africa (QS Ranked)", type: "Public", keyPrograms: ["Actuarial Science", "Astrophysics", "Medicine", "AI Studies"], description: "Highest rated university in Africa, set on the gorgeous Table Mountain slopes, hosting premier global researchers.", logoText: "UCT" },
    { name: "University of the Witwatersrand (Wits)", rank: "#1 Mining & Technical Engineering", type: "Public", keyPrograms: ["Data Science", "Mining Engineering", "Finance", "Law"], description: "Deeply embedded in Johannesburg's industrial core, creating powerful career outcomes for innovators.", logoText: "Wits" },
    { name: "Stellenbosch University", rank: "#1 Research & Biotech Pioneer", type: "Public", keyPrograms: ["Biomedical Engineering", "Viticulture", "Data Science"], description: "World-famous innovation ecosystem, leading South Africa in patent filings and biotech developments.", logoText: "SU" }
  ],
  UG: [
    { name: "Makerere University", rank: "#1 East African Landmark", type: "Public", keyPrograms: ["Medicine", "Agricultural Sciences", "Software Engineering"], description: "One of the oldest and most legendary academic centers in Africa, producing generations of continental leaders.", logoText: "MAK" },
    { name: "Mbarara University of Science & Tech", rank: "#1 Practical Medicine & Applied Tech", type: "Public", keyPrograms: ["Medicine", "Biomedical Engineering", "Information Technology"], description: "Highly recognized for community-rooted medical programs and practical tech research partnerships.", logoText: "MUST" }
  ],
  RW: [
    { name: "University of Rwanda", rank: "#1 National General University", type: "Public", keyPrograms: ["Applied Statistics", "Electrical Engineering", "Civil Infrastructure"], description: "Consolidated national framework producing exceptional engineers and public sector leaders.", logoText: "UR" },
    { name: "Carnegie Mellon University Africa (CMU-A)", rank: "#1 Elite American Computing Branch", type: "Private", keyPrograms: ["MSc. Information Technology", "MSc. Electrical & Computer Engineering"], description: "Delivers the exact world-class US curriculum in Kigali, funded partially by Rwanda's government.", logoText: "CMU" },
    { name: "African Leadership University (ALU)", rank: "#1 Entrepreneurial Leadership", type: "Private", keyPrograms: ["Software Engineering", "Global Challenges", "Entrepreneurship"], description: "Innovative model focused entirely on real-world projects, global challenges, and direct leadership development.", logoText: "ALU" }
  ],
  US: [
    { name: "Massachusetts Institute of Technology (MIT)", rank: "#1 Globally (QS)", type: "Private", keyPrograms: ["Computer Science & AI", "Aerospace Engineering", "Physics"], description: "The ultimate peak of global technology, robotics, physical sciences, and radical engineering research.", logoText: "MIT" },
    { name: "Stanford University", rank: "#1 Silicon Valley Catalyst", type: "Private", keyPrograms: ["Computer Science", "Symbolic Systems", "Electrical Engineering"], description: "The entrepreneurial heartbeat of Silicon Valley, producing legendary founders, software visionaries, and leaders.", logoText: "STAN" },
    { name: "Harvard University", rank: "#1 Ivy League Standard", type: "Private", keyPrograms: ["Economics", "Computer Science", "Government & Public Policy"], description: "The world's richest library and network, offering peerless humanities, sciences, and global leadership training.", logoText: "HARV" }
  ],
  UK: [
    { name: "University of Oxford", rank: "#1 in Europe", type: "Public", keyPrograms: ["PPE (Philosophy, Politics & Econ)", "Mathematics & CS", "Medicine"], description: "The oldest English-speaking academic icon, employing the elite tutorial system for unmatched individual depth.", logoText: "OX" },
    { name: "University of Cambridge", rank: "#2 Global Science Leader", type: "Public", keyPrograms: ["Natural Sciences", "Computer Science", "Engineering"], description: "Scientific birthplace of modern computing, DNA discovery, and gravity, offering elite mathematical study.", logoText: "CANT" },
    { name: "Imperial College London", rank: "#1 STEM Specialists", type: "Public", keyPrograms: ["Computing (AI & ML)", "Aeronautical Engineering", "Physics"], description: "Deeply focused on Science, Engineering, Medicine, and Business, set right in the heart of London.", logoText: "IMP" }
  ],
  CA: [
    { name: "University of Toronto", rank: "#1 in Canada", type: "Public", keyPrograms: ["Computer Science (AI & Deep Learning)", "Engineering Science", "Finance"], description: "Birthplace of modern Neural Networks (AlexNet), offering deep tech systems and massive global career placement.", logoText: "UofT" },
    { name: "University of British Columbia", rank: "#2 Canadian Research Pillar", type: "Public", keyPrograms: ["Environmental Forestry", "Data Science", "Biophysics"], description: "Set on a spectacular coastal campus, renowned globally for sustainability research and applied sciences.", logoText: "UBC" },
    { name: "University of Waterloo", rank: "#1 Co-op Program Globally", type: "Public", keyPrograms: ["Software Engineering", "Quantum Computing", "Combinatorics"], description: "Famous for alternating study terms with 2 years of real silicon valley employment, producing elite developers.", logoText: "UW" }
  ],
  IN: [
    { name: "IIT Bombay (Indian Institute of Technology)", rank: "#1 Technical Institute in India", type: "Public", keyPrograms: ["Computer Science & Engineering", "Electrical Systems", "Aerospace"], description: "The absolute peak of Indian mathematical and system engineering selectivity, drawing the nation's top 0.01% minds.", logoText: "IITB" },
    { name: "Indian Institute of Science (IISc Bangalore)", rank: "#1 Indian Pure Science Research", type: "Public", keyPrograms: ["Materials Science", "Biochemistry", "Quantum Computation"], description: "A quiet global research giant nestled in India's tech hub, focusing entirely on advanced breakthroughs.", logoText: "IISc" }
  ],
  OTHER: [
    { name: "National University of Singapore", rank: "#1 in Asia-Pacific", type: "Public", keyPrograms: ["Computer Science", "Quantitative Finance", "Bioengineering"], description: "Highly funded, ultra-modern tech global powerhouse, perfect gateway into advanced Asian business & tech.", logoText: "NUS" },
    { name: "ETH Zurich", rank: "#1 continental European Tech", type: "Public", keyPrograms: ["Quantum Physics", "Robotics", "Computer Science"], description: "Albert Einstein's alma mater, representing the highest standards of mathematical rigor and European engineering.", logoText: "ETH" }
  ]
};
