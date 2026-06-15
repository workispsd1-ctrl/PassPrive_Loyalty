import PaywallGate from '../_components/PaywallGate'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <PaywallGate feature="dashboard">{children}</PaywallGate>
}
