import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ClaimUsernameForm({username}: {username: string}) {

    return (
        <form action="">
        <Label htmlFor='username'>Username</Label>
        <Input id="username" name="username" defaultValue={username} />
        <Button variant="default" className='w-full mt-4' size="lg">Claim Username</Button>
        </form>
    )
}