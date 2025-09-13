import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useState, useEffect } from "react";
import { apiConnector } from "../../services/apiConnector";
import ProfileDropdown from "./../core/loginSignup/ProfileDropDown";
import { categories } from "../../services/apis";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);

  const [subLinks, setSubLink] = useState([]);

  // calling the api for geting the all categories
  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLink(result.data.data);
    } catch (err) {
      console.log("Could not fetch the category list");
    }
  };
  useEffect(() => {
    fetchSublinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    if (typeof route !== "string") return false;

    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-16 items-center justify-center border  border-b-richblack-700">
      <div className="flex max-w-maxContent justify-between w-11/12 items-center">
        {/* image */}
        <Link to="/">
          <img src={logo} width={160} height={42} loading="lazy" alt="logo" />
        </Link>

        {/* <button className="sm:hidden h-32 w-32 ">
            <GiHamburgerMenu className="text-white w-6 h-6  "></GiHamburgerMenu>
            </button> */}

        {/* Nav link */}
        <nav>
          <ul className="sm:flex sm:gap-x-6 sm:text-richblack-25 hidden ">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-2 group relative ">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle></IoIosArrowDropdownCircle>

                    <div className="  invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-3  opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[280px] -translate-x-[49%] translate-y-[20%] z-50 border border-b-richblack-400 border-l-richblack-400 border-r-richblack-400 shadow-lg group-hover/c:bg-richblack-200   ">
                      <div
                        className="absolute left-[50%] top-0 h-4 w-6 rotate-45 rounded bg-richblack-5  
                      translate-x-[80%]  translate-y-[-30%] "
                      ></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks.length > 0 ? (
                            subLinks.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-2 px-4 hover:bg-richblack-50 text-black"
                                key={subLink._id}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))
                          ) : (
                            <p className="text-center">No Categories Found</p>
                          )}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={` ${
                        matchRoute(link.path)
                          ? "text-yellow-5"
                          : "text-richblack-5  hover:text-richblack-50 font-md"
                      } `}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login , singup ,dashboard */}
        {/* todo: style the cart  */}
        <div className="flex gap-x-4 items-center text-richblack-5  hover:text-richblack-100 transition-all ">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative font-semibold flex text-2xl">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span className="text-sm font-mono   text-yellow-50 hover:text-yellow-100 transition-all">{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="bg-richblack-800 border border-richblack-700 px-[12px] py-[4px] text-richblack-100 rounded-md text- font-normal">
                Login
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="bg-richblack-800 border border-richblack-700 px-3 w-fit py-[4px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}
          {token && user && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
