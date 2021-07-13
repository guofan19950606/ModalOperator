import Box from './Box'
import SearchBox from './SearchBox'
import FilterBox from './FilterBox'

import DataList from './DataList'
import TreeList from './TreeList'
import TabList from './TabList'

import ModalOperator from './ModalOperator'
import ConfirmOperator from './ConfirmOperator'
import FAB from './FAB'

import SearchLayout from './layout/SearchLayout'
import AsideLayout from './layout/AsideLayout'
import AsideCollapse from './layout/AsideCollapse'
import MainLayout from './layout/MainLayout'

import DictionaryCheckbox from './form/DictionaryCheckbox'
import DictionaryRadio from './form/DictionaryRadio'
import DictionarySelect from './form/DictionarySelect'
import MenuTreeSelect from './form/MenuTreeSelect'
import RoleSelect from './form/RoleSelect'
import TreeTransfer from './form/TreeTransfer'
import UnitTreeSelect from './form/UnitTreeSelect'
import UserSelect from './form/UserSelect'
import UnitUserSelect from './form/UnitUserSelect'

import vModal, { confirm } from './modal'

const Admin = {}
Admin.install = function(Vue) {
  Vue.directive('modal', vModal)
  Vue.directive('confirm', confirm)
  Vue.component('Box', Box)
  Vue.component('SearchBox', SearchBox)
  Vue.component('FilterBox', FilterBox)
  Vue.component('DataList', DataList)
  Vue.component('TreeList', TreeList)
  Vue.component('TabList', TabList)
  Vue.component('ModalOperator', ModalOperator)
  Vue.component('ConfirmOperator', ConfirmOperator)
  Vue.component('FAB', FAB)
  Vue.component('SearchLayout', SearchLayout)
  Vue.component('AsideLayout', AsideLayout)
  Vue.component('AsideCollapse', AsideCollapse)
  Vue.component('MainLayout', MainLayout)
  Vue.component('DictionaryCheckbox', DictionaryCheckbox)
  Vue.component('DictionaryRadio', DictionaryRadio)
  Vue.component('DictionarySelect', DictionarySelect)
  Vue.component('MenuTreeSelect', MenuTreeSelect)
  Vue.component('RoleSelect', RoleSelect)
  Vue.component('TreeTransfer', TreeTransfer)
  Vue.component('UnitTreeSelect', UnitTreeSelect)
  Vue.component('UserSelect', UserSelect)
  Vue.component('UnitUserSelect', UnitUserSelect)
}
Admin.components = {
  Box,
  SearchBox,
  FilterBox,
  DataList,
  TreeList,
  TabList,
  ModalOperator,
  ConfirmOperator,
  FAB,
  SearchLayout,
  AsideLayout,
  AsideCollapse,
  MainLayout,
  DictionaryRadio,
  DictionarySelect,
  MenuTreeSelect,
  RoleSelect,
  TreeTransfer,
  UserSelect,
  UnitTreeSelect,
  UnitUserSelect,
}
export default Admin
