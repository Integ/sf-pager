(function (global, undefined) {
    if (global.Activity) {
        return;
    }
    var Activity = React.createClass({
        getInitialState: function () {
            return {
                "id": -1,
                "name": "SegmentFault D-Day 2015 西安站",
                "thumbUrl": "http://sfault-activity.b0.upaiyun.com/217/152/2171527794-5530d5255bb61_big",
                "startDate": "2015-05-30 09:00 星期六",
                "endDate": "2015-05-30 20:00 星期六",
                "address": "杭州市 西湖大道2号 杭州红楼大酒店 5F",
                "sponsorsList" : ['SegmentFault'],
                "parsedText" : '2014 年 SegmentFault D-Day，5 个月，9 场技术沙龙，覆盖北京、杭州、南京上千的开发者，我们受到了越来越多的开发者的参与和肯定。这些肯定也让我们不敢减弱技术传播的速度。SegmentFault 会继续提供这样一个集思广益的窗口，让纯粹的技术沙龙，将真正热爱技术并乐于分享的开发者，聚集到一起。'
            }
        },

        componentDidMount: function () {
            // 显示活动
            global.showAcitity = function (data) {
                this.setState({
                    "id": data.id,
                    "title": data.title,
                })
            }.bind(this);

        },

        render: function () {
            return (
                <div className="activity-main">
                    <div className="activity-thumb">
                        <img src={this.state.thumbUrl} />
                    </div>
                    <div className="activity-info">
                        <h4 className="activity-title">{this.state.name}</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td width="70" className="info-label">开始时间：</td>
                                    <td>{this.state.startDate}</td>
                                </tr>
                                <tr>
                                    <td className="info-label">结束时间：</td>
                                    <td>{this.state.endDate}</td>
                                </tr>
                                <tr>
                                    <td className="info-label">举办地点：</td>
                                    <td className="green-text">{this.state.address}</td>
                                </tr>
                                <tr>
                                    <td className="info-label green-text">主办方：</td>
                                    <td className="green-text">{this.state.sponsorsList[0]}</td>
                                </tr>
                                <tr>
                                    <td className="info-label">报名截止：</td>
                                    <td>
                                        <strong className="activity-time time-date">44</strong>天
                                        <strong className="activity-time time-hour">44</strong>时 
                                        <strong className="activity-time time-minute">44</strong>分 
                                        <strong className="activity-time time-second">44</strong>秒
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="activity-intro">
                        {this.state.parsedText}
                    </div>
                </div>
            );
        }
    });
    global.Activity = Activity;
})(window);

