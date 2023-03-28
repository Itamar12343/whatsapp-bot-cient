const socket = io("http://localhost:3000");
const qr_code_element = document.querySelector(".qr-code");
let qr_generateor = new QRCode(qr_code_element);
const before_login = el(".before-login");
const spiner = el(".spiner");
const check_block = el(".check-block");
const login_check_box = el(".login-check-box");
const after_login = el(".after-login");
const text_input = el(".text-input");
const number_input = el(".number-input");
const time_input = el(".time-input");
const send_btn = el(".send-btn");


send_btn.onclick = () => {
    if (text_input.value.length > 0 && number_input.value.length > 0 && time_input.value.length > 0) {
        let msg = {
            text: text_input.value,
            time: time_input.value,
            number: number_input.value
        }
        socket.emit("schedule_msg", msg);
    }
    send_btn.style.transform = "scale(1.5)";
    setTimeout(() => {
        send_btn.style.transform = "scale(1) rotate(360deg)";
        setTimeout(() => {
            send_btn.style.transform = "scale(1) rotate(0deg)";
        }, 200);
    }, 200);
}

window.onbeforeunload = () => {
    socket.emit("the client disconnected");
}

socket.emit("get_qr_code");

socket.on("qr_code", qr => {
    qr = qr.padEnd(220);
    qr_generateor.makeCode(qr);
});

socket.on("client_disconnected", () => {
    window.location.reload();
})

socket.on("loged in", () => {
    success_login();
});

setTimeout(() => {
    success_login();
}, 1000);


function el(el) {
    return document.querySelector(el);
}

function success_login() {
    before_login.style.opacity = "0";
    success_popup();
    setTimeout(() => {
        start_success_animation();
        setTimeout(() => {
            close_success_popup();
            setTimeout(() => {
                show_after_login();
            }, 500);
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
        setTimeout(() => {
            before_login.remove();
        }, 200);
    }, 200);
}

function show_after_login() {
    after_login.style.opacity = "1";
    after_login.style.visibility = "visible";
}