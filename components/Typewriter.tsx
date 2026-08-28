'use client'

import { useEffect, useState } from 'react'

const DEFAULT_PHRASES = [
  '有三秋桂子,十里荷花。',
  '落霞与孤鹜齐飞,秋水共长天一色。',
  '大江东去,浪淘尽,千古风流人物。',
  '采菊东篱下,悠然见南山。',
  '醉后不知天在水,满船清梦压星河。',
]

interface Props {
  phrases?: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
  className?: string
}

export default function Typewriter({
  phrases = DEFAULT_PHRASES,
  typingSpeed = 120,
  deletingSpeed = 45,
  pauseMs = 3000,
  className = '',
}: Props) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    const current = phrases[index % phrases.length]
    let timer: ReturnType<typeof setTimeout> | undefined

    if (phase === 'typing') {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed)
      } else {
        timer = setTimeout(() => setPhase('deleting'), pauseMs)
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed)
      } else {
        setIndex((i) => (i + 1) % phrases.length)
        setPhase('typing')
      }
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [text, phase, index, phrases, typingSpeed, deletingSpeed, pauseMs])

  return (
    <span className={className} aria-label={phrases[index % phrases.length]}>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="typewriter-cursor text-primary-500">
        _
      </span>
    </span>
  )
}
