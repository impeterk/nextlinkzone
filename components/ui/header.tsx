import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "./button";
import { Link2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Header() {
  return (

    <header className="border-b w-full shadow py-4">
      <div className="flex justify-between container items-center">
        <Link href="/">

          <Button variant="link" className="text-3xl tracking-wider" >
            <Link2Icon className="size-7 mr-2" />
            My<span className="text-emerald-500 dark:text-emerald-400">Link</span>Zone
          </Button>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
