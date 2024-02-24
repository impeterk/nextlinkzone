import { PlusIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function PageCard() {
    return (
        <Card className="opacity-50 hover:cursor-pointer hover:opacity-100">
                <CardHeader>
                    <CardTitle className="text-center">
                        Add new page
                    </CardTitle>
                </CardHeader>
            <CardContent className="flex items-center justify-center">
                    <PlusIcon className="size-12" />
            </CardContent>
        </Card>
    )
}