import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';
import { IPostSample } from 'src/app/shared/interfaces/post-sample.interface';

@Component({
  selector: 'app-post-sample',
  templateUrl: './post-sample.component.html',
  styleUrls: ['./post-sample.component.scss']
})
export class PostSampleComponent implements OnInit {

  public data: IPostSample[] = []
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
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

  public getPosts(): void {
    this._postService.getPosts().subscribe((res) => {
      this.data = res.map((item: any) => {
        const resData = item.payload.doc.data();
        resData.id = item.payload.doc.id;
        return resData;
      });
    }, (err: Error) => {
      alert(err);
    })
  }

  public maxLengthDescription(text: string): string {
    const regexStart = new RegExp(/<img/i);
    const regexEnd = new RegExp(/">/i);

    if (regexStart.test(text.slice(0, 100)) === true) {
      const iEnd = regexEnd.exec(text.slice(0, 1000))?.index;
      const start = Number(iEnd) + 2;
      const end = Number(iEnd) + 202;
      const description = text.slice(start, end) + ' [...]';
      return description
    }
    return text.slice(0, 100) + ' [...]';
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
    this._router.navigateByUrl('blog/post/' + id);
  }
}
