'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader, CalendarIcon } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import FileUpload from './Fileupload';

import { useUploadThing } from '@/utils/uploadthing';
import { userOnBoard } from '@/utils/actions/user';
import { cn } from "@/utils/cn";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ScrollArea } from "@/components/ui/scroll-area";
import { format, setMonth, setYear } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

const formSchema = z.object({
    name: z.string().min(3),
    userName: z.string().min(3).refine(s => !s.includes(' '), 'No Spaces!'),
    bio: z.string().min(12),
    DOB: z.date(),
    location: z.string().min(3)
});

export default function OnBoarding({ user }) {
    const [loading, setLoading] = useState(false);
    const [imageChanged, setImageChanged] = useState(false);
    const [image, setImage] = useState(new Blob());
    const [date, setDate] = useState(new Date());
    const [key, setKey] = useState(0);
    const { startUpload } = useUploadThing('imageUploader');
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || '',
            userName: user?.userName || '',
            bio: user?.bio || '',
            DOB: user.DOB || null,
            location: user.location || ''
        },
    });


    /**@param {z.infer<typeof formSchema>} values  */
    async function onSubmit(values) {
        try {
            setLoading(true);
            if (imageChanged) {
                const res = await startUpload([image]);
                if (res && res[0].url) values.image = res[0].url;
            }
            await userOnBoard(user.id, values);
            router.push('/');
        } catch (error) {
            form.setError('root', { message: `some thing went wrong ${error}` });
        }
    }

    const setFormDate = (e) => {
        setDate(e);
        form.setValue('DOB', e);
        setKey((prevKey) => prevKey + 1);
    };

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:w-1/2 mx-auto">
                <Avatar className='cursor-pointer'> <AvatarImage src={image.size ? URL.createObjectURL(image) : user.image} /></Avatar>
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
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder='NewYork' {...field} />
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
        </Form >
    );
}
function YearSelect({ setFormDate, date }) {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    const yearsArray = Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);

    return <Select onValueChange={(value) => setFormDate(setYear(date || new Date(), parseInt(value)))}>
        <SelectTrigger>
            <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent position="popper">
            <ScrollArea className='h-[200px]'>
                {yearsArray.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
            </ScrollArea>
        </SelectContent>
    </Select>;
}

function MonthSelect({ setFormDate, date }) {
    return <Select onValueChange={(value) => setFormDate(setMonth(date || new Date(), parseInt(value)))}>
        <SelectTrigger>
            <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent position="popper">
            <ScrollArea className='h-[200px]'>
                <SelectItem value={'0'}>January</SelectItem>
                <SelectItem value={'1'}>February</SelectItem>
                <SelectItem value={'2'}>March</SelectItem>
                <SelectItem value={'3'}>April</SelectItem>
                <SelectItem value={'4'}>May</SelectItem>
                <SelectItem value={'5'}>June</SelectItem>
                <SelectItem value={'6'}>July</SelectItem>
                <SelectItem value={'7'}>August</SelectItem>
                <SelectItem value={'8'}>September</SelectItem>
                <SelectItem value={'9'}>October</SelectItem>
                <SelectItem value={'10'}>November</SelectItem>
                <SelectItem value={'11'}>December</SelectItem>
            </ScrollArea>
        </SelectContent>
    </Select>;
}

