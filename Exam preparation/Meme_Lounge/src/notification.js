import {html, render} from "../node_modules/lit-html/lit-html.js";

const notificationTemp = (msg) => html`
    <section id="notifications"> 
        <div id="errorBox" class="notification" style="display: block">
            <span>${msg}</span>
        </div>
    </section>
`;

const container = document.createElement('div');
document.body.appendChild(container);

export function notify(msg){
    render(notificationTemp(msg), container);
    setTimeout(clear, 3000);
}

export function clear(){
    render('', container);
}