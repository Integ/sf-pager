/** @jsx React.createElement */
var Answer = React.createClass({displayName: "Answer",
    render: function() {

        var accepted = this.props.accepted == "true" ? 'block' :'hidden';

        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "comment"}, 
                    React.createElement("div", {className: "author"}, 
                        React.createElement("div", {className: "name"}, "Author"), 
                        React.createElement("div", {className: "rank"}, "0"), 
                        React.createElement("div", {className: "info"}, "·"), 
                        React.createElement("div", {className: "info"}, "刚刚")
                    ), 
                    React.createElement("div", {className: "content"}, 
                        this.props.content
                    ), 
                    React.createElement("div", {className: "accepted " + accepted}, React.createElement("i", {className: "ic-accepted"}), React.createElement("span", null, "该答案已经被采纳")), 

                    React.createElement("div", {className: "btn-box"}, 
                        React.createElement("a", {href: "javascript:void(0)"}, React.createElement("i", {className: "vote-up", style: {"margin": "0 7px 0 3px"}}), React.createElement("span", null, "有用")), 
                        React.createElement("a", {href: "javascript:void(0)"}, React.createElement("i", {className: "vote-down", style: {"margin": "0 3px"}})), 
                        React.createElement("span", {className: "comments"}, " ", this.props.votes, " "), 
                        React.createElement("a", {href: "javascript:void(0)", style: {"float": "right"}}, React.createElement("i", {className: "ic-comment"}), this.props.comments)
                    )
                )

            )
        );
    }
});

try {
var Question = React.createClass({displayName: "Question",
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
            acceptedAnswer = React.createElement(Answer, {content: accepted.content, votes: accepted.votes, comments: accepted.comments, accepted: "true"});
        }

        return (
          React.createElement("div", null, 
              React.createElement("nav", null, 
                  React.createElement("h4", null, 
                    this.state.title
                  ), 
                  React.createElement("div", {className: "author"}, 
                      React.createElement("span", {className: "name"}, this.state.author.name), 
                      React.createElement("span", {className: "rank"}, this.state.author.rank), 
                      React.createElement("span", {className: "info"}, "·"), 
                      React.createElement("span", {className: "info"}, this.state.createdDate)
                  )
              ), 
              React.createElement("div", {className: "content-container"}, 
                  React.createElement("div", {className: "content", dangerouslySetInnerHTML: {__html: this.state.content}}
                  ), 
                  React.createElement("div", {className: "tags"}, 
                      this.state.tags.map(function (tag){
                          return React.createElement("a", null, tag.name);
                      })
                  ), 
                  React.createElement("div", {className: "btn-box"}, 
                      React.createElement("a", {href: "javascript:void(0)"}, React.createElement("i", {className: "vote-up", style: {margin: "0 7px 0 3px"}}), React.createElement("span", null, "有用")), 
                      React.createElement("a", {href: "javascript:void(0)"}, React.createElement("i", {className: "vote-down", style: {margin: "0 3px"}})), 
                      React.createElement("span", {className: "comments"}, " ", this.state.votes, " "), 
                      React.createElement("a", {href: "javascript:void(0)", style: {float: "right"}}, React.createElement("i", {className: "ic-comment"}),  this.state.comments)
                  )
              )
          )
        );
    }
});



React.render(
    React.createElement(Question, null),
    document.getElementById("main-container")
)

} catch (e) {
    alert(e);
}