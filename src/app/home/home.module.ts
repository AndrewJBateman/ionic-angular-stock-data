import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { ChartsModule } from "ng2-charts";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild([
			{
				path: "",
				component: HomePage,
			},
		]),
		ChartsModule,
	],
	declarations: [HomePage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomePageModule {}
