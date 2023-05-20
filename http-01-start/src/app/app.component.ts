import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;
  isEdit = false;
  editPostId: string;
  error: string = null;
  errorHandler = new Subject<string>();
  @ViewChild('postForm') postForm: NgForm;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
    this.errorHandler.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
  }

  onSubmit(postData: Post) {
    if (this.isEdit) {
      this.postService
        .updatePost(this.editPostId, postData)
        .subscribe((post) => {
          this.onFetchPosts();
          this.isEdit = false;
        });
    } else {
      this.postService.createPost(postData).subscribe((post) => {
        this.onFetchPosts();
      });
    }
    this.postForm.reset();
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.getPosts().subscribe(
      (posts) => {
        this.isLoading = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.isLoading = false;
        this.errorHandler.next(error.message);
      }
    );
  }

  onClearPosts() {
    this.postService.deleteAllPosts().subscribe(() => {
      this.onFetchPosts();
    });
  }

  onEditPost(id: string) {
    this.isEdit = true;
    this.editPostId = id;

    const post = this.loadedPosts.find((p) => p.id === id);
    this.postForm.setValue({
      title: post.title,
      content: post.content,
    });
  }

  onDeletePost(id: string) {
    this.postService.deletePost(id).subscribe(
      () => {
        this.onFetchPosts();
      },

      (error) => {
        this.errorHandler.next(error.message);
      }
    );
  }
}
