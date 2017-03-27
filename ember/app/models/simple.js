import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    country: DS.attr('string'),
    population: DS.attr('number'),
    area: DS.attr('number')
});
