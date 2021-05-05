function attachEvents() {
    document.getElementById('submit').addEventListener('click', () => getWeather());
}

attachEvents();

async function getWeather() {
    const input = document.getElementById('location');
    const forecastSection = document.getElementById('forecast');
    const isCurrent = document.querySelector('#current .forecasts');
    const isError = document.querySelector('#forecast .error');
    const isUpcoming = document.querySelectorAll('#upcoming .forecast-info');

    clearForecast(isCurrent, isError, isUpcoming);

    forecastSection.style.display = 'block';

    try {
        const code = await getCode(input.value);

        const [current, upcoming] = await Promise.all([
            getCurrentWeather(code),
            getForecast(code)
        ]);

        const symbols = {
            Sunny: '\u2600',
            Partly: '\u26C5',
            Overcast: '\u2601',
            Rain: '\u2614',
            Degrees: String.fromCharCode(176)
        }

        input.value = '';

        const currentWeatherElement = e('div', undefined, ['class=forecasts'], [
            e('span', symbols[current.forecast.condition], ['class=condition', 'class=symbol']),
            e('span', undefined, ['class=condition'], [
                e('span', current.name, ['class=forecast-data']),
                e('span', `${current.forecast.low}${symbols.Degrees}/${current.forecast.high}${symbols.Degrees}`, ['class=forecast-data']),
                e('span', current.forecast.condition, ['class=forecast-data'])
            ])
        ]);

        document.getElementById('current').appendChild(currentWeatherElement);

        const forecastTreeDays = upcoming.forecast.reduce((acc, cur) => {
            const element = e('span', undefined, ['class=upcoming'], [
                e('span', cur.condition === 'Partly sunny' ? symbols.Partly : symbols[cur.condition], ['class=symbol']),
                e('span', `${cur.low}${symbols.Degrees}/${cur.high}${symbols.Degrees}`, ['class=forecast-data']),
                e('span', cur.condition, ['class=forecast-data'])
            ]);
            acc.push(element)
            return acc;
        }, []);

        const upcomingWeatherElement = e('div', undefined, ['class=forecast-info'], forecastTreeDays);

        document.getElementById('upcoming').appendChild(upcomingWeatherElement);
    } catch (error){
        document.querySelector('#current').before(e('div', 'Error', ['class=label', 'class=error']));
    }

}

async function getCode(cityName) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';

    const resp = await fetch(url);
    const data = await resp.json();

    return data.find(c => c.name.toLowerCase() === cityName.toLowerCase()).code;
}

async function getCurrentWeather(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;

    const resp = await fetch(url);
    const data = await resp.json();

    return data;
}

async function getForecast(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    const resp = await fetch(url);
    const data = await resp.json();

    return data;
}

function clearForecast(isCurrent, isError, isUpcoming) {
    if (isCurrent) {
        isCurrent.remove();
    }
    if (isError) {
        isError.remove();
    }
    if (isUpcoming) {
        isUpcoming.forEach(u => u.remove());
    }
}

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