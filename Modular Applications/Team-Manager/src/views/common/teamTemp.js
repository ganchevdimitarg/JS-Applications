import {html} from "../../../node_modules/lit-html/lit-html.js";

export const teamTemp = (teams) => html `
    <article class="layout">
        <img src=${teams.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${teams.name}</h2>
            <p>${teams.description}</p>
            <span class="details">${teams.memberCount} Members</span>
            <div><a href="/details/${teams._id}" class="action">See details</a></div>
        </div>
    </article>`;