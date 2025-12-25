export type APIErrorCommon = {
    failed: true;
    code: ErrorCode;
    extra?: []
};

export type ErrorCode =
| "DUPLICATE_USERNAME"
| "BAD_IMAGE_DATA"
| "LOGGED_IN"
| "INCORRECT_CREDENTIALS"
| "INVALID_DATA"
| "NO_SUCH_ENTITY"
| "NOT_YOURS"
| "NOT_AUTHENTICATED"
| "OUT_OF_STOCK"
| "INTERNAL_ERROR";