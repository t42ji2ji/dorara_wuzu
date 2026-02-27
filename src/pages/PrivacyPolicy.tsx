import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft, Cloud, Lock, Shield, Bot, Database, ExternalLink } from 'lucide-react'
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
        <div className="min-h-screen bg-gradient-wuzu">
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
                        {/* Data We Collect */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5 text-primary" />
                                    {t("privacy.dataCollection.title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("privacy.dataCollection.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground leading-relaxed mb-3">
                                    {t("privacy.dataCollection.content")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed">
                                    <li>{t("privacy.dataCollection.items.diary")}</li>
                                    <li>{t("privacy.dataCollection.items.voice")}</li>
                                    <li>{t("privacy.dataCollection.items.mood")}</li>
                                    <li>{t("privacy.dataCollection.items.gratitude")}</li>
                                    <li>{t("privacy.dataCollection.items.profile")}</li>
                                    <li>{t("privacy.dataCollection.items.aiMemory")}</li>
                                </ul>
                                <p className="text-muted-foreground text-sm mt-3">
                                    {t("privacy.dataCollection.note")}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Data Protection */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
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

                        {/* Secure Backup */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Cloud className="h-5 w-5 text-primary" />
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

                        {/* AI & Third-Party Services */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="h-5 w-5 text-primary" />
                                    {t("privacy.ai.title")}
                                </CardTitle>
                                <CardDescription>
                                    {t("privacy.ai.description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-foreground leading-relaxed font-medium">
                                    {t("privacy.ai.consent")}
                                </p>
                                <p className="text-foreground leading-relaxed">
                                    {t("privacy.ai.content")}
                                </p>

                                {/* Google Gemini */}
                                <div className="rounded-lg border p-4 space-y-2">
                                    <h4 className="font-semibold text-foreground">
                                        {t("privacy.ai.geminiTitle")}
                                    </h4>
                                    <p className="text-foreground leading-relaxed text-sm">
                                        {t("privacy.ai.geminiData")}
                                    </p>
                                    <p className="text-foreground leading-relaxed text-sm">
                                        {t("privacy.ai.geminiPurpose")}
                                    </p>
                                    <a
                                        href={t("privacy.ai.geminiPolicyUrl")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                    >
                                        {t("privacy.ai.geminiPolicy")}
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>

                                {/* Groq Whisper */}
                                <div className="rounded-lg border p-4 space-y-2">
                                    <h4 className="font-semibold text-foreground">
                                        {t("privacy.ai.groqTitle")}
                                    </h4>
                                    <p className="text-foreground leading-relaxed text-sm">
                                        {t("privacy.ai.groqData")}
                                    </p>
                                    <p className="text-foreground leading-relaxed text-sm">
                                        {t("privacy.ai.groqPurpose")}
                                    </p>
                                    <a
                                        href={t("privacy.ai.groqPolicyUrl")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                    >
                                        {t("privacy.ai.groqPolicy")}
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>

                                <p className="text-foreground leading-relaxed">
                                    {t("privacy.ai.footer")}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {t("privacy.ai.retention")}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Security */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lock className="h-5 w-5 text-primary" />
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

                        {/* Contact */}
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
