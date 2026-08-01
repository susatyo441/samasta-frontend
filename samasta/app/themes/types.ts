import type { Component } from 'vue'
import type { Invitation } from '~/types'

export interface ThemeProps {
  invitation: Invitation
}

export type ThemeLoader = () => Promise<{ default: Component }>
