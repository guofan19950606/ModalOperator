<template>
  <Button
    v-bind:is="fab ? 'FAB' : 'Button'"
    :label="label"
    :icon="icon"
    :disabled="disabled"
    :type="type"
    :size="size"
    :ghost="ghost"
    @click.native.stop="open()"
    style="width: min-content;margin: 0 2px"
  >
    <Icon :type="iconType" :size="iconSize" :color="iconColor" />{{text}}
    <div v-if="renderModal" >
      <Modal
        ref="childelement"
        :class="`${isHeaderShow == true?'':'headerNone'}${back_color == true?'bac_btn':''}${news == true?'newsClass':''}`"
        :width="dragWidth"
        :title="title"
        :loading="submitLoading"
        :footerHide="footerHide"
        v-model="showModal"
        @on-cancel="cancel"
        @on-ok="ok"
        :draggable="draggabled"
        :mask="mask"
        :mask-closable="maskCloseable"
        :closable="closable"
        :fullscreen="fullscreen"
        :styles="styles"
      >
        <div  slot="header" style="color:white;text-align:left;font-size: 16px">
          <Icon type="ios-information-circle" size="20"></Icon>
          <span style="margin-left: 5px">{{title}}</span>
        </div>
        <slot></slot>

        <div slot="footer">
          <slot name="customBtn" v-if="customButton || false"></slot>
          <div v-else>
            <Button type="primary" @click="ok()" :loading="!submitLoading" >
              <span v-if="submitLoading">确定</span>
              <span v-else>数据处理中</span>
            </Button>
            <Button @click="closeModal()">取消</Button>
          </div>
        </div>
        <Spin size="large" fix v-if="resolving" />
      </Modal>
    </div>
  </Button>
</template>

<script>
export default {
  name: 'ModalOperator',

  data() {
    return {
      renderModal: false,
      showModal: false,
      resolving: false,
         submitLoading: true,
    }
  },
  inject: ['operator'],
  props: {
    isHeaderShow:{
      type:Boolean,
      default:true
    },
    content:{
      type:String,
      default:'数据验证不通过，请检查表单信息'
    },
    back_color:{
      type:Boolean,
      default:false
    },
    news:{
      type:Boolean,
      default:false
    },
    ghost: {
      type: Boolean,
      default: true
    },
    icon: String,
    closable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'success',
    },
    size: {
      type: String,
      default: 'small',
    },
    iconType: String,
    iconSize: {
      type: String,
      default: '18'
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    maskCloseable: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    iconColor: String,
    customButton: Boolean,
    width: {
      type: [Number, String],
      default: '80%',
    },
    title: String,
    label: String,
    text: String,
    fab: Boolean,
    disabled: Boolean,
    footerHide: Boolean,
    middle:Boolean,
    isMaxHeight:{
      type: Boolean,
      default: true,
    },
   /* submitLoading:{
        type:Boolean,
      default:true
    },*/
    isLoadingShow:{
      type:Boolean,
      default:true
    }
  },
  computed:{
    draggabled(){
      return !this.fullscreen
    },
    dragWidth(){
      if(!this.draggabled) return this.width;
      let width = parseInt(this.width);
      let screenWidth = document.body.clientWidth;
      return width <= 100 ? `${screenWidth*width/100}px` : `${width}px`
    },
    className(){
      // return this.middle?'vertical-center-modal':''
      return this.draggabled?'':'vertical-center-modal'
    },
    styles(){
      return this.draggabled?{top: '0px',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}:{}
      // return this.middle||this.fullscreen?{}:{top: '20px'}
    }
  },
  inject: ['operator'],
  methods: {
    /**
       * 执行注入 operator 的方法
       * @param method
       * @returns {Promise<*>}
       */
    async execute(method) {
      const operator = this.operator
      if (!operator || !(operator[method] instanceof Function)) return true
      return operator[method]()
    },

    async open() {
      let flag = await this.execute('checkOpen')
      if(!flag){
        return;
      }
      document.querySelector('body').setAttribute('style', 'overflow:hidden;padding-right:17px;')
      var maxHeight = document.documentElement.clientHeight-200
      this.renderModal = true
      this.execute('initialize')
      if (this.isLoadingShow){
              this.resolving = true
      }


      this.$nextTick(() => {
        this.showModal = true
        console.log(this.isMaxHeight)
        if(!this.fullscreen && this.isMaxHeight){
          this.$refs.childelement.$refs.content.children[2].style.maxHeight=maxHeight+'px'
          this.$refs.childelement.$refs.content.children[2].style.overflow='auto'
        }
      })

      return this.$nextTick(async () => {
        await this.execute('beforeOpen')
        this.resolving = false
      })
    },

    close() {
      this.showModal = false
      this.execute('onClose')
    },

    cancelLoading() {
      this.submitLoading = false
      this.$nextTick(() => {
        this.submitLoading = true
      })
    },

    cancel() {
      this.submitLoading = true
      this.execute('onCancel')
    },
    closeModal() {
      this.showModal = false
    },
    async ok() {
      this.submitLoading = false
      // 提交前的检查
      const result = await this.execute('beforeSubmit')
      if (!result) {
        this.$Message.warning({
          background: true,
          content:this.content
        })
        return this.cancelLoading()
      }

      try {
        // 提交
        await this.execute('onSubmit')
        this.$Message.success({
          background:true,
          content: '“' + this.title + '”' + '操作成功!'
        })
        this.submitLoading = true
      } catch (e) {
        this.$Message.error({
          background:true,
          content: e.toString()
        })
        return this.cancelLoading()
      }
      this.close()
    },
  },
  watch: {
    showModal(show) {
      if (!show) {
        this.$nextTick(() => {
          this.renderModal = false
        })
      }else{
        //当弹窗打开强制刷新组件获取到dome元素
        //判断是否全屏
        // if(!this.fullscreen){
        //   this.$nextTick(() => {
        //     //判断弹窗高度是否超出可视高度如果没有超出弹窗居中显示，否则的话滚动条滚动
        //     setTimeout(()=>{
        //       if(this.$refs.childelement.$el.children[0].children[0].children[0].offsetHeight<document.documentElement.clientHeight){
        //         this.styles = this.fullscreen?{}:{top: '0px',height:'100%',display:'flex',alignItems:'center'}//this.middle||this.fullscreen?{}
        //         return this.styles
        //       }else{
        //         this.styles = this.fullscreen?{}:{top: '20px',height:'100%',display:'block',alignItems:'center'}//this.middle||this.fullscreen?{}:
        //         return this.styles//this.middle||this.fullscreen?{}:
        //       }
        //     },1000)
        //   })
        // }
      }
    },
  },
}
</script>

<style lang="less">
  .large .ivu-modal-content,
  .middle .ivu-modal-content,
  .small .ivu-modal-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 200px;
    overflow: auto;
  }

  .small .ivu-modal-content {
    left: 60px;
  }
  .gray {
    border-color: gray;
    color: gray;
  }
  .newsClass .ivu-modal-body {
    overflow:inherit!important;
  }
</style>
