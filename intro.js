import figlet from "figlet";
export async function intro() {
    try {
        const result = await figlet("Live Score")
        return result
    } catch (error) {
        console.log(error)
    }
}