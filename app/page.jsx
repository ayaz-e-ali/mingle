import WidgetWrapper from '@/components/WidgetWrapper';

export default function Home() {
  return (
    <main className="grid grid-cols-10 container gap-10">
      <div className="hidden lg:block lg:col-span-3 h-56 child:h-full sticky top-10">
        <WidgetWrapper>
          USER
        </WidgetWrapper>
      </div>
      <div className="child:h-32 col-span-12 lg:col-span-4 space-y-4">
        {
          new Array(40).fill(1).map((item, i) => (
            <WidgetWrapper key={i}>
              POST
            </WidgetWrapper>
          ))
        }
      </div>
      <div className="hidden lg:block lg:col-span-3 h-56 child:h-full sticky top-10">
        <WidgetWrapper>
          SOMETHING
        </WidgetWrapper>
      </div>
    </main>
  );
}
