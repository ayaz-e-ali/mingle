import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AxeIcon, PiIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';

export function Post({ post }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Description.</CardDescription>
            </CardHeader>
            <CardContent>
                <Image src={'/FF_KF_PROTOTYPE_FUND_Facebook-1.webp'} width={300} height={150} alt='vercel'/>
            </CardContent>
            <CardFooter className="flex justify-between">
                
            </CardFooter>
        </Card>
    );
}
