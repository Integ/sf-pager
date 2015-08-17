(function (global, undefined) {
    var Article = React.createClass({
        getInitialState: function () {
            return {
                title: "加载中",
                author: {
                    name: "Author",
                    rank: 0,
                    id: -1
                },
                createdDate: "刚刚",
                content: "<p>加载中</p>",
                tags: []
            }
        },
        viewAuthor: function() {
            var authorId = this.state.author.id;
            if (authorId == -1) {
                return;
            }
            global.sf.viewAuthor(authorId);
        },
        componentDidMount: function () {
            global.showArticle = function (data) {
                this.setState({
                    title: data.title,
                    author: data.user,
                    createdDate: data.createdDate,
                    content: data.parsedText,
                    tags: data.tags
                });
            }.bind(this);
        },
        componentDidUpdate: function() {
            hljs.initHighlighting();
        },
        render: function () {
            return (
                <div>
                    <nav>
                        <h4>
                            {this.state.title}
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
                    </div>
                </div>
            )
        }
    });
    global.Article = Article;
})(window);

React.render(
    <Article />,
    document.getElementById("main-container")
);

$(document).ready(function () {
    $('article.content').on("click", "img", function () {
        var src = $(this).attr("src");
        window.sf.viewImage(src);
    });
});