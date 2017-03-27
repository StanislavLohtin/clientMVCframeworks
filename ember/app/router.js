import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('cities');
  this.route('simple');
  this.route('medium');
  this.route('massife');
});

export default Router;
