import { ThemeProvider } from "@/components/ThemeProvider"
import Home from "@/pages/Home"
import PrivacyPolicy from "@/pages/PrivacyPolicy"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LanguageToggle from "./components/LanguageToggle"
import { ThemeToggle } from "./components/ThemeToggle"

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vibe-ui-theme">
            <BrowserRouter>
                <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>

                <Toaster position="top-center" />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
