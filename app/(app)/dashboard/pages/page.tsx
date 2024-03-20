import { getUserPages } from "@/lib/data"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()
  const userPages = await getUserPages(session?.user?.id!)
  if (Boolean(userPages.length)) redirect(`/dashboard/pages/${userPages[0].id}`)
  return (
    <div className="prose md:prose-xl dark:prose-invert h-full flex flex-col items-center justify-center ">
      {!Boolean(userPages.length) && <><h3>No pages created yet...</h3>
      <p>Click on the plus button, to create your first page</p></>}
    </div>
  )
}
