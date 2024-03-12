import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client.ts";
import { useAppContext } from "../contexts/AppContext";

/**
 * SignOutButton Component
 * Component for signing out the user.
 */
const SignOutButton = () => {
    // useQueryClient hook for accessing the query client
    // allows us to perform global level authentication and authorization and functionalities
    const queryClient = useQueryClient();

    // App context hook for accessing global state and functions
    const { showToast } = useAppContext();

    // useMutation hook for managing mutation and request
    const mutation = useMutation(apiClient.signOut, {
        // onSuccess callback when sign-out is successful
        onSuccess: async () => {
            // Invalidate the validateToken query to trigger a refetch
            await queryClient.invalidateQueries("validateToken");
            // Show success toast message
            showToast({ message: "Signed Out!", type: "SUCCESS" });
        },
        // onError callback when an error occurs during sign-out
        onError: (error: Error) => {
            // Show error toast message
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    // Function to handle sign-out button click
    const handleClick = () => {
        // Trigger the sign-out mutation
        mutation.mutate();
    };

    return (
        <button
            onClick={handleClick}
            className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
