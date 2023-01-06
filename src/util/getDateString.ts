export default function getDateString(milliseconds: number) {
    return new Date(milliseconds).toLocaleDateString()
}