import $ from 'jquery';
import * as Observable from 'rxjs/observable/fromEvent';

$(document).ready(() => {
  let $text = $('#text');
  let $header = $('h1.header');

  let keyupObservable = Observable.fromEvent($text[0], 'keyup');

  keyupObservable.subscribe((e) => {
    $header.html(e.target.value);
  });
});
