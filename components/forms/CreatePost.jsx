'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import { ImagePlus, Loader } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import FileUpload from './Fileupload';
import { createPost } from '@/actions/post';
import { uploadFiles, useUploadThing } from '@/utils/uploadthing';


const formSchema = z.object({
    body: z.string().min(1),
});

export default function CreatePost({ user }) {
    const [loading, setLoading] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [post, setPost] = useState('');
    const [images, setImages] = useState([]);
    const { startUpload } = useUploadThing('imageUploader');

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            body: "",
        },
    });

    /**@param {z.infer<typeof formSchema>} values  */
    async function onSubmit(values) {
        setLoading(true);
        let imageUrls = await startUpload(images);
        imageUrls = imageUrls.map(image => image.url);
        const post = await createPost(values.body, imageUrls);
        if (post) { //if success then reset
            setFormPost({ target: { value: '' } });
            setIsImage(false);
            setImages([]);
        }
        setLoading(false);
    }

    const setFormPost = (e) => {
        setPost(e.target.value);
        form.setValue('body', e.target.value);
    };

    /**@param {Array} values */
    const handleDrop = (values) => {
        setImages(values.slice(0, 4));
    };

    return (
        <div className='border rounded-md px-6 py-4 space-y-4'>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Textarea rows={2} className='placeholder:font-bold ' placeholder={`what's on your mind...${user?.name.split(' ')[0]}`} onChange={setFormPost} value={post} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className='h-[2px] mt-4' />
                    {isImage &&
                        <FileUpload file={images} onDrop={handleDrop} multiple />
                    }
                </form>
                <div className="flex justify-between">
                    <Button disabled={loading} className='rounded-full aspect-square' size='icon' variant="ghost" onClick={() => { setIsImage(!isImage); }}>
                        <ImagePlus size={'1.5rem'} />
                    </Button>
                    <Button disabled={loading || !post} className="disabled:cursor-not-allowed" onClick={() => { onSubmit(form.getValues()); }}>
                        {loading ?
                            <Loader className="h-4 w-4 animate-spin" /> :
                            "Post"
                        }
                    </Button>
                </div>
            </Form>
        </div>
    );
}
