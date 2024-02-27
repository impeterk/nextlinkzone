'use client'
import { usePathname } from "next/navigation";
import { Card,  CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import clsx from "clsx";

export default function PageCard({name, id}: {name:string, id: string}) {
    const pathname = usePathname()
    return (
        <Link href={`/dashboard/pages/${id}`} >
        <Card className={clsx("opacity-50  hover:opacity-100 flex items-center justify-center min-h-32 ", 
        {'opacity-100': pathname.split('/').at(-1) === id }
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