const { Component } = require('inferno');
const { cacheComponent } = require('../util/cache');

class Footer extends Component {
    render() {
        const {
            logo,
            logoUrl,
            siteUrl,
            siteTitle,
            siteYear,
            author,
            visitorCounterTitle,
            links,
            showVisitorCounter,
            url_for,
            my_cdn,
            side_music_netease_id,
            websiteStartTime,
            footerCopyrightDsec,
            registeredNo,
            footerWebsiteTime
        } = this.props;
        var footerWebsiteTimeTemp =  footerWebsiteTime+"";
        var timeArr = footerWebsiteTimeTemp.split("|");
        var timeJs = `function createTime(time) {
            var n = new Date(time);
            now.setTime(now.getTime() + 250),
                days = (now - n) / 1e3 / 60 / 60 / 24,
                dnum = Math.floor(days),
                hours = (now - n) / 1e3 / 60 / 60 - 24 * dnum,
                hnum = Math.floor(hours),
            1 == String(hnum).length && (hnum = "0" + hnum),
                minutes = (now - n) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
                mnum = Math.floor(minutes),
            1 == String(mnum).length && (mnum = "0" + mnum),
                seconds = (now - n) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
                snum = Math.round(seconds),
            1 == String(snum).length && (snum = "0" + snum),
                document.getElementById("statistic-times").innerHTML = "${timeArr[0]}"+time.split(" ")[0].replace(/\\//g,".")+"${timeArr[1]}" + dnum + "${timeArr[2]}" + hnum + "${timeArr[3]}" + mnum + "${timeArr[4]}" + snum + "${timeArr[5]}";
        }var now = new Date();setInterval("createTime('${websiteStartTime}')", 250,"");`;

        return <footer class="footer">
            <div class="container">
                <div class="level">
                    <div class="level-start">
                        <a class="footer-logo is-block mb-2" href={siteUrl}>
                            {logo && logo.text ? logo.text : <img src={logoUrl} alt={siteTitle} height="28" />}
                        </a>
                        <p class="size-small">
                            {registeredNo ? <span>&copy; <a href="http://www.beian.miit.gov.cn/" target="_blank">{registeredNo}</a><br /></span> : null}
                            {footerCopyrightDsec ? <span dangerouslySetInnerHTML={{ __html: footerCopyrightDsec }}></span> : null}
                            {websiteStartTime ? <span>
                                <span id="statistic-times">loading...</span>
                                <script dangerouslySetInnerHTML={{ __html: timeJs }}></script>
                                <br />
                            </span> : null}
                            {showVisitorCounter ? <div class="size-small"><span dangerouslySetInnerHTML={{ __html: visitorCounterTitle }}></span></div> : null}
                        </p>
                    </div>
   
                </div>
            </div>
        </footer>;
    }
}

module.exports = cacheComponent(Footer, 'common.footer', props => {
    const { config, helper } = props;
    const { url_for, _p, date, my_cdn,__ } = helper;
    const { logo, title, author, footer, plugins, side_music_netease_id, website_start_time, footer_copyright_dsec, footer_registered_no, busuanzi_only_count, footer_website_time } = config;

    const links = {};
    if (footer && footer.links) {
        Object.keys(footer.links).forEach(name => {
            const link = footer.links[name];
            links[name] = {
                url: url_for(typeof link === 'string' ? link : link.url),
                icon: link.icon
            };
        });
    }

    return {
        url_for: url_for,
        websiteStartTime: website_start_time,
        footerCopyrightDsec: footer_copyright_dsec,
        registeredNo: footer_registered_no,
        my_cdn: my_cdn,
        logo,
        logoUrl: url_for(logo),
        siteUrl: url_for('/'),
        siteTitle: title,
        siteYear: date(new Date(), 'YYYY'),
        author,
        links,
        side_music_netease_id,
        showVisitorCounter: plugins && plugins.busuanzi === true && (busuanzi_only_count != undefined && !busuanzi_only_count),
        visitorCounterTitle: _p('plugin.footer_visitor', '<span id="busuanzi_value_site_uv">99+</span>', '<span id="busuanzi_value_site_pv">99+</span>'),
        footerWebsiteTime: __('plugin.footer_website_time')
    };
});
