import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreService } from '../app/services/store.service';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout'
// import {  } from '@angular/material' <--Material Modules-->
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card'
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDividerModule } from '@angular/material/divider'
import { AuthenticationGuard } from './authentication.guard';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoryComponent } from './category/category.component';
import { StoreComponent } from './store/store.component';
import { AttributeComponent } from './attribute/attribute.component';
import { StoreDialogComponent } from './store-dialog/store-dialog.component';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeAddComponent } from './attribute-add/attribute-add.component';
import { AttributeOptionComponent } from './attribute-option/attribute-option.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductViewComponent } from './product-view/product-view.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BrandsComponent,
    CategoryComponent,
    StoreComponent,
    AttributeComponent,
    StoreDialogComponent,
    StoreEditComponent,
    UserComponent,
    UserEditComponent,
    MainComponent,
    ErrorComponent,
    AttributeListComponent,
    AttributeAddComponent,
    AttributeOptionComponent,
    CategoryEditComponent,
    BrandEditComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    MatIconModule
  ],
  entryComponents:[
    StoreEditComponent
  ],
  providers: [StoreService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
