import { ImSpinner2 } from "react-icons/im";

export default function PagesLoading() {
    return (
        <>
        <div className="flex items-center justify-center h-full flex-col gap-4">
        <ImSpinner2 className="text-7xl animate-spin"/>
            Loading...
        </div>
        </>
    )
}