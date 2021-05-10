import React from "react";
// prettier-ignore
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react'
import API, { graphqlOperation } from '@aws-amplify/api';
import aws_exports from '../aws-exports'
import {createMarket} from '../graphql/mutations'
import {UserContext} from '../App'
API.configure(aws_exports);

class NewMarket extends React.Component {
  state = {
    name: "",
    addMarketDialog: false
  };

  handleAddMarket = async (user) => {
    try{
      this.setState({addMarketDialog: false})
      const input = {
        name: this.state.name, 
        owner: user.username
      }
      console.log(input);
      const result = await API.graphql(graphqlOperation(createMarket, {input}))
      console.log(result);
      console.info(`Created marketd: id ${result.data.createMarket.id}`)
      this.setState({name: ""})
    }catch(err){
      console.log(err);
      Notification.error({
        title:"Error", 
        message: `${err.message || "Error adding market"}`
      })
      console.error("Error happened during the add market request", err)

    }
  };

  render() {
    return (
      <UserContext.Consumer>
      {({user}) => <>
        <div className="market-header">
          <h1 className="market-title">
            Create your MarketPlace
            <Button type="text" icon="edit" className="market-title-button" onClick={() => this.setState({addMarketDialog: true})}/>
          </h1>
        </div>

        <Dialog title="Create New Market" visible={this.state.addMarketDialog} 
        onCancel={()=> this.setState({addMarketDialog: false})} size="large" customClass="dialog">
          <Dialog.Body>
            <Form labelPosition="top">
              <Form.Item label="Add Market Name">
                <Input placeholder="Market Name" trim={true} onChange={name => this.setState({name})} value={this.state.name}/>

              </Form.Item>

            </Form>
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={() => this.setState({addMarketDialog: false})}>Cancel</Button>
            <Button type="primary" disabled={!this.state.name} onClick={() => this.handleAddMarket(user)}> Add</Button>
          </Dialog.Footer>
        </Dialog>
      </>}
      </UserContext.Consumer>
    )
  }
}

export default NewMarket;
