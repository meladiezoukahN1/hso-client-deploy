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

function handleError(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): string {
  let errorMessage = "An unknown error occurred.";

  function extractMessages(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorObject: any
  ): string[] {
    if (typeof errorObject === "string") {
      return [errorObject];
    } else if (Array.isArray(errorObject)) {
      return errorObject.flatMap(extractMessages);
    } else if (errorObject && typeof errorObject === "object") {
      return Object.values(errorObject).flatMap(extractMessages);
    } else {
      return [String(errorObject)];
    }
  }

  if (typeof error === "object" && error !== null) {
    const errResponse = (error as ErrorResponse).response;

    if (errResponse && errResponse.status) {

      // حالة الخطأ 422 (Validation Error)
      if (errResponse.status === 422) {
        const errorData = errResponse.data?.errors || errResponse.data?.message;
        if (errorData) {
          const allMessages = extractMessages(errorData);
          errorMessage = allMessages.join(" ");
        }
      }
      // حالة الخطأ 400 (Bad Request)
      else if (errResponse.status === 400) {
        if (errResponse.data) {
          const allMessages = extractMessages(errResponse.data);
          errorMessage = allMessages.join(" ");
        }
      }
      // حالات أخرى تحتوي على data.message
      else if (errResponse.data?.message) {
        const allMessages = extractMessages(errResponse.data.message);
        errorMessage = allMessages.join(" ");
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
