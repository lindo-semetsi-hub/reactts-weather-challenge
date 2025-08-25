import { useEffect, useMemo, useState } from 'react';
import { searchPlaces } from '../lib/openMeteo';
import type {LocationHit } from '../types';

type Props = {
    onSelect: (hit: LocationHit) => void 
}

export default function LocationSearch({ onSelect }: Props) {
    const [q, setQ] = useState('')
    const [hits, setHits] = useState<LocationHit[]>([])
    const [loading, setLoading] = useState(false)
    const canSearch = useMemo(() => q.trim().length >=2, [q])

    useEffect(() => {
        const id = setTimeout (async () => {
            if (!canSearch) { setHits([]); return}
            try {
                setLoading(true)
                const results = await searchPlaces(q.trim())
                setHits(results)
            }
            catch {
                setHits([])
            }
            finally {
                setLoading(false)
            }
        }, 250
        )
        return () => clearTimeout(id)
    }, [q, canSearch])

    return (
        <div className="card">
            <label className="small muted">Search for a city</label>
            <div className="row">
                <input
                className="input"
                placeholder="e.g. Pretoria, Polokwane, Johannesburg.."
                value={q}
                onChange={e => setQ(e.target.value)}
                aria-label="Search for a city" />
                <button className="btn" disabled={!canSearch || loading} onClick={() => hits[0] && onSelect(hits[0])}>
                    {loading ? 'searching...' : 'add'} /</button>
                    <div>
                        {hits.length > 0 && (
                            <div style={{ marginTop: '0.5rem' }} className="grid">
                              {hits.map(h => (
                             <div key={ `${h.latitude},${h.longitude}`}
                            className="card cursor"
                             onClick={() => onSelect(h)}
                              title="Add location">
                                 <div className="space-between">
                                     <div>
                                         <div><strong>{h.name}</strong>{h.country ?`, ${h.country}` : ''}</div>
                                          <div className="small muted">{h.latitude.toFixed(2)}, {h.longitude.toFixed(2)}</div>
                                          </div>
                                          <span className="badge">Save</span>
                                          </div>
                                          </div>
                                ))}
                        </div>
                        )}
                     </div>
        )
        }

