'use client'

import React, { useState, useMemo } from 'react'

// Define core interfaces
interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  activeStamps: number
  redeems: number
  allTimeStamps: number
  lastStampedLocation: string
  joinedDate: string
  joinOnly?: boolean
}

interface Invite {
  id: string
  sentDate: string
  name: string
  email: string
  status: 'Pending' | 'Accepted'
  stampCardName: string
  sentInvitesCount: number
}

interface UnsuccessfulInvite {
  id: string
  sentDate: string
  name: string
  email: string
  reason: string
  stampCardName: string
}

// Initial mock data matching the screenshots
const initialDemoMembers: Member[] = [
  { id: 'm-1', firstName: 'Sarah', lastName: 'Staddon', email: 'sarah@gmail.com', phone: '+18005682031', activeStamps: 4, redeems: 19, allTimeStamps: 45, lastStampedLocation: 'Bloom Café - Main Street', joinedDate: '2026-05-10' },
  { id: 'm-2', firstName: 'Baxter', lastName: 'Brett', email: 'baxter.b@hotmail.com', phone: '+16734928367', activeStamps: 6, redeems: 5, allTimeStamps: 46, lastStampedLocation: 'Bloom Café - Main Street', joinedDate: '2026-05-11' },
  { id: 'm-3', firstName: 'Serena', lastName: 'Hines', email: 'serena@gmail.com', phone: '+19261002395', activeStamps: 4, redeems: 8, allTimeStamps: 68, lastStampedLocation: 'Bloom Café - Main Street', joinedDate: '2026-05-12' },
  { id: 'm-4', firstName: 'Jack', lastName: 'Cook', email: 'jackcook@gmail.com', phone: '+18231423450', activeStamps: 9, redeems: 28, allTimeStamps: 72, lastStampedLocation: 'Bloom Café - Main Street', joinedDate: '2026-05-13' },
  { id: 'm-5', firstName: 'Jack', lastName: 'Cook', email: 'stoke.a@gmail.com', phone: '+18365102831', activeStamps: 9, redeems: 23, allTimeStamps: 74, lastStampedLocation: 'Bloom Café - Main Street', joinedDate: '2026-05-14' },
  { id: 'm-6', firstName: 'Naomi', lastName: 'Russell', email: 'naomi@gmail.com', phone: '+18719847058', activeStamps: 5, redeems: 14, allTimeStamps: 49, lastStampedLocation: 'Bloom Café - Main Street', joinedDate: '2026-05-15' },
  { id: 'm-7', firstName: 'James', lastName: 'Purcey', email: 'james_88@gmail.com', phone: '+18826301648', activeStamps: 8, redeems: 11, allTimeStamps: 53, lastStampedLocation: 'Bloom Café - Main Street', joinedDate: '2026-05-16' },
  { id: 'm-8', firstName: 'Chi', lastName: 'Lin', email: 'lin_chi@gmail.com', phone: '+18110210998', activeStamps: 5, redeems: 2, allTimeStamps: 15, lastStampedLocation: 'Bloom Café - Main Street', joinedDate: '2026-05-17' },
  { id: 'm-9', firstName: 'Linda', lastName: 'Fuertes', email: 'linda_f@gmail.com', phone: '+18840201025', activeStamps: 0, redeems: 3, allTimeStamps: 35, lastStampedLocation: 'Bloom Café - Main Street', joinedDate: '2026-05-18', joinOnly: true },
  { id: 'm-10', firstName: 'John', lastName: 'Macey', email: 'john_macey@gmail.com', phone: '+1876874756', activeStamps: 4, redeems: 4, allTimeStamps: 29, lastStampedLocation: 'Bloom Café - Main Street', joinedDate: '2026-05-19' }
]

const initialDemoInvites: Invite[] = [
  { id: 'inv-1', sentDate: '2026-06-08', name: 'David Smith', email: 'david.smith@example.com', status: 'Pending', stampCardName: 'Bloom Café Card', sentInvitesCount: 1 },
  { id: 'inv-2', sentDate: '2026-06-07', name: 'Emily Davis', email: 'emily.davis@example.com', status: 'Accepted', stampCardName: 'Bloom Café Card', sentInvitesCount: 1 }
]

