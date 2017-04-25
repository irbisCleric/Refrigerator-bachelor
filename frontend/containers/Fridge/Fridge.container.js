import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import CircularProgress from "material-ui/CircularProgress";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import ActionDelete from "material-ui/svg-icons/action/delete";

import { getFridgeItems, deleteSingleFridgeItem } from "../../actions/fridge.actions";
import style from "./Fridge.css";

class FridgeContainer extends Component {
    constructor() {
        super();
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.handlegetFridgeItems({ limit: 10 });
    }

    componentWillUnmount() {
    }

    handleRemove(e) {
        console.log("removed");
        const keyProp = e.currentTarget.getAttribute("data-remove");
        this.props.handleRemoveFridgeItem(keyProp);
    }

    render() {
        const { fridgeItems, isLoading } = this.props;

        let tBody;

        if (fridgeItems.length) {
            tBody = fridgeItems.map((food, index) => (
              <TableRow key={food.id}>
                <TableRowColumn>{index + 1}</TableRowColumn>
                <TableRowColumn>{food.name}</TableRowColumn>
                <TableRowColumn>{food.amount}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton
                    data-remove={food.name}
                    icon={<ActionDelete />}
                    onTouchTap={this.handleRemove}
                  />
                </TableRowColumn>
              </TableRow>),
            );
        } else {
            tBody = (
              <TableRow>
                <TableRowColumn>
                  No food  :(
                </TableRowColumn>
              </TableRow>
             );
        }

        if (!isLoading) {
            return (
              <div className={style.FridgeContainer}>
                <MuiThemeProvider>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>##</TableHeaderColumn>
                        <TableHeaderColumn>Food</TableHeaderColumn>
                        <TableHeaderColumn>Amount</TableHeaderColumn>
                        <TableHeaderColumn>Control buttons</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      { tBody }
                    </TableBody>
                  </Table>
                </MuiThemeProvider>
              </div>);
        }

        return (
          <MuiThemeProvider>
            <CircularProgress />
          </MuiThemeProvider>
        );
    }
}

FridgeContainer.propTypes = {
    fridgeItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            amount: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            name: PropTypes.string,
        }),
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    handlegetFridgeItems: PropTypes.func.isRequired,
    handleRemoveFridgeItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { fridgeItems, isLoading } = state.main;
    return { fridgeItems, isLoading };
};

const mapDispatchToProps = dispatch => ({
    handlegetFridgeItems: bindActionCreators(getFridgeItems, dispatch),
    handleRemoveFridgeItem: bindActionCreators(deleteSingleFridgeItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FridgeContainer);
