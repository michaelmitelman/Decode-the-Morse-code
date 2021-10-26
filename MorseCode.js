
//Dictionary - Morse Code to Characters
const MORSE_CODE_DICT = {  
    "-----":"0",
    ".----":"1",
    "..---":"2",
    "...--":"3",
    "....-":"4",
    ".....":"5",
    "-....":"6",
    "--...":"7",
    "---..":"8",
    "----.":"9",
    ".-":"A",
    "-...":"B",
    "-.-.":"C",
    "-..":"D",
    ".":"E",
    "..-.":"F",
    "--.":"G",
    "....":"H",
    "..":"I",
    ".---":"J",
    "-.-":"K",
    ".-..":"L",
    "--":"M",
    "-.":"N",
    "---":"O",
    ".--.":"P",
    "--.-":"Q",
    ".-.":"R",
    "...":"S",
    "-":"T",
    "..-":"U",
    "...-":"V",
    ".--":"W",
    "-..-":"X",
    "-.--":"Y",
    "--..":"Z",
    "-.-.--":"!",
    ".-.-.-":".",
    "--..--":","
};

const rules = { 'dot': 1, 'dash': 3, 'ddPause': 1, 'charPause': 3, 'wordsPause': 7};

/** 
 * decodeBits finds out the transmission rate of the message, correctly decode the message to dots, dashes and spaces.
 * @param {bits}  
 * @returns decoded string
*/
   function decodeBits(bits){ 
    bits.replace(/(^[0]+)|([0]+)$/g, '');
    const zeroSymbols = bits.match(/[0]+/);
    const maxTimeUnit = String(Math.max(...bits.match(/[1]+/g))).length;
    const minTimeUnit = String(Math.min(...bits.match(/[1]+/g))).length;
    const rate = (len) => time => len * rules[time];

    if (minTimeUnit == maxTimeUnit) {
        if(zeroSymbols) {
            const len = zeroSymbols[0].length;
            times = (len == 1 || len == 3 || len == 7) ? rate(1) : rate(len); 
        } else {
            times = rate(minTimeUnit);
        }
    } else {
        times = rate(minTimeUnit);
    }

    const translationToMorse = word => {
       return word.replace(binaryRegex(1, 'dot'), '.').replace(binaryRegex(1, 'dash'), '-').replace(binaryRegex(0, 'charPause'), ' ').replace(binaryRegex(0, 'ddPause'), ''), '';
   };
   
   const words = bits.split(printBinary(0, 'wordsPause'));
   return words.map(translationToMorse).join('   ');
   }
         
   function printBinary(binary, time) {
    return Array.from({length: times(time)}, () => binary).join('');
   }

   function binaryRegex(binary, type) {
    return new RegExp(printBinary(binary, type), 'g');
   }

/** 
 * @param {morseCode}  output of the previous function 
 * @returns human readable string
*/
function decodeMorse(morseCode){
    return morseCode.split('       ').map((v) => v.split('   ')).map((v) => v.map((val) => MORSE_CODE_DICT[val.replace(/s/g, '')]).join('')).join(' ')
}

export {decodeBits, decodeMorse, printBinary, binaryRegex};