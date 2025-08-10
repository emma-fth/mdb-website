'use client'

import MemberSection from '../../components/sections/MemberSection'
import { useMembers } from '../../hooks/useMembers'

export default function Exec() {
  const { execMembers, loading, error } = useMembers()

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-[#D1DFF2]">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mdb-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leadership...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-[#D1DFF2]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">Error loading leadership: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <MemberSection
      title="Leadership"
      members={execMembers}
      gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      gradientDirection="up"
    />
  )
} 