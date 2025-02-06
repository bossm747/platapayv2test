import { AIAssistant } from "@/components/ai-assistant"
import { PageContainer } from "@/components/layout/page-container"

export default function SupportPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#482164]">Help & Support</h1>
        <AIAssistant />
      </div>
    </PageContainer>
  )
}
