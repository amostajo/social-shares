QUnit.test('Plugin creation', function(assert) {
    // Prepare
    jQuery('.ss-1').socialShares();

    // Assert
    assert.ok( jQuery('.ss-1.sharer-activated').length > 0, 'Sharer activated passed' );
    assert.ok( jQuery('.ss-1').html().indexOf(window.location.href) >= 0, 'Default URL passed' );
});

QUnit.test('Test Facebook share', function(assert) {
    // Prepare
    jQuery('.ss-2').socialShares();

    // Assert
    assert.ok( jQuery('.ss-2.sharer-activated').length > 0, 'Sharer activated passed' );
    assert.ok( jQuery('.ss-2 .facebook').attr('href') != undefined, 'HREF creation passed' );
    assert.ok( jQuery('.ss-2 .facebook').attr('href').length > 0, 'HREF value passed' );
});

QUnit.test('Test Twitter share', function(assert) {
    // Prepare
    jQuery('.ss-3').socialShares();

    // Assert
    assert.ok( jQuery('.ss-3.sharer-activated').length > 0, 'Sharer activated passed' );
    assert.ok( jQuery('.ss-3 .twitter').attr('action') != undefined, 'Action @ <button> passed' );
    assert.ok( jQuery('.ss-3 .twitter').attr('action').length > 0, 'Action value passed' );
});

QUnit.test('Test Google+ share', function(assert) {
    // Prepare
    jQuery('.ss-4').socialShares();

    // Assert
    assert.ok( jQuery('.ss-4.sharer-activated').length > 0, 'Sharer activated passed' );
    assert.ok( jQuery('.ss-4 .googleplus').attr('action') != undefined, 'Action @ <div> passed' );
    assert.ok( jQuery('.ss-4 .googleplus').attr('action').length > 0, 'Action value passed' );
});

QUnit.test('Test Reddit share', function(assert) {
    // Prepare
    jQuery('.ss-5').socialShares();

    // Assert
    assert.ok( jQuery('.ss-5.sharer-activated').length > 0, 'Sharer activated passed' );
    assert.ok( jQuery('.ss-5 .reddit a').attr('href') != undefined, 'HREF @ child <a> passed' );
    assert.ok( jQuery('.ss-5 .reddit a').attr('action').length > 0, 'HREF value passed' );
});

QUnit.test('Test Pinterest share', function(assert) {
    // Prepare
    jQuery('.ss-6').socialShares();

    // Assert
    assert.ok( jQuery('.ss-6.sharer-activated').length > 0, 'Sharer activated passed' );
    assert.ok( jQuery('.ss-6 .pinterest button').attr('href') != undefined, 'Action @ child <button> passed' );
    assert.ok( jQuery('.ss-6 .pinterest button').attr('action').length > 0, 'Action value passed' );
});

QUnit.test('Test LinkedIn share', function(assert) {
    // Prepare
    jQuery('.ss-7').socialShares();

    // Assert
    assert.ok( jQuery('.ss-7.sharer-activated').length > 0, 'Sharer activated passed' );
    assert.ok( jQuery('.ss-7 .linkedin').attr('href') != undefined, 'HREF creation passed' );
    assert.ok( jQuery('.ss-7 .linkedin').attr('href').length > 0, 'HREF value passed' );
});
