import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client.ts";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

// Define type for form data
export type SignInFormData = {
    email: string;
    password: string;
};

/**
 * SignIn Component
 * Component for user sign-in functionality.
 */
const SignIn = () => {
    // React Router hook for navigation
    const navigate = useNavigate();

    // useQueryClient hook for accessing the query client
    const queryClient = useQueryClient();

    // App context hook for accessing global state and functions
    const { showToast } = useAppContext();

    // useForm hook for managing form state and validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>();

    // useMutation hook for managing mutation and request
    // The state is built into the useMutation hook
    const mutation = useMutation(apiClient.signIn, {
        // onSuccess callback when login is successful
        onSuccess: async () => {
            // Show success toast message
            showToast({ message: "Sign in Success!", type: "SUCCESS" });
            // Invalidate the validateToken query to trigger a refetch
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        // onError callback when an error occurs during login
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    // Function to handle form submission
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* Form Title */}
            <h2 className="text-3xl font-bold">Sign In</h2>

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

            <span className="flex items-center justify-between">
                {/* Additional link for registration page */}
                <span className="text-sm">
                    Not Registered?{" "}
                    <Link className="underline" to="/register">
                        Create an account here
                    </Link>
                </span>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                >
                    Login
                </button>
            </span>
        </form>
    );
};

export default SignIn;
