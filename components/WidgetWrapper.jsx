export default function WidgetWrapper({children}) {
    return <div className="bg-secondary rounded-lg px-4 py-2">
        {children}
    </div>;
}