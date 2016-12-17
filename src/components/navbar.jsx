import React,{Component} from 'react';

class NavBar extends Component{
    render(){
        return(
            <nav className="navbar navbar-default">
                <div className="cards">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form className="navbar-form navbar-right" role="search">
                            <div className="form-group form-white is-empty">
                                <input type="text" className="form-control" placeholder="Search" />
                                <span className="material-input"></span>
                            </div>
                            <button type="submit" className="btn btn-white btn-raised btn-fab btn-fab-mini"><i className="material-icons">search</i></button>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;