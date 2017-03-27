import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.irregular('medium', 'mediums');
inflector.irregular('massife', 'massives');
inflector.uncountable('advice');

// Meet Ember Inspector's expectation of an export
export default {};
