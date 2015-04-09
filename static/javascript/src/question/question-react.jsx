var Question = React.createClass({
    getInitialState: function () {
        return {
            "title": "加载中...",
            "content": "加载中...",
            "author": {
                "name": "Author",
                "rank": 0
            },
            "votes": 0,
            "createdDate": "刚刚",
            "tags": [],
            "accepted": undefined,
            "answers": [],
            "comments": 0
        }
    },
    componentDidMount: function () {
        window.showQuestion = function (data) {
            this.setState({
                "title": data.title,
                "content": data.parsedText,
                "author": {
                    "name": data.user.name,
                    "rank": data.user.rank
                },
                "votes": data.votes,
                "createdDate": data.createdDate,
                "tags": data.tags
            })
        }.bind(this);

        window.showAcceptedAnswer = function (data) {
            this.setState({
                accepted: data
            });
        }.bind(this);

        window.showAvailableAnswer = function (data) {
            this.setState({
                answers: data
            });
        }.bind(this);

    },
    render: function () {
        var acceptedAnswer = null;

        if (this.state.accepted) {
            var accepted = this.state.accepted;
            acceptedAnswer = <Answer content={accepted.parsedText}
                                     votes={accepted.votes}
                                     comments={accepted.comments}
                                     author={accepted.author}
                                     createdDate={accepted.createdDate}
                                     accepted="true" />;
        }

        return (
            <div>
                <nav>
                    <h4>
                        {this.state.title}
                    </h4>
                    <div className="author">
                        <span className="name">{this.state.author.name}</span>
                        <span className="rank">{this.state.author.rank}</span>
                        <span className="info">·</span>
                        <span className="info">{this.state.createdDate}</span>
                    </div>
                </nav>
                <div className="content-container">
                    <article className="content" dangerouslySetInnerHTML={{__html: this.state.content}}>
                    </article>
                    <div className="tags">
                        {this.state.tags.map(function (tag){
                            return <a>{tag.name}</a>;
                        })}
                    </div>
                    <div className="btn-box">
                        <a href="javascript:void(0)"><i className="vote-up" style={{margin: "0 7px 0 3px"}}></i><span>有用</span></a>
                        <a href="javascript:void(0)"><i className="vote-down" style={{margin: "0 3px"}}></i></a>
                        <span className="comments"> {this.state.votes} </span>
                        <a href="javascript:void(0)" style={{float: "right"}}><i className="ic-comment"></i>{ this.state.comments }</a>
                    </div>
                </div>
                {acceptedAnswer}
                {this.state.answers.map(function (answer) {
                    return <Answer content={answer.parsedText}
                                   votes={answer.votes}
                                   comments={answer.comments}
                                   author={answer.author}
                                   createdDate={answer.createdDate}
                                   accepted="false" />;
                })}
            </div>
        );
    }
});