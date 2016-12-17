import UserCenter from '../components/usercenter.jsx';
import {bindActionCreators} from  'redux';
import {connect} from  'react-redux';
import {userMenuClick} from '../actions';


function mapStateToProps(state){
    let{userCenter} = state;
    return{
        userCenter
    };
}

function  mapDispatchToProps(dispatch){
    return{
        userMenuClick:bindActionCreators(userMenuClick,dispatch)
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(UserCenter);