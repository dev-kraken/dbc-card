import React from "react";
import {
  PageLayout, PageLayoutContent,
  PageLayoutHeader,
} from "@/components/ui/page-layout";
import { Button } from "@/components/ui/button";

const Leads = () => {
  return (
    <PageLayout>
      <PageLayoutHeader title="Leads">
        <Button variant="default">
          <p className="font-semibold max-lg:hidden">bUTTON</p>
        </Button>
      </PageLayoutHeader>
      <PageLayoutContent>
        <p>Leads</p>
      </PageLayoutContent>
    </PageLayout>
  );
};

export default Leads;
