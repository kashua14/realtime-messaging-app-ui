import React from "react";
// core components
import Tabs from "../components/CustomTabs/CustomTabs.jsx";
// import Chats from "./Chats";
import Chat from "@material-ui/icons/Chat";
import People from "@material-ui/icons/People";
import Settings from "@material-ui/icons/Settings";
import Groups from "./Groups";
import Options from "./Options";
// import Feedback from "./Feedback";

class ChatNav extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
        value: 0,
        cardAnimation: 'cardHidden',
        //isOpen: false,
    }; 
  }

componentDidMount(){
  this._isMounted = true;
  this.timeOutFunction = setTimeout(
    function() {
      if (this._isMounted) {
        this.setState({ cardAnimation: "" });
      }
    }.bind(this),
    700
  );
}

componentWillMount(){
  this._isMounted = false;
  clearTimeout(this.timeOutFunction);
  this.timeOutFunction = null;
}

  // const items = this.props.items;
  render() {
    return (
      <Tabs 
      style={{ 
        // borderBottom: '2px solid #db0056', 
        position: 'fixed',
        top:0 ,
        textAlign: 'center', 
        padding: 0,
        color: '#fff',
        margin: 0,
      }} 
        headerColor="rose"
        tabs={[
          {
            tabIcon: Chat,
            tabName: "Chats",
            tabContent: (
              <div style={{ overflowY: 'auto', height: "100vh" }}>
                <ul style={{ margin: 0, listStyleType: 'none', padding: 0 }}>
                  {this.props.items}
                </ul>
              </div>
            )
          },
          {
            tabIcon: People,
            tabName: "Groups",
            tabContent: (
              <Groups />
            )
          },
          {
            tabIcon: Settings,
            tabName: "Settings",
            tabContent: (
              <Options />
            )
          },
          // {
          //   tabName: "Feedback",
          //   tabContent: (
          //     <Feedback />
          //   )
          // }
        ]}
      />
    );
  }
}

export default ChatNav;