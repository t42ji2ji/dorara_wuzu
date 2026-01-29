import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  const { t } = useTranslation()

  const questions = [
    { id: 'q1' },
    { id: 'q2' },
    { id: 'q3' },
    { id: 'q4' },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">{t('faq.title')}</h2>
      <Accordion type="single" collapsible className="w-full">
        {questions.map((q) => (
          <AccordionItem key={q.id} value={q.id}>
            <AccordionTrigger className="text-left">
              {t(`faq.questions.${q.id}.question`)}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {t(`faq.questions.${q.id}.answer`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQