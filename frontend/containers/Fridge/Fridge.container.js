import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import CircularProgress from "material-ui/CircularProgress";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import ActionDelete from "material-ui/svg-icons/action/delete";

import { getFridgeItems } from "../../actions/fridge.actions";
import style from "./Fridge.css";

class FridgeContainer extends Component {

    componentDidMount() {
        this.props.handlegetFridgeItems({ limit: 10 });
    }

    componentWillUnmount() {
    }

    render() {
        const { fridgeItems, isLoading } = this.props;

        const tBody = fridgeItems.map((food, index) => (
          <TableRow key={Math.random()}>
            <TableRowColumn>{index + 1}</TableRowColumn>
            <TableRowColumn>{food.title}</TableRowColumn>
            <TableRowColumn>{food.amount}</TableRowColumn>
            <TableRowColumn>
              <RaisedButton
                icon={<ActionDelete />}
              />
            </TableRowColumn>
          </TableRow>),
        );

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
        }),
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    handlegetFridgeItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { fridgeItems, isLoading } = state.main;
    return { fridgeItems, isLoading };
};

const mapDispatchToProps = dispatch => ({
    handlegetFridgeItems: bindActionCreators(getFridgeItems, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FridgeContainer);
