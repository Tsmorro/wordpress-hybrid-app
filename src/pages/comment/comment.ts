import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, DateTime } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
comment: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder ) {


  this.comment = this.formBuilder.group({
    author: ['', Validators.required],
    rating: ['', Validators.required],
    comment: ['', Validators.required],
    date: []
  });
}

dismiss() {
  this.viewCtrl.dismiss();
}

onSubmit() {
  var dateTime = new Date();
  var date = dateTime.toISOString;
  var Comment=[];
  Comment.push(this.comment);
  console.log(this.comment.value);
  this.viewCtrl.dismiss();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

}
