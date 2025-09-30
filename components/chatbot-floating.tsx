"use client"

import { useState } from "react"
import { MessageCircle, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ChatbotFloating() {
  const [isOpen, setIsOpen] = useState(false)

  const openChatbot = () => {
    // Open the Netlify chatbot in a new window
    window.open('https://aquamarine-biscochitos-d9fea7.netlify.app/', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes')
  }

  return (
    <>
      {/* Floating Chatbot Icon */}
  <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50">
        <div className="relative">
          {/* Chat Preview Card */}
          {isOpen && (
            <div className="absolute bottom-16 right-0 w-64 sm:w-80 mb-2">
              <Card className="bg-slate-900/95 border-cyan-500/30 backdrop-blur-lg shadow-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-cyan-300 text-sm">Marine AI Assistant</CardTitle>
                        <CardDescription className="text-xs text-slate-400">
                          Powered by Advanced Marine AI
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-300 mb-4">
                    🌊 Hello! I'm your Marine AI Assistant. I can help you with:
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1 mb-4">
                    <li>• Ocean data analysis</li>
                    <li>• Species identification</li>
                    <li>• Research insights</li>
                    <li>• Data visualization help</li>
                  </ul>
                  <Button 
                    onClick={openChatbot}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Open Chat Assistant
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Floating Button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <div className="relative">
              <MessageCircle className="h-6 w-6 text-white" />
              {/* Pulse animation */}
              <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20"></div>
              {/* Online indicator */}
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}