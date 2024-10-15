type Props = {
    title: string;
    route: string;
    className?: string;
    target?: string;
}

export default function Anchor({title, route, className, target}: Props) {
    return (
        <a href={route} target={target} className={`text-sm transition-all duration-300 ${className}`}>{title}</a>
    )
}