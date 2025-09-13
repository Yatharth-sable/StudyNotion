import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MdOutlinePageview } from "react-icons/md";
import Course_Card from './Course_Card';

const CourseSlider = ({ Courses }) => {
  return (
    <div className="my-6">
      {Courses?.length ? (
        <Swiper
          pagination={{ dynamicBullets: true }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },   // mobile
            640: { slidesPerView: 2 },   // tablets
            1024: { slidesPerView: 3 },  // desktops
            1280: { slidesPerView: 4 },  // large screens
          }}
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={index}>
              <div className="relative group">
                {/* Course Card */}
                <Course_Card
                  course={course}
                  active={false}
                  Height="h-[230px]"
                />

                {/* Hover Cart Popup */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                  <button className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transition-all">
                   View Details
                    <MdOutlinePageview className='text-xl'> </MdOutlinePageview>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No course Found</p>
      )}
    </div>
  );
};

export default CourseSlider;
