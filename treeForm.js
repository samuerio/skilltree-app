//异步获取数据并拼接为树的结构
var actionUrl = 'BaseAction.action?type=module&act=getModuleMenuConfig&moduleUnid='+moduleUnid;
$.post(actionUrl,{},function(data){
    console.log(data);
    var module = data;
    var childrens = [];
    module.uiModule && module.uiModule.forEach(function(uiModuleItem){

        var node = {
            id:uiModuleItem.id,
            name:uiModuleItem.text,
            isParent:!uiModuleItem.leaf
        }
        if(!uiModuleItem.leaf){
            node.children = getChildren(uiModuleItem);
        }

        function getChildren(module){
            var children = [];
            module.children.forEach(function(moduleItem){
                var node = {
                    id:moduleItem.id,
                    name:moduleItem.text,
                    isParent:!moduleItem.leaf
                }
                children.push(node);
                if(!moduleItem.leaf){
                    node.children = getChildren(moduleItem);
                }
            });
            return children;
        }

        childrens.push(node);
    });


    var rootTreeNode = {
        id:module.unid,
        name:module.displayName,
        isParent : true,
        open:true
    };
    if(childrens.length !== 0){
        rootTreeNode.children = childrens;
    }


    var setting = {
        view:{
            dblClickExpand:false,
            showLine:true,
            selectedMulti:false,
            showIcon:true
        },
        callback:{
            onClick:function(event, treeId, treeNode){
                var url = "";
                if(treeNode.level ===  0){
                    url = path + '/core/jsp/module/module_edit.jsp?unid='+treeNode.id+'&belongToAppId=8729EB30D7607C84CCE4207C07CA4D91';
                }else{
                    url = path + '/core/jsp/module/module_item_edit.jsp?unid='+treeNode.id+'&belongToAppId=8729EB30D7607C84CCE4207C07CA4D91'
                }
                $container  = $(".mainView");
                $container.empty();
                $container.append($(getIframeDom(url)))
            }
        }
    }

    $tree = $.fn.zTree.init($('#tree'),setting,rootTreeNode);
    console.log($tree.getNodes());
    $tree.selectNode($tree.getNodeByParam('id',module.unid),false,false);
    $('.curSelectedNode').trigger('click');
},'json');


function getIframeDom(url){
    var iframe = document.createElement('iframe');
    iframe.setAttribute('width','100%');
    iframe.setAttribute('height','100%');
    iframe.setAttribute('frameborder','0');
    iframe.setAttribute('scrolling','no');

    iframe.src = url;

    return iframe
}


