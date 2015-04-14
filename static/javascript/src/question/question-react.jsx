var Question = React.createClass({
    getInitialState: function () {
        return {
            "id": -1,
            "title": "加载中...",
            "content": "加载中...",
            "author": {
                "name": "Author",
                "rank": 0
            },
            "votes": 0,
            "createdDate": "刚刚",
            "tags": [{"id":"123", "name":"123"}],
            "accepted": undefined,
            "answers": [],
            "comments": 0
        }
    },
    handleRankUp: function () {
        var id = this.state.id;
        if(id == -1) {
            return;
        }
        var action;
        if (this.state.isHated) {
            action = "hateCancel";
        } else {
            action = this.state.isLiked ? "likeCancel": "like";
        }
        window.sf.questionAction(action, id);
    },
    handleRankDown: function () {
        var id = this.state.id;
        if(id == -1) {
            return;
        }
        var action;
        if (this.state.isLiked) {
            action = "likeCancel";
        } else {
            action = this.state.isHated ? "hateCancel": "hate";
        }
        window.sf.questionAction(action, id);
    },
    componentDidMount: function () {
        window.showQuestion = function (data) {
            this.setState({
                "id": data.id,
                "title": data.title,
                "content": data.parsedText,
                "author": {
                    "name": data.user.name,
                    "rank": data.user.rank
                },
                "votes": data.votes,
                "createdDate": data.createdDate,
                "tags": data.tags,
                "isLiked": data.isLiked,
                "isHated": data.isHated
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

        window.doVoteUp = function () {
            var vote = this.state.votes + 1;
            var isHated = false;
            var isLiked = !this.state.isHated;
            this.setState({
                votes: vote,
                isHated: isHated,
                isLiked: isLiked
            });
        }.bind(this);

        window.doVoteDown = function () {
            var vote = this.state.votes - 1;
            var isHated = !this.state.isLiked;
            var isLiked = false;
            this.setState({
                votes: vote,
                isHated: isHated,
                isLiked: isLiked
            });
        }.bind(this);


        window.triggerAnswerEvent = function(event, e) {
            $(document).trigger(event, e);
        }

    },
    render: function () {
        var acceptedAnswer = null;

        if (this.state.accepted) {
            var accepted = this.state.accepted;
            acceptedAnswer = <Answer id={accepted.id}
                                     content={accepted.parsedText}
                                     votes={accepted.votes}
                                     comments={accepted.comments}
                                     author={accepted.user}
                                     createdDate={accepted.createdDate}
                                     isLiked={accepted.isLiked}
                                     isHated={accepted.isHated}
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
                            return <Tag name={tag.name} id={tag.id} />
                        })}
                    </div>
                    <div className="btn-box">
                        <a href="javascript:void(0)" onClick={this.handleRankUp} className={this.state.isLiked? "active": ""}><i className="vote-up" style={{margin: "0 7px 0 3px"}}></i><span>有用</span></a>
                        <a href="javascript:void(0)" onClick={this.handleRankDown} className={this.state.isHated? "active": ""}><i className="vote-down" style={{margin: "0 3px"}}></i></a>
                        <span className="comments"> {this.state.votes} </span>
                        <a href="javascript:void(0)" style={{float: "right"}}><i className="ic-comment"></i>{ this.state.comments }</a>
                    </div>
                </div>
                {acceptedAnswer}
                {this.state.answers.map(function (answer) {
                    return <Answer id={answer.id}
                                   content={answer.parsedText}
                                   votes={answer.votes}
                                   comments={answer.comments}
                                   author={answer.user}
                                   createdDate={answer.createdDate}
                                   isLiked={answer.isLiked}
                                   isHated={answer.isHated}
                                   accepted="false" />;
                })}
            </div>
        );
    }
});
