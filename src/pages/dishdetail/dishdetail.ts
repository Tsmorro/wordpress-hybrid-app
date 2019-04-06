import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetController: ActionSheetController,
    @Inject('BaseURL') private BaseURL,
    public modalCtrl: ModalController,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    private actionsheetCtrl: ActionSheetController) {
    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }
  openComment() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionsheetCtrl.create({
      title: 'More',
      buttons: [{
        text: 'Add a Comment',
        icon: 'chatboxes',
        handler: () => {
          this.openComment();
          console.log('Comment clicked');
        }
      }, {
        text: 'Add to Favorites',
        icon: 'heart',
        handler: () => {
            console.log('Adding to Favorites', this.dish.id);
            this.favorite = this.favoriteservice.addFavorite(this.dish.id);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
  }
}