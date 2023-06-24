import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/core/services/posts.service';
import { IPostSample } from 'src/shared/interfaces/post-sample.interface';

@Component({
  selector: 'app-post-sample',
  templateUrl: './post-sample.component.html',
  styleUrls: ['./post-sample.component.scss']
})
export class PostSampleComponent implements OnInit {

  public data: IPostSample[] = []
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  tableSizes: any = [3, 6, 9, 12];
  imgPost: string = '/assets/imgs/tarot-post.jpg';

  constructor(
    private _postService: PostsService,
    private _router: Router,
  ) {

  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this._postService.getPosts().subscribe((res) => {
      // console.log("get posts", res);
      this.data = res.map((item: any) => {
        const resData = item.payload.doc.data();
        resData.id = item.payload.doc.id;
        return resData;
      });
      console.log("get posts", this.data);
    }, (err: Error) => {
      alert(err);
    })
  }

  public maxLengthDescription(text: string): string {
    const regexStart = new RegExp(/<img/i);
    const regexEnd = new RegExp(/">/i);

    if (regexStart.test(text.slice(0, 100)) === true) {
      // const i = regexStart.exec(text.slice(0, 100))?.index;
      const iEnd = regexEnd.exec(text.slice(0, 1000))?.index;
      const start = Number(iEnd) + 2;
      const end = Number(iEnd) + 202;
      const description = text.slice(start, end) + '...';
      return description
    }
    return text.slice(0, 100) + '...';
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPosts();
  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page)
  }

  public openFullPost(element: any): void {
    const id = element.id;
    console.log(element);
    this._router.navigateByUrl('blog/post/' + id);
  }
}
