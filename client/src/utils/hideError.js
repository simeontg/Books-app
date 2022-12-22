export default function hideError(setter, seconds) {
    setTimeout(() => {
        setter('')
    }, seconds)
}