export function getIdFromUri(uri) {
    const index = uri.lastIndexOf("/");
    return uri.substring(index + 1);
}
