import React from "react";
import StudentInfoCard from "@/components/students/StudentDetails";
import PageContainer from "@/components/ui/pageContainer";
const StudentsTablePage: React.FC = () => {
  return (
    <PageContainer>
      <StudentInfoCard />
    </PageContainer>
  );
};

export default StudentsTablePage;
