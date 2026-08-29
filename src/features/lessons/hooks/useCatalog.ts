import { useEffect, useState } from 'react'
import { fetchCatalog, type Catalog } from '../api'
import { departments as mockDepartments, functions as mockFunctions, industries as mockIndustries } from '../mockData'

const fallbackCatalog: Catalog = {
  departments: mockDepartments.map((name, i) => ({
    id: `mock-department-${i}`,
    name,
    createdDate: '',
    modifiedDate: '',
  })),
  functions: mockFunctions.map((name, i) => ({
    id: `mock-function-${i}`,
    name,
    createdDate: '',
    lastModifiedDate: '',
  })),
  industries: mockIndustries.map((name, i) => ({
    id: `mock-industry-${i}`,
    name,
    createdDate: '',
    modifiedDate: '',
  })),
}

export function useCatalog() {
  const [catalog, setCatalog] = useState<Catalog>(fallbackCatalog)
  const [isFallback, setIsFallback] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchCatalog()
      .then((result) => {
        if (!cancelled) {
          setCatalog(result)
          setIsFallback(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCatalog(fallbackCatalog)
          setIsFallback(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { catalog, isFallback }
}
