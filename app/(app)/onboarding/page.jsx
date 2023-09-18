import { getUserFromNextAuth } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function OnBoarding() {
    let user;

    try {
        user = await getUserFromNextAuth();
    } catch (error) {
        redirect('/');
    }

    if (user.onboarded) redirect('/');

    else {
        return (
            <div>Onboarding 😊</div>
        );
    }
}
