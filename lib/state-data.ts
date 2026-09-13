import { citiesData } from '@/lib/city-data'

export interface StateData {
  slug: string
  name: string
  totalPumps: number
  cities: {
    slug: string
    name: string
    pumpsCount: number
  }[]
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Derives state-level data from the existing citiesData.
 * Groups cities by state, computes pump counts, and generates slugs.
 */
function buildStatesData(): StateData[] {
  const stateMap = new Map<string, StateData>()

  for (const city of citiesData) {
    // Some cities have compound states like "Delhi & Haryana" or "Punjab / Haryana".
    // We treat the full string as one state to keep city associations clean.
    const stateName = city.state
    const stateSlug = slugify(stateName)

    if (!stateMap.has(stateSlug)) {
      stateMap.set(stateSlug, {
        slug: stateSlug,
        name: stateName,
        totalPumps: 0,
        cities: [],
      })
    }

    const state = stateMap.get(stateSlug)!
    state.totalPumps += city.verifiedPumpsCount
    state.cities.push({
      slug: city.slug,
      name: city.name,
      pumpsCount: city.verifiedPumpsCount,
    })
  }

  // Sort states by total pump count (highest first), then cities within each state
  const states = Array.from(stateMap.values())
  states.sort((a, b) => b.totalPumps - a.totalPumps)
  for (const state of states) {
    state.cities.sort((a, b) => b.pumpsCount - a.pumpsCount)
  }

  return states
}

export const statesData: StateData[] = buildStatesData()
