import { expect } from 'chai';
//const { expect } = require('chai')

describe("Calculation", () => {
    it("Do sum", () => {
        const num1 = 10;
        const num2 = 20
        const sum = num1 + num2;
        console.log(sum)
        expect(sum).to.equals(30)
    })
    it("Do sub", () => {
        const num1 = 20;
        const num2 = 10
        const sub = num1 - num2;
        console.log(sub)
        expect(sub).to.equals(10)
    })
})