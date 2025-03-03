import { toast } from "sonner";

export interface ErrorResponse {
  response?: {
    status?: number;
    data?: {
      message?: string | string[] | Record<string, string[]>;
      errors?: Record<string, string[]>;
    };
  };
}

// Type guard to check if the error has a message string
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
}

function handleError(error: unknown): string {
  let errorMessage = "An unknown error occurred.";

  if (typeof error === "object" && error !== null) {
    const errResponse = (error as ErrorResponse).response;

    if (errResponse?.status) {
      if (errResponse.status === 422 && errResponse.data?.errors) {
        const errorsObject = errResponse.data.errors;
        const allMessages = Object.values(errorsObject).flatMap(
          (messages) => messages
        );
        errorMessage = allMessages.join(" ").replace(/\./g, ",");
      } else if (errResponse.data?.message) {
        errorMessage =
          typeof errResponse.data.message === "string"
            ? errResponse.data.message
            : JSON.stringify(errResponse.data.message);
      } else {
        errorMessage = `Error ${errResponse.status}: Unexpected error`;
      }
    } else if (isErrorWithMessage(error)) {
      // Use type guard for type-safe access
      errorMessage = error.message;
    }
  }

  toast.error(errorMessage);
  return errorMessage;
}

export default handleError;
