import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Bell, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4 lg:gap-6">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Copy%20of%20Innovate%20HUB%20(500%20x%20500%20px)-oE4p6xoAQZQtD0p1EsvTXxQSTgs30q.png"
          alt="PlataPay Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <Input placeholder="Search transactions..." className="w-[300px] hidden md:flex" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="sm">
          Upgrade Plan
        </Button>
      </div>
    </header>
  )
}

