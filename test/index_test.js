import Vue from 'vue'
import App from '../src/views/App.vue'

describe('components-App', function() {
    it('App', function() {
        let computed = App.computed;
        let computed_loading = computed.loading()
        console.log(computed_loading)
        computed_loading.should.be.ok;
        //console.log(myComponent);
    });
});