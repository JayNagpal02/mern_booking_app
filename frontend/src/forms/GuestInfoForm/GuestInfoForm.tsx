import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

// Define the props for the GuestInfoForm component
type Props = {
    hotelId: string;
    pricePerNight: number;
};

// Define the shape of the form data for guest information
type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    // Hooks for context and navigation
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    // useForm hook for managing form state and validation
    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        },
    });

    // Watching check-in and check-out dates
    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    // Setting minimum and maximum dates for the date picker
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    // Function to handle form submission for signed-in users
    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        );
        navigate(`/hotel/${hotelId}/booking`);
    };

    // FIXME: after signing in it is redirecting to home page instead of returning back to details page passed as parameter to navigate function below
    // Function to handle form submission for guests
    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        );
        navigate("/sign-in", { state: { from: location } });
    };

    return (
        <div className="flex flex-col p-4 bg-blue-200 gap-4">
            <h3 className="text-md font-bold">₹{pricePerNight}</h3>
            <form
                onSubmit={
                    isLoggedIn
                        ? handleSubmit(onSubmit)
                        : handleSubmit(onSignInClick)
                }
            >
                <div className="grid grid-cols-1 gap-4 items-center">
                    {/* Check-in Date Picker */}
                    <div>
                        <DatePicker
                            required
                            selected={checkIn}
                            onChange={(date) =>
                                setValue("checkIn", date as Date)
                            }
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                    </div>
                    {/* Check-Out Date Picker */}
                    <div>
                        <DatePicker
                            required
                            selected={checkOut}
                            onChange={(date) =>
                                setValue("checkOut", date as Date)
                            }
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-Out Date"
                            className="min-w-full bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                    </div>
                    {/* Guest Count Input */}
                    <div className="flex bg-white px-2 py-1 gap-2">
                        <label className="items-center flex">
                            Adults:
                            <input
                                className="w-full p-1 focus:outline-none font-bold"
                                type="number"
                                min={1}
                                max={20}
                                {...register("adultCount", {
                                    required: "This field is required",
                                    min: {
                                        value: 1,
                                        message: "Adults must be at least 1",
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        <label className="items-center flex">
                            Children:
                            <input
                                className="w-full p-1 focus:outline-none font-bold"
                                type="number"
                                min={0}
                                max={20}
                                {...register("childCount", {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        {/* Error message for Adult Count */}
                        {errors.adultCount && (
                            <span className="text-red-500 text-sm font-semibold">
                                {errors.adultCount.message}
                            </span>
                        )}
                    </div>

                    {/* Conditional button based on user authentication */}
                    {isLoggedIn ? (
                        <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                            Book Now
                        </button>
                    ) : (
                        <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                            Sign in to Book
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default GuestInfoForm;
