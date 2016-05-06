describe('getDiv', function() {
    var d = document.querySelector('#wrapper');

    it('Should exist', function() {
        expect(d.nodeName).toBe('DIV');
    });
});
