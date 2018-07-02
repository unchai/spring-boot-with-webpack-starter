import $ from 'jquery';
import {fromEvent} from 'rxjs';

import '../css/styleA.css';

$(document).ready(() => {
  let $text = $('#text');
  let $header = $('h1.header');

  let keyupObservable = fromEvent($text[0], 'keyup');

  keyupObservable.subscribe((e) => {
    $header.html(e.target.value);
  });
});
