(function (global, undefined) {
    var CommentList = React.createClass({
        getInitialState: function() {
            return {
                comments: []
            }
        },
        componentDidMount: function () {
            global.showComments = function (data) {
                this.setState({
                    comments: data
                });
            }.bind(this);
        },
        render: function () {
            return (
                <ul>
                    {this.state.comments.map(function (comment,i){
                        return  <Comment no={i}
                                         id={comment.id}
                                         author={comment.user}
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