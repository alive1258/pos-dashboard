import Link from "next/link";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

const SectionTitle = ({
  big_title,
  title_one,
  link_one,
  title_two,
  link_two,
  title_three,
  link_three,
  title_four,
  link_four,
  title_five,
  link_five,
  title_six,
  link_six,
}) => {
  const breadcrumbs = [
    title_one && link_one ? { title: title_one, link: link_one } : null,
    title_two && link_two ? { title: title_two, link: link_two } : null,
    title_three && link_three ? { title: title_three, link: link_three } : null,
    title_four && link_four ? { title: title_four, link: link_four } : null,
    title_five && link_five ? { title: title_five, link: link_five } : null,
    title_six && link_six ? { title: title_six, link: link_six } : null,
  ].filter(Boolean);

  return (
    <div>
      <div>
        <h1 className="mt-0 text-xl font-bold text-info-muted capitalize">
          {big_title}
        </h1>
        <div className="flex items-center justify-start text-xs font-medium">
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              {index === breadcrumbs.length - 1 ? (
                <span className="py-1 text-[13px] font-medium leading-[18px] text-blue-500 cursor-default">
                  {breadcrumb.title}
                </span>
              ) : (
                <Link
                  href={breadcrumb.link}
                  className="py-1 text-[13px] font-medium leading-[18px] text-info-muted hover:text-blue-500 hover:underline"
                >
                  {breadcrumb.title}
                </Link>
              )}
              {index < breadcrumbs.length - 1 && (
                <FiChevronRight className="text-[16px] mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
