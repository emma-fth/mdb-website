import { BaseMember } from '../types/members'

export interface Client extends BaseMember {
  link: string
  type: string
  description: string
  techStack: string[]
  purpose: string
  date: string
  pms: string[]
  screenshots: string[]
  disableViewProject?: boolean
}

export const clientProjects: Client[] = [
  {
    name: "Circuit",
    title: "Online Speed Dating Site",
    link: "https://circuitspeeddating.com", // Add actual link if available
    type: "Online Speed Dating Site",
    image: "/images/circuit-logo.png", // Update with actual logo path if available
    description: "A full-stack web platform for virtual and in-person speed dating events. Built with React, Firebase, and Stripe, the site includes advanced matching algorithms, automated event management, and secure payment processing.",
    techStack: ["React", "Firebase", "Tailwind/CSS", "Stripe"],
    purpose: "Online Speed Dating",
    date: "Fall 2025",
    pms: ["Sodbayar, Mike"],
  screenshots: [
      "/screenshots/circuit1.png",
      "/screenshots/circuit2.png",
      "/screenshots/circuit3.png"
    ]
  },
  {
    name: "Lafayette Square",
    title: "Internal Analytics App",
    link: "",
    type: "Internal Analytics App",
    image: "/images/lafayette-logo.png", // Update with actual logo path if available
    description: "An internal tool for analyzing demographic and financial data to support impact investment decisions. Our MDB team built the web app using React, Firebase, and PyTorch, with interactive dashboards, custom reporting, and rich data visualizations. This project challenged members to work with complex datasets, create intuitive UI/UX, and deliver meaningful insights to a real client.",
    techStack: ["React Native", "Pytorch", "Firebase"],
    purpose: "Community Impact Investment",
    date: "Spring 2025",
    pms: ["Lara", "Edan"],
    screenshots: [
      "/screenshots/ls1.png",
      "/screenshots/ls2.png"
    ],
    disableViewProject: true
  },
  {
    name: "SUR",
    title: "RV Rental App",
    link: "",
    type: "RV Rental App",
    image: "/images/sur-logo.png", // Update with actual logo path if available
    description: "An iOS marketplace where users can rent RVs and off-road vehicles directly from owners. Our MDB team designed and developed the app using Swift and Firebase, building features like real-time search, booking, and payment integration. Our developers got hands-on experience with mobile development, backend integration, and shipping a production-ready product.",
    techStack: ["Swift", "Supabase", "Firebase"],
    purpose: "Accessible vehicle rentals",
    date: "Fall 2025",
    pms: ["Subham"],
    screenshots: [
      "/screenshots/sur1.png"
    ],
    disableViewProject: true
  },
  {
    name: "Salamati",
    title: "Mobile Health & Education Platform",
    link: "https://play.google.com/store/apps/details?id=com.aldrin0n9.salamati",
    type: "Women's Safety & Empowerment App",
    image: "/images/salamati-logo.png",
    description: "A mobile health platform built for Safe Path Prosperity (NGO) empowering women in Afghanistan. Our MDB team developed the app using React Native, Supabase, and Twilio, building features like a multilingual resource library (English/Dari), authenticated user roles, a secure community chatroom with moderation, a healthcare provider directory, and an integrated ordering system for local pickup. This project challenged members to work with sensitive data, implement robust security measures, and deliver a platform with real social impact.",
    techStack: ["React Native", "Supabase", "Twilio"],
    purpose: "Women's Safety & Empowerment",
    date: "Spring 2024",
    pms: ["Aldrin"],
    screenshots: [
      "/screenshots/salamati1.png",
      "/screenshots/salamati2.png",
      "/screenshots/salamati4.png",
      "/screenshots/salamati3.png",
      "/screenshots/salamati5.png"
    ]
  },
  {
    name: "Joy",
    title: "AI Wellness Platform",
    link: "https://apps.apple.com/vn/app/joy-ai-wellness-platform/id1618609385?platform=iphone",
    type: "AI Wellness Platform",
    image: "/images/joy-logo.png",
    description: "An AI-powered wellness application built for Koer A.I., Inc that helps users track mental health practices and emotions. Our MDB team designed and developed the app using React Native, PyTorch, Firebase, and Stripe, implementing features like audio playback with transcripts, AI-driven recommendations, subscription management, and analytics dashboards. Our developers gained hands-on experience with AI integration, payment processing, and scalable app development.",
    techStack: ["React Native", "PyTorch", "Firebase", "Stripe"],
    purpose: "Mental Health & Wellness",
    date: "N/A",
    pms: ["N/A"],
    screenshots: [
      "/screenshots/joy1.png",
      "/screenshots/joy2.png",
      "/screenshots/joy3.png",
      "/screenshots/joy4.png"
    ]
  },
  {
    name: "GreekLine",
    title: "Greek Life Safety Platform",
    link: "",
    type: "Greek Life Safety Platform",
    image: "/images/greekline-logo.png",
    description: "A safety platform built for Bearline, LLC to help Greek organizations create safer communities. Our MDB team built the app using React Native, Supabase, and Twilio, developing features like anonymous hotlines with automatic phone number generation, organization management tools, role-based access controls, and secure messaging. The project involved rigorous quality assurance before successful App Store deployment, giving members production-ready development experience.",
    techStack: ["React Native", "Supabase", "Twilio"],
    purpose: "Greek Life Safety & Reporting",
    date: "Fall 2023",
    pms: ["Amol"],
    screenshots: [
      "/screenshots/greekline1.png",
      "/screenshots/greekline2.png",
      "/screenshots/greekline3.png",
      "/screenshots/greekline4.png",
      "/screenshots/greekline5.png",
    ]
  },
  // HealthConnect project removed
]
