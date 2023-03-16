const socket = io("http://localhost:3000");
const qr_code_element = document.querySelector(".qr-code");
let qr_generateor = new QRCode(qr_code_element);
const before_login = el(".before-login");
const spiner = el(".spiner");
const check_block = el(".check-block");
const login_check_box = el(".login-check-box");



socket.emit("get_qr_code");

socket.on("qr_code", qr => {
    qr = qr.padEnd(220);
    qr_generateor.makeCode(qr);
});

socket.on("loged in", () => {
    success_login();
});


function el(el) {
    return document.querySelector(el)
}

function success_login() {
    before_login.style.opacity = "0";
    success_popup();
    setTimeout(() => {
        start_success_animation();
        setTimeout(() => {
            close_success_popup();
        }, 2000);
    }, 500);
}


function start_success_animation() {
    spiner.style.animationPlayState = "running";
    setTimeout(() => {
        check_block.style.animationPlayState = "running";
    }, 1000);
}

function success_popup() {
    login_check_box.style.transform = "translate(-50%,-50%) scale(1.2)";
    setTimeout(() => {
        login_check_box.style.transform = "translate(-50%,-50%) scale(1)";
    }, 200);
}

function close_success_popup() {
    login_check_box.style.transform = "translate(-50%,-50%) scale(1.2)";
    setTimeout(() => {
        login_check_box.style.transform = "translate(-50%,-50%) scale(0)";
    }, 200);
}