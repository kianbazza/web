import { atom } from 'jotai'
import type { TProjectListItem } from '@/components/project-list-item'

export const isHoveringProjectsAtom = atom(false)
export const hoveredProjectRowItem = atom<TProjectListItem | null>(null)
