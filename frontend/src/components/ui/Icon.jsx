import { Truck, Boxes, Container, ArrowLeftRight, Globe, Zap, TrendingUp, ShoppingBag, Factory, UtensilsCrossed, Car, Package, Hammer, Scroll, Ship, Circle } from 'lucide-react'

// Explicit map keeps the bundle small (a namespace import would pull in every icon).
const icons = { Truck, Boxes, Container, ArrowLeftRight, Globe, Zap, TrendingUp, ShoppingBag, Factory, UtensilsCrossed, Car, Package, Hammer, Scroll, Ship }

export function Icon({ name, className = 'h-6 w-6', ...rest }) {
  const Cmp = icons[name] || Circle
  return <Cmp className={className} aria-hidden="true" {...rest} />
}
