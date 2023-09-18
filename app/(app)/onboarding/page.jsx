import { getUserFromNextAuth } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function OnBoarding() {
    const user = await getUserFromNextAuth();
    
    if (user.onboarded) redirect('/');
    
    else {
        return (
            <div>Onboarding 😊</div>
        );
    }
}
