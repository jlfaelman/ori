import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoryComponent } from './category/category.component';
import { StoreComponent } from './store/store.component';
import { AttributeComponent } from './attribute/attribute.component';
import { UserComponent } from './user/user.component';
import { AuthenticationGuard } from './authentication.guard';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductViewComponent } from './product-view/product-view.component';


const routes: Routes = [
  {path: '',
  component: MainComponent,
  canActivate:[AuthenticationGuard],
  children:[
    {
      path:'dashboard',
      component: DashboardComponent,
      canActivate:[AuthenticationGuard]},
    {
      path:'user',
      component: UserComponent,
      canActivate:[AuthenticationGuard] },
    {
      path:'brands',
      component: BrandsComponent,
      canActivate:[AuthenticationGuard]},
    { 
      path:'product',
      component: ProductListComponent,
      canActivate:[AuthenticationGuard]},
    {
      path:'product/view',
      component: ProductViewComponent,
      canActivate:[AuthenticationGuard]},
    {
      path:'product/add',
      component: ProductAddComponent,
      canActivate:[AuthenticationGuard]},
    {
      path:'category', 
      component: CategoryComponent,
      canActivate:[AuthenticationGuard]},
    {
      path:'stores', 
      component: StoreComponent,
      canActivate:[AuthenticationGuard]},
    {
      path:'attributes',
      component: AttributeComponent,
      canActivate:[AuthenticationGuard]},
    {
      path:'attribute-list/:attribute/:id',
      component: AttributeListComponent,
      canActivate:[AuthenticationGuard]},
    {
      path:'',
      pathMatch:'full',
      redirectTo:'/dashboard',}
  ]},
  {
    path:'login', 
    component: LoginComponent
  },
  {
    path:'**',
    component: ErrorComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
