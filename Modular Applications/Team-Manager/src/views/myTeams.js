import {html} from "../../node_modules/lit-html/lit-html.js";
import {until} from "../../node_modules/lit-html/directives/until.js";
import {getMyTeams} from "../api/data.js";
import {loaderTemp} from "./common/loader.js";
import {teamTemp} from "./common/teamTemp.js";


const myTeamsTemp = (teams) => html`
    <section id="my-teams">

        <article class="pad-med">
            <h1>My Teams</h1>
        </article>
        
        <article class="layout narrow">
        ${teams.length == 0 ? html `
            <div class="pad-med">
                <p>You are not a member of any team yet.</p>
                <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own
                    team.</p>
            </div>` : ''}
            <div class=""><a href="/create" class="action cta">Create Team</a></div>
        </article>
        ${teams.map(teamTemp)}
    </section>
`;

export async function createMyTeamsPage(ctx) {
    ctx.render(until(loadingTemp(), loaderTemp()));
}

async function loadingTemp() {
    const teams = await getMyTeams();
    return myTeamsTemp(teams);
}

