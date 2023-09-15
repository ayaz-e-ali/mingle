import { Loader } from 'lucide-react';
export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
            <h1 className='tracking-widest transition-colors duration-500 text-3xl font-semibold font-serif w-fit'>
              MING
              <span className='bg-accent text-accent-foreground p-1 tracking-normal'>
                LE
              </span>
            </h1>
            <Loader size={'2.5rem'} className='animate-spin '/>
        </div>
    );
}