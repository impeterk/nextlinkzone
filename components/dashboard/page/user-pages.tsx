import { getUserPages } from "@/app/lib/data/pages"
import { auth } from "@/auth"
import PageCard from "../page-card";

async function UserPages() {
    const session = await auth()
    const user = session?.user
    if (!user) return null
    const usersPages = await getUserPages(user.id!)
    return (
        <>
        <ul className="space-y-4">
            {usersPages.map((page) => (
                <li  key={page.id}>
                <PageCard name={page.name} id={page.id} />
                </li>
            ))}
        </ul>
        </>
    )
}


export default UserPages