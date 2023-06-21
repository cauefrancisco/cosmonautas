import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public form: FormGroup;
  public formError: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _postService: PostsService,
  ) {
    this.form = this._formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      img: ['', []]
    })
  }

  public get F_title(): AbstractControl { return this.form.get('title') as AbstractControl; }
  public get F_content(): AbstractControl { return this.form.get('content') as AbstractControl; }
  public get F_img(): AbstractControl { return this.form.get('img') as AbstractControl; }

  ngOnInit() {
  }


  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }

  public createPost(): void {
    const payload = {
      title: String(this.F_title.value),
      text: String(this.F_content.value),
      img: String(this.F_img.value),
    }
    this._postService.createPost(payload).then((res) => {
      console.log(res);
    });

  }

}
