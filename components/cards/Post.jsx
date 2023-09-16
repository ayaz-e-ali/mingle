import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';

export function Post({ post }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Description.</CardDescription>
            </CardHeader>
            <CardContent className='grid grid-cols-1'>
                <Image className='mx-auto w-full col-span-1' objectFit='cover' src={'/FF_KF_PROTOTYPE_FUND_Facebook-2.jpg'} width={500} height={500} alt='vercel' />
            </CardContent>
            <CardFooter className="flex justify-between">

            </CardFooter>
        </Card>
    );
}
