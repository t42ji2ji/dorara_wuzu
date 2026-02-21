import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft, Cloud, Lock, Shield, Eye, Bot } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
    const { t } = useTranslation()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <Button variant="ghost" size="sm" asChild className="mb-4">
                            <Link to="/" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                {t("privacy.backToHome")}
                            </Link>
                        </Button>
                        <h1 className="text-4xl font-bold text-foreground mb-2">
                            {t("privacy.title")}
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            {t("privacy.subtitle")}
                        </p>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div variants={itemVariants} className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-green-600" />
                                    {t("privacy.dataProtection.title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("privacy.dataProtection.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground leading-relaxed">
                                    {t("privacy.dataProtection.content")}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Cloud className="h-5 w-5 text-blue-600" />
                                    {t("privacy.backup.title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("privacy.backup.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground leading-relaxed">
                                    {t("privacy.backup.content")}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Eye className="h-5 w-5 text-purple-600" />
                                    {t("privacy.privacy.title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("privacy.privacy.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground leading-relaxed">
                                    {t("privacy.privacy.content")}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="h-5 w-5 text-indigo-600" />
                                    {t("privacy.ai.title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("privacy.ai.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground leading-relaxed mb-3">
                                    {t("privacy.ai.content")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed">
                                    <li>{t("privacy.ai.gemini")}</li>
                                    <li>{t("privacy.ai.groq")}</li>
                                </ul>
                                <p className="text-foreground leading-relaxed mt-3">
                                    {t("privacy.ai.footer")}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lock className="h-5 w-5 text-orange-600" />
                                    {t("privacy.security.title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("privacy.security.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground leading-relaxed">
                                    {t("privacy.security.content")}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t("privacy.contact.title")}</CardTitle>
                                <CardDescription>
                                    {t("privacy.contact.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground leading-relaxed">
                                    {t("privacy.contact.content")}
                                </p>
                                <div className="mt-4">
                                    <Button variant="outline" asChild>
                                        <a href="mailto:hey@kokoromono.com">
                                            {t("privacy.contact.email")}
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-8 text-center">
                        <p className="text-muted-foreground">
                            {t("privacy.lastUpdated")}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
