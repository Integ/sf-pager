var Answer = React.createClass({
    render: function() {

        var accepted = this.props.accepted == "true" ? 'block' :'hidden';

        return (
            <div className="comment">
                <div className="author">
                    <div className="name">{this.props.author.name}</div>
                    <div className="rank">{this.props.author.rank}</div>
                    <div className="info">·</div>
                    <div className="info">{this.props.createdDate}</div>
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html: this.props.content}} >
                </div>
                <div className={"accepted " + accepted}><i className="ic-accepted"></i><span>该答案已经被采纳</span></div>

                <div className="btn-box">
                    <a href="javascript:void(0)"><i className="vote-up" style={{"margin": "0 7px 0 3px"}}></i><span>有用</span></a>
                    <a href="javascript:void(0)"><i className="vote-down" style={{"margin": "0 3px"}}></i></a>
                    <span className="comments"> {this.props.votes} </span>
                    <a href="javascript:void(0)" style={{"float": "right"}}><i className="ic-comment"></i>{this.props.comments}</a>
                </div>
            </div>
        );
    }
});