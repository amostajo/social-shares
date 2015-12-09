# Social Shares

A jQuery plugin that enables sharing on **Facebook**, **Twitter**, **Google+**, **LinkedIn**, **Pinterest** and **Reddit**.
The plugin also renders the share count of the respective social network.

- [Quick Start](#quick-start)
- [Usage](#usage)
    -[networks](#networks)
    -[counts](#counts)
    -[options](#counts)
- [License](#license)

## Quick Start

- Download the latest release.
- Use bower
```bash
bower install social-shares
```

## Usage

Add the script to your html code:
```html
<script src="/path-to/dist/social-shares.min.js"></script>
```

Assign plugin to element:
```javascript
$(".shares").socialShares();
```

Your html code can look like this:
```html
<div class="shares">
    <a class="facebook">Share with Facebook</a>
    <a class="reddit">Share with Reddit</a>
</div>
```

### Networks

**Social Shares** identify the networks it needs to enable sharing with classes.
You can customize the HTML code to fit your needs just try to respect the css class needed to identify them.

Example:
```html
<ul class="shares">
    <li>
        <button class="twitter">
            Share on Twitter
        </button>
    </li>
    <li>
        <button class="googleplus">
            Share on Google+
        </button>
    </li>
</ul>
```

Here is the list of available networks:
| Network   | Class        |
| --------- | ------------ |
| Facebook  | `facebook`   |
| Twitter   | `twitter`    |
| Google+   | `googleplus` |
| LinkedIn  | `linkedin`   |
| Pinterest | `pinterest`  |
| Reddit    | `reddit`     |


### Counts

To display the share counts of a network simply add a respectively `{count}` tag to each network in your HTML code.

For example:
```html
<ul class="shares">
    <li>
        <button class="facebook">
            Facebook ({count})
        </button>
    </li>
</ul>
```

After **Social Shares** it will display like:
```html
<ul class="shares sharer-activated">
    <li>
        <button class="facebook has-count">
            Facebook (15)
        </button>
    </li>
</ul>
```

**Social Shares** will add the `has-count` class to networks with count and `no-count` to networks without.

**NOTE** Only facebook network support count at the moment. Twitter has turned off their public counts so it is not possible to retrieve this data.

### Options

*url*
Lets you change the url to share. The current URL will be grabbed by default.
```javascript
$(".shares").socialShares({
    url: "http://www.google.com"
});
```
*counts*
Enables or disables count rendering. Default: false.
```javascript
$(".shares").socialShares({
    counts: true
});
```
*title*
Some networks allow for custom titles.
```javascript
$(".shares").socialShares({
    title: "My awesome page"
});
```
*description*
Some networks allow for custom descriptions.
```javascript
$(".shares").socialShares({
    description: "I sharing this awesome page with you"
});
```
*twitteruser*
Twitter user.
```javascript
$(".shares").socialShares({
    twitteruser: "amostajo"
});
```
*complete*
Complete callback after shares have been enabled.
```javascript
$(".shares").socialShares({
    twitteruser: "amostajo"
});
```

## License

**Social Shares** is free software distributed under the terms of the MIT license.
