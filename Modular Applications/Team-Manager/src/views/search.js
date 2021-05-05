// import {html} from "../../node_modules/lit-html/lit-html.js";
// import {searchListing} from "../api/data.js";
//
//
// const searchTemp = (data, onSearch, year) => html`
//     <section id="search-cars">
//         <h1>Filter by year</h1>
//
//         <div class="container">
//             <input type="text" id="search-input" name="search" placeholder="Enter desired production year" .value=${year || ''}>
//             <button @click=${onSearch} class="button-list">Search</button>
//         </div>
//
//         <h2>Results:</h2>
//         <div class="listings">
//             ${data.length !== 0 ? data.map(createListingCard) : html`<p class="no-cars"> No results.</p>`}
//         </div>
//     </section>`;
//
// const createListingCard = (data) => html`
//     <div class="listing">
//         <div class="preview">
//             <img src=${data.imageUrl}>
//         </div>
//         <h2>${data.brand} ${data.model}</h2>
//         <div class="info">
//             <div class="data-info">
//                 <h3>Year: ${data.year}</h3>
//                 <h3>Price: ${data.price} $</h3>
//             </div>
//             <div class="data-buttons">
//                 <a href="/details/${data._id}" class="button-carDetails">Details</a>
//             </div>
//         </div>
//     </div>`;
//
// export async function createSearchPage(ctx) {
//     const year = Number(ctx.querystring.split('=')[1]);
//     const car = Number.isNaN(year) ? [] : await searchListing(year);
//     ctx.render(searchTemp(car, onSearch, year));
//
//     async function onSearch() {
//         const query = Number(document.getElementById('search-input').value);
//         ctx.page.redirect('/search?query=' + query);
//     }
// }