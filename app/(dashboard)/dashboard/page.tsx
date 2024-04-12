import React from "react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/ui/page-layout";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <PageLayout>
      <PageLayoutHeader title="Dashboard">
        <Button variant="default">
          <p className="font-semibold max-lg:hidden">Dashboard</p>
        </Button>
      </PageLayoutHeader>
      <PageLayoutContent>
        <p>Dashboard</p>
      </PageLayoutContent>
    </PageLayout>
  );
};

export default Dashboard;