const initialDemoUnsuccessful: UnsuccessfulInvite[] = [
  { id: 'un-1', sentDate: '2026-06-05', name: 'Michael Johnson', email: 'mjohnson@invalid-domain', reason: 'Invalid email address', stampCardName: 'Bloom Café Card' },
  { id: 'un-2', sentDate: '2026-06-04', name: 'Robert Miller', email: 'robert.m@company.com', reason: 'Mailbox full', stampCardName: 'Bloom Café Card' }
]

export default function MembersPage() {
  // Demo Mode toggle
  const [isDemoMode, setIsDemoMode] = useState(true)

  // Lists state (separate for demo vs live)
  const [demoMembers, setDemoMembers] = useState<Member[]>(initialDemoMembers)
  const [demoInvites, setDemoInvites] = useState<Invite[]>(initialDemoInvites)
  const [demoUnsuccessful, setDemoUnsuccessful] = useState<UnsuccessfulInvite[]>(initialDemoUnsuccessful)

  const [liveMembers, setLiveMembers] = useState<Member[]>([])
  const [liveInvites, setLiveInvites] = useState<Invite[]>([])
  const [liveUnsuccessful, setLiveUnsuccessful] = useState<UnsuccessfulInvite[]>([])

  // Resolve active lists based on mode
  const members = isDemoMode ? demoMembers : liveMembers
  const invites = isDemoMode ? demoInvites : liveInvites
  const unsuccessfulInvites = isDemoMode ? demoUnsuccessful : liveUnsuccessful

  const setMembers = isDemoMode ? setDemoMembers : setLiveMembers
  const setInvites = isDemoMode ? setDemoInvites : setLiveInvites
  const setUnsuccessful = isDemoMode ? setDemoUnsuccessful : setLiveUnsuccessful

  // Tabs state
  const [activeTab, setActiveTab] = useState<'joined' | 'sent' | 'unsuccessful'>('joined')

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('All Locations')
  const [stampCardFilter, setStampCardFilter] = useState('All Stamp Cards')
  const [showJoinOnly, setShowJoinOnly] = useState(false)
  const [inviteStatusFilter, setInviteStatusFilter] = useState('Total Invited')
  const [unsuccessfulFilter, setUnsuccessfulFilter] = useState('Total failed')

  // Sorting state
  const [sortBy, setSortBy] = useState<string>('firstName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Action Modals State
  const [activeModal, setActiveModal] = useState<null | 'create' | 'invite' | 'give_stamps' | 'redeem' | 'profile'>(null)
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null)

  // Form states
  const [formFirstName, setFormFirstName] = useState('')
  const [formLastName, setFormLastName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formInitialStamps, setFormInitialStamps] = useState('0')
  const [formInviteName, setFormInviteName] = useState('')
  const [formInviteEmail, setFormInviteEmail] = useState('')
  const [formGiveStampsMemberId, setFormGiveStampsMemberId] = useState('')
  const [formGiveStampsCount, setFormGiveStampsCount] = useState('1')
  const [formRedeemMemberId, setFormRedeemMemberId] = useState('')
  const [formRedeemCount, setFormRedeemCount] = useState('1')

  // Available options
  const locations = ['All Locations', 'Bloom Café - Main Street', 'Bloom Café - Downtown']
  const stampCards = ['All Stamp Cards', 'Bloom Café Card', 'VIP Card']

  // Handle Sort Toggle
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDirection('asc')
    }
    setCurrentPage(1)
  }

  // Sorting and Filtering logic
  const filteredAndSortedMembers = useMemo(() => {
    let result = [...members]

    // Location filter
    if (locationFilter !== 'All Locations') {
      result = result.filter(m => m.lastStampedLocation.includes(locationFilter.split(' - ')[1] || locationFilter))
    }

    // Join only filter
    if (showJoinOnly) {
      result = result.filter(m => m.joinOnly)
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(m => 
        m.firstName.toLowerCase().includes(q) || 
        m.lastName.toLowerCase().includes(q) || 
        m.email.toLowerCase().includes(q) || 
        m.phone.includes(q)
      )
    }

    // Sorting
    result.sort((a, b) => {
      let valA = (a as any)[sortBy]
      let valB = (b as any)[sortBy]

      if (typeof valA === 'string') {
        valA = valA.toLowerCase()
        valB = valB.toLowerCase()
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [members, locationFilter, showJoinOnly, searchQuery, sortBy, sortDirection])

  const filteredInvites = useMemo(() => {
    let result = [...invites]

    // Status filter
    if (inviteStatusFilter === 'Total Accepted') {
      result = result.filter(inv => inv.status === 'Accepted')
    } else if (inviteStatusFilter === 'Pending Invites') {
      result = result.filter(inv => inv.status === 'Pending')
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(inv => 
        inv.name.toLowerCase().includes(q) || 
        inv.email.toLowerCase().includes(q)
      )
    }

    // Sort by date or status
    result.sort((a, b) => b.sentDate.localeCompare(a.sentDate))
    return result
  }, [invites, inviteStatusFilter, searchQuery])

  const filteredUnsuccessful = useMemo(() => {
    let result = [...unsuccessfulInvites]

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(inv => 
        inv.name.toLowerCase().includes(q) || 
        inv.email.toLowerCase().includes(q)
      )
    }

    result.sort((a, b) => b.sentDate.localeCompare(a.sentDate))
    return result
  }, [unsuccessfulInvites, searchQuery])

  // Pagination bounds
  const activeListLength = useMemo(() => {
    if (activeTab === 'joined') return filteredAndSortedMembers.length
    if (activeTab === 'sent') return filteredInvites.length
    return filteredUnsuccessful.length
  }, [activeTab, filteredAndSortedMembers, filteredInvites, filteredUnsuccessful])

  const totalPages = Math.max(1, Math.ceil(activeListLength / rowsPerPage))

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    const end = start + rowsPerPage
    if (activeTab === 'joined') return filteredAndSortedMembers.slice(start, end)
    if (activeTab === 'sent') return filteredInvites.slice(start, end)
    return filteredUnsuccessful.slice(start, end)
  }, [activeTab, currentPage, rowsPerPage, filteredAndSortedMembers, filteredInvites, filteredUnsuccessful])

  // Profile Detail Resolving
  const selectedProfile = useMemo(() => {
    return members.find(m => m.id === selectedProfileId) || null
  }, [members, selectedProfileId])

  // Handlers for modal submissions
  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formFirstName || !formLastName || !formEmail) return

    const newM: Member = {
      id: `m-${Date.now()}`,
      firstName: formFirstName,
      lastName: formLastName,
      email: formEmail,
      phone: formPhone || '+1000000000',
      activeStamps: parseInt(formInitialStamps) || 0,
      redeems: 0,
      allTimeStamps: parseInt(formInitialStamps) || 0,
      lastStampedLocation: 'Bloom Café - Main Street',
      joinedDate: new Date().toISOString().split('T')[0]
    }

    setMembers([newM, ...members])
    setActiveModal(null)
    // Clear forms
    setFormFirstName('')
    setFormLastName('')
    setFormEmail('')
    setFormPhone('')
    setFormInitialStamps('0')
  }

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formInviteName || !formInviteEmail) return

    // Add to Sent invites
    const newInv: Invite = {
      id: `inv-${Date.now()}`,
      sentDate: new Date().toISOString().split('T')[0],
      name: formInviteName,
      email: formInviteEmail,
      status: 'Pending',
      stampCardName: 'Bloom Café Card',
      sentInvitesCount: 1
    }

    setInvites([newInv, ...invites])
    setActiveModal(null)
    setFormInviteName('')
    setFormInviteEmail('')
  }

  const handleGiveStampsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const targetId = formGiveStampsMemberId
    const amount = parseInt(formGiveStampsCount) || 1
    if (!targetId || amount <= 0) return

    setMembers(prev => prev.map(m => {
      if (m.id === targetId) {
        return {
          ...m,
          activeStamps: m.activeStamps + amount,
          allTimeStamps: m.allTimeStamps + amount,
          lastStampedLocation: 'Bloom Café - Main Street'
        }
      }
      return m
    }))

    setActiveModal(null)
    setFormGiveStampsMemberId('')
    setFormGiveStampsCount('1')
  }

  const handleRedeemSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const targetId = formRedeemMemberId
    const amount = parseInt(formRedeemCount) || 1
    if (!targetId || amount <= 0) return

    setMembers(prev => prev.map(m => {
      if (m.id === targetId) {
        // Simple logic: deduction is 10 stamps per redeem
        const stampsNeeded = amount * 10
        const updatedStamps = Math.max(0, m.activeStamps - stampsNeeded)
        return {
          ...m,
          activeStamps: updatedStamps,
          redeems: m.redeems + amount,
          lastStampedLocation: 'Bloom Café - Main Street'
        }
      }
      return m
    }))

    setActiveModal(null)
    setFormRedeemMemberId('')
    setFormRedeemCount('1')
  }

  return (
    <>
      {/* Header (matches dashboard look & feel) */}
      <header className="flex h-16 items-center justify-between border-b border-border bg-card/40 px-6 backdrop-blur-xl shrink-0 z-10">
        <div>
          <h1 className="text-base font-semibold text-foreground">Members</h1>
          <p className="text-xs text-muted-foreground">Bloom Café · View and manage your members</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold cursor-pointer transition-all ${
              isDemoMode 
                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' 
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isDemoMode ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
            {isDemoMode ? 'Demo Mode' : 'Live Mode'}
          </button>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">B</span>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-6 overflow-auto">
        {/* Demo Mode alert banner */}
        {isDemoMode && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 px-5 py-3.5 backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 uppercase tracking-wide">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                Demo View
              </span>
              <p className="text-sm text-indigo-200/90 leading-tight">
                Create & publish a Stamp Card first to unlock this area with your real data and functionality. Data shown is an example.
              </p>
            </div>
            <button 
              onClick={() => setIsDemoMode(false)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline cursor-pointer shrink-0 transition-colors"
            >
              Switch to Live View
            </button>
          </div>
        )}

        {/* Action Button Cards Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Give Stamps */}
          <div 
            onClick={() => {
              if (members.length === 0) {
                alert('No members available. Please create a member first.')
                return
              }
              setFormGiveStampsMemberId(members[0].id)
              setActiveModal('give_stamps')
            }}
            className="flex items-center gap-3.5 rounded-2xl border border-border bg-card px-4 py-3.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 relative cursor-pointer group"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500 group-hover:scale-105 transition-transform duration-300">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Give Stamps</p>
              <p className="text-xs text-muted-foreground">Add points to cards</p>
            </div>
            {isDemoMode && (
              <span className="absolute top-2 right-2 text-muted-foreground/40" title="Locked feature demo">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </span>
            )}
          </div>

          {/* Redeem Reward */}
          <div 
            onClick={() => {
              if (members.length === 0) {
                alert('No members available. Please create a member first.')
                return
              }
              setFormRedeemMemberId(members[0].id)
              setActiveModal('redeem')
            }}
            className="flex items-center gap-3.5 rounded-2xl border border-border bg-card px-4 py-3.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 relative cursor-pointer group"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform duration-300">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Redeem Reward</p>
              <p className="text-xs text-muted-foreground">Apply active rewards</p>
            </div>
            {isDemoMode && (
              <span className="absolute top-2 right-2 text-muted-foreground/40" title="Locked feature demo">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </span>
            )}
          </div>

          {/* Create Member */}
          <div 
            onClick={() => setActiveModal('create')}
            className="flex items-center gap-3.5 rounded-2xl border border-border bg-card px-4 py-3.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 relative cursor-pointer group"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-500/10 text-pink-500 group-hover:scale-105 transition-transform duration-300">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Create Member</p>
              <p className="text-xs text-muted-foreground">Add new profile</p>
            </div>
            {isDemoMode && (
              <span className="absolute top-2 right-2 text-muted-foreground/40" title="Locked feature demo">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </span>
            )}
          </div>

          {/* Invite Members */}
          <div 
            onClick={() => setActiveModal('invite')}
            className="flex items-center gap-3.5 rounded-2xl border border-border bg-card px-4 py-3.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 relative cursor-pointer group"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 group-hover:scale-105 transition-transform duration-300">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 17H2a3 3 0 0 0-3-3V9a3 3 0 0 0 3-3h20a3 3 0 0 0 3 3v5a3 3 0 0 0-3 3z"/><path d="M2 9l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Invite Members</p>
              <p className="text-xs text-muted-foreground">Send email triggers</p>
            </div>
            {isDemoMode && (
              <span className="absolute top-2 right-2 text-muted-foreground/40" title="Locked feature demo">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </span>
            )}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-border bg-card/25 backdrop-blur-xl rounded-t-xl overflow-hidden p-1 gap-1">
          <button
            onClick={() => { setActiveTab('joined'); setCurrentPage(1); }}
            className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'joined'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
            }`}
          >
            Joined
          </button>
          <button
            onClick={() => { setActiveTab('sent'); setCurrentPage(1); }}
            className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'sent'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
            }`}
          >
            Sent invites
          </button>
          <button
            onClick={() => { setActiveTab('unsuccessful'); setCurrentPage(1); }}
            className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'unsuccessful'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
            }`}
          >
            Unsuccessful invites
          </button>
        </div>

        {/* Tab Panels */}
        <div className="rounded-2xl border border-border bg-card p-6 backdrop-blur-xl space-y-6">
          
          {/* 1. Joined Tab Panel */}
          {activeTab === 'joined' && (
            <>
              {/* Summary and Filters */}
              <div className="grid gap-6 md:grid-cols-3 items-center">
                {/* Summary Card */}
                <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold text-foreground">{members.length}</span>
                      <svg className="h-4 w-4 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </div>
                    <p className="text-xs text-muted-foreground font-semibold">Total members</p>
                  </div>
                </div>

                {/* Filters */}
                <div className="md:col-span-2 flex flex-wrap gap-4 items-center justify-end">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">Showing members from</span>
                    <select
                      value={locationFilter}
                      onChange={(e) => { setLocationFilter(e.target.value); setCurrentPage(1); }}
                      className="rounded-lg border border-border bg-muted/70 px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {locations.map(loc => <option key={loc} value={loc} className="bg-[#0d0d11] text-foreground">{loc}</option>)}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">on</span>
                    <select
                      value={stampCardFilter}
                      onChange={(e) => { setStampCardFilter(e.target.value); setCurrentPage(1); }}
                      className="rounded-lg border border-border bg-muted/70 px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {stampCards.map(sc => <option key={sc} value={sc} className="bg-[#0d0d11] text-foreground">{sc}</option>)}
                    </select>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showJoinOnly}
                      onChange={(e) => { setShowJoinOnly(e.target.checked); setCurrentPage(1); }}
                      className="h-3.5 w-3.5 rounded border-border bg-muted/70 text-primary focus:ring-primary accent-primary"
                    />
                    Show join only members
                  </label>
                </div>
              </div>

              {/* Warning Banner */}
              <div className="flex items-center gap-3 rounded-xl border border-yellow-500/25 bg-yellow-500/5 px-4 py-3 text-xs text-yellow-300">
                <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <p>
                  <strong>Note:</strong> Members only appear under a location after collecting stamps there. Select All locations + All Stamp Cards to view everyone. Click a row for the member&apos;s profile.
                </p>
              </div>

              {/* Search Bar & Export */}
              <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
                <div className="relative flex-1 max-w-sm">
                  <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    type="text"
                    placeholder="Search by name, email or phone number"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-10 pr-4 py-2 bg-muted/40 border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      alert(`Exported ${filteredAndSortedMembers.length} members as CSV! (Demo Mock)`)
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/40 text-foreground transition-colors hover:bg-muted"
                    title="Export Members"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/40 text-foreground transition-colors hover:bg-muted">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </button>
                </div>
              </div>

              {/* Members Table */}
              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="px-4 py-3 text-left w-10">
                        <input type="checkbox" className="rounded border-border accent-primary" />
                      </th>
                      {[
                        { label: 'First Name', field: 'firstName' },
                        { label: 'Last Name', field: 'lastName' },
                        { label: 'Email', field: 'email' },
                        { label: 'Phone', field: 'phone' },
                        { label: 'Active Stamps', field: 'activeStamps' },
                        { label: 'Redeems', field: 'redeems' },
                        { label: 'All time stamps', field: 'allTimeStamps' },
                        { label: 'Last stamped location', field: 'lastStampedLocation', sortable: false }
                      ].map((col) => (
                        <th 
                          key={col.label}
                          onClick={() => col.sortable !== false && handleSort(col.field)}
                          className={`px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider ${
                            col.sortable !== false ? 'cursor-pointer select-none hover:text-foreground transition-colors' : ''
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {col.label}
                            {col.sortable !== false && (
                              <span className="text-[9px]">
                                {sortBy === col.field ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground font-semibold">
                          No members found.
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((m: any) => (
                        <tr 
                          key={m.id}
                          onClick={() => {
                            setSelectedProfileId(m.id)
                            setActiveModal('profile')
                          }}
                          className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                        >
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" className="rounded border-border accent-primary" />
                          </td>
                          <td className="px-4 py-3 font-semibold text-foreground">{m.firstName}</td>
                          <td className="px-4 py-3 font-semibold text-foreground">{m.lastName}</td>
                          <td className="px-4 py-3 text-muted-foreground">{m.email}</td>
                          <td className="px-4 py-3 text-muted-foreground">{m.phone}</td>
                          <td className="px-4 py-3 font-semibold text-foreground text-center">{m.activeStamps}</td>
                          <td className="px-4 py-3 font-semibold text-foreground text-center">{m.redeems}</td>
                          <td className="px-4 py-3 font-semibold text-foreground text-center">{m.allTimeStamps}</td>
                          <td className="px-4 py-3 text-muted-foreground">{m.lastStampedLocation}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* 2. Sent Invites Tab Panel */}
          {activeTab === 'sent' && (
            <>
              {/* Description */}
              <p className="text-xs text-muted-foreground">
                All successfully sent email join invitations. Use the filters to refine results by response status.
              </p>

              {/* Summary Cards */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                {/* Total Invited */}
                <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold text-foreground">{invites.length}</span>
                      <svg className="h-3.5 w-3.5 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">Total invited</p>
                  </div>
                </div>

                {/* Total Accepted */}
                <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold text-foreground">{invites.filter(i => i.status === 'Accepted').length}</span>
                      <svg className="h-3.5 w-3.5 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">Total accepted</p>
                  </div>
                </div>

                {/* Pending Invites */}
                <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                    <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold text-foreground">{invites.filter(i => i.status === 'Pending').length}</span>
                      <svg className="h-3.5 w-3.5 text-muted-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">Pending invites</p>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center justify-end border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Showing</span>
                  <select
                    value={inviteStatusFilter}
                    onChange={(e) => { setInviteStatusFilter(e.target.value); setCurrentPage(1); }}
                    className="rounded-lg border border-border bg-muted/70 px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Total Invited" className="bg-[#0d0d11] text-foreground">Total Invited</option>
                    <option value="Total Accepted" className="bg-[#0d0d11] text-foreground">Total Accepted</option>
                    <option value="Pending Invites" className="bg-[#0d0d11] text-foreground">Pending Invites</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">on</span>
                  <select
                    value={stampCardFilter}
                    onChange={(e) => { setStampCardFilter(e.target.value); setCurrentPage(1); }}
                    className="rounded-lg border border-border bg-muted/70 px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {stampCards.map(sc => <option key={sc} value={sc} className="bg-[#0d0d11] text-foreground">{sc}</option>)}
                  </select>
                </div>
              </div>

              {/* Search Bar & Export */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-10 pr-4 py-2 bg-muted/40 border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/40 text-foreground hover:bg-muted">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="px-4 py-3 text-left w-10">
                        <input type="checkbox" className="rounded border-border accent-primary" />
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Sent Date</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Stamp Card name</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Sent invites</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground font-semibold">
                          No data found.
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((inv: any) => (
                        <tr key={inv.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3"><input type="checkbox" className="rounded border-border accent-primary" /></td>
                          <td className="px-4 py-3 text-muted-foreground">{inv.sentDate}</td>
                          <td className="px-4 py-3 font-semibold text-foreground">{inv.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{inv.email}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                              inv.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                            }`}>{inv.status}</span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{inv.stampCardName}</td>
                          <td className="px-4 py-3 text-foreground text-center font-semibold">{inv.sentInvitesCount}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* 3. Unsuccessful Tab Panel */}
          {activeTab === 'unsuccessful' && (
            <>
              {/* Description */}
              <p className="text-xs text-muted-foreground">
                The email invitations that failed to send. Use the filters to refine results by failure reason. These statistics are not included in the &apos;Joined&apos; or &apos;Sent invites&apos; tabs.
              </p>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center justify-end border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Showing</span>
                  <select
                    value={unsuccessfulFilter}
                    onChange={(e) => { setUnsuccessfulFilter(e.target.value); setCurrentPage(1); }}
                    className="rounded-lg border border-border bg-muted/70 px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none"
                  >
                    <option value="Total failed" className="bg-[#0d0d11] text-foreground">Total failed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">on</span>
                  <select
                    value={stampCardFilter}
                    onChange={(e) => { setStampCardFilter(e.target.value); setCurrentPage(1); }}
                    className="rounded-lg border border-border bg-muted/70 px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none"
                  >
                    {stampCards.map(sc => <option key={sc} value={sc} className="bg-[#0d0d11] text-foreground">{sc}</option>)}
                  </select>
                </div>
              </div>

              {/* Search Bar & Export */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-10 pr-4 py-2 bg-muted/40 border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/40 text-foreground hover:bg-muted">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="px-4 py-3 text-left w-10">
                        <input type="checkbox" className="rounded border-border accent-primary" />
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Sent Date</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Reason</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Stamp Card name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground font-semibold">
                          No data found.
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((un: any) => (
                        <tr key={un.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3"><input type="checkbox" className="rounded border-border accent-primary" /></td>
                          <td className="px-4 py-3 text-muted-foreground">{un.sentDate}</td>
                          <td className="px-4 py-3 font-semibold text-foreground">{un.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{un.email}</td>
                          <td className="px-4 py-3 text-destructive font-semibold">{un.reason}</td>
                          <td className="px-4 py-3 text-muted-foreground">{un.stampCardName}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-4">
            <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span>Jump to page:</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const p = Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1))
                    setCurrentPage(p)
                  }}
                  className="w-12 rounded border border-border bg-muted/40 px-1.5 py-1 text-center text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span>of {totalPages}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="rounded border border-border bg-muted/40 px-1.5 py-1 text-foreground focus:outline-none"
                >
                  <option value={5} className="bg-[#0d0d11] text-foreground">5</option>
                  <option value={10} className="bg-[#0d0d11] text-foreground">10</option>
                  <option value={20} className="bg-[#0d0d11] text-foreground">20</option>
                  <option value={50} className="bg-[#0d0d11] text-foreground">50</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
              <span>
                Showing {Math.min(activeListLength, (currentPage - 1) * rowsPerPage + 1)}-
                {Math.min(activeListLength, currentPage * rowsPerPage)} of {activeListLength}
              </span>
              <div className="flex gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded border border-border bg-muted/40 text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ◀
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded border border-border bg-muted/40 text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ----------------- ACTION MODALS ----------------- */}

      {/* 1. Create Member Modal */}
      {activeModal === 'create' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-[#0d0d11] p-6 shadow-2xl backdrop-blur-xl animate-pop">
            <h3 className="text-base font-bold text-foreground mb-4">Create Member</h3>
            <form onSubmit={handleCreateMember} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formFirstName}
                    onChange={(e) => setFormFirstName(e.target.value)}
                    className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Sarah"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formLastName}
                    onChange={(e) => setFormLastName(e.target.value)}
                    className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Staddon"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="sarah@gmail.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Phone</label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="+18005682031"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Initial Stamps</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={formInitialStamps}
                  onChange={(e) => setFormInitialStamps(e.target.value)}
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex gap-3 justify-end border-t border-border pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-xs font-bold rounded-xl border border-border bg-muted/50 text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary-600 cursor-pointer shadow-lg shadow-primary/20"
                >
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Invite Member Modal */}
      {activeModal === 'invite' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-[#0d0d11] p-6 shadow-2xl backdrop-blur-xl animate-pop">
            <h3 className="text-base font-bold text-foreground mb-4">Invite Member</h3>
            <form onSubmit={handleInviteMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formInviteName}
                  onChange={(e) => setFormInviteName(e.target.value)}
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formInviteEmail}
                  onChange={(e) => setFormInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Target Stamp Card</label>
                <select className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground focus:outline-none">
                  <option className="bg-[#0d0d11] text-foreground">Bloom Café Card</option>
                  <option className="bg-[#0d0d11] text-foreground">VIP Card</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end border-t border-border pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-xs font-bold rounded-xl border border-border bg-muted/50 text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary-600 cursor-pointer shadow-lg shadow-primary/20"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Give Stamps Modal */}
      {activeModal === 'give_stamps' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-[#0d0d11] p-6 shadow-2xl backdrop-blur-xl animate-pop">
            <h3 className="text-base font-bold text-foreground mb-4">Give Stamps</h3>
            <form onSubmit={handleGiveStampsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Select Member</label>
                <select
                  value={formGiveStampsMemberId}
                  onChange={(e) => setFormGiveStampsMemberId(e.target.value)}
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {members.map(m => (
                    <option key={m.id} value={m.id} className="bg-[#0d0d11] text-foreground">{m.firstName} {m.lastName} ({m.email})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Number of Stamps to Give</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={formGiveStampsCount}
                  onChange={(e) => setFormGiveStampsCount(e.target.value)}
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Stamp Card</label>
                <select className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground focus:outline-none">
                  <option className="bg-[#0d0d11] text-foreground">Bloom Café Card</option>
                  <option className="bg-[#0d0d11] text-foreground">VIP Card</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end border-t border-border pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-xs font-bold rounded-xl border border-border bg-muted/50 text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary-600 cursor-pointer shadow-lg shadow-primary/20"
                >
                  Award Stamps
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Redeem Reward Modal */}
      {activeModal === 'redeem' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-[#0d0d11] p-6 shadow-2xl backdrop-blur-xl animate-pop">
            <h3 className="text-base font-bold text-foreground mb-4">Redeem Reward</h3>
            <form onSubmit={handleRedeemSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Select Member</label>
                <select
                  value={formRedeemMemberId}
                  onChange={(e) => setFormRedeemMemberId(e.target.value)}
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {members.map(m => (
                    <option key={m.id} value={m.id} className="bg-[#0d0d11] text-foreground">{m.firstName} {m.lastName} (Stamps: {m.activeStamps})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1">Number of Rewards</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={formRedeemCount}
                  onChange={(e) => setFormRedeemCount(e.target.value)}
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="mt-1.5 text-[10px] text-muted-foreground">Each redemption consumes 10 stamps.</p>
              </div>
              <div className="flex gap-3 justify-end border-t border-border pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 text-xs font-bold rounded-xl border border-border bg-muted/50 text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary-600 cursor-pointer shadow-lg shadow-primary/20"
                >
                  Redeem Rewards
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Profile Detail Modal */}
      {activeModal === 'profile' && selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-[#0d0d11] p-6 shadow-2xl backdrop-blur-xl animate-pop overflow-hidden">
            {/* Header info */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-lg font-bold text-primary">
                  {selectedProfile.firstName.charAt(0)}{selectedProfile.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground leading-snug">
                    {selectedProfile.firstName} {selectedProfile.lastName}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">{selectedProfile.email}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-muted-foreground hover:text-foreground text-base leading-none p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Profile body details */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="rounded-xl border border-border bg-muted/30 p-3">
                <p className="text-lg font-bold text-primary">{selectedProfile.activeStamps}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Active Stamps</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-3">
                <p className="text-lg font-bold text-foreground">{selectedProfile.redeems}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Total Redeems</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-3">
                <p className="text-lg font-bold text-foreground">{selectedProfile.allTimeStamps}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">All-Time Stamps</p>
              </div>
            </div>

            {/* Additional parameters */}
            <div className="space-y-2.5 text-xs border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">Phone:</span>
                <span className="text-foreground font-medium">{selectedProfile.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">Joined Date:</span>
                <span className="text-foreground font-medium">{selectedProfile.joinedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">Last stamped Location:</span>
                <span className="text-foreground font-medium">{selectedProfile.lastStampedLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">Member Status:</span>
                <span className="text-foreground font-medium">
                  {selectedProfile.joinOnly ? 'Join Only (No stamps collected)' : 'Active Loyalty Member'}
                </span>
              </div>
            </div>

            {/* Action hooks from inside profile details */}
            <div className="flex gap-3 mt-6 border-t border-border pt-4 justify-end">
              <button
                type="button"
                onClick={() => {
                  setFormGiveStampsMemberId(selectedProfile.id)
                  setActiveModal('give_stamps')
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-border bg-muted hover:bg-muted/70 text-foreground transition-all cursor-pointer"
              >
                + Give Stamps
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormRedeemMemberId(selectedProfile.id)
                  setActiveModal('redeem')
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary-600 transition-all cursor-pointer shadow-lg shadow-primary/10"
              >
                Redeem Reward
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
