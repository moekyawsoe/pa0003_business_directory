var md5 = require('md5');
var beforeEnc = 'abcd';
var afterEnc = '1fdda3f0c5555b8b3057369ba3c58215';

if(md5(md5(beforeEnc)) == afterEnc){
    console.log('true');
}else{
    console.log('false');
}