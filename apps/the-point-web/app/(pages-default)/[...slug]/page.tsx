'use client'

export const runtime = 'edge'

import React, { useEffect, useState } from 'react'
// UI
import { SpinnerFullWidthHeight } from '@apprepo/ui-web/Spinner'
// STYLES
import styles from './styles.module.scss'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function Page({ children, params: { slug } }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/people/${slug}/`)
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) return <SpinnerFullWidthHeight />

  if (error) return <p className={styles.error}>{error}</p>

  const filmImageUrl = (index) => `https://via.assets.so/movie.png?id=${index + 1}&q=95&w=360&h=360&fit=fill`

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{data.name}</h1>
      <div className={styles.section}>
        <p><span className={styles.label}>Birth Year:</span> {data.birth_year}</p>
        <p><span className={styles.label}>Eye Color:</span> {data.eye_color}</p>
        <p><span className={styles.label}>Gender:</span> {data.gender}</p>
        <p><span className={styles.label}>Hair Color:</span> {data.hair_color}</p>
        <p><span className={styles.label}>Height:</span> {data.height}</p>
        <p><span className={styles.label}>Mass:</span> {data.mass}</p>
        <p><span className={styles.label}>Skin Color:</span> {data.skin_color}</p>
        <p><span className={styles.label}>Homeworld:</span> {data.homeworld}</p>
        <p><span className={styles.label}>Species:</span> {data.species.join(', ')}</p>
        <p><span className={styles.label}>Starships:</span> {data.starships.join(', ')}</p>
        <p><span className={styles.label}>Vehicles:</span> {data.vehicles.join(', ')}</p>
      </div>
      <div className={styles.filmRow}>
        {data.films.map((film, index) => (
          <div key={index} className={styles.filmRowItem}>
            <img src={filmImageUrl(index)} alt={film} className={styles.filmImage} />
            <p className={styles.filmTitle}>{film}</p>
          </div>
        ))}
      </div>
      {children}
    </div>
  )
}
