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
import { register } from '@/utils/actions/auth';
import { useState } from 'react';
import Providers from '../auth/Providers';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine(({ confirmPassword, password }) => confirmPassword === password, { message: "password dont match", path: ['confirmPassword'] });

export default function Signup({ setTab }) {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    /**@param {z.infer<typeof formSchema>} values  */
    async function onSubmit(values) {
        setLoading(true);
        const { user, message } = await register(values);
        if (message) form.setError('root', { message });
        else setTab('login');
        setLoading(false);
    }
    return (
        <div className='border rounded-sm p-8 md:min-w-[500px] space-y-8'>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="test@gmail.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} className="w-full" type='submit'>
                        {loading ?
                            <Loader className="mr-2 h-4 w-4 animate-spin" /> :
                            "Signin"
                        }
                    </Button>
                </form>
            </Form>
            {/* seperator */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            {/* providers */}
            <Providers />
        </div>
    );
}
