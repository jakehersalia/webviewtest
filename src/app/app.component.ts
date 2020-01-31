import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement>;
  cookieSaved = false;
  cookieObject: any;
  isCookieContentShowed = false;
  STORAGE_KEY = 'idfyed';

  constructor(private cookie: CookieService, private element: ElementRef, @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    if (this.cookie.get('cookie_saved')) {
      if (this.cookie.get('cookie_saved') === 'ok') {
        this.cookieSaved = true;
      }
    }
    // this.videoPlayer.nativeElement.autoplay = true;
  }

  saveCookie() {
    const expires = new Date(new Date().setMinutes(new Date().getMinutes() + 30));
    const val = { name: 'Harold', status: 'ok', expiration: expires };
    this.cookie.put('cookie_saved', 'ok', { expires });
    this.cookie.putObject('cookie_object', val, { expires });

    this.storage.set(this.STORAGE_KEY, val);
    this.cookieSaved = true;
  }

  showCookieContent() {
    this.isCookieContentShowed = true;
    this.cookieObject = JSON.stringify(this.storage.get(this.STORAGE_KEY));
  }
  deleteCookie() {
    this.cookie.removeAll();
    this.storage.remove(this.STORAGE_KEY);
    this.cookieSaved = false;
    this.isCookieContentShowed = false;
    this.cookieObject = null;
  }
}
