import {html} from "../../node_modules/lit-html/lit-html.js";
import {until} from "../../node_modules/lit-html/directives/until.js";
import {getTeams} from "../api/data.js";
import {loaderTemp} from "./common/loader.js";
import {teamTemp} from "./common/teamTemp.js";


const browseTemp = (teams) => html`
    <section id="browse">

        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>
            <article class="layout narrow">
                <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
            </article>
        ${teams.map(teamTemp)}
    </section>
`;

export async function createBrowsePage(ctx) {
    ctx.render(until(loadingTemp(), loaderTemp()));
}

async function loadingTemp() {
    const teams = await getTeams();
    return browseTemp(teams);
}
