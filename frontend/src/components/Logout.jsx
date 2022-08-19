import React from "react";
class Logout extends React.Component {
  constructor(props){
    super(props);
    localStorage.clear();
    window.location.replace('/login');
  }
  render(){
    return(
      <div className="col-sm-8 text-center">
        <h3>Yo are logout</h3>
      </div>
    )
  }
}

export default Logout;