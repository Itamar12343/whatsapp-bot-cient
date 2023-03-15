const socket = io("http://localhost:3000");
const qr_code_element = document.querySelector(".qr-code");
let qr_generateor = new QRCode(qr_code_element);

socket.emit("get_qr_code");

socket.on("qr_code", qr => {
    qr = qr.padEnd(220);
    qr_generateor.makeCode(qr);
});