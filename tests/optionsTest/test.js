QUnit.test('Custom URL', function(assert) {
    // Prepare
    var url = 'http://www.github.com/amostajo';
    jQuery('.ss-1').socialShares({
        url: url
    });

    // Assert
    assert.ok( jQuery('.ss-1.sharer-activated').length > 0, 'Sharer activated passed' );
    assert.ok( jQuery('.ss-1').html().indexOf(url) >= 0, 'URL value passed' );
});

QUnit.test('Share count', function(assert) {
    // Prepare
    var url = 'http://www.amsgames.com';
    jQuery('.ss-2').socialShares({
        url: url,
        counts: true
    });

    // Assert
    assert.ok( jQuery('.ss-2.sharer-activated').length > 0, 'Sharer activated passed' );
    setTimeout(function() {
        assert.notEqual( jQuery('.ss-2 .count').text(), '{count}', 'Count rendering passed' );
        assert.ok( jQuery('.ss-2 .count').text() > 0, 'Count value passed' );
    }, 250);
});
