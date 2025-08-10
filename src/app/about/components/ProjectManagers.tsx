'use client'

import MemberSection from '../../components/sections/MemberSection'
import { useMembers } from '../../hooks/useMembers'

export default function ProjectManagers() {
  const { projectManagers, loading, error } = useMembers()

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-[#D1DFF2] to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mdb-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project managers...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-[#D1DFF2] to-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">Error loading project managers: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <MemberSection
      title="Project Managers"
      members={projectManagers}
      gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      gradientDirection="down"
    />
  )
} 