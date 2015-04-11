var Tag = React.createClass({
    view: function() {
        window.sf.viewTag(this.props.id);
    },
    render: function () {
        return (
            <a href="javascript:void(0)" onClick={this.view} >{this.props.name}</a>
        )
    }
});