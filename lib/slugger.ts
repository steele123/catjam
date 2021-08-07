export function toSlug(string: string) {
    let result = string.replace(/\s/g, "-")
    return result.toLocaleLowerCase()
}