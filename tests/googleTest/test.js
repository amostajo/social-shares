QUnit.test('Google+ count', function(assert) {
    // Prepare
    var url = 'http://www.amsgames.com';
    jQuery('.ss-1').socialShares({
        url: url,
        counts: true,
        googleplusKey: 'AIzaSyB5gC_vqIN0qDmLwWHSOUQMH_yFk-3uKGU'
    });

    // Assert
    assert.ok( jQuery('.ss-1.sharer-activated').length > 0, 'Sharer activated passed' );
    setTimeout(function() {
        assert.notEqual( jQuery('.ss-1 .count').text(), '{count}', 'Count rendering passed' );
        assert.ok( jQuery('.ss-1 .count').text() > 0, 'Count value passed' );
    }, 250);
});
