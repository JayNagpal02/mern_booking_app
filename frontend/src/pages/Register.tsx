import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

// Define type for form data
export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

/**
 * Register Component
 * This component provides a form for user registration.
 * It utilizes react-hook-form for form handling and validation,
 */
const Register = () => {
    // React Router hook for navigation
    const navigate = useNavigate();

    // useQueryClient hook for accessing the query client
    const queryClient = useQueryClient();

    /**
     * showToast is a function from useAppContext that displays a toast message to the user
     * @param message the message to display
     * @param type the type of message (e.g. success, error)
     */
    const { showToast } = useAppContext();

    // useForm hook for managing form state and validation
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    // useMutation hook for managing mutation and request
    // the reason we use react query here is because we don't have to manage any state ourselves, as state is built into the useMutation hook
    const mutation = useMutation(apiClient.register, {
        // onSuccess callback when registration is successful
        onSuccess: async () => {
            // Show success toast message
            showToast({ message: "Registration Success!", type: "SUCCESS" });
            // Invalidate the validateToken query to trigger a refetch
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        // onError callback when an error occurs during registration
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    // Function to handle form submission
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        // Form container with flex column layout and gap between children
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* Form Title */}
            <h2 className="text-3xl font-bold">Create an Account</h2>

            {/* First Name and Last Name fields */}
            <div className="flex flex-col md:flex-row gap-5">
                {/* First Name field */}
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("firstName", {
                            required: "This field is required",
                        })}
                    />
                    {/* Error message for First Name field */}
                    {errors.firstName && (
                        <span className="text-red-500">
                            {errors.firstName.message}
                        </span>
                    )}
                </label>

                {/* Last Name field */}
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("lastName", {
                            required: "This field is required",
                        })}
                    />
                    {/* Error message for Last Name field */}
                    {errors.lastName && (
                        <span className="text-red-500">
                            {errors.lastName.message}
                        </span>
                    )}
                </label>
            </div>

            {/* Email field */}
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", {
                        required: "This field is required",
                    })}
                />
                {/* Error message for Email field */}
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>

            {/* Password field */}
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />
                {/* Error message for Password field */}
                {errors.password && (
                    <span className="text-red-500">
                        {errors.password.message}
                    </span>
                )}
            </label>

            {/* Confirm Password field */}
            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                // if field is empty
                                return "This field is required";
                            } else if (watch("password") !== val) {
                                // if passwords do not match
                                return "Passwords do not match";
                            }
                        },
                    })}
                />
                {/* Error message for Confirm Password field */}
                {errors.confirmPassword && (
                    <span className="text-red-500">
                        {errors.confirmPassword.message}
                    </span>
                )}
            </label>

            {/* Submit Button */}
            <span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                >
                    Create Account
                </button>
            </span>
        </form>
    );
};

export default Register;
