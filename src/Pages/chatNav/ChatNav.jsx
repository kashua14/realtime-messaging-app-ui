import React from "react";
// core components
import Tabs from "../components/CustomTabs/CustomTabs.jsx";
// import Chats from "./Chats";
import Chat from "@material-ui/icons/Chat";
import Settings from "@material-ui/icons/Settings";
// import People from "@material-ui/icons/People";
// import Groups from "./Groups";
import Options from "./Options";
// import Feedback from "./Feedback";

class ChatNav extends React.Component {

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
                <ul style={{ margin: '0px auto', listStyleType: 'none', padding: 0 }}>
                  {this.props.items}
                </ul>
              </div>
            )
          },
          // {
          //   tabIcon: People,
          //   tabName: "Groups",
          //   tabContent: (
          //     <Groups />
          //   )
          // },
          {
            tabIcon: Settings,
            tabName: "Settings",
            tabContent: (
              <Options />
            )
          },
          
        ]}
      />
    );
  }
}

export default ChatNav;