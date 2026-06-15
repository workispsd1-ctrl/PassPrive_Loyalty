'use client'

import React, { useState } from 'react'
import { 
  Sliders, 
  MapPin, 
  Tag, 
  IndianRupee, 
  Save, 
  CheckCircle,
  HelpCircle,
  Zap,
  Building,
  Star
} from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: number // INR/month
  locations: number
  tagline: string
  features: string[]
}

const initialPlans: Plan[] = [
  { 
    id: 'basic', 
    name: 'Basic Plan', 
    price: 499, 
    locations: 1, 
    tagline: '1 main business location included',
    features: [
      'Single stamp card template',
      'Basic member statistics',
      'QR code generator',
      'Standard support (email)',
    ]
  },
  { 
    id: 'growth', 
    name: 'Growth Plan', 
    price: 999, 
    locations: 3, 
    tagline: 'Up to 3 distinct locations authorized',
    features: [
      'Multi-stamping option',
      'Advanced monthly analytics',
      'Custom branding colors',
      'Standard support (email & chat)',
      'Custom SMS newsletters'
    ]
  },
  { 
    id: 'pro', 
    name: 'Pro Plan', 
    price: 1499, 
    locations: 6, 
    tagline: 'Up to 6 locations, ideal for small chains',
    features: [
      'Unlimited stamp cards',
      'Real-time analytics & graphs',
      'Custom domain & logos',
      'Priority 24/7 support',
      'API access for POS integrations',
      'Custom push notifications'
    ]
  },
]

export default function SuperadminPlans() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null)
  
  // Form state
  const [editPrice, setEditPrice] = useState(0)
  const [editLocations, setEditLocations] = useState(1)
  const [editTagline, setEditTagline] = useState('')
  
  // Notification state
  const [notification, setNotification] = useState<string | null>(null)

  const handleEditClick = (plan: Plan) => {
    setEditingPlanId(plan.id)
    setEditPrice(plan.price)
    setEditLocations(plan.locations)
    setEditTagline(plan.tagline)
  }

  const handleSave = (id: string) => {
    setPlans(prev => prev.map(p => 
      p.id === id 
        ? { ...p, price: editPrice, locations: editLocations, tagline: editTagline }
        : p
    ))
    setEditingPlanId(null)
    setNotification(`Successfully updated ${id.toUpperCase()} plan pricing configurations!`)
    setTimeout(() => setNotification(null), 4000)
  }

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Configure Plans
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Define system-wide subscription pricing, location limits, and feature lists.
          </p>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm animate-pop">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Plan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isEditing = editingPlanId === plan.id

          return (
            <div 
              key={plan.id} 
              className={`bg-card backdrop-blur-md rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                isEditing 
                  ? 'border-primary shadow-lg ring-1 ring-primary/30' 
                  : 'border-border hover:border-primary/20 hover:shadow-md'
              }`}
            >
              {/* Card Header */}
              <div className="p-6 border-b border-border/60 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                      {plan.id === 'pro' ? 'Recommended' : 'Plan'}
                    </span>
                    <h3 className="text-xl font-display font-bold text-foreground">{plan.name}</h3>
                  </div>
                  <div className="p-2 bg-primary/10 text-primary rounded-xl border border-primary/20">
                    {plan.id === 'basic' ? (
                      <Building className="h-5 w-5" />
                    ) : plan.id === 'growth' ? (
                      <Zap className="h-5 w-5" />
                    ) : (
                      <Star className="h-5 w-5" />
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-4 pt-2">
                    {/* Price Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-muted-foreground block uppercase">Monthly Price (INR)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-mono">₹</span>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-background border border-border rounded-xl pl-8 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 font-mono"
                        />
                      </div>
                    </div>

                    {/* Locations Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-muted-foreground block uppercase">Location Limit</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={editLocations}
                          onChange={(e) => setEditLocations(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 font-mono text-center"
                        />
                        <span className="text-xs text-muted-foreground">Locations authorized</span>
                      </div>
                    </div>

                    {/* Tagline Input */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-muted-foreground block uppercase">Tagline</label>
                      <input
                        type="text"
                        value={editTagline}
                        onChange={(e) => setEditTagline(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-bold font-mono text-foreground">₹{plan.price}</span>
                      <span className="text-xs text-muted-foreground">/ month</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic font-medium">{plan.tagline}</p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 mt-1.5">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span>{plan.locations} authorized location{plan.locations > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Features Body */}
              <div className="p-6 flex-1 space-y-4">
                <p className="text-xs font-semibold font-mono text-muted-foreground uppercase tracking-wider">Features included:</p>
                <ul className="space-y-2.5 text-xs text-foreground/85">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Actions Footer */}
              <div className="p-6 bg-muted/10 border-t border-border/60">
                {isEditing ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingPlanId(null)}
                      className="flex-1 text-xs border border-border hover:bg-card text-foreground font-semibold py-2.5 rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(plan.id)}
                      className="flex-1 text-xs bg-primary hover:bg-primary/95 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Save className="h-3.5 w-3.5" /> Save Plan
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditClick(plan)}
                    className="w-full text-xs border border-border/80 hover:border-primary/50 bg-card hover:bg-background text-foreground/90 hover:text-foreground font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sliders className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" /> Configure Parameters
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Help info */}
      <div className="p-5 bg-card/45 rounded-2xl border border-border flex gap-4 items-start">
        <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-foreground">Changing plans information</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Editing pricing, descriptions, or location thresholds here updates configuration settings. Plan updates will affect newly subscribed users. Existing active subscriptions will retain their initial pricing agreements unless manually migrated in the Partners view.
          </p>
        </div>
      </div>
    </div>
  )
}
