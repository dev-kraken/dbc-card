import React from "react";
import { Radio } from "lucide-react";
import { CardPageLayout } from "@/components/ui/card-layout";

interface CardEditLayoutProps {
  children: React.ReactNode;
}

const CardEditLayout = ({ children }: CardEditLayoutProps) => {
  return (
    <CardPageLayout>
      {children}
      <div className="col-span-1 flex flex-col items-center border-l-2">
        <h3 className="my-4 text-sm font-semibold text-green-1 flex gap-2">
          Live Preview
          <Radio className="text-green-1 size-6 animate-pulse" />
        </h3>
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
          <div className="h-[32px] w-[3px] bg-purple-600 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-purple-600 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-purple-600 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-purple-600 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
            <iframe
              src="https://vincheckonline.vercel.app/"
              width="272px"
              height="572px"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </CardPageLayout>
  );
};

export default CardEditLayout;
