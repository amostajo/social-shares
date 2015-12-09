/**
 * jQuery Plugin.
 * Social shares enables social network sharing using customizable buttons.
 * It also provides with share count statistic.
 *
 * @author Alejandro Mostajo <http://about.me/amostajo>
 * @copyright MIT
 * @version 1.0.0
 */
 if (typeof jQuery === 'undefined') {
	throw new Error('Social Shares requires jQuery');
}
(function($) {

    'use strict';

    /**
     * Social Shares function plugin.
     * @since 1.0.0
     *
     * @param object options Plugin options.
     */
    $.fn.socialShares = function(options)
    {
        /**
         * Self reference.
         * @since 1.0.0
         */
        var self = this;

        /**
         * Plugin settings.
         * @since 1.0.0
         */
        self.settings = $.extend({
            url: undefined,
            title: '',
            description: '',
            counts: false,
            networks: {
                facebook: true,
                twitter: true,
                googleplus: true,
                pinterest: true,
                reddit: true,
                linkedin: true
            },
            popup: {
                status: false,
                resizable: true,
                toolbar: false,
                menubar: false,
                scrollbars: false,
                location: false,
                directories: false,
                width: 626,
                height: 436,
                top: 0,
                left: 0
            },
            facebookSharer: 'https://www.facebook.com/sharer/sharer.php?u=@url&summary=@title',
            facebookStats: 'https://api.facebook.com/method/links.getStats?urls=@url&format=json',
            facebookClass: '.facebook',
            twitterUser: '',
            twitterSharer: 'https://twitter.com/intent/tweet?url=@url&via=@twitteruser',
            twitterClass: '.twitter',
            googleplusSharer: 'https://plus.google.com/share?url=@url',
            googleplusStats: 'https://plusone.google.com/_/+1/fastbutton?url=@url',
            googleplusClass: '.googleplus',
            googleplusKey: undefined,
            pinterestSharer: 'https://pinterest.com/pin/create/button/?url=@url&description=@title',
            pinterestClass: '.pinterest',
            redditSharer: 'http://www.reddit.com/submit?url=@url&title=@title',
            redditClass: '.reddit',
            linkedinSharer: 'https://www.linkedin.com/shareArticle?mini=true&url=@url&title=@title&summary=@description',
            linkedinClass: '.linkedin',
            complete: undefined
        }, options);

        /**
         * Buffer variables.
         * @since 1.0.0
         */
        self.buffer =
        {
            popup: undefined
        };

        /**
         * Initialize / constructs plugin.
         * @since 1.0.0
         */
        self.init = function()
        {
            // Set default URL
            if (self.settings.url == undefined)
                self.settings.url = window.location.href;
            // Google plus API key
            if ($(self).data('googleapikey') != undefined) {
                self.settings.googleplusKey = $(self).data('googleapikey');
                $(self).removeAttr('data-googleapikey');
            }
            // Set settings
    		//Allow for borders.
    		self.settings.popup.left = (window.screen.width / 2)
                - ((self.settings.popup.width / 2) + 10);
    		//Allow for title and status bars.
    		self.settings.popup.top = (window.screen.height / 2)
                - ((self.settings.popup.height / 2) + 50);
            // Parse element
            self.parse();
            // Call complete callback
            if (self.settings.complete != undefined) {
                self.settings.complete();
            }
            // Activate
            $(self).addClass('sharer-activated');
        };

        /**
         * Parses child element in order to find key elements to create share button
         * @since 1.0.0
         */
        self.parse = function()
        {
            $.each(self.settings.networks, function(network) {
                // Check if it is enabled.
                if (this) {
                    // Get target element
                    var $el = $(self).find(self.settings[network + 'Class']);
                    if ($el.length > 0) {
                        // Create sharer
                        self.createSharer($($el), network);
                        // Get counts
                        self.getCount($($el), network);
                    }
                }
            });
        };

        /**
         * Creates sharer functionality on element.
         * @since 1.0.0
         *
         * @param object $el     jQuery element.
         * @param string network Social network name. (i.e. facebook)
         */
        self.createSharer = function($el, network)
        {
            if (self.settings.url != undefined) {
                var sharer = self.settings[network + 'Sharer'].replace(/\@url/g, self.settings.url)
                    .replace(/\@title/g, self.settings.title)
                    .replace(/\@description/g, self.settings.description)
                    .replace(/\@twitterUser/g, self.settings.twitterUser);
                // Check for key tags
                if ($el.find('a').length > 0) {
                    $el = $($el.find('a')[0]);
                } else if ($el.find('button').length > 0) {
                    $el = $($el.find('button')[0]);
                }
                // Assign attributes
                $el.attr('href', sharer);
                $el.attr('action', sharer);
                // Bind event
                $el.click(self.openSharer);
            }
        };

        /**
         * Requests share count from social network.
         * Returns count integer value.
         * @since 1.0.0
         *
         * @param object $el     jQuery element.
         * @param string network Social network name. (i.e. facebook)
         */
        self.getCount = function($el, network)
        {
            if (!self.settings.counts) return 0;
            // Facebook
            switch (network) {
                case 'facebook':
                    return self.getFacebookCount($el, network);
            }
            return self.echoCount($el, network, 0);
        }

        /**
         * Gets and echos Facebook share count.
         * @since 1.0.0
         *
         * @param object $el     jQuery element.
         * @param string network Social network name. (i.e. facebook)
         */
        self.getFacebookCount = function($el, network)
        {
            $.ajax({
    			url: self.settings.facebookStats.replace(/\@url/g, self.settings.url),
    			method: 'GET',
    			dataType: 'jsonp',
    			crossDomain: true,
    			headers: { 'Access-Control-Allow-Origin': '*' },
    			success: function (response) {
                    if (response.error != undefined) {
        				console.log(response.error);
                    } else {
                        self.echoCount(
                            $el,
                            network,
            				response.length > 0
            				    ? parseInt(response[0].share_count)
            					: 0
                        );
                    }
    			},
    			error:  function (response) {
    				console.log(response);
    			}
    		});
        }

        /**
         * Echos / renders / prints count in element.
         * @since 1.0.0
         *
         * @param object $el     jQuery element.
         * @param string network Social network name. (i.e. facebook)
         * @param int    count   Count to display
         */
        self.echoCount = function($el, network, count)
        {
            if (self.settings.counts) {
                if (count == undefined || count == 0) {
                    $el.addClass('no-count');
                    count = 0;
                } else {
                    $el.addClass('has-count');
                }
                // Check attributes
                $.each($el[0].attributes, function(index, attribute) {
                    $el.attr(attribute.name, attribute.value.replace(/\{count\}/g, count));
                });
                // Check inside HTML
                $el.html($el.html().replace(/\{count\}/g, count));
            }
        }

        /**
         * Opens share modal.
         * @since 1.0.0
         *
         * @param event e Event.
         */
        self.openSharer = function(e)
        {
            e.preventDefault();
            self.buffer.popup = window.open(
				$(this).attr('action'),
				'sharer',
				'status=' + (self.settings.popup.status ? 'yes' : 'no') +
                ',height=' + self.settings.popup.height +
				',width=' + self.settings.popup.width +
                ',resizable=' + (self.settings.popup.resizable ? 'yes' : 'no') +
				',left=' + self.settings.popup.left +
                ',top=' + self.settings.popup.top +
                ',screenX=' + self.settings.popup.left +
                ',screenY=' + self.settings.popup.top +
				',toolbar=' + (self.settings.popup.toolbar ? 'yes' : 'no') +
                ',menubar=' + (self.settings.popup.menubar ? 'yes' : 'no') +
				',scrollbars=' + (self.settings.popup.scrollbars ? 'yes' : 'no') +
                ',location=' + (self.settings.popup.location ? 'yes' : 'no') +
				',directories=' + (self.settings.popup.directories ? 'yes' : 'no')
			);
        }

        /**
         * Init call.
         * @since 1.0.0
         */
        self.init();
    };

})(jQuery);
