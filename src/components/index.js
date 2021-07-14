
import ModalOperators from './ModalOperator'


const Admin = {}
Admin.install = function(Vue) {
    Vue.component('ModalOperators', ModalOperators)
}
Admin.components = {
    ModalOperators,
}
export default Admin

