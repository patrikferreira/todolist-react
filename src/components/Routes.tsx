import React, { useContext, useEffect } from 'react';
import { MdOutlineWbSunny } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { CgNotes } from "react-icons/cg";
import { NavigationContext } from '../NavigationContext';

export default function Routes() {
  const context = useContext(NavigationContext);
  const [selected, setSelected] = React.useState<string>('myDay');

  useEffect(() => {
    context?.setSelectedRoute(selected)
  }, [selected, setSelected])

  const menuItems = [
    { id: 'myDay', label: 'My Day', icon: <MdOutlineWbSunny /> },
    { id: 'projects', label: 'Projects', icon: <GrProjects /> },
    { id: 'notes', label: 'Notes', icon: <CgNotes /> },
  ];

  return (
    <div className="">
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-2 p-2 cursor-pointer rounded-lg ${
              selected === item.id ? 'bg-darkColor text-white shadow-md' : 'bg-transparent text-base'
            }`}
            onClick={() => setSelected(item.id)}
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
