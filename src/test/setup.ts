import { beforeEach, vi } from 'vitest'
import { useTicketStore } from '@/store/useTicketStore'

beforeEach(() => {
  localStorage.clear()
})

vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

vi.mock('@/shared/data/seedData.json', () => ({
  tasks: [],
  tickets: [],
}))