type Props = {
    title: string;
    className?: string;
    action?: () => void;
}

export default function Button({title, className, action}: Props) {
    return (
        <button className={`bg-accent text-sm p-2 text-lightColor transition-all duration-300 hover:brightness-90 ${className}`} onClick={action}>
            {title}
        </button>
    )
}