import React, { Component } from "react";
import { bindActionCreators } from "redux"
import { connect } from "react-redux";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Frig extends Component {
    render() {
        const foodsList = [
            {title: 'Meat', amount: 2},
            {title: 'Chicken', amount: 3},
            {title: 'Tomato', amount: 1},
        ];

        const tBody = foodsList.map(food => {
            return (
                <TableRow key={food.title}>
                    <TableRowColumn>{food.title}</TableRowColumn>
                    <TableRowColumn>{food.amount}</TableRowColumn>
                </TableRow>
            )
        })

        const FoodInFrig = () => (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Food</TableHeaderColumn>
                        <TableHeaderColumn>Amount</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { tBody }
                </TableBody>
            </Table>
        );

        return (
            <FoodInFrig/>
        );
    }
}

class CheckFrig extends Component {
    render() {
        const btnText = "Check frig";

        return (
            <RaisedButton
                label={btnText}
                primary={true}
                icon={<ActionAndroid />}
            />
        );
        
    }
}

class App extends Component {
    render() {
        // return (
        //     <MuiThemeProvider>
        //         <CheckFrig/>
        //         <Frig/>
        //     </MuiThemeProvider>
        // );
        return (
            <MuiThemeProvider>
                <Frig/>
            </MuiThemeProvider>
        );
    }
}

export default App;