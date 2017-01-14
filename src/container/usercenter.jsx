import UserCenter from '../components/page/userCenter.jsx';
import {bindActionCreators} from  'redux';
import {connect} from  'react-redux';
import {fetchSkills,designerTabClick,
    addFieldVal,removeField,saveCanvasData} from '../actions/actionCreators';


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
        fetchSkills:bindActionCreators(fetchSkills,dispatch),
        designerTabClick:bindActionCreators(designerTabClick,dispatch),
        addFieldVal:bindActionCreators(addFieldVal,dispatch),
        removeField:bindActionCreators(removeField,dispatch),
        saveCanvasData:bindActionCreators(saveCanvasData,dispatch)
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(UserCenter);