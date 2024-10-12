type Props = {
    plan: string;
}

export default function Plan({plan}: Props) {
    return (
        <div className="text-xs py-1 px-2 bg-indigo-400 rounded-lg italic text-white">
            {plan}
        </div>
    )
}