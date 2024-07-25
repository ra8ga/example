'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n/client'
import Link from 'next/link'
// TABLE
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { PeopleApiResponse, Person } from './types'
// UI
import { SpinnerFullWidthHeight } from '@apprepo/ui-web/Spinner'
// STYLES
import styles from './styles.module.scss'

const extractIdFromUrl = (url) => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : null;
}

const PersonLink = ({ person }) => {
  const id = extractIdFromUrl(person.url)
  const href = id ? `${id}` : '#'

  return (
    <Link className={styles.link} href={href}>
      Link
    </Link>
  )
}

export const PeopleTable = () => {
  const { t } = useTranslation('common')

  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [showJsonIndex, setShowJsonIndex] = useState<number | null>(null)
  const [doubleColumns, setDoubleColumns] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [peopleCount, setPeopleCount] = useState<number | null>(null)
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    setLoading(true)
    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then(response => response.json())
      .then((data: PeopleApiResponse) => {
        setPeople(data.results)
        setPeopleCount(data.count)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [currentPage])

  const filteredPeople = people.filter(person => {
    const personData = `${person.name} ${person.height} ${person.mass} ${person.hair_color} ${person.skin_color} ${person.eye_color} ${person.birth_year} ${person.gender}`.toLowerCase()
    return personData.includes(filter.toLowerCase())
  })

  const totalPages = Math.ceil((filter ? filteredPeople.length : peopleCount) / itemsPerPage)
  const displayedPeople = filter
    ? filteredPeople.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : people

  if (loading) {
    return <SpinnerFullWidthHeight />
  }

  const handleRowClick = (index) => {
    setClickedRowIndex(clickedRowIndex === index ? null : index)
  }

  const renderPersonRow = (person, index) => (
    <React.Fragment key={index}>
      <tr
        onClick={() => handleRowClick(index)}
        style={{ color: clickedRowIndex === index ? 'red' : 'inherit' }}
      >
        <td data-label="Name">{person.name}</td>
        <td data-label="Height">{person.height}</td>
        <td data-label="Skin Color">{person.skin_color}</td>
        <td data-label="Details">
          <button onClick={() => setShowJsonIndex(showJsonIndex === index ? null : index)}>
            {showJsonIndex === index ? 'Hide' : 'Show'} JSON
          </button>
          <PersonLink person={person}/>
        </td>
      </tr>
      {showJsonIndex === index && (
        <tr className={styles.jsonRow}>
          <td colSpan={4}>
            <pre>{JSON.stringify(person, null, 2)}</pre>
          </td>
        </tr>
      )}
    </React.Fragment>
  )

  return (
    <div className={styles.filterableTable}>
      <div className={styles.header}>
        <h3>
          List of people
          <span>Click to highlight in red, double-click to unhighlight</span>
        </h3>
        <input
          type='text'
          placeholder={t('filter')}
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setCurrentPage(1) // Reset to the first page when filter changes
          }}
          className={styles.input}
        />
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="toggle-columns"
            checked={doubleColumns}
            onChange={(e) => setDoubleColumns(e.target.checked)}
          />
          <label htmlFor="toggle-columns">Double Columns View</label>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Skin Color</th>
              <th>Details</th>
              {doubleColumns && (
                <>
                  <th>Name</th>
                  <th>Height</th>
                  <th>Skin Color</th>
                  <th>Details</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {doubleColumns ? (
              displayedPeople.map((person, index) => (
                index % 2 === 0 && (
                  <React.Fragment key={index}>
                    <tr
                      onClick={() => handleRowClick(index)}
                      style={{ color: clickedRowIndex === index ? 'red' : 'inherit' }}
                    >
                      <td data-label="Name">{person.name}</td>
                      <td data-label="Height">{person.height}</td>
                      <td data-label="Skin Color">{person.skin_color}</td>
                      <td data-label="Details">
                        <button onClick={() => setShowJsonIndex(showJsonIndex === index ? null : index)}>
                          {showJsonIndex === index ? 'Hide' : 'Show'} JSON
                        </button>
                        <PersonLink person={person}/>
                      </td>
                      {displayedPeople[index + 1] && (
                        <>
                          <td data-label="Name">{displayedPeople[index + 1].name}</td>
                          <td data-label="Height">{displayedPeople[index + 1].height}</td>
                          <td data-label="Skin Color">{displayedPeople[index + 1].skin_color}</td>
                          <td data-label="Details">
                            <button onClick={() => setShowJsonIndex(showJsonIndex === index + 1 ? null : index + 1)}>
                              {showJsonIndex === index + 1 ? 'Hide' : 'Show'} JSON
                            </button>
                            <PersonLink person={person}/>
                          </td>
                        </>
                      )}
                    </tr>
                    {showJsonIndex === index && (
                      <tr className={styles.jsonRow}>
                        <td colSpan={8}>
                          <pre>{JSON.stringify(person, null, 2)}</pre>
                        </td>
                      </tr>
                    )}
                    {showJsonIndex === index + 1 && (
                      <tr className={styles.jsonRow}>
                        <td colSpan={8}>
                          <pre>{JSON.stringify(displayedPeople[index + 1], null, 2)}</pre>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              ))
            ) : (
              displayedPeople.map((person, index) => renderPersonRow(person, index))
            )}
          </tbody>
        </table>
      </div>
      {filter === '' &&
        <div className={styles.pagination}>
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      }
    </div>
  )
}
