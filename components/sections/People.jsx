import { prisma } from '@/utils/db';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import People from '../cards/People';

export default async function PeopleSection({ user }) {
    const people = await prisma.user.findMany({
        take: 5,
        where: {
            id: { not: user?.id }
        }
    });

    

    return (
        <Card>
            <CardHeader>
                <CardTitle>People you may know</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
                {
                    people.map(person => (
                        <People key={person.id} person={person} />
                    ))
                }
            </CardContent>
        </Card>
    );
}