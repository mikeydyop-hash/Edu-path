import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Brain,
  BookOpen,
  Globe,
  Sparkles,
  AlertTriangle,
  School,
  Award,
  Check,
  Loader2,
  MapPin,
  FileText,
  User,
  GraduationCap,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Info,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  LogIn,
  LogOut,
  Lock,
  Mail,
  Search
} from "lucide-react";
import {
  RIASEC_CODES,
  CURRICULA,
  COUNTRIES,
  TARGET_REGIONS,
  SOFT_SKILLS,
  CERTIFICATIONS_EXTRACURRICULARS,
  CURRICULUM_SUBJECTS,
  GRADES_BY_CURRICULUM,
  TOP_UNIVERSITIES_BY_COUNTRY,
  UniversityInfo
} from "./data";
import {
  UserProfile,
  SubjectSelectorResponse,
  UniversityMatcherResponse
} from "./types";

export default function App() {
  // Goal state matching Task A, Task B, or University Explorer
  const [task, setTask] = useState<"subject-selector" | "university-matcher" | "university-explorer">("subject-selector");

  // Student Authentication / Login Domain State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginEmailPrefix, setLoginEmailPrefix] = useState<string>("amara.okoth");
  const [loginDomain, setLoginDomain] = useState<string>("student.edupath.ai");
  const [customLoginDomain, setCustomLoginDomain] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("••••••••");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  
  // Active logged-in student profile
  const [studentProfile, setStudentProfile] = useState<{
    name: string;
    email: string;
    domain: string;
    schoolName: string;
  } | null>(null);

  // Explorer State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [explorerCountry, setExplorerCountry] = useState<string>("ALL");

  // Helper flags
  const getCountryFlag = (code: string) => {
    const flags: Record<string, string> = {
      KE: "🇰🇪",
      NG: "🇳🇬",
      GH: "🇬🇭",
      ZA: "🇿🇦",
      UG: "🇺🇬",
      RW: "🇷🇼",
      US: "🇺🇸",
      UK: "🇬🇧",
      CA: "🇨🇦",
      IN: "🇮🇳"
    };
    return flags[code] || "🌍";
  };

  // Filtered universities based on Explorer selection & Search input
  const getFilteredUniversities = () => {
    let result: Array<UniversityInfo & { countryCode: string }> = [];
    
    // Flatten universities with their country code
    Object.entries(TOP_UNIVERSITIES_BY_COUNTRY).forEach(([countryCode, univs]) => {
      univs.forEach(univ => {
        result.push({
          ...univ,
          countryCode
        });
      });
    });

    // Filter by country
    if (explorerCountry !== "ALL") {
      result = result.filter(u => u.countryCode === explorerCountry);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.description.toLowerCase().includes(q) || 
        u.keyPrograms.some(prog => prog.toLowerCase().includes(q))
      );
    }

    return result;
  };

  const filteredUniversities = getFilteredUniversities();

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    setTimeout(() => {
      const selectedDomain = loginDomain === "custom" ? customLoginDomain : loginDomain;
      const finalEmail = `${loginEmailPrefix || "student"}@${selectedDomain || "edupath.ai"}`;
      
      let prefilledName = "Guest Student";
      let prefilledSchool = "Global High School";
      
      if (selectedDomain.includes("strathmore.edu")) {
        prefilledName = "Amara Okoth";
        prefilledSchool = "Strathmore Academic Hub";
        setTask("subject-selector");
        setSelectedRiasec("I");
        setPassions("Building robotic systems, analyzing statistics, and resolving software puzzles.");
        setSelectedSoftSkills(["Critical Thinking", "Analytical Problem Solving", "Technical Troubleshooting"]);
        setCurriculum("cbe-kenya");
        setCountry("KE");
        setTargetRegions(["Local Region (Stay in home country)", "East Africa (Kenya, Uganda, Rwanda, Tanzania)"]);
        setSelectedCertifications(["Robotics / Coding STEM Club"]);
      } else if (selectedDomain.includes("ashesi.edu.gh")) {
        prefilledName = "Kofi Mensah";
        prefilledSchool = "Ashesi Tech Prep School";
        setTask("university-matcher");
        setSelectedRiasec("A");
        setPassions("Writing creative screenplays, layout design, and mechanical engineering prototyping.");
        setSelectedSoftSkills(["Creative Design / Writing", "Critical Thinking"]);
        setCurriculum("waec");
        setCountry("GH");
        setTargetRegions(["West Africa (Nigeria, Ghana)", "North America (United States & Canada)"]);
        setSelectedCertifications(["Music / Art Graded Certification", "Debate Club / Drama Club"]);
        setGrades({
          "General Mathematics": "A1",
          "English Language": "B2",
          "Biology": "B3",
          "Chemistry": "A1",
          "Physics": "B2"
        });
      } else if (selectedDomain.includes("oxford.ac.uk")) {
        prefilledName = "Clara Smith";
        prefilledSchool = "Coventry Academy";
        setTask("university-matcher");
        setSelectedRiasec("I");
        setPassions("Quantum physics computation, advanced mathematics proofs, and genetic studies.");
        setSelectedSoftSkills(["Critical Thinking", "Analytical Problem Solving"]);
        setCurriculum("british");
        setCountry("UK");
        setTargetRegions(["United Kingdom", "Europe (Germany, France, Netherlands)"]);
        setSelectedCertifications(["Debate Club / Drama Club", "Young Farmers / Science Congress"]);
        setGrades({
          "Mathematics": "A*",
          "Physics": "A*",
          "Chemistry": "A",
          "Biology": "B"
        });
      } else if (selectedDomain.includes("toronto.edu")) {
        prefilledName = "Liam Chen";
        prefilledSchool = "Toronto Collegiate";
        setTask("subject-selector");
        setSelectedRiasec("C");
        setPassions("Financial forecasting models, statistical databases, and enterprise planning software.");
        setSelectedSoftSkills(["Time Management & Planning", "Data Visualization", "Critical Thinking"]);
        setCurriculum("generic");
        setCountry("CA");
        setTargetRegions(["North America (United States & Canada)", "Europe (Germany, France, Netherlands)"]);
        setSelectedCertifications(["Junior Achievement / Business Challenge"]);
      } else {
        prefilledName = loginEmailPrefix ? loginEmailPrefix.split(".").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "Custom Student";
        prefilledSchool = `${selectedDomain.split(".")[0].toUpperCase()} Affiliate`;
      }

      setStudentProfile({
        name: prefilledName,
        email: finalEmail,
        domain: selectedDomain,
        schoolName: prefilledSchool
      });
      
      setIsLoggedIn(true);
      setIsLoggingIn(false);
      setIsLoginModalOpen(false);
      setError(null);
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentProfile(null);
  };

  // Psychometric Layer State
  const [selectedRiasec, setSelectedRiasec] = useState<string>("I");
  const [passions, setPassions] = useState<string>("");
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);

  // Academic Layer State
  const [curriculum, setCurriculum] = useState<string>("cbe-kenya");
  const [favoriteSubjects, setFavoriteSubjects] = useState<string[]>([]);
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);

  // Geographic Layer State
  const [country, setCountry] = useState<string>("KE");
  const [targetRegions, setTargetRegions] = useState<string[]>(["Local Region (Stay in home country)"]);

  // Application engine status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  // Results states
  const [subjectResult, setSubjectResult] = useState<SubjectSelectorResponse | null>(null);
  const [universityResult, setUniversityResult] = useState<UniversityMatcherResponse | null>(null);

  // Auto-switch available subjects & default grades when curriculum changes
  useEffect(() => {
    setFavoriteSubjects([]);
    setGrades({});
    // Set some initial core grades for the selected curriculum to make it easier to test
    const subjectsList = CURRICULUM_SUBJECTS[curriculum] || [];
    const gradeOptions = GRADES_BY_CURRICULUM[curriculum] || [];
    if (gradeOptions.length > 0) {
      const initialGrades: Record<string, string> = {};
      // Preset top 5 subjects with some sensible good grades
      subjectsList.slice(0, 5).forEach((sub, index) => {
        initialGrades[sub] = gradeOptions[0]; // Set to top grade
      });
      setGrades(initialGrades);
    }
  }, [curriculum]);

  // Handle Loading Messages Interval
  useEffect(() => {
    if (!isLoading) return;
    
    const messages = [
      "Analyzing personality traits and RIASEC Holland codes...",
      "Mapping local curriculum pathways and track regulations...",
      "Matching grades against university prerequisite clusters...",
      "Consulting regional registries and scholarship rules...",
      "Structuring career guidance pathways and optimal combinations...",
      "Finalizing your hyper-localized advisory report..."
    ];
    
    setLoadingMessage(messages[0]);
    let index = 0;
    
    const timer = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingMessage(messages[index]);
    }, 2500);
    
    return () => clearInterval(timer);
  }, [isLoading]);

  // Get dynamic RIASEC Holland Code Heights for the graph representation
  const getRiasecBarHeight = (code: string) => {
    const defaultHeights: Record<string, string> = {
      R: "h-[30%]",
      I: "h-[45%]",
      A: "h-[35%]",
      S: "h-[25%]",
      E: "h-[40%]",
      C: "h-[20%]"
    };
    
    // Boost heights based on currently selected primary code to look premium and interactive
    if (selectedRiasec === code) return "h-[95%]";
    
    // secondary correlations
    if (selectedRiasec === "R" && code === "I") return "h-[75%]";
    if (selectedRiasec === "I" && code === "R") return "h-[85%]";
    if (selectedRiasec === "A" && code === "S") return "h-[65%]";
    if (selectedRiasec === "S" && code === "A") return "h-[60%]";
    if (selectedRiasec === "E" && code === "C") return "h-[70%]";
    if (selectedRiasec === "C" && code === "E") return "h-[65%]";

    return defaultHeights[code] || "h-[30%]";
  };

  // Convert grades into numeric widths for progress indicators
  const getGradePercentage = (grade: string) => {
    if (!grade) return "w-0";
    if (grade.includes("Exceeding") || grade === "A*" || grade === "A" || grade.includes("5") || grade === "A1") return "w-[95%] bg-emerald-500";
    if (grade.includes("Meeting") || grade === "A-" || grade === "B+" || grade.includes("4") || grade.startsWith("B")) return "w-[80%] bg-indigo-500";
    if (grade.includes("Approaching") || grade === "B" || grade === "B-" || grade === "C+" || grade.includes("3") || grade.startsWith("C")) return "w-[60%] bg-amber-500";
    return "w-[35%] bg-rose-400";
  };

  // Handle main engine trigger
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSubjectResult(null);
    setUniversityResult(null);

    // Validation
    if (passions.trim().length < 5) {
      setError("Please write a brief sentence about your core passions or interests (at least 5 characters).");
      setIsLoading(false);
      return;
    }

    if (task === "subject-selector" && favoriteSubjects.length === 0) {
      setError("Please select at least one favorite/strongest subject.");
      setIsLoading(false);
      return;
    }

    if (targetRegions.length === 0) {
      setError("Please select at least one target study/work region.");
      setIsLoading(false);
      return;
    }

    const payload: UserProfile = {
      task,
      psychometric: {
        personality: RIASEC_CODES.find(r => r.code === selectedRiasec)?.name || "Investigative",
        passions,
        softSkills: selectedSoftSkills
      },
      academic: {
        curriculum: CURRICULA.find(c => c.id === curriculum)?.name || curriculum,
        favoriteSubjects: task === "subject-selector" ? favoriteSubjects : undefined,
        grades: task === "university-matcher" ? grades : undefined,
        certifications: selectedCertifications
      },
      geographic: {
        country: COUNTRIES.find(c => c.code === country)?.name || country,
        targetRegions
      }
    };

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to parse profile and consult AI counselor.");
      }

      const data = await response.json();
      if (task === "subject-selector") {
        setSubjectResult(data);
      } else {
        setUniversityResult(data);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please verify your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSoftSkill = (skill: string) => {
    setSelectedSoftSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleToggleFavoriteSubject = (sub: string) => {
    setFavoriteSubjects(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const handleToggleCertification = (cert: string) => {
    setSelectedCertifications(prev => 
      prev.includes(cert) ? prev.filter(s => s !== cert) : [...prev, cert]
    );
  };

  const handleToggleRegion = (region: string) => {
    setTargetRegions(prev => 
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const handleGradeChange = (sub: string, grade: string) => {
    setGrades(prev => ({ ...prev, [sub]: grade }));
  };

  // Pre-seed mock values for fast testing and onboarding
  const handleLoadDemoProfile = (type: "technical" | "humanities") => {
    if (type === "technical") {
      setTask("university-matcher");
      setSelectedRiasec("I");
      setPassions("Building robotic systems, analyzing statistics, and resolving software puzzles.");
      setSelectedSoftSkills(["Critical Thinking", "Analytical Problem Solving", "Technical Troubleshooting"]);
      setCurriculum("cbe-kenya");
      setCountry("KE");
      setTargetRegions(["Local Region (Stay in home country)", "North America (United States & Canada)"]);
      setSelectedCertifications(["Robotics / Coding STEM Club", "Young Farmers / Science Congress"]);
      
      const coreSubs = CURRICULUM_SUBJECTS["cbe-kenya"] || [];
      const seedGrades: Record<string, string> = {};
      coreSubs.slice(0, 6).forEach((sub) => {
        if (["Mathematics", "Physics", "Chemistry", "Computer Science"].includes(sub)) {
          seedGrades[sub] = "Exceeding Expectation (EE)";
        } else {
          seedGrades[sub] = "Meeting Expectation (ME)";
        }
      });
      setGrades(seedGrades);
    } else {
      setTask("subject-selector");
      setSelectedRiasec("A");
      setPassions("Writing short plays, designing magazine templates, and digital content creation.");
      setSelectedSoftSkills(["Creative Design / Writing", "Public Speaking & Debate", "Interpersonal Communication"]);
      setCurriculum("british");
      setCountry("NG");
      setTargetRegions(["United Kingdom", "West Africa (Nigeria, Ghana)"]);
      setSelectedCertifications(["Debate Club / Drama Club", "Music / Art Graded Certification"]);
      setFavoriteSubjects(["English Language & Literature", "Art & Design", "History"]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. SIDEBAR NAVIGATION - matches layout patterns of Professional Polish */}
      <aside className="w-full lg:w-64 border-r border-slate-200 bg-white p-6 flex flex-col h-auto lg:h-screen lg:sticky lg:top-0 justify-between">
        <div className="space-y-8">
          
          {/* Logo Brand Header */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-indigo-900 block font-display leading-none">EduPath AI</span>
              <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">COUNSELING CORE</span>
            </div>
          </div>

          {/* Navigation Links (State Switchers) */}
          <nav className="space-y-1.5">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Student Advisory Portal
            </div>
            
            <button
              onClick={() => { setTask("subject-selector"); setError(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer text-left ${
                task === "subject-selector"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
              id="sidebar-task-a"
            >
              <BookOpen className="w-4.5 h-4.5 flex-shrink-0" />
              <span>Career DNA Selector</span>
            </button>

            <button
              onClick={() => { setTask("university-matcher"); setError(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer text-left ${
                task === "university-matcher"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
              id="sidebar-task-b"
            >
              <School className="w-4.5 h-4.5 flex-shrink-0" />
              <span>Uni Admissions Matcher</span>
            </button>

            <button
              onClick={() => { setTask("university-explorer"); setError(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer text-left ${
                task === "university-explorer"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
              id="sidebar-task-c"
            >
              <Globe className="w-4.5 h-4.5 flex-shrink-0" />
              <span>Global Campus Explorer</span>
            </button>
          </nav>

          {/* Demo presets directly on sidebar for ultimate accessibility */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="px-3 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Onboarding Templates
            </div>
            <button
              onClick={() => handleLoadDemoProfile("humanities")}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-indigo-800 bg-indigo-50/50 hover:bg-indigo-100/70 border border-indigo-100/50 rounded-md font-medium transition cursor-pointer"
            >
              <span>🎭</span>
              <span className="truncate">Creative (Subject Track)</span>
            </button>
            <button
              onClick={() => handleLoadDemoProfile("technical")}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100/70 border border-emerald-100/50 rounded-md font-medium transition cursor-pointer"
            >
              <span>💻</span>
              <span className="truncate">Science (University Match)</span>
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Avatar representation */}
        <div className="mt-8 lg:mt-auto border-t border-slate-150 pt-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-bold font-display text-sm shadow-sm uppercase">
              {isLoggedIn ? studentProfile?.name.charAt(0) : (selectedRiasec || "S")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 truncate">
                {isLoggedIn ? studentProfile?.name : "Amara Okoth"}
              </p>
              <p className="text-[10px] text-slate-500 font-mono truncate">
                {isLoggedIn ? studentProfile?.schoolName : `Grade 10 • ${CURRICULA.find(c => c.id === curriculum)?.name.split(" ")[0]}`}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN AREA CONTAINER - matches professional layout structure */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Main Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm/5">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-4.5 h-4.5 text-indigo-600" />
            <h1 className="text-xs sm:text-sm font-semibold text-slate-700 font-mono tracking-tight">
              {task === "subject-selector" 
                ? "Pathway Engine: Curriculum & Subject Combinations" 
                : task === "university-matcher"
                ? "Pathway Engine: Global Admissions viability"
                : "Pathway Engine: Global Campus Directory"
              }
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {!isLoggedIn ? (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3 py-1.5 text-xs bg-indigo-50 border border-indigo-200 rounded-lg font-bold text-indigo-700 hover:bg-indigo-100 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Student Login Domain</span>
                <span className="sm:hidden">Login</span>
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 pl-3 pr-2 py-1.5 rounded-lg">
                <div className="flex flex-col items-end text-right">
                  <span className="text-[10px] font-bold text-slate-800 flex items-center gap-1 leading-none">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {studentProfile?.name}
                  </span>
                  <span className="text-[8px] text-slate-500 font-mono mt-0.5 leading-none">{studentProfile?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 text-slate-400 hover:text-rose-600 bg-white hover:bg-rose-50 rounded border border-slate-150 hover:border-rose-100 transition cursor-pointer"
                  title="Logout from domain SSO"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            )}

            <span className="w-px h-6 bg-slate-200 mx-1"></span>

            <button
              onClick={() => handleLoadDemoProfile("humanities")}
              className="px-2.5 py-1.5 text-[11px] border border-slate-200 rounded-lg font-medium text-slate-600 bg-white hover:bg-slate-50 transition cursor-pointer"
            >
              🎭 Creative Demo
            </button>
            <button
              onClick={() => handleLoadDemoProfile("technical")}
              className="px-2.5 py-1.5 text-[11px] bg-indigo-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition cursor-pointer"
            >
              💻 Tech Demo
            </button>
          </div>
        </header>

        {/* Inner Content Grid */}
        <div className="p-4 sm:p-8 flex-1 space-y-6">
          
          {/* Welcome Dashboard Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-2 max-w-3xl">
              <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block">
                Youth Career & Curriculum Advisor
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                Global Youth Career & Curriculum Guidance Engine
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Configure your unique counselor coordinates on the left column. Our AI engine instantly evaluates local curriculum tracks (like CBE Kenya, British, American APs) and compiles your admissions profile.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
          </div>

          {/* Quick interactive Task switcher for smaller devices */}
          <div className="lg:hidden flex bg-slate-200/60 p-1 rounded-xl">
            <button
              onClick={() => { setTask("subject-selector"); setError(null); }}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition ${
                task === "subject-selector" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
              }`}
            >
              Subject Selector
            </button>
            <button
              onClick={() => { setTask("university-matcher"); setError(null); }}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition ${
                task === "university-matcher" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
              }`}
            >
              University Matcher
            </button>
            <button
              onClick={() => { setTask("university-explorer"); setError(null); }}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition ${
                task === "university-explorer" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
              }`}
            >
              Uni Explorer
            </button>
          </div>

          {/* Core Grid - 12 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Input Form Section (5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Profile Config Form Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-semibold text-xs text-slate-700 uppercase tracking-wider">Configure Data Triad</h3>
                  </div>
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold font-mono">
                    {task === "subject-selector" ? "TASK A" : "TASK B"}
                  </span>
                </div>

                <form onSubmit={handleAnalyze} className="p-6 space-y-6">
                  
                  {/* LAYER 1: PSYCHOMETRIC */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                      <span className="w-5 h-5 bg-indigo-50 rounded-md flex items-center justify-center text-indigo-600 font-mono text-[10px]">1</span>
                      <span>Psychometric Layer</span>
                    </div>

                    {/* RIASEC Buttons */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-700">Holland Career Type (RIASEC)</label>
                        <span className="text-[10px] text-slate-400 font-mono italic">Click to select primary trait</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {RIASEC_CODES.map((r) => (
                          <button
                            key={r.code}
                            type="button"
                            onClick={() => setSelectedRiasec(r.code)}
                            className={`p-2 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between h-20 ${
                              selectedRiasec === r.code
                                ? "bg-indigo-50 border-indigo-400 text-indigo-950 ring-2 ring-indigo-500/10"
                                : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                            }`}
                          >
                            <span className="font-mono font-bold text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 self-start">
                              {r.code}
                            </span>
                            <span className="text-[9px] font-bold leading-tight mt-1 line-clamp-1">
                              {r.name.split(" ")[0]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Passion Statement */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Passions & Long-Term Desires
                      </label>
                      <textarea
                        value={passions}
                        onChange={(e) => setPassions(e.target.value)}
                        rows={3}
                        required
                        placeholder="e.g. I am passionate about mechanical design, agriculture systems, and coding robotic automation workflows."
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 resize-none font-medium text-slate-700"
                      />
                    </div>

                    {/* Soft Skills */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        Selected Soft Skills
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {SOFT_SKILLS.map(skill => {
                          const isSelected = selectedSoftSkills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => handleToggleSoftSkill(skill)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                                isSelected
                                  ? "bg-slate-900 text-white border-slate-900"
                                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* LAYER 2: ACADEMIC */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                      <span className="w-5 h-5 bg-indigo-50 rounded-md flex items-center justify-center text-indigo-600 font-mono text-[10px]">2</span>
                      <span>Academic Layer</span>
                    </div>

                    {/* Curriculum */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">Curriculum System Context</label>
                      <select
                        value={curriculum}
                        onChange={(e) => setCurriculum(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/15"
                      >
                        {CURRICULA.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Favorite Subjects for Selector */}
                    {task === "subject-selector" && (
                      <div className="space-y-2 animate-fade-in">
                        <label className="block text-xs font-bold text-slate-700">Strongest Subjects (Choose 3-5)</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {(CURRICULUM_SUBJECTS[curriculum] || []).map(sub => {
                            const isSelected = favoriteSubjects.includes(sub);
                            return (
                              <button
                                key={sub}
                                type="button"
                                onClick={() => handleToggleFavoriteSubject(sub)}
                                className={`p-2 rounded-lg text-left text-[10px] font-bold border transition flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? "bg-indigo-50 text-indigo-900 border-indigo-400"
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                }`}
                              >
                                <span className="truncate">{sub}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Grades for Matcher */}
                    {task === "university-matcher" && (
                      <div className="space-y-3 animate-fade-in">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-bold text-slate-700">Report Card Grade Coordinates</label>
                          <span className="text-[9px] text-slate-400 font-mono italic">Set subject marks</span>
                        </div>
                        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 border border-slate-100 rounded-xl p-2 bg-slate-50">
                          {(CURRICULUM_SUBJECTS[curriculum] || []).map(sub => {
                            const gradeOptions = GRADES_BY_CURRICULUM[curriculum] || [];
                            const currentGrade = grades[sub] || "";
                            return (
                              <div key={sub} className="flex items-center justify-between gap-2 py-1 border-b border-slate-100 last:border-0">
                                <span className="text-[10px] text-slate-700 font-semibold truncate">{sub}</span>
                                <select
                                  value={currentGrade}
                                  onChange={(e) => handleGradeChange(sub, e.target.value)}
                                  className="text-[9px] p-1 rounded border border-slate-200 bg-white font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer w-24 text-center text-slate-800"
                                >
                                  <option value="">No Grade</option>
                                  {gradeOptions.map(g => (
                                    <option key={g} value={g}>{g}</option>
                                  ))}
                                </select>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">Extracurricular Certs</label>
                      <div className="flex flex-wrap gap-1">
                        {CERTIFICATIONS_EXTRACURRICULARS.map(cert => {
                          const isSelected = selectedCertifications.includes(cert);
                          return (
                            <button
                              key={cert}
                              type="button"
                              onClick={() => handleToggleCertification(cert)}
                              className={`px-2.5 py-1 rounded-lg text-[9px] font-semibold border transition cursor-pointer flex items-center gap-1 ${
                                isSelected
                                  ? "bg-emerald-600 text-white border-emerald-600"
                                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              <Award className="w-3 h-3 flex-shrink-0" />
                              <span>{cert}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* LAYER 3: GEOGRAPHIC */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                      <span className="w-5 h-5 bg-indigo-50 rounded-md flex items-center justify-center text-indigo-600 font-mono text-[10px]">3</span>
                      <span>Geographic Layer</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-700">Country</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full text-xs p-2 rounded-xl border border-slate-200 bg-white font-semibold"
                        >
                          {COUNTRIES.map(c => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-700">Target Study Regions</label>
                        <select
                          multiple
                          value={targetRegions}
                          onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions).map((option) => (option as HTMLOptionElement).value);
                            setTargetRegions(options);
                          }}
                          className="w-full text-xs p-2 rounded-xl border border-slate-200 bg-white h-20 focus:outline-none"
                        >
                          {TARGET_REGIONS.map(reg => (
                            <option key={reg} value={reg}>{reg}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing Profile Data...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-indigo-200" />
                        <span>Generate EduPath AI Report</span>
                      </>
                    )}
                  </button>

                  {/* Errors */}
                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                </form>
              </div>

              {/* Dynamic Interactive Psychometric & Academic Snapshot - Matches Professional Polish Visuals */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                
                {/* Holland Graph */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Psychometric Layer (RIASEC)</h4>
                    <span className="text-[9px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Active Code: {selectedRiasec}</span>
                  </div>
                  
                  <div className="flex items-end gap-2.5 h-24 mb-4 pt-4 border-b border-slate-100">
                    {RIASEC_CODES.map((r) => {
                      const isActive = selectedRiasec === r.code;
                      return (
                        <button
                          key={r.code}
                          type="button"
                          onClick={() => setSelectedRiasec(r.code)}
                          className="flex-1 flex flex-col items-center h-full group relative cursor-pointer"
                          title={r.name}
                        >
                          <div className="w-full bg-slate-100 rounded-t h-full relative overflow-hidden">
                            <motion.div 
                              layout
                              className={`absolute bottom-0 w-full rounded-t transition-all ${
                                isActive ? "bg-indigo-600" : "bg-indigo-200 group-hover:bg-indigo-300"
                              }`} 
                              style={{ height: selectedRiasec === r.code ? '100%' : '35%' }}
                            />
                          </div>
                          <span className={`text-[10px] font-extrabold mt-1.5 ${isActive ? "text-indigo-600 font-black" : "text-slate-400"}`}>
                            {r.code}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  
                  <p className="text-[11px] text-slate-500 leading-normal font-medium">
                    Primary: <strong className="text-slate-800">{RIASEC_CODES.find(r => r.code === selectedRiasec)?.name}</strong>.{" "}
                    {RIASEC_CODES.find(r => r.code === selectedRiasec)?.description}
                  </p>
                </div>

                {/* Academic Snapshot */}
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Grade Snapshot</h4>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {Object.keys(grades).length === 0 ? (
                      <p className="text-[10px] text-slate-400 italic">No grade points entered yet. Fill academic coordinates above.</p>
                    ) : (
                      Object.entries(grades).map(([sub, grade]) => (
                        <div key={sub} className="space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-600 font-semibold">{sub}</span>
                            <span className="text-slate-800 font-bold">{(grade as string) || "None"}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-300 ${getGradePercentage(grade as string)}`} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: Dynamic Advisory Output / Results Section (7 Columns) */}
            <div className="lg:col-span-7 space-y-6" id="results-container">
              
              <AnimatePresence mode="wait">
                
                {/* 1. Loading Pulse */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white rounded-2xl border border-slate-200 p-8 text-center py-24 shadow-sm flex flex-col items-center justify-center space-y-6 min-h-[450px]"
                    key="loading"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                      <Compass className="w-6 h-6 text-indigo-600 absolute animate-pulse" />
                    </div>
                    
                    <div className="space-y-2 max-w-sm">
                      <h3 className="font-display font-bold text-lg text-slate-900">EduPath Counselor Working</h3>
                      <p className="text-xs text-slate-500 italic h-12 flex items-center justify-center px-4">
                        "{loadingMessage}"
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 2. Welcome State or University Explorer */}
                {!isLoading && (task === "university-explorer" || (!subjectResult && !universityResult)) && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    key={task === "university-explorer" ? "explorer" : "welcome"}
                  >
                    {task === "university-explorer" ? (
                      /* DYNAMIC UNIVERSITY EXPLORER VIEW */
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                              <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-indigo-600 animate-pulse" />
                                <span>Global Campus Explorer</span>
                              </h3>
                              <p className="text-slate-500 text-xs mt-1">
                                Browse top-ranked universities. Search by name, country, or academic programs.
                              </p>
                            </div>
                            
                            {/* Search Query Input */}
                            <div className="relative w-full sm:w-60">
                              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                              <input
                                type="text"
                                placeholder="Search institutions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 font-semibold"
                              />
                            </div>
                          </div>

                          {/* Country Filter Badges */}
                          <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
                            <button
                              onClick={() => setExplorerCountry("ALL")}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition border cursor-pointer ${
                                explorerCountry === "ALL"
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              🌍 All Countries
                            </button>
                            {COUNTRIES.filter(c => c.code !== "OTHER").map(c => (
                              <button
                                key={c.code}
                                onClick={() => setExplorerCountry(c.code)}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition border cursor-pointer flex items-center gap-1 ${
                                  explorerCountry === c.code
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                <span>{getCountryFlag(c.code)}</span>
                                <span>{c.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* List of Universities */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {filteredUniversities.length === 0 ? (
                            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-xs font-semibold sm:col-span-2">
                              No universities found matching "{searchQuery}". Try selecting another country filter!
                            </div>
                          ) : (
                            filteredUniversities.map((univ, idx) => {
                              const countryName = COUNTRIES.find(c => c.code === univ.countryCode)?.name || "Global";
                              return (
                                <div
                                  key={idx}
                                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-indigo-400 transition flex flex-col justify-between"
                                >
                                  <div className="space-y-2.5">
                                    <div className="flex items-center gap-2.5">
                                      <div className="h-9 w-9 bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center rounded-lg text-xs flex-shrink-0">
                                        {univ.logoText}
                                      </div>
                                      <div className="min-w-0">
                                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate" title={univ.name}>
                                          {univ.name}
                                        </h4>
                                        <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                                          <span>{getCountryFlag(univ.countryCode)}</span>
                                          <span className="truncate">{countryName}</span>
                                          <span className="text-slate-300">•</span>
                                          <span className="text-[9px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-mono font-bold uppercase">{univ.type}</span>
                                        </span>
                                      </div>
                                    </div>

                                    <div className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50/50 px-2 py-0.5 rounded border border-indigo-100/30 inline-block">
                                      {univ.rank}
                                    </div>

                                    <p className="text-[11px] text-slate-500 leading-normal font-semibold line-clamp-3">
                                      {univ.description}
                                    </p>

                                    <div className="space-y-1">
                                      <span className="text-[9px] text-slate-400 uppercase font-extrabold tracking-wider block">Key Majors:</span>
                                      <div className="flex flex-wrap gap-1">
                                        {univ.keyPrograms.map((prog, pidx) => (
                                          <span key={pidx} className="bg-slate-50 text-slate-600 border border-slate-200 text-[9px] font-semibold px-1.5 py-0.5 rounded">
                                            {prog}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => {
                                      setCountry(univ.countryCode);
                                      setTask("university-matcher");
                                    }}
                                    className="w-full mt-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <School className="w-3.5 h-3.5" />
                                    <span>Analyze Admissions</span>
                                  </button>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    ) : (
                      /* ORIGINAL WELCOME STATE */
                      <div className="space-y-6">
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                          <Sparkles className="w-6 h-6" />
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-display font-bold text-xl text-slate-900">
                            Guidance Engine Idle - Waiting for coordinates
                          </h3>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                            EduPath AI operates dynamically on your psychometric profile and grade standing. Select a demo preset at the top of the screen or customize your coordinates on the left column to run the advisory engine.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/50 space-y-2">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-indigo-700" />
                              <h4 className="font-bold text-xs text-slate-800">Task A: Career Selector</h4>
                            </div>
                            <p className="text-[11px] text-slate-600 font-medium">
                              Guides subject selection and pathways under CBE Kenya or international high school curriculum.
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100/50 space-y-2">
                            <div className="flex items-center gap-2">
                              <School className="w-4 h-4 text-emerald-700" />
                              <h4 className="font-bold text-xs text-slate-800">Task B: Uni Admissions</h4>
                            </div>
                            <p className="text-[11px] text-slate-600 font-medium">
                              Maps KCSE mean grade or SAT scores to top tier universities, checking specific subject gap requirements.
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6 mt-6 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1.5 font-bold text-indigo-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            SYSTEM DEPLOYED & AUTHENTICATED
                          </span>
                          <span>v2026.2</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 3. Task A Result: Subject Selector Report */}
                {subjectResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    key="subject-result"
                  >
                    
                    {/* RECOMMENDED PATHWAY HERO BANNER - matches design style */}
                    <div className="bg-indigo-900 text-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-indigo-800 px-3 py-1 rounded-full text-[10px] font-semibold mb-4 text-indigo-200 uppercase tracking-widest">
                          RECOMMENDED PATHWAY
                        </div>
                        <h3 className="text-3xl font-bold font-display tracking-tight mb-4 text-white leading-tight">
                          {subjectResult.recommendedPathway}
                        </h3>
                        <p className="text-indigo-200 text-xs sm:text-sm leading-relaxed max-w-xl mb-6 font-medium">
                          Based on your {curriculum ? CURRICULA.find(c => c.id === curriculum)?.name : "high school"} metrics, Holland code ({selectedRiasec}), and passions, we've compiled the optimal curriculum tracks below.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-white/10 p-4 rounded-lg border border-white/10">
                            <h4 className="text-[10px] font-bold text-white/60 mb-2 uppercase tracking-wide font-mono">Target Region Alignment</h4>
                            <p className="text-xs font-semibold">{targetRegions.join(", ")}</p>
                          </div>
                          <div className="bg-white/10 p-4 rounded-lg border border-white/10">
                            <h4 className="text-[10px] font-bold text-white/60 mb-2 uppercase tracking-wide font-mono">Suggested Framework</h4>
                            <p className="text-xs font-semibold">{COUNTRIES.find(c => c.code === country)?.name || "Local Context"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-30" />
                    </div>

                    {/* Justification Details Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-indigo-600" />
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Advisory Justification</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {subjectResult.justification}
                      </p>
                    </div>

                    {/* Subject Combinations Grid */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Optimal Course & Subject Combinations</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {subjectResult.optimalSubjectCombinations.map((combo, idx) => (
                          <div 
                            key={idx} 
                            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition space-y-1.5 shadow-sm"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded flex items-center justify-center font-mono text-[10px] font-bold">
                                {idx + 1}
                              </span>
                              <span className="font-bold text-xs text-slate-900">{combo.subject}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-normal font-medium">
                              {combo.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Curriculum alignment card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-indigo-600" />
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Curriculum Framework Portability</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                        {subjectResult.geographicAnalysis}
                      </p>
                    </div>

                    {/* Report Footer buttons */}
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>Report ID: EPA-COMB-2026</span>
                      <button
                        onClick={() => { setSubjectResult(null); setError(null); }}
                        className="text-indigo-600 hover:text-indigo-800 font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Re-evaluate Profile</span>
                      </button>
                    </div>

                  </motion.div>
                )}

                {/* 4. Task B Result: University Matcher Report */}
                {universityResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    key="university-result"
                  >
                    
                    {/* ADMISSIONS VIABILITY HERO BANNER */}
                    <div className="bg-slate-900 text-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-emerald-900 px-3 py-1 rounded-full text-[10px] font-semibold mb-4 text-emerald-300 uppercase tracking-widest">
                          ADMISSIONS STANDING & TIER ASSESSMENT
                        </div>
                        <h3 className="text-3xl font-bold font-display tracking-tight mb-4 text-white leading-tight">
                          University Admissions viability
                        </h3>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mb-6 font-medium">
                          Our algorithms evaluated your report card grade cluster coordinates against specific global entrance prerequisites.
                        </p>

                        <div className="bg-white/10 p-4 rounded-lg border border-white/10 text-xs leading-relaxed font-medium text-slate-200">
                          {universityResult.academicTierAnalysis}
                        </div>
                      </div>
                      <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl opacity-30" />
                    </div>

                    {/* Matched Universities list */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <School className="w-4 h-4 text-indigo-600" />
                        <span>Top 3 Matched University Options</span>
                      </h4>

                      <div className="grid grid-cols-1 gap-4">
                        {universityResult.universityMatches.map((univ, idx) => (
                          <div 
                            key={idx}
                            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-emerald-300 transition"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-2">
                              <div>
                                <span className="text-[9px] font-bold text-emerald-600 font-mono uppercase tracking-wider block">CHOSEN MATCH {idx + 1}</span>
                                <h4 className="font-bold text-sm sm:text-base text-slate-900 mt-0.5">{univ.university}</h4>
                                <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                  {univ.country}
                                </span>
                              </div>

                              <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl text-right self-start sm:self-center">
                                <span className="text-[9px] font-mono font-bold block">COMPATIBILITY</span>
                                <span className="font-mono font-extrabold text-xs">{univ.matchScore}%</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <span className="text-[10px] text-slate-400 uppercase font-bold">Recommended Major</span>
                                <p className="text-xs font-bold text-slate-800">{univ.program}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] text-slate-400 uppercase font-bold">Key Entry Check</span>
                                <p className="text-[11px] text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded font-semibold leading-normal">
                                  {univ.entryRequirementsMet}
                                </p>
                              </div>
                            </div>

                            <p className="text-[11px] text-slate-600 leading-relaxed font-semibold pt-1.5 border-t border-slate-100">
                              {univ.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Academic Gaps warnings if any */}
                    {universityResult.academicGaps && universityResult.academicGaps.length > 0 && (
                      <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl space-y-2">
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />
                          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest">Admissions Prerequisite Alerts</h4>
                        </div>
                        <ul className="space-y-1">
                          {universityResult.academicGaps.map((gap, i) => (
                            <li key={i} className="text-[11px] text-amber-900 font-semibold flex items-start gap-1.5">
                              <span className="text-amber-500">•</span>
                              <span>{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actionable next steps */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-1.5">
                        <ChevronRight className="w-4.5 h-4.5 text-emerald-600" />
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Counselor Actionable Next Steps</h4>
                      </div>

                      <div className="space-y-2.5">
                        {universityResult.actionableNextSteps.map((step, idx) => (
                          <div key={idx} className="flex gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 shadow-sm/5">
                            <span className="w-5.5 h-5.5 bg-slate-200 text-slate-800 rounded flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0">
                              {idx + 1}
                            </span>
                            <p className="text-[11px] sm:text-xs text-slate-700 leading-normal font-medium">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Report Footer buttons */}
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>Report ID: EPA-ADMS-2026</span>
                      <button
                        onClick={() => { setUniversityResult(null); setError(null); }}
                        className="text-emerald-700 hover:text-slate-900 font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Re-evaluate Report</span>
                      </button>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

            </div>

          </div>

        </div>

        {/* Global Footer bar matching Professional Polish layout */}
        <footer className="h-12 bg-slate-100 border-t border-slate-200 px-6 sm:px-8 flex items-center justify-between text-[11px] text-slate-500 font-medium font-mono">
          <div className="flex items-center gap-4 sm:gap-6">
            <span>Current Curriculum: {CURRICULA.find(c => c.id === curriculum)?.name.split(" ")[0]}</span>
            <span className="hidden sm:inline">Active Trait: {RIASEC_CODES.find(r => r.code === selectedRiasec)?.name.split(" ")[0]}</span>
            <span>Target: Global</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Guidance Database 2026.3 Synced</span>
          </div>
        </footer>

      </main>

      {/* Dynamic Student Domain SSO Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-10"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 px-6 py-5 text-white">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm">Student Portal SSO</h3>
                    <p className="text-[10px] text-indigo-200">Authenticate through your student domain</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleStudentLogin} className="p-6 space-y-4">
                <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-100/50 text-[11px] text-slate-600 leading-normal font-semibold flex gap-2">
                  <span className="text-sm">💡</span>
                  <span>
                    EduPath supports SSO integration. Logging in via a partner school domain auto-authenticates coordinates and loads your student files!
                  </span>
                </div>

                {/* Email Address Prefix */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Student Username / Prefix</label>
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={loginEmailPrefix}
                        onChange={(e) => setLoginEmailPrefix(e.target.value)}
                        placeholder="e.g. amara.okoth"
                        className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 font-semibold text-slate-800"
                      />
                    </div>
                    <span className="text-slate-400 font-semibold text-sm">@</span>
                  </div>
                </div>

                {/* SSO Institutional Domain Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Institutional Email Domain</label>
                  <select
                    value={loginDomain}
                    onChange={(e) => setLoginDomain(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 text-slate-800"
                  >
                    <option value="student.strathmore.edu">🏫 student.strathmore.edu (Kenya Onboarding)</option>
                    <option value="student.ashesi.edu.gh">🏫 student.ashesi.edu.gh (Ghana Onboarding)</option>
                    <option value="student.oxford.ac.uk">🏫 student.oxford.ac.uk (UK Onboarding)</option>
                    <option value="student.toronto.edu">🏫 student.toronto.edu (Canada Onboarding)</option>
                    <option value="student.edupath.ai">🌍 student.edupath.ai (Default Portal)</option>
                    <option value="custom">✍️ Custom Academic Domain...</option>
                  </select>
                </div>

                {/* Custom Domain entry if selected */}
                {loginDomain === "custom" && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-xs font-bold text-slate-700">Enter Custom Domain</label>
                    <input
                      type="text"
                      required
                      value={customLoginDomain}
                      onChange={(e) => setCustomLoginDomain(e.target.value)}
                      placeholder="e.g. alliance.ac.ke"
                      className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 font-semibold text-slate-800"
                    />
                  </div>
                )}

                {/* Password field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Secure Domain Password</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 font-bold tracking-widest text-slate-800"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsLoginModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isLoggingIn ? (
                      <>
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Secure SSO Login</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
