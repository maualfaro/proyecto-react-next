'use client'

import { useState } from 'react'
import { ProjectListPresentation } from './ProjectListPresentation'
import type { Project } from '../types'

export function ProjectListContainer() {
  const [projects] = useState<Project[]>([
    { id: '1', name: 'Proyecto A' },
    { id: '2', name: 'Proyecto B' }
  ])

  console.log('render ProjectListContainer', { projects })

  return <ProjectListPresentation projects={projects} />
}