import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import Footer from "../components/common/footer";
import { getCatalogPageData } from '../services/operation/pageAndComponentData';
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_Card";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  // fetch all categories
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category = res?.data?.data?.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        );

        if (category?._id) {
          setCategoryId(category._id);
        } else {
          console.warn("No matching category found for:", catalogName);
          setCategoryId(null); // explicitly set null, not ""
        }
      } catch (err) {
        console.log("Error fetching categories:", err.message);
      }
    };
    getCategoryDetails();
  }, [catalogName]);

  useEffect(() => {
    const fetchCatalogData = async () => {
      if (!categoryId) return; // won't call API if null
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("this is the response", res);
        setCatalogPageData(res);
      } catch (err) {
        console.log("Error fetching catalog page data:", err.message);
      }
    };
    fetchCatalogData();
  }, [categoryId]);



  if (!catalogPageData) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  return (
    <div className="text-white">
      {/* Breadcrumb + Title */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-sm text-richblack-300">
          Home / Catalog /{" "}
          <span className="text-yellow-50 font-semibold">
            {catalogPageData?.selectedCategory?.name}
          </span>
        </p>
        <h1 className="text-3xl font-bold mt-2">
          {catalogPageData?.selectedCategory?.name}
        </h1>
        <p className="text-richblack-200 mt-2 max-w-2xl">
          {catalogPageData?.selectedCategory?.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* Section 1 */}
        <div>
          <div className="flex gap-4 mb-4">
            <p className="font-semibold text-yellow-50 cursor-pointer">Most Popular</p>
            <p className="text-richblack-300 cursor-pointer hover:text-yellow-50">New</p>
          </div>
          <CourseSlider  Courses={catalogPageData?.selectedCategory?.courses} />
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Top courses in{" "}
            <span className="text-yellow-50">{catalogPageData?.selectedCategory?.name}</span>
          </h2>
          <CourseSlider Courses={catalogPageData?.differentCategory?.courses} />
        </div>

        {/* Section 3 */}
        <div className="mb-10 pb-20">
          <h2 className="text-2xl font-semibold mb-6">Frequently Bought Together</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 4)
              ?.map((course, index) => (
                <Course_Card
                 active={true}
                  course={course}
                  key={index}
                  Height={"h-[180px]"}
                />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
