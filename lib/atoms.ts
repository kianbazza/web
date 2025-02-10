import type { TProjectListItem } from '@/components/project-list-item'
import { atom } from 'jotai'

export const isHoveringProjectsAtom = atom(false)
export const hoveredProjectRowItem = atom<TProjectListItem | null>(null)
