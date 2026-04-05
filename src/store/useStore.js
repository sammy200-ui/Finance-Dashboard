import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/mockData'

export const useStore = create(
  persist(
    (set) => ({
      transactions: mockTransactions,
      role: "viewer",
      theme: "dark",
      filters: {
        search: "",
        category: "all",
        type: "all",
        sortBy: "date",
        sortOrder: "desc",
      },

      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),

      addTransaction: (txn) => set((state) => ({
        transactions: [txn, ...state.transactions]
      })),

      editTransaction: (id, updatedTxn) => set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? { ...t, ...updatedTxn } : t
        )
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      setFilter: (key, value) => set((state) => ({
        filters: {
          ...state.filters,
          [key]: value
        }
      })),

      resetFilters: () => set(() => ({
        filters: {
          search: "",
          category: "all",
          type: "all",
          sortBy: "date",
          sortOrder: "desc",
        }
      }))
    }),
    {
      name: 'fintrack-store',
    }
  )
)
