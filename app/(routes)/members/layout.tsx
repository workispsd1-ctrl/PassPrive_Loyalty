import PaywallGate from '../_components/PaywallGate'

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return <PaywallGate feature="members">{children}</PaywallGate>
}
