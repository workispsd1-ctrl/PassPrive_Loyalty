'use client'

import React, { useEffect, useState } from 'react'
import { 
  Search, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  AlertCircle,
  Users
} from 'lucide-react'
import { fetchMembers, updateMemberContact, deleteMember, type MemberRow } from '../superadmin-actions'

export default function SuperadminMembers() {
  const [members, setMembers] = useState<MemberRow[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingMember, setEditingMember] = useState<MemberRow | null>(null)
  
  // Notification state
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Edit states for modal
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [saving, setSaving] = useState(false)

  // Load members from Supabase database
  const loadMembers = async () => {
    setLoading(true)
    try {
      const data = await fetchMembers()
      setMembers(data)
    } catch (err: any) {
      setMessage({ text: `Failed to load users: ${err.message}`, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMembers()
  }, [])

  // Filter members based on search term
  const filteredMembers = members.filter((m) => {
    const firstName = m.first_name || ''
    const lastName = m.last_name || ''
    const email = m.email || ''
    const phone = m.phone || ''

    return (
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm)
    )
  })

  const handleEditClick = (member: MemberRow) => {
    setEditingMember(member)
    setEditFirstName(member.first_name || '')
    setEditLastName(member.last_name || '')
    setEditEmail(member.email || '')
    setEditPhone(member.phone || '')
  }

  const handleSaveEdit = async () => {
    if (!editingMember) return
    setSaving(true)
    try {
      await updateMemberContact(editingMember.id, editFirstName, editLastName, editEmail, editPhone)
      setMessage({ text: `Successfully updated profile of user ${editFirstName} ${editLastName}!`, type: 'success' })
      setEditingMember(null)
      loadMembers() // Reload database values
      setTimeout(() => setMessage(null), 4000)
    } catch (err: any) {
      setMessage({ text: `Failed to save user details: ${err.message}`, type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteClick = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete user "${name}"?`)) return
    try {
      await deleteMember(id)
      setMessage({ text: `Successfully deleted user "${name}".`, type: 'success' })
      loadMembers() // Reload updated list
      setTimeout(() => setMessage(null), 4000)
    } catch (err: any) {
      setMessage({ text: `Failed to delete user: ${err.message}`, type: 'error' })
    }
  }

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-60 bg-card rounded-xl" />
          <div className="h-4 w-96 bg-card rounded-md" />
        </div>
        <div className="h-16 w-full bg-card rounded-2xl border border-border/50" />
        <div className="h-96 w-full bg-card rounded-2xl border border-border/50" />
      </div>
    )
  }

  return (
    <>
      <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
          User Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Search, update, and manage end-user loyalty card users registered in the system.
        </p>
      </div>

      {/* Message Notifications */}
      {message && (
        <div className={`flex items-center gap-2.5 p-4 rounded-xl text-sm animate-pop border ${
          message.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="font-semibold">{message.text}</span>
        </div>
      )}

      {/* Control Panel: Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card backdrop-blur-md p-4 rounded-2xl border border-border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 text-foreground transition-all"
          />
        </div>

        <div className="text-xs font-mono text-muted-foreground">
          Showing <span className="text-foreground font-bold">{filteredMembers.length}</span> of {members.length} users
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-card backdrop-blur-md rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                <th className="py-4 px-6">User details</th>
                <th className="py-4 px-6">Phone Number</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Registration Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-muted-foreground font-medium">
                    No users found matching the search criteria.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => {
                  const fullName = `${member.first_name || ''} ${member.last_name || ''}`.trim() || 'Unnamed User'
                  return (
                    <tr key={member.id} className="hover:bg-muted/10 transition-colors group">
                      {/* Name Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {fullName}
                            </p>
                            <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[150px]">
                              ID: {member.id.split('-')[0]}...
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-6 font-mono text-foreground/80">
                        {member.phone ? (
                          <div className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{member.phone}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic">No phone</span>
                        )}
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6 font-mono text-foreground/80">
                        {member.email ? (
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{member.email}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic">No email</span>
                        )}
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-6 text-foreground/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{new Date(member.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2.5">
                          <button
                            onClick={() => handleEditClick(member)}
                            className="p-1.5 rounded-lg border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-card/50 transition-colors"
                            title="Edit User Contact"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(member.id, fullName)}
                            className="p-1.5 rounded-lg border border-border hover:border-red-500/50 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete User permanently"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111114] border border-zinc-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative space-y-6 animate-pop">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-zinc-800/80 pb-4">
              <div>
                <h3 className="text-xl font-display font-bold text-foreground">Edit User Profile</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Updating {editingMember.first_name || ''} {editingMember.last_name || ''}
                </p>
              </div>
              <button 
                onClick={() => setEditingMember(null)} 
                className="p-1 rounded-lg hover:bg-zinc-800 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                      className="w-full bg-[#1b1b22] border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors"
                    />
                  </div>
                </div>
                {/* Last Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                      className="w-full bg-[#1b1b22] border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address & Phone Number Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-[#1b1b22] border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-[#1b1b22] border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-zinc-800/80">
              <button
                onClick={() => setEditingMember(null)}
                disabled={saving}
                className="flex-1 border border-zinc-700 hover:bg-zinc-800 text-foreground text-sm font-semibold py-2.5 rounded-xl transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="flex-1 bg-primary hover:bg-primary/95 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {saving ? (
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Check className="h-4 w-4" /> Save Details
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
