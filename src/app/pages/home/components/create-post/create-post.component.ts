import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { Editor } from 'ngx-editor';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public formError: any;

  public editor: Editor;
  public html!: 'Hello world';


  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _postService: PostsService,
  ) {
    this.form = this._formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      img: ['', []],
    });
    this.editor = new Editor();
    moment.locale('pt-br');
  }

  public get F_title(): AbstractControl { return this.form.get('title') as AbstractControl; }
  public get F_content(): AbstractControl { return this.form.get('content') as AbstractControl; }
  public get F_img(): AbstractControl { return this.form.get('img') as AbstractControl; }

  ngOnInit() {
    console.log('moment', moment().format());

  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }


  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }

  public createPost(): void {
    if (this.form.invalid) {
      return;
    }

    const payload = {
      title: String(this.F_title.value),
      text: String(this.F_content.value),
      description: String(this.F_content.value).slice(0, 25),
      hour: moment().format(),
      img: String(this.F_img.value),
    }
    this._postService.createPost(payload).then((res) => {
      console.log('result create', res);
      console.log('id', res.id);
      console.log('getByid of new post', this._postService.getObjectById(res.id));

    });

  }

}
