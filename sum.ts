// return sum of the numbers-list
export default function sum(...numbers: number[]) {
    return numbers.reduce((tot, num) => tot + num, 0)
}