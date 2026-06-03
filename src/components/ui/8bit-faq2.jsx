import { cn } from '../../lib/utils'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './8bit-card'

const defaultItems = [
  {
    question: 'What do I get?',
    answer: '50+ retro-styled components, blocks, and a full registry. Copy, paste, ship.',
  },
  {
    question: 'Is it free?',
    answer: 'The core library is 100% open source. Premium blocks and themes coming soon.',
  },
  {
    question: 'What frameworks?',
    answer: 'Built for React and Next.js. Works with any project that uses shadcn/ui.',
  },
  {
    question: 'How do I install?',
    answer: "Run the shadcn CLI: pnpm dlx shadcn@latest add @8bitcn/button. That's it.",
  },
  {
    question: 'Can I customize?',
    answer: 'Everything is yours. Copy the source, change the colors, modify the borders. No lock-in.',
  },
  {
    question: 'Need help?',
    answer: 'Join our Discord or open a GitHub issue. The community is active and friendly.',
  },
]

export default function FAQ2({
  title = 'Quick Answers',
  description = 'No scrolling through walls of text',
  items = defaultItems,
  className,
}) {
  return (
    <section className={cn('eight-bit-faq', className)}>
      <div className="eight-bit-faq-inner">
        {(title || description) && (
          <div className="eight-bit-faq-heading">
            {title && (
              <h2>
                {title}
              </h2>
            )}
            {description && (
              <p>
                {description}
              </p>
            )}
          </div>
        )}

        <div className="eight-bit-faq-grid">
          {items.map((item) => (
            <Card key={item.question}>
              <CardHeader>
                <CardTitle>{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {item.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
