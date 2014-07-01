/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function () {
  'use strict';

  // function legacyStuff(){
  //   var querySelector = document.querySelector.bind(document);

  //   var navdrawerContainer = querySelector('.navdrawer-container');
  //   var appbarElement = querySelector('.app-bar');
  //   var menuBtn = querySelector('.menu');
  //   var main = querySelector('main');
  //   console.log(main);


  //   function closeMenu() {
  //     appbarElement.classList.remove('open');
  //     navdrawerContainer.classList.remove('open');
  //   }

  //   function toggleMenu() {
  //     appbarElement.classList.toggle('open');
  //     navdrawerContainer.classList.toggle('open');
  //   }

  //   main.addEventListener('click', closeMenu);
  //   menuBtn.addEventListener('click', toggleMenu);
  //   navdrawerContainer.addEventListener('click', function (event) {
  //     if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
  //       closeMenu();
  //     }
  //   });
  // };


  Ember.Handlebars.helper('convert-markdown', function(markdown) {
    return new Ember.Handlebars.SafeString(marked(markdown));
  });

  var App = Ember.Application.create();

  App.ApplicationController = Ember.Controller.extend({
    actions: {
      toggleOpen: function(){
        this.toggleProperty('isOpen');
      },
    },
    isOpen: false
  });

  App.Router.map(function() {
    this.resource('posts', {path: '/'});
  });

  App.PostsRoute = Ember.Route.extend({
    model: function () {
      return Ember.$.getJSON("api/posts.json").then(function(response){
        response.posts.forEach(function(post){
          console.log(post.posted);
        });
        return response.posts;
      });
    }
  });

  App.PostSnippetComponent = Ember.Component.extend({
    classNames: ['featured-spotlight'],
    classNameBindings: ['isExpanded:expanded'],
    actions: {
      toggleExpanded: function(){
        this.toggleProperty('isExpanded');
      }
    },
    isExpanded: false
  });

})();
