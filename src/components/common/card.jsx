import React,{Component} from 'react';

class Card extends Component{
    render(){
       let {title} = this.props;
       return(
           <div className="card">
               <div className="card-content">
                   <h6 className="category text-danger">
                       <i className="icon icon-line-chart"></i>&nbsp TRENDING
                   </h6>
                   <h4 className="card-title">
                       <a href="#pablo">{title}</a>
                   </h4>
                   <div className="card-footer">
                       <div className="author inline-block">
                           <a href="#pablo">
                               <img src="/src/assets/images/christian.jpg" alt="..." className="avatar img-raised" />
                                   <span>Lord Alex</span>
                           </a>
                       </div>
                       <div className="stats inline-block">
                           <i className="icon icon-like"></i> 33
                       </div>
                   </div>
               </div>
           </div>
       );
    }
}
        
        
        
export default Card;