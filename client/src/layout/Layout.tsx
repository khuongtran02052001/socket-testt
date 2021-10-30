import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
// import { useTheme } from "next-themes";
// import { MoonIcon, SunIcon } from "@heroicons/react/solid";
// import React, { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  // const { systemTheme, theme, setTheme } = useTheme();

  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // const renderTheme = () => {
  //   if (!mounted) return null;

  //   const currenTheme = theme === "system" ? systemTheme : theme;

  //   if (currenTheme === "dark") {
  //     return (
  //       <SunIcon
  //         className="w-7 h-7"
  //         role="button"
  //         onClick={() => setTheme("light")}
  //       />
  //     );
  //   } else {
  //     return (
  //       <MoonIcon
  //         className="w-7 h-7"
  //         role="button"
  //         onClick={() => setTheme("dark")}
  //       />
  //     );
  //   }
  // };

  return (
    <div className='w-'>
      <div
       
        className="shadow-custom-light sticky top-0 z-20 dark:text-black"
      >
        <Header style={undefined} />
      </div>
      {/* <div className="sticky top-0 z-20 flex justify-center py-5 bg-red-200 bg-opacity-70 dark:text-black dark:bg-gray-100">
        {renderTheme()}
      </div> */}
      {children}
      <Footer />
    </div>
  );
}
