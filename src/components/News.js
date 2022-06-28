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
      articles: [{
        "status": "ok",
        "totalResults": 2,
        "articles": [
          {
            "source": { "id": "the-washington-post", "name": "The Washington Post" },
            "author": "Dino Grandoni",
            "title": "EPA warns toxic 'forever chemicals' more dangerous than once thought - The Washington Post",
            "description": "Guidance may spur water utilities to tackle PFAS, but health advocates are still waiting for mandatory limits.",
            "url": "https://www.washingtonpost.com/climate-environment/2022/06/15/epa-pfas-forever-chemicals/",
            "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/745MRBQKPYI6ZJ6IMG5XWO7WFA.jpg&w=1440",
            "publishedAt": "2022-06-15T16:00:00Z",
            "content": "Placeholder while article actions load\r\nThe Environmental Protection Agency warned Wednesday that a group of human-made chemicals found in the drinking water, cosmetics and food packaging used by mil… [+6362 chars]"
          },
          {
            "source": { "id": "reuters", "name": "Reuters" },
            "author": null,
            "title": "WHO looks into reports of monkeypox virus in semen - Reuters.com",
            "description": "The World Health Organisation is looking into reports that the monkeypox virus is present in the semen of patients, exploring the possibility that the disease could be sexually transmitted, a WHO official said on Wednesday.",
            "url": "https://www.reuters.com/business/healthcare-pharmaceuticals/who-looks-into-reports-monkeypox-virus-semen-2022-06-15/",
            "urlToImage": "https://wwwhttps.reuters.com/resizer/VmzNyPgsWGf6Pop_jRfTg632GZM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/ZGWRQRCGWNJE5BBTHDI4YPKJ3M.jpg",
            "publishedAt": "2022-06-15T14:36:00Z",
            "content": "LONDON, June 15 (Reuters) - The World Health Organisation is looking into reports that the monkeypox virus is present in the semen of patients, exploring the possibility that the disease could be sex… [+2265 chars]"
          }
        ]
      }
      ],
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