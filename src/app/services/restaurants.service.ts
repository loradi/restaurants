import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

export interface Restaurant{
  id?: String;
  name: String; 
  addres: String; 
   phone: Number;
  description: String; 
  rate: Number;
  tag: String;
  createdAt: Number;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private restaurantCollection: AngularFirestoreCollection<Restaurant>;
  private restaurants: Observable<Restaurant[]>;

  constructor(db: AngularFirestore) {
    this.restaurantCollection = db.collection<Restaurant>("restaurants");
    this.restaurants = this.restaurantCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data  = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });

      })
    );
   }
   getRestaurants(){
     return this.restaurants;
   }
   getRestaurant(id){
     return this.restaurantCollection.doc<Restaurant>(id).valueChanges();
   }
   updateRestaurant(restaurant: Restaurant, id: string){
     return this.restaurantCollection.doc(id).update(restaurant);
   }
   addRestaurant(restaurant: Restaurant){
     return this.restaurantCollection.add(restaurant);
   }
   removeRestaurant(id){
     return this.restaurantCollection.doc(id).delete();
   }
}
