import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        addCity: function () {
            let name = this.get('name');
            let country = this.get('country');
            let population = this.get('population');
            let area = this.get('area');

            let newCity = this.store.createRecord('city', {
                name: name,
                country: country,
                population: population,
                area: area
            });

            newCity.save();
        }
    }
});
