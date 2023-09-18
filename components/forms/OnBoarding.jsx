'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from '../ui/avatar';
import FileUpload from './Fileupload';
import { useUploadThing } from '@/utils/uploadthing';
import { userOnBoard } from '@/utils/actions/user';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(3),
    userName: z.string().min(3),
    bio: z.string().min(12)
});

export default function OnBoarding({ user }) {
    const [loading, setLoading] = useState(false);
    const [imagechanged, setImageChanged] = useState(false);
    const [image, setImage] = useState(new Blob());
    const { startUpload } = useUploadThing('imageUploader');
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || '',
            userName: user?.userName || '',
            bio: user?.bio || '',
        },
    });


    /**@param {z.infer<typeof formSchema>} values  */
    async function onSubmit(values) {
        try {
            setLoading(true);
            if (imagechanged) {
                const res = await startUpload([image]);
                if (res && res[0].url) values.image = res[0].url;
            }
            await userOnBoard(user.id, values);
            router.push('/');
        } catch (error) {
            form.setError('root', { message: `some thing went wrong ${error}` });
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 lg:w-1/2 mx-auto">
                <Avatar className='cursor-pointer'> <AvatarImage src={image.size ? URL.createObjectURL(image) : user.image} /></Avatar>
                <FileUpload file={image} onDrop={(files) => { setImage(files[0]); setImageChanged(true); }} />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Johny22' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button variant='outline' disabled={loading} className="w-full" type='submit'>
                    {loading ?
                        <Loader className="mr-2 h-4 w-4 animate-spin" /> :
                        "Continue"
                    }
                </Button>
            </form>
        </Form>
    );
}
