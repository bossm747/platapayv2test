"use client"

import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex items-center justify-center bg-indigo-50">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-purple-100">
            <h2 className="text-xl font-semibold text-purple-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're sorry for the inconvenience. Please try again.</p>
            <button
              className="px-6 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800 transition-colors"
              onClick={() => {
                this.setState({ hasError: false })
                window.location.reload()
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
