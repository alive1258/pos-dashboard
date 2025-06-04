import DetailsSaleReport from "@/components/SaleReport/DetailsSaleReport";

const EditPage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <DetailsSaleReport id={id} />
    </>
  );
};

export default EditPage;
