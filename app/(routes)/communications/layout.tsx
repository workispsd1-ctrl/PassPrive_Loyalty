import PaywallGate from '../_components/PaywallGate'

export default function CommunicationsLayout({ children }: { children: React.ReactNode }) {
  return <PaywallGate feature="communications">{children}</PaywallGate>
}
