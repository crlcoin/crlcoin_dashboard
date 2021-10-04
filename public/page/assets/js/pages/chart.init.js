const getData = function () {
    let div = document.getElementById('json-charts-data')
    let result = ''
    if (!!div)
        result = JSON.parse(div.innerText)
    return result
}

const setDisplay = function(display, data) {

    let cloneCounterDisplay = document.getElementById('counter').cloneNode(true)
        cloneCounterDisplay.removeAttribute('id')
        cloneCounterDisplay.style.display = 'block'

        cloneCounterDisplay.querySelector('h3').innerText = data.label
        cloneCounterDisplay.querySelector('p').innerText = `${data.value}%`

    return display.appendChild(cloneCounterDisplay)
}

const createDonutChart = function(element, data, colors) {
    Morris.Donut({
        element: element,
        data: data,
        barSize: 0.2,
        resize: !0,
        colors: colors,
        backgroundColor: "transparent"
    })
}

function initCharts() {
    const colors = [
        "#A6163C", "#F20746", "#1D2173", "#2A2F8C",
        "#1FBEF2", "#0D80A6", "#13F2B3", "#DCF230",
    ]
    const chartsContainer = document.getElementById('charts-container')
    const data = getData()

    data.forEach(function(data) {
        let cloneChartContainer = document.getElementById('donut-chart-base').cloneNode(true)
            cloneChartContainer.removeAttribute('id')
            cloneChartContainer.style.display = 'block'

        data.forEach(function(data) {
            setDisplay(cloneChartContainer.querySelector('.donut-chart-display'), data)
        })

        chartsContainer.appendChild(cloneChartContainer)
        createDonutChart(cloneChartContainer.querySelector('.donut-chart-view'), data, colors)
    })

    // createDonutChart(cloneContainer.querySelector('.donut-chart-view'), data, colors)
}

window.addEventListener('load', initCharts)