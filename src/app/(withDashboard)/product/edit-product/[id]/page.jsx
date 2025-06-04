import EditProduct from "@/components/Products/EditProduct";

const EditPage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditProduct id={id} />
    </>
  );
};

export default EditPage;
