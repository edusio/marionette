require.config({

  // Base path used to load scripts
  baseUrl: '',
  
    paths: {
      'jquery': 'node_modules/jquery/dist/jquery',
      'underscore': 'node_modules/underscore/underscore',
      'backbone': 'node_modules/backbone/backbone',
      'backbone.radio': 'node_modules/backbone.radio/build/backbone.radio',
      'marionette': 'node_modules/backbone.marionette/lib/backbone.marionette',
      'dust': 'node_modules/dustjs-linkedin/dist/dust-full',//cambiar
      'text' : 'node_modules/text/text'
    }
});


require([

  // Load our app module and pass it to our definition function
  'underscore',
  'marionette',
  'backbone',
   'js/app',
   'js/router',
   'js/Controller',
   'dust'
], function(_,marionette, Backbone, RootView, Router, Controller){
  // The "app" dependency is passed in as "App"


 marionette.Renderer.render = function(template, data){
   var compilado =  dust.loadSource( dust.compile(template, template)),
    templateRenderer = '';

    dust.render(template, data, function(err, out){
      templateRenderer =  out;
    });
     return templateRenderer;
};
var App = marionette.Application.extend({
  region: '#content',

  initialize: function(){
    this.controller =  new Controller({
      app: true,
      module: this
    });

    this.controller.app = this
  },
  
  onStart(options) {
    var root = new Router(this.controller);
    //default view
    this.showView(new RootView({controller: this.controller}));
    Backbone.history.start();
    
  }

  
});
//var MyRouter = marionette.AppRouter.extend({});

var myApp = new App();
myApp.start();

});


define([
  // Alias definidos antes
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'marionette'   // lib/backbone/backbone

], function($, _, Marionette){
  // Las variables de jQuery, Underscore y Backbone disponibles para usar.
  return {};
});
