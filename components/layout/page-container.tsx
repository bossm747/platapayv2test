import { theme } from "@/lib/theme"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div 
      className={`min-h-screen bg-gradient-to-b from-[#f5f0f9] to-[#2d1a3f] p-6 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}
