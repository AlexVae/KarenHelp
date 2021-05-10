import React from "react";
import NewMartk from '../components/NewMarket'
import MarketList from '../components/MarketList'

class HomePage extends React.Component {
  state = {};

  render() {
    return (
      <>
        <NewMartk/>
        <MarketList/>
      </>
    )
  }
}

export default HomePage;
