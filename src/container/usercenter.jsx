import UserCenter from '../components/usercenter/userCenter.jsx';
import {bindActionCreators} from  'redux';
import {connect} from  'react-redux';
import {menuClick,fetchSkills} from '../actions/actionCreators';


function mapStateToProps(state){
    let{userCenter,isFetching} = state;
    return{
        userCenter,
        isFetching
    };
}

function  mapDispatchToProps(dispatch){
    return{
        menuClick:bindActionCreators(menuClick,dispatch),
        fetchSkills:bindActionCreators(fetchSkills,dispatch)
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(UserCenter);