'use client'

import React, { useEffect, useState } from 'react'
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Phone, 
  User, 
  Edit3,
  X,
  Check,
  CreditCard,
  AlertCircle,
  Trash2,
  Tag,
  Store
} from 'lucide-react'
import { fetchPartners, updatePartnerSubscription, deletePartner, type BusinessRow } from '../superadmin-actions'

export default function SuperadminPartners() {
  const [partners, setPartners] = useState<BusinessRow[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>('all')
  const [editingPartner, setEditingPartner] = useState<BusinessRow | null>(null)
  
  // Notification / Error State
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Edit states for modal
  const [editPlan, setEditPlan] = useState<'basic' | 'growth' | 'pro' | null>(null)
  const [editLimit, setEditLimit] = useState(1)
  const [editIsDemo, setEditIsDemo] = useState(false)
  const [editName, setEditName] = useState('')
  const [editOwnerName, setEditOwnerName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [saving, setSaving] = useState(false)

  // Fetch partners from Supabase
  const loadPartners = async () => {
    setLoading(true)
    try {
      const data = await fetchPartners()
      setPartners(data)
    } catch (err: any) {
      setMessage({ text: `Failed to load partners: ${err.message}`, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPartners()
  }, [])

  // Auto-fill defaults when subscription plan selection changes
  const handlePlanChange = (val: string) => {
    const selectedPlan = val === 'free' ? null : (val as 'basic' | 'growth' | 'pro')
    setEditPlan(selectedPlan)

    if (selectedPlan === 'basic') setEditLimit(1)
    else if (selectedPlan === 'growth') setEditLimit(3)
    else if (selectedPlan === 'pro') setEditLimit(6)
    else setEditLimit(1) // Free preview
  }

  // Filter partners based on search and selected plan
  const filteredPartners = partners.filter((p) => {
    const name = p.name || ''
    const ownerName = p.owner_name || ''
    const phone = p.phone || ''

    const matchesSearch = 
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm)
    
    const matchesPlan = 
      selectedPlanFilter === 'all' ||
      (selectedPlanFilter === 'free' && p.plan_id === null) ||
      p.plan_id === selectedPlanFilter

    return matchesSearch && matchesPlan
  })

  const handleEditClick = (partner: BusinessRow) => {
    setEditingPartner(partner)
    setEditPlan(partner.plan_id as any)
    setEditLimit(partner.location_limit ?? 1)
    setEditIsDemo(partner.is_demo)
    setEditName(partner.name || '')
    setEditOwnerName(partner.owner_name || '')
    setEditPhone(partner.phone || '')
    setEditCategory(partner.category || '')
    setEditLocation(partner.location || '')
  }

  const handleSaveEdit = async () => {
    if (!editingPartner) return
    setSaving(true)
    try {
      await updatePartnerSubscription(
        editingPartner.id,
        editName,
        editOwnerName,
        editPhone,
        editCategory,
        editLocation,
        editPlan,
        editLimit,
        editIsDemo
      )
      setMessage({ text: `Successfully updated subscriptions and profile for ${editName}!`, type: 'success' })
      setEditingPartner(null)
      loadPartners() // Reload updated database values
      setTimeout(() => setMessage(null), 4000)
    } catch (err: any) {
      setMessage({ text: `Error updating partner details: ${err.message}`, type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteClick = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete partner "${name}"?`)) return
    try {
      await deletePartner(id)
      setMessage({ text: `Successfully deleted partner "${name}".`, type: 'success' })
      loadPartners() // Reload updated list
      setTimeout(() => setMessage(null), 4000)
    } catch (err: any) {
      setMessage({ text: `Failed to delete partner: ${err.message}`, type: 'error' })
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
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Business Partners
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage business configurations, modify subscription plans, and configure location limits.
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

      {/* Control Panel: Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card backdrop-blur-md p-4 rounded-2xl border border-border">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search partner, owner, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border/80 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 text-foreground transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Filter className="h-3.5 w-3.5" />
            <span>FILTER BY PLAN:</span>
          </div>

          <div className="flex gap-1.5 bg-background p-1 rounded-xl border border-border/60">
            {['all', 'basic', 'growth', 'pro', 'free'].map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlanFilter(plan)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedPlanFilter === plan
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/45'
                }`}
              >
                {plan.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-card backdrop-blur-md rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                <th className="py-4 px-6">Business & Owner</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Subscription Plan</th>
                <th className="py-4 px-6">Locations</th>
                <th className="py-4 px-6">Account Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-muted-foreground font-medium">
                    No partners found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-muted/10 transition-colors group">
                    {/* Business & Owner */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {partner.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                            <User className="h-3 w-3" />
                            <span>{partner.owner_name || '—'}</span>
                            <span>•</span>
                            <Phone className="h-3 w-3" />
                            <span>{partner.phone || '—'}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Location */}
                    <td className="py-4 px-6 text-foreground/80">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <div>
                          <p className="text-xs text-foreground/80">{partner.category || 'Other'}</p>
                          <p className="text-[10px] text-muted-foreground font-mono truncate max-w-[120px]" title={partner.location || ''}>
                            {partner.location ? partner.location.split(',')[0] : 'Remote'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Subscription Plan */}
                    <td className="py-4 px-6">
                      {partner.plan_id ? (
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${
                            partner.plan_id === 'basic' 
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                              : partner.plan_id === 'growth'
                              ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          }`}>
                            {partner.plan_id.toUpperCase()}
                          </span>
                          {partner.subscribed_at && (
                            <span className="text-[10px] text-muted-foreground font-mono">
                              Since {new Date(partner.subscribed_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/40">
                          FREE PREVIEW
                        </span>
                      )}
                    </td>

                    {/* Location Limit */}
                    <td className="py-4 px-6 font-mono font-medium text-foreground/80">
                      {partner.location_limit ?? 1} Location{(partner.location_limit ?? 1) > 1 ? 's' : ''}
                    </td>

                    {/* Account Status */}
                    <td className="py-4 px-6">
                      {partner.is_demo ? (
                        <span className="text-[11px] font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                          DEMO MODE
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                          ACTIVE LIVE
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2.5">
                        <button
                          onClick={() => handleEditClick(partner)}
                          className="p-1.5 rounded-lg border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-card/50 transition-colors"
                          title="Edit Subscription / Plan Config"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(partner.id, partner.name)}
                          className="p-1.5 rounded-lg border border-border hover:border-red-500/50 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Partner permanently"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

      {/* Edit Partner Modal */}
      {editingPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111114] border border-zinc-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative space-y-6 animate-pop">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-zinc-800/80 pb-4">
              <div>
                <h3 className="text-xl font-display font-bold text-foreground">Edit Business Partner Profile</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Updating {editingPartner.name}</p>
              </div>
              <button 
                onClick={() => setEditingPartner(null)} 
                className="p-1 rounded-lg hover:bg-zinc-800 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="space-y-5">
              
              {/* Row 1: Business Name & Owner Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Business Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">Business Name</label>
                  <div className="relative">
                    <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-[#1b1b22] border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors"
                    />
                  </div>
                </div>

                {/* Owner Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">Owner Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      value={editOwnerName}
                      onChange={(e) => setEditOwnerName(e.target.value)}
                      className="w-full bg-[#1b1b22] border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Category & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full bg-[#1b1b22] border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-[#1b1b22] border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Location (Address) */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">Location (Address)</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full bg-[#1b1b22] border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Plan Selection & Location Limit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Plan Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">Subscription Plan</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <select
                      value={editPlan || 'free'}
                      onChange={(e) => handlePlanChange(e.target.value)}
                      className="w-full bg-[#1b1b22] border border-zinc-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors appearance-none font-medium"
                    >
                      <option value="free">Free Preview (No Subscription)</option>
                      <option value="basic">Basic Plan (₹499/mo)</option>
                      <option value="growth">Growth Plan (₹999/mo)</option>
                      <option value="pro">Pro Plan (₹1,499/mo)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Location Limit */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block uppercase font-bold">Location Limit</label>
                  <div className="flex items-center gap-3 h-[42px]">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={editLimit}
                      onChange={(e) => setEditLimit(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 bg-[#1b1b22] border border-zinc-700/80 rounded-xl py-2.5 text-sm text-white focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-colors font-mono text-center"
                    />
                    <span className="text-xs text-muted-foreground font-semibold">Authorized locations</span>
                  </div>
                </div>
              </div>

              {/* Row 5: Demo Mode Toggle */}
              <div className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800/80 rounded-xl">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-zinc-200">Demo Mode</p>
                  <p className="text-[10px] text-muted-foreground">Sandbox account for test cafes/stores</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditIsDemo(!editIsDemo)}
                  className={`w-12 h-6 rounded-full p-1 transition-all duration-200 ${
                    editIsDemo ? 'bg-primary flex justify-end' : 'bg-[#1b1b22] border border-zinc-700 flex justify-start'
                  }`}
                >
                  <span className="h-4 w-4 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-zinc-800/80">
              <button
                onClick={() => setEditingPartner(null)}
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
                    <Check className="h-4 w-4" /> Save Changes
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
