
import Icon from "./icon"
export default function Header() {
  return (

    <footer className="text-muted-foreground font-mono py-2 ">
      <div className="container flex items-center justify-center gap-2 max-sm:flex-col ">
        <p>&copy; NaP Developers {new Date().getFullYear()}</p>
        <span className="max-sm:hidden">|</span>

        <p className="flex items-center gap-2">powered by
          <Icon icon="logos:nextjs-icon" className="text-3xl" />

        </p>
      </div>
    </footer >
  )
}
