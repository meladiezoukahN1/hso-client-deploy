import React from "react";
import StudentRequests from "@/components/students/StudentRequests";
import PageContainer from "@/components/ui/pageContainer";

const StudentRequestsPage: React.FC = () => {
  return (
    <PageContainer>
      <StudentRequests />
    </PageContainer>
  );
};

export default StudentRequestsPage;
