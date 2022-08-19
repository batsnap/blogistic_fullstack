import App from './App.css'
import React, { Component } from 'react';
import ClientsService from './components/ClientsService';

const clientsService = new ClientsService();

class ClientCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          clientsService.getClient(params.pk).then((c)=>{
            this.refs.Full_name.value = c.Full_name;
            this.refs.user.email.value = c.email;
            this.refs.Card_number.value = c.Card_number;
            this.refs.birthday.value = c.birthday;
          })
        }
      }

      handleCreate(){
        clientsService.createClient(
          {
            "Full_name": this.refs.FullName.value,
            "Card_number": this.refs.Card_number.value,
            "birthday": this.refs.birthday.value,
        }          
        ).then((result)=>{
          alert("client created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(pk){
        clientsService.updateclient(
          {
            "pk": pk,
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone": this.refs.phone.value,
            "address": this.refs.address.value,
            "description": this.refs.description.value
        }          
        ).then((result)=>{
          console.log(result);
          alert("client updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              First Name:</label>
              <input className="form-control" type="text" ref='firstName' />

            <label>
              Last Name:</label>
              <input className="form-control" type="text" ref='lastName'/>

            <label>
              Phone:</label>
              <input className="form-control" type="text" ref='phone' />

            <label>
              Email:</label>
              <input className="form-control" type="text" ref='email' />

            <label>
              Address:</label>
              <input className="form-control" type="text" ref='address' />

            <label>
              Description:</label>
              <textarea className="form-control" ref='description' ></textarea>


            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default clientCreateUpdate;