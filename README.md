# Ionic Angular Charts

App to chart historic stock prices from the [FMP financial data API](https://financialmodelingprep.com/developer/docs) using the [Ionic 5 framework](https://ionicframework.com/docs). This is another great tutorial from [Simon Grimm IonicAcademy Youtube video 'How to Build Ionic 4 Apps with Chart.js'](https://www.youtube.com/watch?v=8sd99RJeYSk).

## Table of contents

* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info

* Tutorial code changed to show example financial data on initialisation and clear the stock entry field (MSFT is shown) as I preferred this to initially seeing an empty graph.

* Tutorial code changed to avoid use of string literals - `const history = res['historical'];` caused a typescript error.

## Screenshots

![screenshot](./img/chart.png)

## Technologies

* [Ionic v5.0.0](https://ionicframework.com/)
* [Ionic/angular v4.7.1](https://ionicframework.com/)
* [ng2-charts v2.3.0](https://valor-software.com/ng2-charts/) line chart.
* [chart.js v2.9.3](https://www.chartjs.org/) datasets.
* [chartjs-plugin-zoom v0.7.5](https://github.com/chartjs/chartjs-plugin-zoom)
* [financial data API](https://financialmodelingprep.com/developer/docs)

## Setup

* To start the server on _localhost://8100_ type: 'ionic serve'

## Code Examples

* function to get data from API. Only stock variable is defined by user.

```typescript
getData() {
  this.http
    .get(`
      https://financialmodelingprep.com/api/v3/historical-price-full/
      ${this.stock}?from=2018-03-12&to=2019-03-12`).subscribe(res => {
        const history = res['historical'];

        this.chartLabels = [];
        this.chartData[0].data = [];

        for (const entry of history) {
          this.chartLabels.push(entry.date);
          this.chartData[0].data.push(entry.close);
        }
        console.log('chart data: ', this.chartData[0].data);
      });
}
```

## Features

* ng2-charts has 8 types of charts: line, bar, radar, pie, polarArea, doughnut, bubble and scatter. The user can choose between line (default) and bar charts.

## Status & To-do list

* Status: Working.

* To-do: develop into a more complex app. Add inputs for more varaiables such as start and end dates for history.

## Inspiration

* [Simon Grimm Devdactic Youtube video 'How to Build Ionic 4 Apps with Chart.js'](https://www.youtube.com/watch?v=8sd99RJeYSk)
* [Written version of tutorial: How to Build Ionic 4 Apps with Chart.js](https://devdactic.com/ionic-4-chartjs/)

## Contact

Repo created by [ABateman](https://www.andrewbateman.org) - feel free to contact me!
