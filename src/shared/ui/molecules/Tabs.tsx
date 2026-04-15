"use client"
import { createContext, useContext, useState, ReactNode } from "react"

/* ---------------- CONTEXT ---------------- */

type TabsContextType = {
  activeTab: string
  setActiveTab: (id: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

function useTabs() {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error("Tabs components must be used inside Tabs")
  }

  return context
}

/* ---------------- TYPES ---------------- */

type TabsProps = {
  children: ReactNode
  defaultTab?: string
}

/* ---------------- ROOT ---------------- */

function TabsRoot({ children, defaultTab = "tasks" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

/* ---------------- HEADER ---------------- */

function Header({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
      {children}
    </div>
  )
}

/* ---------------- TAB ---------------- */

function Tab({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  const { activeTab, setActiveTab } = useTabs()

  const isActive = activeTab === id

  return (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: "6px 12px",
        cursor: "pointer",
        border: "none",
        background: "transparent",
        borderBottom: isActive
          ? "2px solid blue"
          : "2px solid transparent",
        fontWeight: isActive ? "bold" : "normal",
      }}
    >
      {children}
    </button>
  )
}

/* ---------------- CONTENT ---------------- */

function Content({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  const { activeTab } = useTabs()

  if (activeTab !== id) return null

  return <div>{children}</div>
}

/* ---------------- COMPOUND COMPONENT ---------------- */

export const Tabs = Object.assign(TabsRoot, {
  Header,
  Tab,
  Content,
})