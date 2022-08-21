import React from "react";
class Logout extends React.Component {
  constructor(props){
    super(props);
    localStorage.clear();

    // Если используешь React router, то избегай манипуляций через window.
    // https://v5.reactrouter.com/web/api/withRouter
    // Компоненту можно обернуть в хок withRouter, взять из него location и с ним проворачивать все, что тебе нужно
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