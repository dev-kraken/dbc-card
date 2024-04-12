import React from "react";

const PageLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <div className="border-b border-slate-900/10 py-4 px-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </>
  );
};

export default PageLayout;
