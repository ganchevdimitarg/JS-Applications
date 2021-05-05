import {html} from "../../node_modules/lit-html/lit-html.js";
import {editListing, getListingById} from "../api/data.js";

const editTemp = (data, onSubmit) => html `
    <section id="edit-listing">
        <div class="container">
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" .value=${data.brand}>

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value=${data.model}>

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value=${data.description}>

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value=${data.year}>

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${data.imageUrl}>

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value=${data.price}>

                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>`;

export async function createEditPage(ctx){
    const id = ctx.params.id;
    const data = await getListingById(id);

    ctx.render(editTemp(data, onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        const year = Number(formData.get('year').trim());
        const imageUrl = formData.get('imageUrl').trim();
        const price = Number(formData.get('price').trim());

        try {
            if (!brand || !model || !description || year === undefined || !imageUrl || price  === undefined) {
                throw new Error('All fields are required');
            }

            if (price < 0 || year < 0){
                throw new Error('Must be positive');
            }

            await editListing(id, brand, model, description,  year, imageUrl, price);
            ctx.setNavBar();
            ctx.page.redirect('/details');
        } catch (error){
            window.alert(error.message)
        }
    }
}