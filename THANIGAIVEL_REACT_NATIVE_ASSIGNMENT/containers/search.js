import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
  View
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SearchBar } from 'react-native-elements';
import * as searchActionCreators from "../actionCreators/search";
import { Text } from "react-native-elements";
let URI = "http://192.168.0.101:4000";
class Search extends Component {
    static navigationOptions = {
        title: "Search",
        headerStyle: {
          backgroundColor: "#00ff80"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center"
        },
      }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.searchProduct(this.props.page, this.props.limit, this.props.search);
  }

  _getProducts = (page = 1, limit = 8, search='') => {
    this.props.actions.searchProduct(page, limit, search);
  };

  
  _getMore = () => {
      console.log('on get more', this.props.search)
    this._getProducts(++this.props.page, this.props.limit, this.props.search);
  };

  _renderItem = ({ index, item }) => {
    return (        
      <ProductListItem
        {...this.props}
        id={item.id}
        title={`${item.id} - ${item.title}`}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price}
        wish={item.wish || false}
        onWishTapped={this.onWishTapped}
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

  _onSearch(search) {
    this._getProducts(this.props.page, this.props.limit, search);
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : (
           
            <View style={{flex:1,backgroundColor:'#fff'}}>
            <SearchBar
            lightTheme
            onChangeText={search => this._onSearch(search) }
            onClear={this._getProducts}
            placeholder='Search' />
             {this.props.products.length > 0 ? ( 
                
          <FlatList
            data={this.props.products}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            onEndReachedThreshold={0.5}
            onEndReached={this._getMore}
            refreshControl={this._renderRefreshControl()}
          />
              ) : ( 
                 
                 <Text>No Results</Text>
                 
        )  }
            
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.searchState.products,
    isLoading: state.searchState.isLoading,
    isRefreshing: state.searchState.isRefreshing,
    page: state.searchState.page,
    limit: state.searchState.limit,
    search: state.searchState.search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    Search
);