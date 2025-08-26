'use client';
import { useState } from "react"; // Import useState
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Removed AlertDialogTrigger import as we won't use it here

import { EllipsisVertical } from 'lucide-react';
import { usePathname } from "next/navigation";
import { deletePost } from "@/actions/post";

export default function PostOptions({ postId, isCurrentUserProfile }) {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false); // State to control AlertDialog
    const [loading, setLoading] = useState(false);
    const path = usePathname();

    const handleDelete = async () => {
        setLoading(true);
        const { message } = await deletePost(postId, path);
        if (message) console.log(message);
        setLoading(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <EllipsisVertical className='cursor-pointer' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        {isCurrentUserProfile && (  // Only show Edit option if it's the current user's profile
                            <DropdownMenuItem
                                onClick={() => setIsAlertDialogOpen(true)}
                                className='cursor-pointer'>
                                Delete
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete post?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Your post will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}