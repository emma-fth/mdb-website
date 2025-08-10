'use client'

import { useMemo } from 'react'
import { execMembers } from '../constants/exec'
import { projectManagers } from '../constants/projectManagers'
import { members } from '../constants/members'
import { ExecMember, ProjectManager, Member } from '../types/members'

export const useMembers = () => {
  // Memoized results for better performance
  const memoizedExec = useMemo(() => execMembers, [])
  const memoizedPM = useMemo(() => projectManagers, [])
  const memoizedMembers = useMemo(() => members, [])

  return {
    execMembers: memoizedExec,
    projectManagers: memoizedPM,
    members: memoizedMembers,
    loading: false,
    error: null,
    loadAllMembers: () => Promise.resolve(),
    addExecMember: () => Promise.reject(new Error('Static data - cannot add members')),
    addProjectManager: () => Promise.reject(new Error('Static data - cannot add project managers')),
    addMember: () => Promise.reject(new Error('Static data - cannot add members')),
    updateExecMemberById: () => Promise.reject(new Error('Static data - cannot update members')),
    updateProjectManagerById: () => Promise.reject(new Error('Static data - cannot update project managers')),
    updateMemberById: () => Promise.reject(new Error('Static data - cannot update members')),
    removeExecMember: () => Promise.reject(new Error('Static data - cannot remove members')),
    removeProjectManager: () => Promise.reject(new Error('Static data - cannot remove project managers')),
    removeMember: () => Promise.reject(new Error('Static data - cannot remove members')),
    clearCache: () => {}
  }
}
