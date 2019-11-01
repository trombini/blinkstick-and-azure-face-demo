const blinkstick = require('blinkstick')

const device = blinkstick.findFirst()
// device.setColor('#E400E0')

// if (device) {
//     var finished = false;

//     device.setColor("#ff0000");

//     setTimeout(function() {
//         device.setColor("#00ff00");

//         setTimeout(function() {
//             device.setColor("#0000ff");

//             setTimeout(function() {
//                 device.setColor("#000000", function () {
//                     finished = true;
//                 });
//             }, 500);
//         }, 500);
//     }, 500);

//     var wait = function () { if (!finished) setTimeout(wait, 100)}
//     wait();
// }
