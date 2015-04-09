/** @jsx React.createElement */
var Answer = React.createClass({
    render: function() {

        var accepted = this.props.accepted == "true" ? 'block' :'hidden';

        return (
            <div>
                <div className="comment">
                    <div className="author">
                        <div className="name">Author</div>
                        <div className="rank">0</div>
                        <div className="info">·</div>
                        <div className="info">刚刚</div>
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

            </div>
        );
    }
});


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
        var acceptedAnswer = "";

        if (this.state.accepted) {
            var accepted = this.state.accepted;
            acceptedAnswer = <Answer content={accepted.parsedText} votes={accepted.votes} comments={accepted.comments} accepted="true" />;
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
                  <div className="content" dangerouslySetInnerHTML={{__html: this.state.content}}>
                  </div>
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
          </div>
        );
    }
});



React.render(
    <Question />,
    document.getElementById("main-container")
)