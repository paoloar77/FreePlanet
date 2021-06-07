import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { GlobalStore, UserStore } from '@store'
import { Getter } from 'vuex-class'
import { ICfgServer, IGlobalState, ITodo, ITodosState } from '../../../model/index'

const namespace: string = 'Testp1'

@Component({})
export default class Testp1 extends Vue {
  public myvar:number = 5
  public paramcategory: string = ''
  public mioobj: any

  // @Getter('items_dacompletare', { namespace })
  // public items_dacompletare: (state: ITodosState, category: string) => ITodo[]

  @Getter('testpao1_getter_contatore', { namespace })
  public testpao1: (state: IGlobalState, param1: number) => number

  @Getter('testpao1_getter_array', { namespace })
  public testpao1_array: (state: IGlobalState, miorec: ICfgServer) => ICfgServer[]

  @Watch('GlobalStore.state.testp1.mioarray', { immediate: true, deep: true })
  public array_changed() {
    console.log('*** array_changed *** ', GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1])
  }

  @Watch('$route.params.category')
  public changecat() {
    // this.mytypetransgroup = ''
    console.log('PRIMA this.paramcategory', this.paramcategory)
    this.paramcategory = this.$route.params.category
    console.log('DOPO this.paramcategory', this.paramcategory)
  }

  public created() {
    this.mioobj = {
      arr1: [{chiave: 'key1', idapp: '9', userId: 'ALL', valore: 'val1'}],
      arr2: [{chiave: 'key2', idapp: '9', userId: 'ALL', valore: 'val2'}]
    }
  }

  get getarr1() {
    // return this.mioobj.arr1
    return this.mioobj['arr1']
  }

  get prova2() {
    return GlobalStore.state.testp1.contatore
  }

  get provagetter() {
    return GlobalStore.getters.testpao1_getter_contatore(130)
  }

  get provagetterarray() {
    return GlobalStore.getters.testpao1_getter_array(GlobalStore.state.testp1.contatore)
  }

  public TestBtnCambioaParamPassing () {
    this.paramcategory += 's'
  }

  public TestBtn() {
    GlobalStore.state.testp1.contatore++
  }

  public TestBtn2() {
    GlobalStore.state.testp1.mioarray.push({chiave: 'pippo2', idapp: process.env.APP_ID, userId: UserStore.state.my._id, valore: GlobalStore.state.testp1.contatore.toString() })
  }

  public TestBtnModify() {
    // GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] = GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] + 1
    GlobalStore.mutations.setPaoArray({chiave: 'pippo', idapp: process.env.APP_ID, userId: UserStore.state.my._id, valore: '20' } )

  }

  public TestBtnCambiaTutto() {
    // GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] = GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] + 1
    GlobalStore.mutations.NewArray([{chiave: 'nuovorec1', idapp: process.env.APP_ID, userId: UserStore.state.my._id, valore: '1' }, {chiave: 'nuovorec2', idapp: process.env.APP_ID, userId: UserStore.state.my._id, valore: '2' }] )

  }

  public TestBtnAction() {
    GlobalStore.actions.prova()
  }

  public TestBtnDelete() {
    // GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] = GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] + 1
    GlobalStore.mutations.setPaoArray_Delete()
  }

}
