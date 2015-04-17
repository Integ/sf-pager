(function (global, undefined) {

    if (global.Answer) return;

    var gid = 0;

    var voteChange = function (e, delta) {
        var vote = this.state.votes + delta;
        var isHated, isLiked;
        if (delta > 0) {
            isHated = false;
            isLiked = !this.state.isHated;
        } else {
            isHated = !this.state.isLiked;
            isLiked = false;
        }

        this.setState({
            votes: vote,
            isHated: isHated,
            isLiked: isLiked
        })
    };

    var Answer = React.createClass({
        getInitialState: function () {
            return {
                id: this.props.id,
                content: this.props.content,
                votes: this.props.votes,
                comments: this.props.comments,
                author: this.props.author,
                createDate: this.props.createdDate,
                isLiked: this.props.isLiked,
                isHated: this.props.isHated,
                accepted: this.props.accepted
            }
        },
        handleVoteUp: function () {
            var id = this.state.id;
            if (id == -1) {
                return;
            }
            var action;
            if (this.state.isHated) {
                action = "hateCancel";
            } else {
                action = this.state.isLiked ? "likeCancel" : "like";
            }
            var event = "comment-" + id + (gid++);
            $(document).one(event, voteChange.bind(this));
            global.sf.answerAction(action, id, event);
        },
        handleVoteDown: function () {
            var id = this.state.id;
            if (id == -1) {
                return;
            }
            var action;
            if (this.state.isLiked) {
                action = "likeCancel";
            } else {
                action = this.state.isHated ? "hateCancel" : "hate";
            }

            var event = "comment-" + id + (gid++);
            $(document).one(event, voteChange.bind(this));

            global.sf.answerAction(action, id, event);
        },
        handleShowComments: function () {
            var id = this.state.id;
            if (id == -1) {
                return;
            }
            global.sf.showComments("answer", id);
        },
        render: function () {
            var accepted = this.state.accepted == "true" ? 'block' : 'hidden';
            return (
                <div className="comment">
                    <div className="author">
                        <div className="name">{this.state.author.name}</div>
                        <div className="rank">{this.state.author.rank}</div>
                        <div className="info">·</div>
                        <div className="info">{this.state.createdDate}</div>
                    </div>
                    <div className="content" dangerouslySetInnerHTML={{__html: this.state.content}}>
                    </div>
                    <div className={"accepted " + accepted}><i className="ic-accepted"></i><span>该答案已经被采纳</span></div>

                    <div className="btn-box">
                        <a href="javascript:void(0)" onClick={this.handleVoteUp}
                           className={this.state.isLiked? "active": ""}><i className="vote-up"
                                                                           style={{"margin": "0 7px 0 3px"}}></i><span>有用</span></a>
                        <a href="javascript:void(0)" onClick={this.handleVoteDown}
                           className={this.state.isHated? "active": ""}><i className="vote-down"
                                                                           style={{"margin": "0 3px"}}></i></a>
                        <span className="comments"> {this.state.votes == 0 ? "评论" : this.state.votes} </span>
                        <a href="javascript:void(0)" onClick={this.handleShowComments} style={{"float": "right"}}><i
                            className="ic-comment"></i>{this.state.comments}</a>
                    </div>
                </div>
            );
        }
    });

    global.Answer = Answer;

})(window);