import React, { useEffect } from 'react';

type Props = {
    onToggle?: (active: boolean) => void;
}

export default function Switch({onToggle}: Props) {
    const [active, setActive] = React.useState<boolean>(false);

    useEffect(() => {
        if(onToggle) {}
    }, [active, onToggle])

    return (
        <div
            className={`relative h-6 w-10 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ${active ? 'bg-activeColor' : 'bg-secondaryColor'}`}
            onClick={() => setActive(!active)}
        >
            <div
                className={`absolute h-4 w-4 rounded-full bg-white transition-transform duration-300 shadow-md ${active ? 'translate-x-4' : 'translate-x-0'}`}
            />
        </div>
    );
}
