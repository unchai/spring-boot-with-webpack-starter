import $ from 'jquery';
import { fromEvent } from 'rxjs';

import '../css/styleA.css';

$(document).ready(() => {
  const $text = $('#text');
  const $header = $('h1.header');

  const keyupObservable = fromEvent($text[0], 'keyup');

  keyupObservable.subscribe((e) => {
    $header.html(e.target.value);
  });
});
