type Props = {
    title: string;
    route: string;
    className?: string;
}

export default function Anchor({title, route, className}: Props) {
    return (
        <a href={route} target="_blank" className={`text-sm transition-all duration-300 ${className}`}>{title}</a>
    )
}