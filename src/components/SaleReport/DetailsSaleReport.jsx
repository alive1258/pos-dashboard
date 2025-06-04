"use client";
import { useGetSingleSaleSummaryQuery } from "@/redux/api/saleSummariesApi";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import NotFound from "../common/NotFound/NotFound";
import { truncateCharacters } from "@/utils/descriptionTextCounter";

const DetailsSaleReport = ({ id }) => {
  const {
    data: saleReportData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleSaleSummaryQuery(id, { skip: !id });
  // Filters companies based on the search query
  const filteredData = saleReportData?.data?.saleLogs;
  const filteredSaleSummaryData = saleReportData?.data?.saleSummary;
  console.log(filteredSaleSummaryData, "filteredSaleSummaryData,,,,,,,,,");

  return (
    <section className="md:px-6 mt-4 px-4 pb-4 rounded-lg">
      <SectionTitle
        big_title={"Sale Report Details"}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/"}
        title_two={" Sale Report Details"}
        link_three={`/sale-system/sale-report/${id}`}
        title_three={"Sale Report Details"}
      />

      <div className="add_form_section mt-4">
        <div className="mx-auto w-full pt-2 ">
          <h1 className="table_header">Customer Report</h1>
          <div className="overflow-x-auto w-full">
            <div className="table_section">
              <table className="w-full">
                <thead>
                  <tr className="table_row ">
                    <th className="table_th">Customer Name</th>
                    <th className="table_th">Customer Phone </th>

                    <th className="table_th">Quantity</th>
                    <th className="table_th">Total Product Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="tbody_tr">
                    <td className="table_th ">
                      <div className="w-36">
                        <p>
                          {truncateCharacters(
                            filteredSaleSummaryData?.customer_name,
                            30
                          )}
                        </p>
                      </div>
                    </td>
                    <td className="table_th">
                      <div className="w-36">
                        <p>
                          {truncateCharacters(
                            filteredSaleSummaryData?.customer_phone,
                            30
                          )}
                        </p>
                      </div>
                    </td>
                    <td className="table_th">
                      {" "}
                      <p>
                        {truncateCharacters(
                          filteredSaleSummaryData?.total_quantity,
                          30
                        )}
                      </p>
                    </td>
                    <td className="table_th">
                      {" "}
                      <p>
                        {truncateCharacters(
                          filteredSaleSummaryData?.total_price,
                          30
                        )}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div></div>
        </div>
        {/* sale repot sale logs  */}
        <div className="mx-auto w-full pt-2 mt-6">
          <h1 className="table_header">Product Sale Report</h1>
          <div className="overflow-x-auto w-full">
            <div className="table_section">
              <table className="w-full">
                <thead>
                  <tr className="table_row ">
                    <th className="table_th w-4">#SL</th>
                    <th className="table_th">Product Name</th>
                    <th className="table_th">Product Code</th>
                    <th className="table_th">Per Product Price</th>
                    <th className="table_th">Quantity</th>
                    <th className="table_th">Total Product Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index} className="tbody_tr">
                        <td className="table_th">{index + 1}</td>
                        <td className="table_th ">
                          <div className="w-36">
                            <p>{truncateCharacters(item?.product?.name, 30)}</p>
                          </div>
                        </td>
                        <td className="table_th">
                          <div className="w-36">
                            <p>{truncateCharacters(item?.product?.code, 30)}</p>
                          </div>
                        </td>
                        <td className="table_th">
                          {Number(item?.product?.price)}
                        </td>
                        <td className="table_th">{Number(item?.quantity)}</td>
                        <td className={`table_th  `}>
                          {Number(item?.total_price).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Display message when no companies match the search criteria
                    <tr>
                      <td
                        colSpan="10"
                        className="bg-black-base text-center py-6 text-red-600 text-2xl font-bold"
                      >
                        <NotFound />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSaleReport;
