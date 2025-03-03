import React from "react";
import StudentsTable from "@/components/students/StudentsTable";
import PageContainer from "@/components/ui/pageContainer";

const StudentsTablePage: React.FC = () => {
  return (
    <PageContainer>
      <StudentsTable/>
    </PageContainer>
  );
};

export default StudentsTablePage;
