export function toSlug(string: string) {
    if (string == null) {
        console.error(`Attempted to slugify a null string!`)
        return;
    }

    let result = string.replace(/\s/g, "-")
    return result.toLocaleLowerCase()
}