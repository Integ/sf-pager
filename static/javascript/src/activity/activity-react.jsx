(function (global, undefined) {
    if (global.Activity) {
        return;
    }
    var Activity = React.createClass({
        getInitialState: function () {
            return {
                "id": -1,
                "name": "加载中",
                "thumbUrl": "",
                "startDate": "加载中",
                "endDate": "加载中",
                "startWeek": "加载中",
                "endWeek": "加载中",
                "address": "加载中",
                "signEndDate": "1970-01-01 00:00:00",
                "sponsorsList" : '加载中',
                "parsedText" : '加载中'
            }
        },

        componentDidMount: function () {
            // 显示活动
            global.showActivity = function (data) {
                var sponsors = [],
                    thumbUrl;


                data.sponsorsList.map(function (e) {
                    sponsors.push(e[0]);
                });
                sponsors = sponsors.join(",");

                this.setState({
                    "id": data.id,
                    "name": data.name,
                    "title": data.title,
                    "address": data.address,
                    "thumbUrl": data.bigBannerUrl,
                    "startDate": data.startDate,
                    "endDate": data.endDate,
                    "startWeek": data.startWeek,
                    "endWeek": data.endWeek,
                    "signEndDate": data.signEndDate,
                    "sponsorsList": sponsors,
                    "parsedText": data.parsedText
                })
            }.bind(this);

        },
        componentDidUpdate: function () {
            var date = $('#countdown').data("end");
            $('#countdown').countdown(date, function (event) {
                var date = event.offset.totalDays;
                var hours = event.offset.hours;
                var minutes = event.offset.minutes;
                var seconds = event.offset.seconds;

                $('.time-date').text(date);
                $('.time-hour').text(hours);
                $('.time-minute').text(minutes);
                $('.time-second').text(seconds);
            });
        },
        render: function () {
            return (
                <div className="activity-main">
                    <div className="activity-thumb" style={{ display: this.state.thumbUrl ? "block": "none"}}>
                        <img src={this.state.thumbUrl} />
                    </div>
                    <div className="activity-info">
                        <h4 className="activity-title">{this.state.name}</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td width="70" className="info-label">开始时间：</td>
                                    <td>{this.state.startDate} {this.state.startWeek}</td>
                                </tr>
                                <tr>
                                    <td className="info-label">结束时间：</td>
                                    <td>{this.state.endDate} {this.state.endWeek}</td>
                                </tr>
                                <tr>
                                    <td className="info-label">举办地点：</td>
                                    <td className="green-text">{this.state.address}</td>
                                </tr>
                                <tr>
                                    <td className="info-label green-text">主办方：</td>
                                    <td className="green-text">{this.state.sponsorsList}</td>
                                </tr>
                                <tr>
                                    <td className="info-label">报名截止：</td>
                                    <td id="countdown" data-end={this.state.signEndDate}>
                                        <strong className="activity-time time-date">0</strong>天
                                        <strong className="activity-time time-hour">0</strong>时
                                        <strong className="activity-time time-minute">0</strong>分
                                        <strong className="activity-time time-second">0</strong>秒
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="activity-intro fmt"
                         dangerouslySetInnerHTML={{__html: this.state.parsedText }}>
                    </div>
                </div>
            );
        }
    });
    global.Activity = Activity;
})(window);

