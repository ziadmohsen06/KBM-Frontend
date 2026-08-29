import { WifiOff } from 'lucide-react'

export default function FallbackBanner() {
  return (
    <div className="mb-6 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-400">
      <WifiOff size={15} />
      Could not reach the KBM API — showing demo data instead.
    </div>
  )
}
