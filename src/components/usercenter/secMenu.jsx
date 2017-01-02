import React,{Component} from 'react';

class SecMenu extends Component{
    render(){

        let{skillFilter,filter,designerTabClick} = this.props;

        let childMenus = [
            {
                filterVal:'all',
                name:'所有技能',
                iconClass:'icon-tree'
            },
            {
                filterVal:'own',
                name:'由我创建',
                iconClass:'icon-edit'
            }
        ];

        const defaultIconClass = 'icon';
        let $childMenus = childMenus.map(function(childMenu,idx){
            let {filterVal,name,iconClass} = childMenu;
            iconClass += ' '+defaultIconClass;

            let itemClass = 'item'
            if(filterVal === filter){
                itemClass += ' active';
            }
            return (
                <a key={idx} className={itemClass} onClick={()=>skillFilter(filterVal)}>
                    <i className={iconClass}></i><span>{name}</span>
                </a>
            )
        });

        return(
            <div className="secMenu">
                <header>
                    技能
                    <a onClick={()=>{skillFilter('create');designerTabClick('info');}} ><i className="icon icon-plus"></i></a>
                    <article>
                        按我创建的、参与的和归档的技能分类
                    </article>
                </header>
                {$childMenus}
            </div>
        );
    }
}

export default SecMenu;