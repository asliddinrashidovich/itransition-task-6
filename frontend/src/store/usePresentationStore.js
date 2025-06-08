import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const usePresentationStore = create(
  persist(
    (set) => ({
      nickname: '',
      role: 'VIEWER',
      presentationId: null,

      setNickname: (nickname) => set({ nickname }),
      setRole: (role) => set({ role }),
      setPresentationId: (id) => set({ presentationId: id }),
    }),
    {
      name: 'presentation-storage', 
    }
  )
)

export default usePresentationStore
