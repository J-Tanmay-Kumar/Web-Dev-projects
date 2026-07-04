import money from "../../scripts/utils/money.js";
describe('test suite: formatcurrency',()=>{
    it('Convert cents into dollars',()=>{
        expect(money(2095)).toEqual('20.95')
    })

    it('works with 0',()=>{
        expect(money(0)).toEqual('0.00')
    })

    it('Rounds upto to the nearest cent',()=>{
        expect(money(2000.5)).toEqual('20.01')
    })
})