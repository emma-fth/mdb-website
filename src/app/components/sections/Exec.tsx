import Image from 'next/image'

interface ExecMember {
  name: string
  title: string
  image: string
}

const execMembers: ExecMember[] = [
  {
    name: "Noah Yin",
    title: "President",
    image: "/images/noah-goat.jpeg"
  },
  {
    name: "Jeffrey Yum",
    title: "VP of Internal Affairs",
    image: "/images/jefflineage5.jpg"
  },
  {
    name: "Hailee Yun",
    title: "VP of Marketing",
    image: "/images/mdb5 2.jpg"
  },
  {
    name: "Kevin Lin",
    title: "VP of Internal Affairs",
    image: "/images/car2.jpeg"
  },
  {
    name: "Bonnie Wang",
    title: "VP of Operations",
    image: "/images/mdb-ride.jpg"
  },
  {
    name: "Aldrin Ong",
    title: "VP of Projects",
    image: "/images/table1.jpeg"
  },
  {
    name: "Amol Budhiraja",
    title: "VP of Education",
    image: "/images/mdb-goats.jpeg"
  }
]

export default function Exec() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#D1DFF2]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Exec</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {execMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 