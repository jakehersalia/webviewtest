import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie';

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


  constructor(private cookie: CookieService, private element: ElementRef) { }

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
    this.cookie.put('cookie_saved', 'ok', { expires });
    this.cookie.putObject('cookie_object', { name: 'Harold', status: 'ok', expiration: expires }, { expires });
    this.cookieSaved = true;
  }

  showCookieContent() {
    this.isCookieContentShowed = true;
    this.cookieObject = JSON.stringify(this.cookie.getObject('cookie_object'));
  }
  deleteCookie() {
    this.cookie.removeAll();
    this.cookieSaved = false;
    this.isCookieContentShowed = false;
    this.cookieObject = null;
  }
}
