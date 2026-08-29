import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-text-primary">Welcome to Advansys KBM</h1>
      <p className="text-sm text-text-muted">
        Explore engineering lessons learned across every project, or share one of your own.
      </p>
      <Link to="/lessons">
        <Button variant="primary">Browse Lessons Learned</Button>
      </Link>
    </div>
  )
}
