import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class LoaderService {
    displayLoader: EventEmitter<boolean> = new EventEmitter();

    show(){
        this.displayLoader.emit(true);
    }

    hide(){
        this.displayLoader.emit(false);
    }
    
}