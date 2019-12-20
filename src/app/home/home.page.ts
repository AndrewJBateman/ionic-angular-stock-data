import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  // Data
  chartData: ChartDataSets[] = [{ data: [], label: 'Stock price' }];
  chartLabels: Label[];

  // Options, including zoom plugin options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Historic Stock Price'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
    }
  ];
  chartType = 'line';
  showLegend = false;

  // Initialise search string
  stock = 'MSFT';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getData();
    this.stock = '';
  }

  getData() {
    this.http
      .get(`
        https://financialmodelingprep.com/api/v3/historical-price-full/
        ${this.stock}?from=2018-03-12&to=2019-03-12`).subscribe(res => {
          const key = 'historical';
          const history = res[key];

          this.chartLabels = [];
          this.chartData[0].data = [];

          for (const entry of history) {
            this.chartLabels.push(entry.date);
            this.chartData[0].data.push(entry.close);
          }
          console.log('chart data: ', this.chartData[0].data);
        });
  }

  typeChanged(event: any) {
    const on = event.detail.checked;
    this.chartType = on ? 'line' : 'bar';
  }
}
