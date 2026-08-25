'use client'

import { useMemo } from 'react'
import { execMembers } from '../constants/exec'
import { members } from '../constants/members'

export const useMembers = () => {
  // Memoized results for better performance
  const memoizedExec = useMemo(() => execMembers, [])
  const memoizedMembers = useMemo(() => members, [])

  return {
    execMembers: memoizedExec,
    members: memoizedMembers,
    loading: false,
    error: null,
    loadAllMembers: () => Promise.resolve(),
    addExecMember: () => Promise.reject(new Error('Static data - cannot add members')),
    addMember: () => Promise.reject(new Error('Static data - cannot add members')),
    updateExecMemberById: () => Promise.reject(new Error('Static data - cannot update members')),
    updateMemberById: () => Promise.reject(new Error('Static data - cannot update members')),
    removeExecMember: () => Promise.reject(new Error('Static data - cannot remove members')),
    removeMember: () => Promise.reject(new Error('Static data - cannot remove members')),
    clearCache: () => {}
  }
}
