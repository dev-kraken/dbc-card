import React from "react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/ui/page-layout";

const SelectStyle = () => {
  return (
    <PageLayout>
      <PageLayoutHeader title="All Cards"></PageLayoutHeader>
      <PageLayoutContent className="flex flex-wrap gap-4">
        Select Style
      </PageLayoutContent>
    </PageLayout>
  );
};

export default SelectStyle;
