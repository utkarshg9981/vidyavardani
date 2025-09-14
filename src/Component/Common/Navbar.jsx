import React, { useEffect } from 'react'
import logo from "../../Asset/Logo/Logo-full-white.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../Data/Navbar-Link"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../Core/Auth/ProfileDropdown'
import { apiConnector } from '../../Service/apiConnector'
import { categories } from '../../Service/apis'
import { useState } from 'react'
import {IoIosArrowDown} from "react-icons/io"
import {RxHamburgerMenu} from "react-icons/rx"
import {AiOutlineClose} from "react-icons/ai"
import { createCategoryURL } from '../../Util/categoryUtils'
import './loader.css'
import './mobile-menu.css'
// const subLinks = [
//     {
//         title: "Python",
//         link:"/catalog/python"
//     },
//     {
//         title: "Web Dev",
//         link:"/catalog/web-development"
//     },
// ];

const Navbar = () => {
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const {cart} = useSelector((state)=> state.cart);
    const {totalItems} = useSelector((state)=> state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks]  = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }

    
    useEffect( () => {
        fetchSublinks();
    },[] )

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) { // md breakpoint
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.classList.remove('mobile-menu-open');
        }

        return () => {
            document.body.classList.remove('mobile-menu-open');
        };
    }, [isMobileMenuOpen]);

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 mobile-menu-container relative'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        {/* Image */}
      <Link to="/">
        <img src={logo} width={160} height={42} loading='lazy'/>
      </Link>

      {/* Nav Links */}
      <nav>
        <ul className=' hidden md:flex gap-x-6 text-richblack-25'>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div className='relative flex items-center gap-2 group'>
                                <p>{link.title}</p>
                                <IoIosArrowDown/>

                                <div className={`invisible absolute left-[50%] 
                                    translate-x-[-49%] ${(Array.isArray(subLinks) && subLinks.length) ? "translate-y-[15%]" : "translate-y-[40%]"}
                                 top-[50%] z-50 
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]`}>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    Array.isArray(subLinks) && subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' to={`catalog/${createCategoryURL(subLink.name)}`} key={index}>
                                                    <p>{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<span className="loader"></span>)
                                }

                                </div>


                            </div>

                        ) : (
                            <Link to={link?.path}>
                                <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                    {link.title}
                                </p>
                                
                            </Link>
                        )
                    }
                </li>
             ) )
        }

        </ul>
      </nav>

        {/* Login/SignUp/Dashboard */}
        <div className='hidden md:flex gap-x-4 items-center'>
            {   
                user && user?.accountType != "Instructor" && (
                    <Link to="/dashboard/cart" className='relative pr-2'>
                        <AiOutlineShoppingCart className='text-2xl text-richblack-100 ' />
                        {
                            totalItems > 0 && (
                                <span className=' absolute -bottom-2 -right-0 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login">
                        <button className='border  border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropDown />
            }
            
        </div>

         <div className='mr-4 md:hidden text-[#AFB2BF] scale-150 cursor-pointer' onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <AiOutlineClose /> : <RxHamburgerMenu />}  
         </div>   

         {/* Mobile Menu */}
         {isMobileMenuOpen && (
           <div className="absolute top-14 left-0 w-full bg-richblack-900 border-t border-richblack-700 md:hidden z-50">
             <div className="flex flex-col p-4">
               {/* Mobile Navigation Links */}
               {NavbarLinks.map((link, index) => (
                 <div key={index} className="py-2">
                   {link.title === "Catalog" ? (
                     <div>
                       <p className="text-richblack-25 font-medium py-2">{link.title}</p>
                       <div className="pl-4">
                         {Array.isArray(subLinks) && subLinks.length ? (
                           subLinks.map((subLink, subIndex) => (
                             <Link 
                               key={subIndex}
                               to={`catalog/${createCategoryURL(subLink.name)}`}
                               className="block py-2 text-richblack-300 hover:text-yellow-25"
                               onClick={() => setIsMobileMenuOpen(false)}
                             >
                               {subLink.name}
                             </Link>
                           ))
                         ) : (
                           <span className="text-richblack-300">Loading...</span>
                         )}
                       </div>
                     </div>
                   ) : (
                     <Link 
                       to={link?.path}
                       className={`block py-2 ${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}
                       onClick={() => setIsMobileMenuOpen(false)}
                     >
                       {link.title}
                     </Link>
                   )}
                 </div>
               ))}
               
               {/* Mobile Auth/Cart Section */}
               <div className="border-t border-richblack-700 pt-4 mt-4">
                 {user && user?.accountType !== "Instructor" && (
                   <Link 
                     to="/dashboard/cart" 
                     className="flex items-center py-2 text-richblack-25"
                     onClick={() => setIsMobileMenuOpen(false)}
                   >
                     <AiOutlineShoppingCart className="text-xl mr-2" />
                     Cart {totalItems > 0 && `(${totalItems})`}
                   </Link>
                 )}
                 
                 {token === null && (
                   <div className="flex flex-col gap-2 mt-4">
                     <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                       <button className="w-full border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md">
                         Log in
                       </button>
                     </Link>
                     <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                       <button className="w-full border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 rounded-md">
                         Sign Up
                       </button>
                     </Link>
                   </div>
                 )}
                 
                 {token !== null && (
                   <div className="mt-4">
                     <ProfileDropDown />
                   </div>
                 )}
               </div>
             </div>
           </div>
         )}
              
      </div>
    </div>
  )
}

export default Navbar