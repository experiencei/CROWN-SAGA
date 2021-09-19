import React , { Component} from 'react';
import { Route } from 'react-router-dom';
import Shopextent from '../../components/shopext/shopextent';
import './shoppage.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {  selectisCollection , SelectisCollectionLoading } from '../../redux/shop/shop.selector';
import { fetchcollectionstartAsync } from '../../redux/shop/shop.action';
import CollectionPage from '../collection/collectionpreview';
import WithSpinner from "../../components/withspinner/withSpinner";
// import { ShopPageContainer } from './shoppage.styled';
// import CollectionMap from "../../redux/shop/shop.action"

const WithSpinnerCollectionpage = WithSpinner(CollectionPage);
const WithSpinnerShoppage = WithSpinner(Shopextent);


class Shoppage extends Component {
    

 componentDidMount(){
    const { fetchcollectionstartAsync } = this.props
    fetchcollectionstartAsync()

 }

   render(){
      const { match, isCollectionFetching ,CollectionLoading  } = this.props;
   return  (
      <div className="shoppage">
      <Route exact path={`${match.path}`} 
       render={ (props) => <WithSpinnerShoppage isLoading={isCollectionFetching} {...props}/>}/>
    <Route path={`${match.path}/:collectionId`} 
    render={ (props) => <WithSpinnerCollectionpage isLoading={!CollectionLoading} {...props} />} />
         </div>
       )
   }
}
const mapStateToProps = createStructuredSelector({
   isCollectionFetching : selectisCollection,
   CollectionLoading  : SelectisCollectionLoading
})

// const mapDispatchToProps = dispatch => ({
//    CollectionMap: collection => dispatch(CollectionMap(collection))
//  });
const mapDispatchToProps = dispatch => ({
  fetchcollectionstartAsync : () => dispatch(fetchcollectionstartAsync())
 });

 export default connect(mapStateToProps ,mapDispatchToProps)(Shoppage);











//  import React from 'react';
// import { Route } from 'react-router-dom';

// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/collection.component';

// const ShopPage = ({ match }) => (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

// export default ShopPage;
    
// const WithSpinnerCollectionpage = WithSpinner(CollectionPage);
// const WithSpinnerShoppage = WithSpinner(Shopextent);


// class Shoppage extends Component {
    

//  componentDidMount(){
//     const { fetchcollectionstartAsync } = this.props
//     fetchcollectionstartAsync()

//  }

//    render(){
//       const { match, isCollectionFetching ,CollectionLoading  } = this.props;
//    return  (
//       <div className="shoppage">
//       <Route exact path={`${match.path}`} 
//        render={ (props) => <WithSpinnerShoppage isLoading={isCollectionFetching} {...props}/>}/>
//     <Route path={`${match.path}/:collectionId`} 
//     render={ (props) => <WithSpinnerCollectionpage isLoading={!CollectionLoading} {...props} />} />
//          </div>
//        )
//    }
// }
// const mapStateToProps = createStructuredSelector({
//    isCollectionFetching : selectisCollection,
//    CollectionLoading  : SelectisCollectionLoading
// })