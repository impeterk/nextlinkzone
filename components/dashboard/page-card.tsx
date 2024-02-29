'use client'
import { usePathname } from "next/navigation";
import { Card,  CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import clsx from "clsx";

export default function PageCard({name}: {name:string}) {
    const pathname = usePathname()
    return (
        <Link href={`/dashboard/pages/${name}`} >
        <Card className={clsx("opacity-50  hover:opacity-100 flex items-center justify-center min-h-32 ", 
        {'opacity-100 border-emerald-500 dark:border-emerald-400 ': pathname.split('/').at(-1) === name }
    )}>
                <CardHeader>
                    <CardTitle className="text-center text-xl">
                    {name}
                    </CardTitle>
                </CardHeader>
        </Card>
        </Link>
    )
}