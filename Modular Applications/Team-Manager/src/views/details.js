import {html} from "../../node_modules/lit-html/lit-html.js";
import {until} from "../../node_modules/lit-html/directives/until.js";
import {getTeamsById, reqToJoin, getReqsByTeamId, cancelMembership, approveMembership} from "../api/data.js";
import {loaderTemp} from "./common/loader.js";

const detailsTemp = (team, isOwner, createControl, members, pending) => html`
    <section id="team-home">
        <article class="layout">
            <img src=${team.logoUrl} class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${team.memberCount} Members</span>
                <div>
                    ${createControl()}
                </div>
            </div>
            <div class="pad-large">
                <h3>Member</h3>
                <ul class="tm-members">
                    ${members.map(m => membersTemp(m, isOwner))}
                </ul>
            </div>

            ${isOwner ? html`
                <div class="pad-large">
                    <h3>Membership Requests</h3>
                    <ul class="tm-members">
                        ${pending.map(pendingTemp)}
                    </ul>
                </div>` : ''}

        </article>
    </section>

`;

const pendingTemp = (request) => html`
    <li>
        ${request.user.username}
        <a @click=${request.approve} href="javascript:void(0)" class="tm-control action">Approve</a>
        <a @click=${request.decline} href="javascript:void(0)" class="tm-control action">Decline</a>
    </li>`;

const membersTemp = (request, isOwner) => html`
    <li>
        ${request.user.username}
        ${isOwner ? html`<a @click=${request.decline} href="javascript:void(0)" class="tm-control action">Remove from
            team</a>` : ''}
    </li>`;

export async function createDetailsPage(ctx) {
    const teamId = ctx.params.id;


    ctx.render(until(loadingTemp(teamId), loaderTemp()));


    async function loadingTemp(teamId) {
        const userId = sessionStorage.getItem('userId');
        const [team, requests] = await Promise.all([
            getTeamsById(teamId),
            getReqsByTeamId(teamId),
        ]);

        requests.forEach(r => {
            r.approve = (e) => approve(e, r);
            r.decline = (e) => leave(e, r._id);
        })

        const isOwner = userId == team._ownerId;
        const members = requests.filter(r => r.status == 'member');
        const pending = requests.filter(r => r.status == 'pending');
        team.memberCount = members.length;

        return detailsTemp(team, isOwner, createControl, members, pending);

        function createControl() {
            if (userId != null) {
                const request = requests.find(r => r._ownerId == userId);
                if (isOwner) {
                    return html`<a href=${`/edit/${team._id}`} class="action">Edit team</a>`;
                } else if (request && request.status == 'member') {
                    return html`<a @click=${e => leave(e, request._id)} href="javascript:void(0)" class="action invert">Leave
                        team</a>`;
                } else if (request && request.status == 'pending') {
                    return html`Membership pending. <a @click=${e => leave(e, request._id)} href="javascript:void(0)">Cancel
                        request</a>`;
                } else {
                    return html`<a @click=${join} href="javascript:void(0)" class="action">Join team</a>`;
                }
            } else {
                return '';
            }
        }

        async function join() {
            await reqToJoin(teamId)
            ctx.render(await loadingTemp(teamId));
        }

        async function leave(event, requestId) {
            const confirmed = confirm('Do you want?');
            if (confirmed) {
                event.target.remove();
                await cancelMembership(requestId);
                ctx.render(await loadingTemp(teamId));
            }
        }

        async function approve(event, request) {
            event.target.remove();
            await approveMembership(request);
            ctx.render(await loadingTemp(teamId));
        }
    }
}


