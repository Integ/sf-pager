(function (global, undefined) {
    var Comment = React.createClass({
        getInitialState: function () {
            return {
                no: this.props.no,
                id: this.props.id,
                author: this.props.author,
                createdDate: this.props.createdDate,
                votes: this.props.votes,
                content: this.props.content,
                replyUser: this.props.replyUser
            }
        },
        handleClick: function () {
            var id = this.state.id + "";
            var authorId = this.state.author.id + "";
            window.sf.showMenu(id, this.state.author.name, authorId);
        },
        render: function () {
            var showVotes = this.state.votes > 0 ? "block" : "hidden";
            return (
                <li onClick={this.handleClick} id={this.state.id}>
                    <img className="avatar" src={this.state.author.avatarUrl}/>

                    <div className="content">
                        <div className="author">
                            <span className="no">#{this.state.no}</span>
                            <span className="name">{this.state.author.name}</span>
                            <span className="info">·</span>
                            <span className="info time">{this.state.createdDate}</span>

                            <div className={"like-info " + showVotes}>
                                <i className="like"></i>
                                <span>{this.state.votes}</span>
                            </div>
                        </div>
                        <div className="reply">
                            {this.state.replyUser == null ? "" : "回复 " + this.state.replyUser.name + "：" }
                        </div>
                        <div className="markdown" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                    </div>
                </li>
            );
        }
    });

    global.Comment = Comment;

})(window);
