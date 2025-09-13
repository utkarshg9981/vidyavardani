import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'

import { removeFromCart, resetCart } from '../../../Slice/cartSlice'
import { BuyCourse } from '../../../Service/Operation/studentFeaturesAPI'
import RatingStars from '../../Common/RatingStars'

const Cart = () => {
  const { cart, total, totalItems } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleBuyCart = () => {
    if (!token) {
      toast.error("Please login to purchase courses")
      navigate("/login")
      return
    }

    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch)
    // Clear cart after successful purchase
    dispatch(resetCart())
  }

  const handleRemoveFromCart = (courseId) => {
    dispatch(removeFromCart(courseId))
    toast.success("Course removed from cart")
  }

  if (totalItems === 0) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-richblack-5">
            Your Cart is Empty
          </h2>
          <p className="mt-4 text-lg text-richblack-300">
            Add some courses to your cart to see them here
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-6 rounded-md bg-yellow-400 px-6 py-3 text-lg font-semibold text-richblack-900 hover:bg-yellow-300 transition-colors"
          >
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
      
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Course{totalItems > 1 ? "s" : ""} in Cart
      </p>

      {cart.length > 0 && (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          {/* Cart Items */}
          <div className="flex-1">
            {cart.map((course, indx) => (
              <div
                key={course._id}
                className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                  indx !== cart.length - 1 ? "border-b border-b-richblack-400 pb-6" : ""
                } ${indx !== 0 ? "mt-6" : ""}`}
              >
                <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col space-y-1">
                    <p className="text-lg font-medium text-richblack-5">
                      {course?.courseName}
                    </p>
                    <p className="text-sm text-richblack-300">
                      {course?.category?.name}
                    </p>
                    <p className="text-sm text-richblack-300">
                      By {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">4.5</span>
                      <RatingStars Review_Count={4.5} Star_Size={16} />
                      <span className="text-richblack-400 text-sm">
                        ({course?.ratingAndReviews?.length || 0} ratings)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => handleRemoveFromCart(course._id)}
                    className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200 hover:bg-richblack-600 transition-colors"
                  >
                    <FaTrash />
                    <span>Remove</span>
                  </button>
                  <p className="mb-6 text-3xl font-medium text-yellow-400">
                    ₹ {course?.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="min-w-[280px] rounded-md border border-richblack-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
            <p className="mb-6 text-3xl font-medium text-yellow-400">₹ {total}</p>
            
            <button
              onClick={handleBuyCart}
              className="w-full rounded-md bg-yellow-400 py-3 text-lg font-semibold text-richblack-900 hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
            >
              <BsFillCaretRightFill />
              Buy Now
            </button>
            
            <button
              onClick={() => dispatch(resetCart())}
              className="w-full mt-3 rounded-md border border-richblack-600 bg-richblack-700 py-3 text-lg font-semibold text-richblack-100 hover:bg-richblack-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
