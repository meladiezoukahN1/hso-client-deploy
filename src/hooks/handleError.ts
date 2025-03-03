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

function handleError(error: unknown): string {
  let errorMessage = "An unknown error occurred.";

  if (typeof error === "object" && error !== null) {
    const errResponse = (error as ErrorResponse).response;

    if (errResponse && errResponse.status) {
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
    } else if ("message" in error && typeof error.message === "string") {
      errorMessage = error.message;
    }
  }

  toast.error(errorMessage);
  return errorMessage;
}

export default handleError;
