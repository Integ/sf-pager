(function (global, undefined) {
    var Comment = React.createClass({
        getInitialState: function () {
            return {
                no: this.props.no,
                id: this.props.id,
                author: this.props.author,
                createdDate: this.props.createdDate,
                votes: this.props.votes,
                content: this.props.content
            }
        },
        handleClick: function () {
            window.sf.showMenu(this.state.id, this.state.author.name, this.state.author.id);
        },
        render: function () {
            return (
                <li onClick={this.handleClick}>
                    <img src={this.state.author.avatarUrl}/>

                    <div className="content">
                        <div className="author">
                            <span className="no">#{this.state.no}</span>
                            <span className="name">{this.state.author.name}</span>
                            <span className="info">·</span>
                            <span className="info time">{this.state.createdDate}</span>

                            <div className="like-info">
                                <i className="like"></i>
                                <span>{this.state.votes}</span>
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                    </div>
                </li>
            );
        }
    });

    global.Comment = Comment;

})(window);
