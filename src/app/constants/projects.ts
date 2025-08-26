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
  // HealthConnect project removed
]
