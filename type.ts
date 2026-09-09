export type Category = 'Starters' | 'Mains' | 'Desserts' | 'Drinks'

export interface MenuItem {
  id: string
  name: string
  category: Category | string
  price: number
  description: string
  available: boolean
  preparationTime: number
}

export const CATEGORIES: string[] = ['Starters', 'Mains', 'Desserts', 'Drinks']
