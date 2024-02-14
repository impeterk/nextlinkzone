"use client"
import { Icon as IconifyIcon } from '@iconify-icon/react'
export default function Icon({ icon, className = '' }) {
  return <IconifyIcon icon={icon} className={className} />
}
