'use client';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function ShowMore({ content }) {
    const MAX_CHARACTERS = 100;
    const [expanded, setExpanded] = useState(false);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    const renderContent = () => {
        if (content.length <= MAX_CHARACTERS || expanded) {
            return content;
        } else {
            const truncatedContent = content.substring(0, MAX_CHARACTERS) + '...';

            return (
                <>
                    {truncatedContent}
                    <Button className="focus-visible:ring-0 p-0 pl-1 font-bold text-primary/80 h-fit tracking-wider" variant='link' onClick={handleToggleExpand}>Load More</Button>
                </>
            );
        }
    };

    return <div>
        {renderContent()}
    </div>;
};
