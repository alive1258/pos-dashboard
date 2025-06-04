"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SelectAndSearch from "../common/SelectAndSearch/SelectAndSearch";
import Input from "../common/Forms/Input";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import TableSkeleton from "../common/Loading/TableSkeleton";
import {
  useGetSingleFaqAnswerQuery,
  useUpdateFaqAnswerMutation,
} from "@/redux/api/faqAnsApi";
import { useGetAllFaqsQuery } from "@/redux/api/faqsApi";
import FetchLoading from "../common/Loading/FetchLoading";

const EditFaqAnswers = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const propertiesToRemove = ["faq_name"];

  const {
    data: faqAnsData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleFaqAnswerQuery(id);

  const [updateFaqAns, { isLoading }] = useUpdateFaqAnswerMutation();
  const { data } = useGetAllFaqsQuery({});
  const router = useRouter();

  const faqsData = data?.data?.data;

  useEffect(() => {
    if (faqAnsData) {
      const { faq } = faqAnsData?.data;

      if (faq) {
        setValue("faq_id", faq?.id);
        setValue("faq_name", faq?.headline);
      }
      setValue("question", faqAnsData.data.question || "");
      setValue("answer", faqAnsData.data.answer || "");
    }
  }, [faqAnsData, setValue]);

  const onSubmit = async (data) => {
    try {
      // remove unnecessary property
      propertiesToRemove?.forEach((property) => {
        delete data[property];
      });

      const res = await updateFaqAns({ id, data }).unwrap();
      if (res?.success) {
        router.back();
        toast.success(" updated successfully!", {
          position: toast.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  if (fetchLoading) return <TableSkeleton />;
  if (error) return <div>Error: {error?.message}</div>;

  return (
    <section className="md:px-6 px-4 mt-6 rounded-lg">
      <div>
        <SectionTitle
          big_title={"Edit Faq Answers"}
          link_one={"/"}
          title_one={"Home"}
          link_two={"/faq-answers/all-faq-answers"}
          title_two={"All Faq Answers"}
          link_three={`/faq-answers/edit-faq-answer/${id}`}
          title_three={"Edit Faq Answers"}
        />
      </div>

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Faq Answers Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="grid sm:grid-cols-2 items-start gap-y-2 gap-x-4">
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

export default EditFaqAnswers;
