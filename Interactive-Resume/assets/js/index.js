/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        // Calculates Reading Time
        $('.post-content').readingTime({
            readingTimeTarget: '.post-reading-time',
            wordCountTarget: '.post-word-count',
        });

        // Creates Captions from Alt tags
        $(".post-content img").each(function() {
            // Let's put a caption if there is one
            if($(this).attr("alt"))
              $(this).wrap('<figure class="image"></figure>')
              .after('<figcaption>'+$(this).attr("alt")+'</figcaption>');
        });

    });

}(jQuery));

function sha1Hash (str) {
  return CryptoJS.SHA1(str).toString(CryptoJS.enc.Hex);
}

function hex (x, n) {
  var leadingZeroes = Array(n).join('0');
  return (leadingZeroes + x.toString(16)).substr(-n);
}

function getItemFillCollor (element) {
  var hex6 = hex(sha1Hash(element.title), 6);
  return '#' + hex6.split("").reverse().join("");
}


 /*********************************************************************
  *  #### Twitter Post Fetcher v12.0 ####
  *  Coded by Jason Mayes 2013. A present to all the developers out there.
  *  www.jasonmayes.com
  *  Please keep this disclaimer with my code if you use it. Thanks. :-)
  *  Got feedback or questions, ask here:
  *  http://www.jasonmayes.com/projects/twitterApi/
  *  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
  *  Updates will be posted to this site.
  *********************************************************************/
 var twitterFetcher = function() {
     function w(a) {
         return a.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a, f) {
             return f
         }).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "")
     }

     function m(a, c) {
         for (var f = [], g = new RegExp("(^| )" + c + "( |$)"), h = a.getElementsByTagName("*"), b = 0, k = h.length; b < k; b++) g.test(h[b].className) && f.push(h[b]);
         return f
     }
     var x = "",
         k = 20,
         y = !0,
         p = [],
         s = !1,
         q = !0,
         r = !0,
         t = null,
         u = !0,
         z = !0,
         v = null,
         A = !0,
         B = !1;
     return {
         fetch: function(a) {
             void 0 === a.maxTweets && (a.maxTweets = 20);
             void 0 === a.enableLinks &&
                 (a.enableLinks = !0);
             void 0 === a.showUser && (a.showUser = !0);
             void 0 === a.showTime && (a.showTime = !0);
             void 0 === a.dateFunction && (a.dateFunction = "default");
             void 0 === a.showRetweet && (a.showRetweet = !0);
             void 0 === a.customCallback && (a.customCallback = null);
             void 0 === a.showInteraction && (a.showInteraction = !0);
             void 0 === a.showImages && (a.showImages = !1);
             if (s) p.push(a);
             else {
                 s = !0;
                 x = a.domId;
                 k = a.maxTweets;
                 y = a.enableLinks;
                 r = a.showUser;
                 q = a.showTime;
                 z = a.showRetweet;
                 t = a.dateFunction;
                 v = a.customCallback;
                 A = a.showInteraction;
                 B = a.showImages;
                 var c = document.createElement("script");
                 c.type = "text/javascript";
                 c.src = "//cdn.syndication.twimg.com/widgets/timelines/" + a.id + "?&lang=" + (a.lang || "en") + "&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random();
                 document.getElementsByTagName("head")[0].appendChild(c)
             }
         },
         callback: function(a) {
             var c = document.createElement("div");
             c.innerHTML = a.body;
             "undefined" === typeof c.getElementsByClassName && (u = !1);
             a = [];
             var f = [],
                 g = [],
                 h = [],
                 b = [],
                 n = [],
                 e = 0;
             if (u)
                 for (c = c.getElementsByClassName("tweet"); e <
                     c.length;) {
                     0 < c[e].getElementsByClassName("retweet-credit").length ? b.push(!0) : b.push(!1);
                     if (!b[e] || b[e] && z) a.push(c[e].getElementsByClassName("e-entry-title")[0]), n.push(c[e].getAttribute("data-tweet-id")), f.push(c[e].getElementsByClassName("p-author")[0]), g.push(c[e].getElementsByClassName("dt-updated")[0]), void 0 !== c[e].getElementsByClassName("inline-media")[0] ? h.push(c[e].getElementsByClassName("inline-media")[0]) : h.push(void 0);
                     e++
                 } else
                     for (c = m(c, "tweet"); e < c.length;) a.push(m(c[e], "e-entry-title")[0]),
                         n.push(c[e].getAttribute("data-tweet-id")), f.push(m(c[e], "p-author")[0]), g.push(m(c[e], "dt-updated")[0]), void 0 !== m(c[e], "inline-media")[0] ? h.push(m(c[e], "inline-media")[0]) : h.push(void 0), 0 < m(c[e], "retweet-credit").length ? b.push(!0) : b.push(!1), e++;
             a.length > k && (a.splice(k, a.length - k), f.splice(k, f.length - k), g.splice(k, g.length - k), b.splice(k, b.length - k), h.splice(k, h.length - k));
             c = [];
             e = a.length;
             for (b = 0; b < e;) {
                 if ("string" !== typeof t) {
                     var d = new Date(g[b].getAttribute("datetime").replace(/-/g, "/").replace("T",
                             " ").split("+")[0]),
                         d = t(d);
                     g[b].setAttribute("aria-label", d);
                     if (a[b].innerText)
                         if (u) g[b].innerText = d;
                         else {
                             var l = document.createElement("p"),
                                 C = document.createTextNode(d);
                             l.appendChild(C);
                             l.setAttribute("aria-label", d);
                             g[b] = l
                         } else g[b].textContent = d
                 }
                 d = "";
                 y ? (r && (d += '<div class="user">' + w(f[b].innerHTML) + "</div>"), 
                      d += '<p class="tweet"><i class="fa fa-twitter"></i>' + w(a[b].innerHTML) + "</p>") 
                 : a[b].innerText ? (r && (d += '<p class="user">' + f[b].innerText + "</p>"), 
                      d += '<p class="tweet"><i class="fa fa-twitter"></i>' + a[b].innerText + "</p>") 
                 : (r && (d += '<p class="user">' + f[b].textContent + "</p>"), 
                      d += '<p class="tweet"><i class="fa fa-twitter"></i>' + a[b].textContent + "</p>");
                 A && (d += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + n[b] + '" class="twitter_reply_icon">Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + n[b] + '" class="twitter_retweet_icon">Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' +
                     n[b] + '" class="twitter_fav_icon">Favorite</a></p>');
                 B && void 0 !== h[b] && (l = h[b], void 0 !== l ? (l = l.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0], l = decodeURIComponent(l).split('"')[1]) : l = void 0, d += '<div class="media"><img src="' + l + '" alt="Image from tweet" /></div>');
                 d += '<p class="timePosted"><a href="https://twitter.com/german_lena/status/' + n[b] + '">' + g[b].textContent + "</a></p>";
                 c.push(d);
                 b++
             }
             if (null === v) {
                 a = c.length;
                 f = 0;
                 g = document.getElementById(x);
                 for (h = "<ul>"; f < a;) h += "<li>" + c[f] + "</li>", f++;
                 g.innerHTML = h + "</ul>"
             } else v(c);
             s = !1;
             0 < p.length && (twitterFetcher.fetch(p[0]), p.splice(0, 1))
         }
     }
 }();


