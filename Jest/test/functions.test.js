import sum  from '../src/functions';

test('sum(2+2)等于4', ()=>{
    expect(sum(2,2)).toBe(4);
});