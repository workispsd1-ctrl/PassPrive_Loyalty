import PaywallGate from '../_components/PaywallGate'

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <PaywallGate feature="resources">{children}</PaywallGate>
}
