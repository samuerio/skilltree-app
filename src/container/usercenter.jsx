import UserCenter from '../components/usercenter/userCenter.jsx';
import {bindActionCreators} from  'redux';
import {connect} from  'react-redux';
import {menuClick,fetchSkills,skillFilter,designerTabClick,addFieldVal,removeField,saveCanvasData} from '../actions/actionCreators';


function mapStateToProps(state){
    let{form,userCenter,isFetching} = state;
    return{
        userCenter,
        isFetching,
        form
    };
}

function  mapDispatchToProps(dispatch){
    return{
        menuClick:bindActionCreators(menuClick,dispatch),
        fetchSkills:bindActionCreators(fetchSkills,dispatch),
        skillFilter:bindActionCreators(skillFilter,dispatch),
        designerTabClick:bindActionCreators(designerTabClick,dispatch),
        addFieldVal:bindActionCreators(addFieldVal,dispatch),
        removeField:bindActionCreators(removeField,dispatch),
        saveCanvasData:bindActionCreators(saveCanvasData,dispatch)
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(UserCenter);