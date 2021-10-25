
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


/* decodeBits finds out the transmission rate of the message, correctly decode the message to dots, dashes and spaces,
   and return those as a string. */
   function decodeBits(bits){ 
         
}

// decodeMors takes the output of the previous function and return a human-readable string 
   function decodeMors(morseCode){
       return morseCode.split('       ').map((v) => v.split('   ')).map((v) => v.map((value) => MORSE_CODE_DICT[value.replace(/s/g, '')]).join('')).join(' ');
   }