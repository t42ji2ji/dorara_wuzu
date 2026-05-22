import { ThemeProvider } from "@/components/ThemeProvider"
import EmotionModel from "@/pages/EmotionModel"
import Home from "@/pages/Home"
import PrivacyPolicy from "@/pages/PrivacyPolicy"
import Wardrobe from "@/pages/Wardrobe"
import AvatarExport from "@/pages/AvatarExport"
import ItemBatchExport from "@/pages/ItemBatchExport"
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
                    <Route path="/emotion-model" element={<EmotionModel />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/wardrobe" element={<Wardrobe />} />
                    <Route path="/export" element={<AvatarExport />} />
                    <Route path="/item-export" element={<ItemBatchExport />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
