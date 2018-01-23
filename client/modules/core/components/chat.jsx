import React from 'react';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      chatCollapsed: false,
      data: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.chatData) {
      this.setState({data: nextProps.chatData.messages})
    }
  }

  collapse() {
    this.setState({chatCollapsed: !this.state.chatCollapsed});
  }

  sendMessage(e) {
    e.preventDefault();
    if(this.state.message) {
      this.props.sendMessage(this.props.clientId, this.props.userId, this.state.message);
      this.setState({message: ''});
    }
  }

  handleEvent(e) {
    this.setState({message: e.target.value});
  }

  render() {
    const {chatCollapsed} = this.state;
    return (
      <div className="widget-chat">
        <div className="container-fluid">
          <div className="row chat-window" id="chat_window_1">
            <div className="padding-0 col-md-offset-4 col-xs-12 col-md-4">
              <div className="panel panel-default">
                <div className="panel-heading top-bar">
                  <div className="col-md-8 col-xs-8">
                    <h3 className="panel-title"><span className="glyphicon glyphicon-comment"></span> Chat</h3>
                  </div>
                  <div className="col-md-4 col-xs-4 text-right">
                    <span
                      id="minim_chat_window"
                      className={`glyphicon icon_minim ${chatCollapsed ? 'glyphicon-plus' : 'glyphicon-minus'}`}
                      onClick={this.collapse.bind(this)}
                    ></span>
                  </div>
                </div>
                <div className={`panel-body msg_container_base ${!chatCollapsed || 'hide'}`}>

                {
                  this.state.data.map((info, key) => {
                    if(info.userId == this.props.userId) {
                      return (
                        <div className="row msg_container base_receive" key={key}>
                          <div className="col-md-2 col-xs-2 avatar">
                            <img
                              src='http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg'
                              className="img-responsive"
                            />
                          </div>
                          <div className="col-md-10 col-xs-10">
                            <div className="messages msg_receive">
                              <p>{info.message}</p>
                              <time>{info.time}</time>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="row msg_container base_sent" key={key}>
                        <div className="col-md-10 col-xs-10">
                          <div className="messages msg_sent">
                            <p>{info.message}</p>
                            <time>{info.time}</time>
                          </div>
                        </div>
                        <div className="col-md-2 col-xs-2 avatar">
                          <img
                            src='http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg'
                            className="img-responsive"
                          />
                        </div>
                      </div>
                    );
                  })
                }

                </div>
                <div className="panel-footer">
                  <form className="input-group">
                    <input
                      id="btn-input"
                      type="text"
                      className="form-control input-sm chat_input"
                      placeholder="Write your message here..."
                      value={this.state.message}
                      onChange={this.handleEvent.bind(this)}
                    />
                    <span className="input-group-btn">
                      <input
                        type="submit"
                        className="btn btn-primary btn-sm"
                        id="btn-chat"
                        onClick={this.sendMessage.bind(this)}
                        value="Send"
                      />
                    </span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}