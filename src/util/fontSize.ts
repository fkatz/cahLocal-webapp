export default function fontSize(text: string): string {
    if (text.length > 200) {
        return "0.65rem";
    } else if (text.length > 120) {
        return "0.70rem";
    } else if (text.length > 50) {
        return "0.8rem";
    } else {
        return "0.90rem";
    }
}