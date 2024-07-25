'use client'

export const runtime = 'edge'

import { PeopleTable } from '@/components/PeopleTable'
// STYLES
import styles from './styles.module.scss'

export default async function Page() {  
  return <div className={styles.page}>
    <PeopleTable />
  </div>
}
