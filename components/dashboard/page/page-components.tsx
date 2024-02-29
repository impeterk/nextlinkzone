
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export function PageHeader({pageData}) {
    return (
        <header>
        <Card className='flex h-fit min-h-60 flex-col justify-center shadow'>
          <CardContent className='mt-auto text-center text-3xl'>
            {pageData.id}
          </CardContent>
          <CardFooter className='mt-auto flex justify-center'>
            <div className='relative'>
              <UserImage image={pageData?.image} fallback={pageData.id}/>
            </div>
          </CardFooter>
        </Card>
      </header>
        )
}


function UserImage({image, fallback}: {image: string | null, fallback:string}) {

    return (
      <Avatar className='absolute -left-20 -top-12 size-40  border-2 border-primary'>
         {image && <AvatarImage src={image} alt={`user page avatar`} />}
        <AvatarFallback className="capitalize text-5xl">{fallback[0]}</AvatarFallback>
      </Avatar>
    );
  }