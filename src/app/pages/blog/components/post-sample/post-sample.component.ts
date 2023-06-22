import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _postService: PostsService,
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

  onTableDataChange(event: any) {
    this.page = event;
    this.getPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPosts();
  }

}
