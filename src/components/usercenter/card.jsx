import React,{Component} from 'react';

class Card extends Component{
    render(){
       return(
           <div className="card">
               <div className="content">
                   <h6 className="category text-danger">
                       <i className="icon icon-line-chart"></i>&nbsp TRENDING
                   </h6>
                   <h4 className="card-title">
                       <a href="#pablo">Java Core Skills</a>
                   </h4>
                   <div className="footer">
                       <div className="author">
                           <a href="#pablo">
                               <img src="/src/assets/images/christian.jpg" alt="..." className="avatar img-raised" />
                                   <span>Lord Alex</span>
                           </a>
                       </div>
                       <div className="stats">
                           <i className="icon icon-like"></i>&nbsp 33
                       </div>
                   </div>
               </div>
           </div>
       );
    }
}
        
        
        
export default Card;