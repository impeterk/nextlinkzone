export default function Page({params}: {params: {pageid: string}}){

    return (
        <div className="text-3xl">{params.pageid}</div>
    )
}