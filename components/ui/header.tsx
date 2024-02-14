import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Header() {
  return (

    <header className="border-b w-full shadow py-4">
      <div className="flex justify-between container items-center">

        <h1>My Zink Zone</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}
