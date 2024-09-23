type Props = {
    className?: string;
}

export default function Logo({className}: Props) {
    return (
        <div>
            <h1 className={`font-semibold text-accent ${className}`}>Logo</h1>
        </div>
    )
}