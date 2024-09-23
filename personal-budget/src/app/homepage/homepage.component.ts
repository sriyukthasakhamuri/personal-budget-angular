import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ArticleComponent} from "../article/article.component";
import {DataService, DataSource, MyBudget} from "../services/data.service";
import {ChartOptions} from "chart.js";
import {NgChartsModule} from "ng2-charts";
import * as d3 from 'd3';
import {BreadcrumbComponent} from "../breadcrumb/breadcrumb.component";

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [
    ArticleComponent,
    NgChartsModule,
    BreadcrumbComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  dataSource: DataSource = {} as DataSource;
  constructor(private dataService: DataService) {
    if (Object.keys(this.dataSource).length === 0) {
      this.dataService.fetchData().subscribe((data) => {
        this.dataSource = data;
        this.pieChartLabels = this.dataSource.myBudget.map((item: MyBudget) => item.title);
        this.pieChartDatasets[0].data = this.dataSource.myBudget.map((item: MyBudget) => item.budget);
        this.createSvg();
        this.drawBars(this.dataSource.myBudget);
      });
    }
  }

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLabels = ['Red', 'Green', 'Blue'];
  public pieChartDatasets = [{
    data: [12,12,12]
  }]

  public pieChartLegend = true;
  public pieChartPlugins = [];

  public svg: any;
  public margin = 50;
  public width = 550 - (this.margin * 2);
  public height = 350 - (this.margin * 2);
  public createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  public drawBars(data: MyBudget[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.title))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 400])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.title))
      .attr("y", (d: any) => y(d.budget))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.budget))
      .attr("fill", "#e87f28");
  }

}
