import NodeModel from '../schema/node'

/**
 * 结点外形相关
 */
var nodeShapeRelative = (function(){

    return {
        littleNodeDefaultHeight: 26,
        nodeXInterval: 40,
        nodeYInterval: 16,
        /**
         * 获取Node的高度
         * @param node
         * @returns {*}
         */
        getSingleNodeHeight: function(node){
            if(node.shape){
                return node.shape[1].attr('height');
            }else{//如果为新结点则返回默认高度

                if(node.isFirstLevelNode()){
                    return NodeModel.DEFAULT_HEIGHT;
                }else{//@workaround:如果为第三层或以上层节点
                    return this.littleNodeDefaultHeight;
                }

            }
        },
        /**
         * 获取Node的宽度
         * @param node
         * @returns {*}
         */
        getSingleNodeWidth: function(node){
            if(node.shape){
                return node.shape[1].attr('width');
            }else{
                return NodeModel.DEFAULT_WIDTH;
            }
        },
        /**
         * 计算节点区域的高度
         * @param nodeModel
         * @returns {*}
         */
        getNodeAreaHeight: function(nodeModel){
            //如果结点不是叶子结点,则从子结点中累加高度
            if(nodeModel.childrenCount() > 0){
                var height = 0;
                for(var i in nodeModel.children){
                    height += this.getNodeAreaHeight(nodeModel.children[i]);
                }
                return height;
            }else{
                if(nodeModel.shape){//已渲染
                    return nodeModel.shape[1].attr('height') + this.nodeYInterval * 2;
                }else{//未渲染
                    if(nodeModel.isFirstLevelNode()){
                        return NodeModel.DEFAULT_HEIGHT + this.nodeYInterval * 2;
                    }else{//@workaround:如果为第三层或以上层节点
                        return this.littleNodeDefaultHeight + this.nodeYInterval * 2;
                    }
                }
            }
        }


    }
}());

export default nodeShapeRelative;