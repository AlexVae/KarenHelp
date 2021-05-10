import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from 'aws-amplify'
import API, { graphqlOperation } from '@aws-amplify/api';
import aws_exports from './aws-exports'
import {listMarkets} from './graphql/queries'
import * as serviceWorker from "./serviceWorker";

// Bring in default Element React theme
import "element-theme-default";
console.log("Sevidor configurado")
Amplify.configure(aws_exports);
API.configure(aws_exports);
console.log(API);
const call = async() => {
    const result = await API.graphql(graphqlOperation(listMarkets))
    console.log(result);
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
