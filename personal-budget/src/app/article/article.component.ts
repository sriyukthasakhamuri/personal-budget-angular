import {Component, Input} from '@angular/core';

@Component({
  selector: 'pb-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  @Input('title') title: string = 'Default Title';
  @Input('content') content: string ='Default Content';

}
