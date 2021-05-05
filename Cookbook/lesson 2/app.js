async function getRecipes() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';

    const main = document.querySelector('main');

    try {
        const response = await fetch(url);

        if (response.ok === false) {
            throw new Error(response.statusText);
        }

        const recipes = await response.json();
        main.innerHTML = '';
        Object.values(recipes).map(createRecipeCard).forEach(r => main.appendChild(r));
    } catch (error) {
        console.log(error.message);
    }
}

function createRecipeCard(recipes) {
    const recipe = e('article', undefined, ['class=preview'],
        [e('div', undefined, ['class=title'], [e('h2', recipes.name)]),
            e('div', undefined, ['class=small'], [e('img', undefined, [`src=${recipes.img}`])])]
    );

    recipe.addEventListener('click', () => {
        getRecipesDetails(recipes._id, recipe)
    });

    return recipe
}

async function getRecipesDetails(id, preview) {
    const url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;

    const response = await fetch(url);
    const data = await response.json();

    const  header = e('h2', data.name);

    const recipeDetails = e('article', undefined, undefined, [
            header,
            e('div', undefined, ['class=band'], [
                e('div', undefined, ['class=thumb'], [
                    e('img', undefined, [`src=${data.img}`])
                ]),
                e('div', undefined, ['class=ingredients'], [
                    e('he', 'Ingredients:'),
                    e('ul', undefined, undefined,  data.steps.map(s => e('li', s)))
                ])
            ]),
            e('div', undefined, ['class=description'], [
                e('h3', 'Preparation:')].concat(data.ingredients.map(d => e('p', d)))
            )
        ]);

    preview.replaceWith(recipeDetails);
    header.addEventListener('click', () => {recipeDetails.replaceWith(preview);});
}

window.addEventListener('load', () => {
    getRecipes();
});

function e(type, text, attr, children) {
    const element = document.createElement(type);
    if (text) {
        const content = document.createTextNode(text);
        element.appendChild(content);
    }
    if (attr) {
        attr.forEach(a => {
            const [name, value] = a.split('=');
            if (name === 'class') {
                element.classList.add(value);
            } else {
                element.setAttribute(name, value);
            }
        });
    }
    if (children) {
        children.forEach(c => {
            element.appendChild(c);
        });
    }
    return element;
}