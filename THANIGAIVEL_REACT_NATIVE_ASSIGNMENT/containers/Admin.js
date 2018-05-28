import React, { Component } from "react";
import Admin from "../components/Admin";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
  View,
  Vibration
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";
let URI = "http://192.168.0.101:4000";
class Admin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
  }
  componentWillReceiveProps(nextProp){
      if(nextProp.isDeleted) {
        Vibration.vibrate(1000);
      }
  }
  onDeleteTapped = id => {
      Alert.alert(
        'Delete',
        'Are you sure want to delete this item?',
        [
          {text: 'No', onPress: () => console.log('No Pressed')},
          {text: 'Yes', onPress: () => { this.props.actions.deleteProduct(id);  } },
        ],
        { cancelable: false }
      )
  };

  _getProducts = (page = 1, limit = 8) => {
    this.props.actions.getProducts(page, limit);
  };

  _getMore = () => {
    this._getProducts(++this.props.page, this.props.limit);
  };

  _renderItem = ({ index, item }) => {
    return (
      <Admin
        {...this.props}
        id={item.id}
        title={`${item.id} - ${item.title}`}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price}
        wish={item.wish || false}
        onDeleteTapped={this.onDeleteTapped}
      />
    );
  };

  _keyExtractor = (item, index) => {
    return `${index}`;
  };

  _onRefresh = () => {
    this._getProducts();
  };

  _renderRefreshControl() {
    return (
      <RefreshControl
        onRefresh={this._onRefresh}
        refreshing={this.props.isRefreshing}
        tintColor={"#00ff80"}
        title={"Refreshing..."}
        titleColor={"#00ff80"}
      />
    );
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : (
          <FlatList
            data={this.props.products}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            onEndReachedThreshold={0.5}
            onEndReached={this._getMore}
            refreshControl={this._renderRefreshControl()}
          />
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.productState.products,
    isLoading: state.productState.isLoading,
    isRefreshing: state.productState.isRefreshing,
    page: state.productState.page,
    limit: state.productState.limit,
    isDeleted: state.productState.isDeleted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    Admin
);
