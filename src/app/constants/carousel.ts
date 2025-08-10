import { CarouselStrip } from '../types/members'

export const CAROUSEL_STRIPS: CarouselStrip[] = [
  {
    id: 1,
    name: "Top Strip",
    description: "First carousel strip - moves right to left",
    direction: "left"
  },
  {
    id: 2,
    name: "Middle Strip", 
    description: "Second carousel strip - moves left to right",
    direction: "right"
  },
  {
    id: 3,
    name: "Bottom Strip",
    description: "Third carousel strip - moves right to left",
    direction: "left"
  }
]

export const DEFAULT_CAROUSEL_ITEMS = [
  // Strip 1 - Top (right to left)
  { type: 'image', src: "/images/lafayette5.jpg", caption: "Lafayette Square Contract Team", strip: 1, order: 1 },
  { type: 'image', src: "/images/edan-goat.jpeg", caption: "PM Edan planning out our W against Codebase", strip: 1, order: 2 },
  { type: 'video', src: "/videos/mdb-video.MP4", caption: "MDB Picnic at the Glade", strip: 1, order: 3 },
  { type: 'image', src: "/images/table1.jpeg", caption: "MDB Banquet Dinner", strip: 1, order: 4 },
  { type: 'image', src: "/images/mdb-ride.jpg", caption: "Riding the Superman at Six Flags", strip: 1, order: 5 },
  { type: 'image', src: "/images/car2.jpeg", caption: "MDB in Hawaii, Kevin's Car", strip: 1, order: 6 },
  { type: 'image', src: "/images/stpat.jpeg", caption: "St. Patty's Day!", strip: 1, order: 7 },
  { type: 'image', src: "/images/wnc.jpg", caption: "Wine and Cheese Night!", strip: 1, order: 8 },
  { type: 'image', src: "/images/noah-goat.jpeg", caption: "Noah our beloved 2024-2025 President", strip: 1, order: 9 },
  { type: 'image', src: "/images/jefflineage5.jpg", caption: "Jeff's Lineage - MDB Legacy", strip: 1, order: 10 },
  { type: 'image', src: "/images/newbies.jpeg", caption: "Newbie Hike!", strip: 1, order: 11 },

  // Strip 2 - Middle (left to right)
  { type: 'image', src: "/images/mdb-goats.jpeg", caption: "MDB LShip GOATs.", strip: 2, order: 1 },
  { type: 'video', src: "/videos/mdb-goal.MP4", caption: "GOOOOOOOOOOOOOOOOOOOOOL", strip: 2, order: 2 },
  { type: 'image', src: "/images/8ball.jpeg", caption: "8-Ball, Jai taking the L against Riana", strip: 2, order: 3 },
  { type: 'image', src: "/images/wbn1.jpeg", caption: "Welcome Back Night (Chryssa, Morrell, Elisa, Sarah)", strip: 2, order: 4 },
  { type: 'image', src: "/images/circuit7.jpg", caption: "Circuit Contract Team", strip: 2, order: 5 },
  { type: 'image', src: "/images/table3.jpeg", caption: "MDB Banquet Dinner", strip: 2, order: 6 },
  { type: 'image', src: "/images/mdb-hawaii.jpg", caption: "MDB HAWAII RETREAT SPRING 2025", strip: 2, order: 7 },
  { type: 'image', src: "/images/car1.jpeg", caption: "MDB in Hawaii, Preston's Car", strip: 2, order: 8 },
  { type: 'image', src: "/images/mdb5 2.jpg", caption: "Mobile Developers of Berkeley", strip: 2, order: 9 },
  { type: 'image', src: "/images/pms2.jpg", caption: "Project Manager Team Spring 2025", strip: 2, order: 10 },
  { type: 'image', src: "/images/6flags-selfie.jpg", caption: "MDB Selfie @The Joker", strip: 2, order: 11 },

  // Strip 3 - Bottom (right to left)
  { type: 'video', src: "/videos/gitlit.mp4", caption: "Git Lit? Got Lit.", strip: 3, order: 1 },
  { type: 'image', src: "/images/soccer-w.jpg", caption: "MDB supporting our IM Soccer Team", strip: 3, order: 2 },
  { type: 'image', src: "/images/tp-over.jpg", caption: "TP Instructor MO ending the semester with a bang", strip: 3, order: 3 },
  { type: 'image', src: "/images/wbn2.jpeg", caption: "Welcome Back Night (Cathryn, Angie, Val, Renata, Emma, Danica)", strip: 3, order: 4 },
  { type: 'image', src: "/images/sur7.jpg", caption: "Sur Contract Team", strip: 3, order: 5 },
  { type: 'image', src: "/images/mdb-newnite.jpg", caption: "Newbie Night <3", strip: 3, order: 6 },
  { type: 'image', src: "/images/mdb-6flags.jpeg", caption: "MDB @Six Flags", strip: 3, order: 7 },
  { type: 'image', src: "/images/car3.jpeg", caption: "MDB in Hawaii, Mike's Car", strip: 3, order: 8 },
  { type: 'image', src: "/images/edan-pair.jpg", caption: "Edan and his Little Alp", strip: 3, order: 9 },
  { type: 'image', src: "/images/table2.jpeg", caption: "MDB Banquet Dinner", strip: 3, order: 10 }
]
