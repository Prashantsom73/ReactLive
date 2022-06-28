import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country:'in',
    pageSize:6,
    category:'general'
  }

  constructor(){
    super();
    this.state={
      articles: [],
      loading: false,
      page:1,
      totalResult:0
    }
  } 
  // Called immediately after a component is mounted. Setting state here will trigger re-rendering.

  // Life cycle method
  //run construro 1st
  //render run 2nd
  // componentmound

   updateNews  =async()=>{
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f130a42b99a04dd997be3f04e4721cd2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});

    await fetch(url).then((response)=>{
      return response.json();
    }).then((data)=>{
        this.setState({articles:data.articles});
        this.setState({loading:false});
    })
    document.title=`${this.props.category[0].toUpperCase()+this.props.category.slice(1)}-News Monkey`

  }
  async componentDidMount(){
    this.updateNews();

    this.setState({
      page:this.state.page+1
      });
  }


  fetchMoreData = async() => {
  
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f130a42b99a04dd997be3f04e4721cd2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    
    await fetch(url).then((response)=>{
      return response.json();
    }).then((data)=>{
        this.setState({articles:this.state.articles.concat(data.articles)});
        this.setState({loading:false});
    })

  }

  // handleNext=()=>{
  //   this.setState({
  //     page:this.state.page+1
  //   })
  //   this.updateNews();
    
  // }
  
  // handlePrev =async()=>{
  // this.setState({
  //   page:this.state.page-1
    
  // })
  // this.updateNews();
  // }
  render() {
    console.log("render");
    return (
      <div className='container my-3'>
        <h2 className='text-center'>{`News Monkey - Top Headlines On ${this.props.category[0].toUpperCase()+this.props.category.slice(1)}`}</h2>
         {/* {this.state.loading==true && <Spinner/> } */}
        <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={true}
              loader={<Spinner/>}
            >
          <div className="container">
              <div className="row">
                {this.state.articles.map((element)=>{
                  if(element.urlToImage!=null && element.description!=null){
                  return  <div className="d-flex justify-content-start col-md-4" key={element.url}>
                        <NewsItem  title={element.title} description={element.description.slice(0,89)} imagUrl={element.urlToImage} newsUrl={element.url} time={element.publishedAt} author={element.author==null?"***":element.author}  source={element.source.name}/>
                  </div>}
                    
              }) }
              </div>
          </div>     
        </InfiniteScroll>
 
      </div>
    )
  }
}
export default News