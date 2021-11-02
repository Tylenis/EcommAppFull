import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemsDisplayComponent } from './items-display/items-display.component';
import { ItemComponent } from './item/item.component';
import { ItemsDisplaySettingsComponent } from './items-display-settings/items-display-settings.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesPipe } from './pipes/categories.pipe';
import { SortItemsPipe } from './pipes/sort-items.pipe';
import { CartDataComponent } from './cart-data/cart-data.component';
import { UserDataComponent } from './user-data/user-data.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ItemsDisplayComponent,
        ItemComponent,
        ItemsDisplaySettingsComponent,
        ItemDetailComponent,
        CartComponent,
        CategoriesPipe,
        SortItemsPipe,
        CartDataComponent,
        UserDataComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        FontAwesomeModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
