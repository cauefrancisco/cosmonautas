import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { Editor, Toolbar } from 'ngx-editor';
import { FeedbackModalComponent } from 'src/app/components/modals/feedback-modal/feedback-modal.component';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public formError: any;
  public isEditionMode: boolean = false;
  public postId!: string;
  public editor: Editor;
  public html!: 'Hello world';

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _postService: PostsService,
    private _activatedRoute: ActivatedRoute,
    public diolog: MatDialog,
  ) {
    this.form = this._formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      content: ['', [Validators.required]],
      img: ['', []],
    });
    this.editor = new Editor();
    moment.locale('pt-br');
  }

  public get F_title(): AbstractControl { return this.form.get('title') as AbstractControl; }
  public get F_descripition(): AbstractControl { return this.form.get('descripition') as AbstractControl; }
  public get F_content(): AbstractControl { return this.form.get('content') as AbstractControl; }
  public get F_img(): AbstractControl { return this.form.get('img') as AbstractControl; }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
      if (this.postId) {
        this.isEditionMode = true;
        this.setValueOnEdit();
      }
    })
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  public setValueOnEdit() {
    if (!this.postId) {
      return
    }
    this._postService.getObjectById(this.postId).subscribe((result) => {
      this.F_title.setValue(result?.title);
      this.F_content.setValue(result?.text);
    })
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
      date: moment().format(),
      img: String(this.F_img.value),
    }
    this._postService.createPost(payload).then((res) => {
      this.diolog.open(FeedbackModalComponent, {
        data: {
          title: 'Tudo certo por aqui... :)',
          text: 'Post criado com sucesso'
        }
      })
      this._postService.getPosts();
      this._router.navigateByUrl('blog');
    }).catch((err: Error) => {
      this.diolog.open(FeedbackModalComponent, {
        data: {
          title: 'Algo não está certo... :(',
          text: [err.message || 'Erro ao publicar']
        }
      })
    });

  }

  public updatePost() {
    if (this.form.invalid) {
      return;
    }
    const payload = {
      title: String(this.F_title.value),
      text: String(this.F_content.value),
      description: String(this.F_content.value).slice(0, 25),
      img: String(this.F_img.value),
    }
    this._postService.updatePost(this.postId, payload).then((res) => {
      this.diolog.open(FeedbackModalComponent, {
        data: {
          title: 'Tudo certo por aqui... :)',
          text: 'Post editado com sucesso'
        }
      })
      this._router.navigateByUrl('blog');
    }).catch((err: Error) => {
      this.diolog.open(FeedbackModalComponent, {
        data: {
          title: 'Algo não está certo... :(',
          text: [err.message || 'Erro ao editar publicação']
        }
      })
    });
  }

}
