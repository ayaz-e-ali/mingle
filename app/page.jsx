import WidgetWrapper from '@/components/WidgetWrapper';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="grid grid-cols-10 container gap-10">
      <div className="hidden md:block md:col-span-3 h-56 child:h-full sticky top-10">
        <WidgetWrapper>

        </WidgetWrapper>
      </div>
      <div className="child:h-32 col-span-12 md:col-span-4 space-y-4">
        {
          new Array(40).fill(1).map((item, i) => (
            <WidgetWrapper key={i}>

            </WidgetWrapper>
          ))
        }
      </div>
      <div className="hidden md:block md:col-span-3 h-56 child:h-full sticky top-10">
        <WidgetWrapper>

        </WidgetWrapper>
      </div>
    </main>
  );
}
