"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
const Signup = dynamic(() => import('@/components/forms/Signup'));
const Login = dynamic(() => import('@/components/forms/Login'));

export default function Signin() {
    const [tab, setTab] = useState("signup");

    const onTabChange = (value) => {
        setTab(value);
    };

    return (
        <main className="flex items-center justify-center h-screen">
            <Tabs value={tab} onValueChange={onTabChange}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Suspense fallback={`Loading...`}>
                        <Signup setTab={setTab} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="login">
                    <Suspense fallback={`Loading...`}>
                        <Login />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </main>
    );
}