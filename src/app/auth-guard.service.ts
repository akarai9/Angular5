import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { GlobalService } from './GlobalService';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(public router: Router, private global_service: GlobalService){ }

	canActivate(){
		if(localStorage.getItem('userInfo'))
			return true;
		else{
			this.router.navigateByUrl('/login');	
			return false;
		}
	}
}





