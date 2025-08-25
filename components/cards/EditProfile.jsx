'use client';
import { CalendarIcon, Loader, LucideEdit3 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose, } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { updateUser } from '@/actions/user';

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import FileUpload from '../forms/Fileupload';
import { Textarea } from '../ui/textarea';

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { MonthSelect, YearSelect } from "@/components/ui/select";
import { cn } from '@/utils/cn';
import { ScrollArea } from '../ui/scroll-area';
import { usePathname } from 'next/navigation';
import { uploadFiles } from '@/utils/uploadFiles';

const formSchema = z.object({
    name: z.string().min(3),
    userName: z.string().min(3).refine(s => !s.includes(' '), 'No Spaces!'),
    bio: z.string().min(12),
    DOB: z.date(),
});

export default function EditProfile({ user }) {
    const [loading, setLoading] = useState(false);
    const [imageChanged, setImageChanged] = useState(false);
    const [image, setImage] = useState(new Blob());
    const [key, setKey] = useState(0);
    const [date, setDate] = useState(new Date());
    const path = usePathname();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || '',
            userName: user?.userName || '',
            bio: user?.bio || '',
            DOB: (user?.DOB && new Date(user?.DOB)) || new Date(),
        },
    });


    /**@param {z.infer<typeof formSchema>} values  */
    async function onSubmit(values) {
        try {
            setLoading(true);
            if (imageChanged) {
                const urls = await uploadFiles([image]);
                values.image = urls?.[0] || user?.image;
            }
            await updateUser(user?.id, values, path);
            setLoading(false);
        } catch (error) {
            form.setError('root', { message: `some thing went wrong ${error}` });
        }
    }

    const setFormDate = (e) => {
        setDate(e);
        form.setValue('DOB', e);
        setKey((prevKey) => prevKey + 1);
    };

    return <Sheet>
        <SheetTrigger className='h-10'>
            <LucideEdit3 size={'2.25rem'} className='p-1 rounded-full cursor-pointer' />
        </SheetTrigger>
        <SheetContent side={'left'} className="w-screen sm:max-w-lg">
            <ScrollArea className='h-[95vh] p-3'>
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto p-1">
                            <Avatar className='cursor-pointer w-16 h-16'> <AvatarImage src={image.size ? URL.createObjectURL(image) : user?.image} /></Avatar>
                            <FileUpload file={image} onDrop={(files) => { setImage(files[0]); setImageChanged(true); }} />
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className='flex-1'>
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
                                        <FormItem className='flex-1'>
                                            <FormLabel>User Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Johny22' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>bio</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="DOB"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel className="mb-[6px]">Date of birth</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn("w-full flex justify-start text-left", !field.value && "text-muted-foreground")}>
                                                        {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                                                <div className="flex gap-2">
                                                    <MonthSelect setFormDate={setFormDate} date={date} />
                                                    <YearSelect setFormDate={setFormDate} date={date} />
                                                </div>
                                                <div className="rounded-md border">
                                                    <Calendar key={key} mode="single" selected={date} onSelect={setFormDate} defaultMonth={date} defaultYear={date} />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button variant='outline' disabled={loading} className="w-full" type='submit'>
                                {loading ?
                                    <Loader className="mr-2 h-4 w-4 animate-spin" /> :
                                    "Edit"
                                }
                            </Button>
                        </form>
                    </Form>
                </SheetHeader>
            </ScrollArea>
        </SheetContent>
    </Sheet>;
}