
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

const MORSE_DASH_PAUSE = ' ';
const MORSE_CHAR_PAUSE = '   ';
const MORSE_WORD_PAUSE = '       ';

const MORSE_EMPTY_SPACE = ''

/** 
 * decodeBits finds out the transmission rate of the message, correctly decode the message to dots, dashes and spaces.
 * @param {bits}  
 * @returns decoded string
*/
   function decodeBits(bits){ 
    bits.replace(/(^[0]+)|([0]+)$/g, MORSE_EMPTY_SPACE); //replace all the starting 0's characters to empty space
    const zeroSymbols = bits.match(/[0]+/);
    const maxTimeUnit = String(Math.max(...bits.match(/[1]+/g))).length; //maximal time unit for a user for transmitting a single character
    const minTimeUnit = String(Math.min(...bits.match(/[1]+/g))).length; //minimal time unit for a user for transmitting a single character
    const rate = (len) => time => len * rules[time];
    let times;

    if (minTimeUnit === maxTimeUnit) {
        if(zeroSymbols) {
            const len = zeroSymbols[0].length;
            times = Object.values(rules).includes(len) ? rate(1) : rate(len);
        } else {
            times = rate(minTimeUnit);
        }
    } else {
        times = rate(minTimeUnit);
    }
   
   const words = bits.split(printBinary(0, 'wordsPause'));
   return words.map(translationToMorse(words)).join(MORSE_CHAR_PAUSE);
   }

   function translationToMorse(word) {
    return word.replace(binaryRegex(1, 'dot'), '.').replace(binaryRegex(1, 'dash'), '-').replace(binaryRegex(0, 'charPause'), MORSE_DASH_PAUSE).replace(binaryRegex(0, 'ddPause'), MORSE_EMPTY_SPACE), MORSE_EMPTY_SPACE;
   }
         
   function printBinary(binary, time) {
    return Array.from({length: times(time)}, () => binary).join(MORSE_EMPTY_SPACE);
   }

   function binaryRegex(binary, type) {
    return new RegExp(printBinary(binary, type), 'g'); //g modifier specifies a global match = finds all matches
   }

/** 
 * @param {morseCode}  output of the previous function 
 * @returns human readable string
*/
function decodeMorse(morseCode){
    return morseCode.split(MORSE_WORD_PAUSE).map((v) => v.split(MORSE_CHAR_PAUSE)).map((v) => v.map((val) => MORSE_CODE_DICT[val.replace(/s/g, '')]).join('')).join(MORSE_DASH_PAUSE);
}

export {decodeBits, decodeMorse, printBinary, binaryRegex, translationToMorse};