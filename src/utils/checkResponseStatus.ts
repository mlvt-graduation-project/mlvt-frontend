export function checkSuccessResponse(statusCode: number): boolean {
    return statusCode.toString().startsWith('2');
}
