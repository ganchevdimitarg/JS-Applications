import {html} from "../../node_modules/lit-html/lit-html.js";
import {getMyFurniture} from "../api/data.js";
import {furnitureCard} from "./common/item.js";

const myFurnitureTemp = (data) => html `
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
      ${data.map(furnitureCard)}
    </div>
`;

export async function myFurniturePage(ctx){
    const data = await getMyFurniture();

    ctx.render(myFurnitureTemp(data));
}