import { getUserFromNextAuth } from '@/utils/auth';
import { redirect } from 'next/navigation';
import OnBoarding from '@/components/forms/OnBoarding';

export default async function OnBoardingPage() {
    let user;

    try {
        user = await getUserFromNextAuth();
    } catch (error) {
        redirect('/');
    }

    if (user?.onboarded) redirect('/');
    
    else {
        return (
            <main className='container'>
                <h1 className='text-3xl mb-2'>Wellcome to Mingle</h1>
                <p className='text-primary/80 mb-4'>let&apos;s complete your profile</p>
                <OnBoarding user={user} />
            </main>
        );
    }
}
