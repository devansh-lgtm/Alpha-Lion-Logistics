import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../../lib/motion'

export function Reveal({ children, className = '', delay = 0, variants = fadeUp, as = 'div', once = true, amount = 0.2 }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}

export function RevealGroup({ children, className = '', delay = 0.08, delayChildren = 0, as = 'div', amount = 0.15 }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag className={className} variants={stagger(delay, delayChildren)} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </Tag>
  )
}

export const Item = ({ children, className = '', as = 'div' }) => {
  const Tag = motion[as] || motion.div
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  )
}
