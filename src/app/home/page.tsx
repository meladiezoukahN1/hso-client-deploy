import Home from "@/components/home/home-ui";
import PageContainer from "@/components/ui/pageContainer";

const Page = () =>
  //   {
  //   searchParams,
  // }: {
  //   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  // }
  {
    // console.log(await searchParams);
    return (
      <PageContainer>
        <Home />
      </PageContainer>
    );
  };

export default Page;
