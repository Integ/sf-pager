(function (global, undefined) {
    if (global.Question) {
        return;
    }
    var Question = React.createClass({
        getInitialState: function () {
            return {
                "id": -1,
                "title": "加载中...",
                "content": "加载中...",
                "author": {
                    "name": "Author",
                    "rank": 0,
                    "id": -1
                },
                "votes": 0,
                "createdDate": "刚刚",
                "tags": [],
                "accepted": undefined,
                "answers": [],
                "comments": 0,
                "anchor": []
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
            id += "";
            global.sf.questionAction(action, id);
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
            id += "";
            global.sf.questionAction(action, id);
        },
        handleShowComments: function () {
            var id = this.state.id;
            if(id == -1) {
                return;
            }
            id += "";
            global.sf.showComments("question", id);
        },
        componentDidUpdate: function() {
            hljs.initHighlighting();
            var anchor = this.state.anchor;
            if (anchor) {
               document.getElementById(anchor).scrollIntoView();
            }
        },
        componentDidMount: function () {
            // 显示问题
            global.showQuestion = function (data, anchor) {
                if (typeof data == "string") {
                    data = JSON.parse(data);
                }

                this.setState({
                    "id": data.id + "",
                    "title": data.title,
                    "content": data.parsedText,
                    "author": data.user,
                    "votes": data.votes,
                    "createdDate": data.createdDate,
                    "tags": data.tags,
                    "comments": data.comments,
                    "isLiked": data.isLiked,
                    "isHated": data.isHated,
                    "isFollowed": data.isFollowed,
                    "followers": data.followers,
                    "isBookmarked": data.isBookmarked,
                    "bookmarks": data.bookmarks,
                    "anchor": anchor
                })
            }.bind(this);

            // 显示已经被接受的答案
            global.showAcceptedAnswer = function (data) {
                if (typeof data == "string") {
                    data = JSON.parse(data);
                }

                data.id = data.id + "";
                this.setState({
                    accepted: data
                });
            }.bind(this);

            // 显示还没有被接受的答案
            global.showAvailableAnswer = function (data) {
                if (typeof data == "string") {
                    data = JSON.parse(data);
                }


                data.id = data.id + "";
                this.setState({
                    answers: data
                });
            }.bind(this);

            // 增加投票
            global.doVoteUp = function (vote) {
                var isHated = false;
                var isLiked = !this.state.isHated;
                this.setState({
                    votes: vote,
                    isHated: isHated,
                    isLiked: isLiked
                });
            }.bind(this);

            // 减少投票
            global.doVoteDown = function (vote) {
                var isHated = !this.state.isLiked;
                var isLiked = false;
                this.setState({
                    votes: vote,
                    isHated: isHated,
                    isLiked: isLiked
                });
            }.bind(this);

            // 触发answer的事件
            global.triggerAnswerEvent = function(event, e) {
                $(document).trigger(event, e);
            }

            global.triggerFollow = function (followed) {
                var followers = this.state.followers;
                followers += followed ? 1 : -1;
                this.setState({
                    isFollowed: followed,
                    followers: followers
                });
            }.bind(this);

        },
        handleArchive: function () {
            global.sf.archive(this.state.id);
        },
        handleFollow: function () {
            var isFollowed = this.state.isFollowed;
            var id = this.state.id;
            if (isFollowed) {
                global.sf.unfollow(id);
            } else {
                global.sf.follow(id);
            }
        },
        viewAuthor: function() {
            var authorId = this.state.author.id;
            if (authorId == -1) {
                return;
            }
            authorId += "";
            global.sf.viewAuthor(authorId);
        },
        render: function () {
            var answers;
            var accepted = this.state.accepted;

            if (accepted) {
                answers = (
                    <div>
                        <Answer id={accepted.id}
                             content={accepted.parsedText}
                             votes={accepted.votes}
                             comments={accepted.comments}
                             author={accepted.user}
                             createdDate={accepted.createdDate}
                             isLiked={accepted.isLiked}
                             isHated={accepted.isHated}
                             accepted="true" />
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
                )
            } else {
                if (this.state.answers.length > 0) {
                    answers = (
                        <div>
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
                    )
                } else {
                    answers = (
                        <div className="emptyAnswer">
                            <p>暂时没有人回答</p>
                            <p>如果你知道答案，赶紧写下吧</p>
                        </div>
                    )
                }
            }

            return (
                <div>
                    <nav>
                        <h4 dangerouslySetInnerHTML={{__html: this.state.title}}>
                        </h4>
                        <div className="author" onClick={this.viewAuthor}>
                            <span className="name">{this.state.author.name}</span>
                            <span className="rank">{this.state.author.rank}</span>
                            <span className="info">·</span>
                            <span className="info">{this.state.createdDate}</span>
                        </div>
                    </nav>
                    <div className="content-container fmt">
                        <article className="content" dangerouslySetInnerHTML={{__html: this.state.content}}>
                        </article>
                        <div className="tags">
                            {this.state.tags.map(function (tag){
                                return <Tag name={tag.name} id={tag.id} />
                            })}
                        </div>
                        <div className="btn-box">
                            <a href="javascript:void(0)" onClick={this.handleRankUp} className={this.state.isLiked? "active": ""}><i className="vote-up" style={{margin: "-2px 7px 0 3px"}}></i><span>有用</span></a>
                            <a href="javascript:void(0)" onClick={this.handleRankDown} className={this.state.isHated? "active": ""}><i className="vote-down" style={{margin: "0 3px"}}></i></a>
                            <span className="comments"> {this.state.votes} </span>
                            <a href="javascript:void(0)" onClick={this.handleShowComments} style={{float: "right"}}>
                                <i className="ic-comment"></i>{this.state.comments == 0 ? "评论" : this.state.comments}
                            </a>
                        </div>
                    </div>
                    <div className="tool-box">
                        <div className={this.state.isFollowed ? "active": ""} onClick={this.handleFollow}>
                             <i className="follow" />
                            {this.state.followers == 0 ? "" : this.state.followers} 关注
                        </div>
                        <div className={this.state.isBookmarked ? "active": ""} onClick={this.handleArchive}>
                             <i className="bookmark" />
                             {this.state.bookmarks == 0 ? "" : this.state.bookmarks} 收藏
                        </div>
                    </div>
                    {answers}
                </div>
            );
        }
    });
    global.Question = Question;
})(window);

