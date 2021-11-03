import {decodeBits, decodeMorse} from './morseCode.js';
test('testing decodeMors', () => {
    expect(decodeMorse('-----')).toStrictEqual('0');
    expect(decodeMorse('.-')).toStrictEqual('A');
    expect(decodeMorse('--.-')).toStrictEqual('Q');
    expect(decodeMorse('--..--')).toStrictEqual(',');
    expect(decodeMorse('-.-.--')).toStrictEqual('!');
    expect(decodeMorse('.-.-.-')).toStrictEqual('.');
    expect(decodeMorse('--')).toStrictEqual('M');
    expect(decodeMorse('-.')).toStrictEqual('N');
    expect(decodeMorse('---')).toStrictEqual('O');
    expect(decodeMorse('...')).toStrictEqual('S');
    expect(decodeMorse('--..')).toStrictEqual('Z');
});
test('testing basic bit decoding', () => {
    expect(decodeMorse(decodeBits('1'))).toStrictEqual('E');
    expect(decodeMorse(decodeBits('101'))).toStrictEqual('I');
    expect(decodeMorse(decodeBits('10111'))).toStrictEqual('A');
    expect(decodeMorse(decodeBits('1110111'))).toStrictEqual('M');
});
test('testing multiple bits per dot handling', () => {
    expect(decodeMorse(decodeBits('111'))).toStrictEqual('E');
    expect(decodeMorse(decodeBits('1111111'))).toStrictEqual('E');
    expect(decodeMorse(decodeBits('110011'))).toStrictEqual('I');
    expect(decodeMorse(decodeBits('111110000011111'))).toStrictEqual('I');
    expect(decodeMorse(decodeBits('11111100111111'))).toStrictEqual('M');
});
test('Extra zeros handling', () => {
    expect(decodeMorse(decodeBits('01110'))).toStrictEqual('E');
    expect(decodeMorse(decodeBits('000000011100000'))).toStrictEqual('E');
});

