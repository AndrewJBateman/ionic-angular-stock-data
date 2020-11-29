import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
	API_KEY = "";
	baseUrl = "https://financialmodelingprep.com/api/v3";
	// Data
	chartData: ChartDataSets[] = [{ data: [], label: "Stock price" }];
	chartLabels: Label[];
	companyProfile = [];
	companyName = "";

	// Options, including zoom plugin options
	chartOptions = {
		responsive: true,
		title: {
			display: true,
			text: "Historic Stock Price",
		},
		pan: {
			enabled: true,
			mode: "xy",
		},
		zoom: {
			enabled: true,
			mode: "xy",
		},
	};
	chartColors: Color[] = [
		{
			borderColor: "#000000",
			backgroundColor: "#ff00ff",
		},
	];
	chartType = "line";
	showLegend = false;

	// Initialise search string
	stock = "MSFT";

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.getData();
		this.stock = "";
	}

	getData() {
		this.http
			.get(
				`
        ${this.baseUrl}/historical-price-full/
        ${this.stock}
        ?to=2020-07-28&from=2019-07-28&apikey=${this.API_KEY}
        `
			)
			.subscribe((res) => {
				console.log("res: ", res);
				const key = "historical";
				const history = res[key];

				this.chartLabels = [];
				this.chartData[0].data = [];

				for (const entry of history) {
					this.chartLabels.push(entry.date);
					this.chartData[0].data.push(entry.close);
				}
				this.chartLabels.reverse();
				this.chartData[0].data.reverse();
				console.log("chart data: ", this.chartData[0].data);
				console.log("history: ", history);
			});

		this.http
			.get(
				`
        ${this.baseUrl}/profile/${this.stock}?apikey=${this.API_KEY}
        `
			)
			.subscribe((res: any) => {
				console.log("result of profile search: ", res);
				this.companyProfile = res[0];
				console.log("company profile: ", this.companyProfile);
			});
	}

	typeChanged(event: any) {
		const on = event.detail.checked;
		this.chartType = on ? "line" : "bar";
	}
}
