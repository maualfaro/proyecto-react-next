import type { Project } from '../types'

type Props = {
  projects: Project[]
}

export function ProjectListPresentation({ projects }: Props) {
  return (
    <div>
      {projects.map(project => (
        <p key={project.id}>{project.name}</p>
      ))}
    </div>
  )
}