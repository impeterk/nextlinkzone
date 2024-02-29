'use client'
import { Button } from "@/components/ui/button"
import {Icon} from "@iconify-icon/react"

export default function UserLink({href, name, icon}: {href: string, name: string, icon: string | null}) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
        <Button variant={'outline'} className="w-full p-6 text-xl flex items-center gap-4 justify-center" size={'lg'}>

          {icon && <>
          <Icon icon={icon} className="text-3xl"/>
          </>}
          {name}
        </Button>
        </a>
    )
  }