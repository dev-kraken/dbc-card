import React from "react";
import {
  CardPageLayoutContent,
  CardPageLayoutHeader,
  CardPageMain,
} from "@/components/ui/card-layout";

const SelectStyle = () => {
  return (
    <CardPageMain>
      <CardPageLayoutHeader title="All Cards Style" />
      <CardPageLayoutContent>Select Styles</CardPageLayoutContent>
    </CardPageMain>
  );
};

export default SelectStyle;
