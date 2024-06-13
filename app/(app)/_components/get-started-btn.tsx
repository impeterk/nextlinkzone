import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GetStartedButton() {
    return (<Link href='/signin'>
              <Button
                className='w-full bg-emerald-500 py-6 text-xl font-semibold dark:bg-emerald-400'
                size='lg'
              >
                Get Started
              </Button>
            </Link>)
}