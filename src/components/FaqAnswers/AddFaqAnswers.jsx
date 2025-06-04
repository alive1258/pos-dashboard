"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateFaqAnswersMutation } from "@/redux/api/faqAnsApi";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import FetchLoading from "../common/Loading/FetchLoading";
import SelectAndSearch from "../common/SelectAndSearch/SelectAndSearch";
import Input from "../common/Forms/Input";
import { useGetAllFaqsQuery } from "@/redux/api/faqsApi";

const AddFaqAnswers = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const router = useRouter();
  const propertiesToRemove = ["faq_name"];

  const query = {};
  const [createInvestor, { isLoading }] = useCreateFaqAnswersMutation();
  const { data: AllFaqsData } = useGetAllFaqsQuery(query);

  const faqsData = AllFaqsData?.data?.data;

  const onSubmit = async (data) => {
    try {
      // remove unnecessary property
      propertiesToRemove?.forEach((property) => {
        delete data[property];
      });

      // API Call
      const res = await createInvestor(data).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("Faq Answers added successfully!", {
          position: toast.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message ?? "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  return (
    <section className="md:px-6 px-4 mt-6 rounded-lg">
      <div>
        <SectionTitle
          big_title={"Add Faq Answers"}
          link_one={"/"}
          title_one={"Home"}
          link_two={"/investors/all-investors"}
          title_two={"All Faq Answers"}
          title_three={"Add Faq Answers"}
          link_three={"/investors/add-investor"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Create Faq Answers Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="grid sm:grid-cols-1 items-start gap-y-2 ">
            <SelectAndSearch
              options={faqsData?.map((type) => ({
                id: type?.id,
                name: type?.headline,
              }))}
              type_id={"faq_id"}
              type_name={"faq_name"}
              label="Select Faq"
              placeholder="Select a Faq"
              register={register}
              required={true}
              setValue={setValue}
              errors={errors}
              message={"Faq is required"}
            />

            <Input
              placeholder="Enter Question"
              text="question"
              label="Question"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Answer"
              text="answer"
              label="Answer"
              register={register}
              errors={errors}
            />
          </div>

          <div className="pt-4">
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? <FetchLoading /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddFaqAnswers;
