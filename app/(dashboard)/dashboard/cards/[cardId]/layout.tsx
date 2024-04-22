import React from "react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/ui/page-layout";

interface CardEditLayoutProps {
  children: React.ReactNode;
}

const CardEditLayout = ({ children }: CardEditLayoutProps) => {
  return (
    <PageLayout>
      <PageLayoutHeader title= "Dashboard" />
      <PageLayoutContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
          <div className="col-span-2 w-full">{children}</div>
          <div className="flex items-center mt-12">
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
              <div className="h-[32px] w-[3px] bg-purple-600 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-purple-600 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-purple-600 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-purple-600 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                <iframe
                  src="https://devkraken.com"
                  width="272px"
                  height="572px"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </PageLayoutContent>
    </PageLayout>
  );
};

export default CardEditLayout;
