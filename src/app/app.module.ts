import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxEditorModule } from 'ngx-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { FooterComponent } from 'src/app/components/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/components/layout/header/header.component';
import { MainLayoutComponent } from 'src/app/components/layout/main-layout/main-layout.component';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ScheduleComponent } from 'src/app/pages/schedule/schedule.component';
import { environment } from 'src/environments/environment';
import { BlogComponent } from './pages/blog/blog.component';
import { FullPostComponent } from './pages/blog/components/full-post/full-post.component';
import { HeaderBlogComponent } from './pages/blog/components/header-blog/header-blog.component';
import { PostSampleComponent } from './pages/blog/components/post-sample/post-sample.component';
import { CreatePostComponent } from './pages/home/components/create-post/create-post.component';
import { MarkdownPipe } from './shared/pipes/markdown.pipe';




@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ScheduleComponent,
    LoginComponent,
    CreatePostComponent,
    BlogComponent,
    HeaderBlogComponent,
    PostSampleComponent,
    FullPostComponent,
    MarkdownPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularEditorModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        insertLink: 'Insert Link',
        removeLink: 'Remove Link',
        insertImage: 'Insert Image',

        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
