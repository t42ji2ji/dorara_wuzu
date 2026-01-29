import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from 'lucide-react'

const ContactForm = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const mailtoLink = `mailto:hey@kokoromono.com?subject=${encodeURIComponent(
      formData.subject || 'Message from wuzu User'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    
    window.location.href = mailtoLink
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border p-8">
        <h2 className="text-2xl font-bold mb-2">{t('contactForm.title')}</h2>
        <p className="text-muted-foreground mb-6">{t('contactForm.subtitle')}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t('contactForm.name')}
              </label>
              <Input
                id="name"
                name="name"
                placeholder={t('contactForm.namePlaceholder')}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t('contactForm.email')}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t('contactForm.emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              {t('contactForm.subject')}
            </label>
            <Input
              id="subject"
              name="subject"
              placeholder={t('contactForm.subjectPlaceholder')}
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t('contactForm.message')}
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder={t('contactForm.messagePlaceholder')}
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          
          <Button type="submit" size="lg" className="w-full">
            <Send className="mr-2 h-4 w-4" />
            {t('contactForm.sendButton')}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm