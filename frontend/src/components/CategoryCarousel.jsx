import "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import { Button } from "./ui/button";

import { Code2, Database, Palette, Globe, BrainCircuit } from "lucide-react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const categories = [
  {
    name: "Frontend Developer",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    name: "Backend Developer",
    icon: <Database className="w-5 h-5" />,
  },
  {
    name: "Data Science",
    icon: <BrainCircuit className="w-5 h-5" />,
  },
  {
    name: "Graphic Designer",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    name: "FullStack Developer",
    icon: <Code2 className="w-5 h-5" />,
  },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative -mt-8 pt-6 pb-16">

      <div className="text-center mb-10">
        <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold">
          Explore Categories
        </span>

        <h2 className="mt-4 text-4xl font-extrabold text-gray-900">
          Discover Popular Job Categories
        </h2>

        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Browse opportunities from trending industries and find the perfect
          career path tailored to your skills.
        </p>
      </div>

      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent className="-ml-2">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <Button
                onClick={() => searchJobHandler(cat.name)}
                variant="outline"
                className="
                  group w-full
                  h-32  rounded-3xl
                  border border-gray-200
                  bg-white shadow-md
                  hover:shadow-2xl hover:border-violet-300
                  transition-all duration-300
                  flex flex-col
                  items-center justify-center
                  gap-3 hover:-translate-y-2
                "
              >
                <div
                  className="
                    w-14 h-14
                    rounded-2xl bg-violet-100
                    text-violet-600 flex
                    items-center justify-center
                    group-hover:bg-violet-600 group-hover:text-white
                    transition-all duration-300
                  "
                >
                  {cat.icon}
                </div>

                <span className="text-base font-semibold text-gray-800 group-hover:text-violet-700">
                  {cat.name}
                </span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="
            hidden md:flex -left-14
            bg-white border
            shadow-md hover:bg-violet-600 hover:text-white
          "
        />

        <CarouselNext
          className="
            hidden md:flex -right-14
            bg-white border
            shadow-md hover:bg-violet-600 hover:text-white
          "
        />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
