import { Component, OnInit } from '@angular/core';
import { Restaurant, RestaurantsService } from 'src/app/services/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  restaurant: Restaurant = {
    name: '',
    addres: '',
     phone: 0,
    description: '', 
    rate: 0,
    tag: 'veggie',
    createdAt: 2
  }
 
  restaurantId = null;
 
  constructor(private route: ActivatedRoute, private nav: NavController, private restaurantservice: RestaurantsService, private loadingController: LoadingController) { }
 
  ngOnInit() {
    this.restaurantId = this.route.snapshot.params['id'];
    if (this.restaurantId)  {
      this.loadTodo();
    }
  }
 
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Restaurant..'
    });
    await loading.present();
 
    this.restaurantservice.getRestaurant(this.restaurantId).subscribe(res => {
      loading.dismiss();
      this.restaurant = res;
    });
  }
 
  async saveTodo() {
 
    const loading = await this.loadingController.create({
      message: 'Saving restaurant..'
    });
    await loading.present();
 
    if (this.restaurantId) {
      this.restaurantservice.updateRestaurant(this.restaurant, this.restaurantId).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    } else {
      this.restaurantservice.addRestaurant(this.restaurant).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    }
  }
 
}
