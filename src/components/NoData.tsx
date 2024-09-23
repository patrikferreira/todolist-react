import { CgSmileSad } from "react-icons/cg";

type Props = {
    text: string;
    className?: string;
}

export default function NoData({text, className}: Props) {
    return (
        <div className={`h-full min-w-fit flex gap-2 items-center justify-center ${className}`}>
            <CgSmileSad className="text-3xl" /> {text}
        </div>
    )
}