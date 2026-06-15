import PaywallGate from '../_components/PaywallGate'

export default function CampaignsLayout({ children }: { children: React.ReactNode }) {
  return <PaywallGate feature="campaigns">{children}</PaywallGate>
}
