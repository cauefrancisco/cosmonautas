import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { FeedbackModalComponent } from 'src/app/components/modals/feedback-modal/feedback-modal.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit, OnDestroy, AfterViewInit {
  public postId!: string;
  public data!: any;
  public imgPost: string = '/assets/imgs/tarot-post.jpg';
  public isLogged!: boolean;
  public editor: Editor;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _postsService: PostsService,
    private _authService: AuthService,
    public dialog: MatDialog,
    public snackbarService: MatSnackBar,
  ) {
    this.editor = new Editor();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
    });
    this._postsService.getObjectById(this.postId).subscribe(res => {
      this.data = res;
    })
    this.isLogged = this._authService.isLoggedIn();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngAfterViewInit() {

  }

  public goTo(page: string, id?: string): void {
    this._router.navigateByUrl(page);
  }

  public onEditPost(): void {
    this._router.navigateByUrl('blog/edit/' + this.postId);
  }

  public deletePost(): void {
    this.dialog.open(FeedbackModalComponent, {
      data: {
        title: 'Deseja mesmo excluir esse post?',
        text: 'Essa ação é irreversível!',
        deletePost: true
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this._postsService.deletePost(this.postId).then(res => {
          this.snackbarService.open('post excluido com sucesso!').dismiss();
          this._router.navigateByUrl('blog');
        })
      }
    })
  }
}
