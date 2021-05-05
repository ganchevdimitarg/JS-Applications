import {html} from "../../node_modules/lit-html/lit-html.js";
import {getMyItem} from "../api/data.js";


const myItemsTemp = (data) => html`

`;



export async function createMyItemsPage(ctx) {
    const data = await getMyItem();
    ctx.render(myItemsTemp(data));
}