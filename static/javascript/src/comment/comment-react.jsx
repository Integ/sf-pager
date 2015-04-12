var CommentList = React.createClass({
    render: function () {
        return (
            <ul>
                <li>
                    <img src="static/images/default_avatar.png" />
                    <div className="content">
                        <div className="author">
                            <span className="no">#1</span>
                            <span className="name">fenbox</span>
                            <span className="info">·</span>
                            <span className="info time">2分钟前</span>
                            <div className="like-info">
                                <i className="like"></i>
                                <span>0</span>
                            </div>
                        </div>
                        <div>
                            对话国外知名技术作者，讲述国内码农精彩人生。你听得见他们，他们也听得见你。
                        </div>
                    </div>
                </li>
            </ul>
        );
    }
});

React.render(
    <CommentList />,
    document.getElementById("main-container")
)