/**
 * ### HOW TO CREATE A VALID ID TO USE: ###
 * Go to www.twitter.com and sign in as normal, go to your settings page.
 * Go to "Widgets" on the left hand side.
 * Create a new widget for what you need eg "user time line" or "search" etc.
 * Feel free to check "exclude replies" if you don't want replies in results.
 * Now go back to settings page, and then go back to widgets page and
 * you should see the widget you just created. Click edit.
 * Look at the URL in your web browser, you will see a long number like this:
 * 345735908357048478
 * Use this as your ID below instead!
 */

/**
 * How to use TwitterFetcher's fetch function:
 * 
 * @function fetch(object) Fetches the Twitter content according to
 *     the parameters specified in object.
 * 
 * @param object {Object} An object containing case sensitive key-value pairs
 *     of properties below.
 * 
 * You may specify at minimum the following two required properties:
 * 
 * @param object.id {string} The ID of the Twitter widget you wish
 *     to grab data from (see above for how to generate this number).
 * @param object.domId {string} The ID of the DOM element you want
 *     to write results to.
 *
 * You may also specify one or more of the following optional properties
 *     if you desire:
 *
 * @param object.maxTweets [int] The maximum number of tweets you want
 *     to return. Must be a number between 1 and 20. Default value is 20.
 * @param object.enableLinks [boolean] Set false if you don't want
 *     urls and hashtags to be hyperlinked.
 * @param object.showUser [boolean] Set false if you don't want user
 *     photo / name for tweet to show.
 * @param object.showTime [boolean] Set false if you don't want time of tweet
 *     to show.
 * @param object.dateFunction [function] A function you can specify
 *     to format date/time of tweet however you like. This function takes
 *     a JavaScript date as a parameter and returns a String representation
 *     of that date.
 * @param object.showRetweet [boolean] Set false if you don't want retweets
 *     to show.
 * @param object.customCallback [function] A function you can specify
 *     to call when data are ready. It also passes data to this function
 *     to manipulate them yourself before outputting. If you specify
 *     this parameter you must output data yourself!
 * @param object.showInteraction [boolean] Set false if you don't want links
 *     for reply, retweet and favourite to show.
 * @param object.showImages [boolean] Set true if you want images from tweet
 *     to show.
 * @param object.lang [string] The abbreviation of the language you want to use
 *     for Twitter phrases like "posted on" or "time ago". Default value
 *     is "en" (English).
 */


// ##### Advanced example 2 #####
// Similar as previous, except this time we pass a custom function to render the
// tweets ourself! Useful if you need to know exactly when data has returned or
// if you need full control over the output.

var config5 = {
  "id": '544841370889117696',
  "domId": 'latest_tweet',
  "maxTweets": 1,
  "enableLinks": true,
  "showUser": false,
  "showTime": true,
  "showRetweet": false,
  "customCallback": handleTweets,
  "showImages": true,
  "showInteraction": false,
  "dateFunction": timeSince
};

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);
  
    var icon = '<i class="fa fa-clock-o"></i>';

    if (interval > 1) {
        return icon + interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return icon + interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return icon + interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return icon + interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return icon + interval + " minutes";
    }
    return icon + " a couple of seconds ago";
  
    
}

function handleTweets(tweets){
    var x = tweets.length;
    var n = 0;
    var element = document.getElementById('latest_tweet');
    var html = tweets[n];
    
    element.innerHTML = html;
}

twitterFetcher.fetch(config5);


