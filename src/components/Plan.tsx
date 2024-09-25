type Props = {
    plan: string;
}

export default function Plan({plan}: Props) {
    return (
        <div className="text-xs p-1 bg-focusColor rounded-lg italic">
            {plan}
        </div>
    )
}