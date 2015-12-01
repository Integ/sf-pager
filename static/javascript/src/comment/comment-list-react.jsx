(function (global, undefined) {
    var CommentList = React.createClass({
        getInitialState: function() {
            return {
                comments: []
            }
        },
        componentDidMount: function () {
            global.showComments = function (data, anchor) {
                this.setState({
                    comments: data,
                    anchor: null
                });
            }.bind(this);
        },
        componentDidUpdate: function () {
            var anchor = this.state.anchor;
            if (anchor) {
                document.getElementById(anchor).scrollIntoView();
            }
        },
        render: function () {
            return (
                <ul>
                    {this.state.comments.map(function (comment,i){
                        return  <Comment no={i}
                                         id={comment.id}
                                         author={comment.user}
                                         replyUser ={comment.replyUser}
                                         createdDate={comment.createdDate}
                                         votes={comment.votes}
                                         content={comment.parsedText} />
                    })}
                    <li className="eof"># EOF #</li>
                </ul>
            );
        }
    });
    global.CommentList = CommentList;
})(window);

React.render(
    <CommentList />,
    document.getElementById("main-container")
);