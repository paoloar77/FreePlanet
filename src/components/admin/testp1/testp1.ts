import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { GlobalStore, UserStore } from '@store'
import { Getter } from "vuex-class"
import { ICfgServer, IGlobalState, ITodo, ITodosState } from '@src/model'

const namespace: string = 'GlobalModule'

@Component({})
export default class Testp1 extends Vue {
  public myvar:number = 5
  public paramcategory: string = ''
  public mioobj: any

  // @Getter('todos_dacompletare', { namespace })
  // public todos_dacompletare: (state: ITodosState, category: string) => ITodo[]

  @Getter('testpao1_getter_contatore', { namespace })
  public testpao1: (state: IGlobalState, param1: number) => number

  @Getter('testpao1_getter_array', { namespace })
  public testpao1_array: (state: IGlobalState, miorec: ICfgServer) => ICfgServer[]

  @Watch('GlobalStore.state.testp1.mioarray', { immediate: true, deep: true })
  array_changed() {
    console.log('*** array_changed *** ', GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1])
  }

  @Watch('$route.params.category') changecat() {
    // this.mytypetransgroup = ''
    console.log('PRIMA this.paramcategory', this.paramcategory)
    this.paramcategory = this.$route.params.category
    console.log('DOPO this.paramcategory', this.paramcategory)
  }

  created() {
    this.mioobj = {
      arr1: [{chiave: 'key1', userId: 'ALL', valore: 'val1'}],
      arr2: [{chiave: 'key2', userId: 'ALL', valore: 'val2'}]
    }
  }

  get getarr1 () {
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


  TestBtnCambioaParamPassing () {
    this.paramcategory += 's'
  }

  TestBtn() {
    GlobalStore.state.testp1.contatore++
  }

  TestBtn2() {
    GlobalStore.state.testp1.mioarray.push({chiave: 'pippo2', userId: UserStore.state.userId, valore: GlobalStore.state.testp1.contatore.toString() })
  }

  TestBtnModify() {
    // GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] = GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] + 1
    GlobalStore.mutations.setPaoArray({chiave: 'pippo', userId: UserStore.state.userId, valore: '20' } )

  }

  TestBtnCambiaTutto() {
    // GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] = GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] + 1
    GlobalStore.mutations.NewArray([{chiave: 'nuovorec1', userId: UserStore.state.userId, valore: '1' }, {chiave: 'nuovorec2', userId: UserStore.state.userId, valore: '2' }] )

  }

  TestBtnAction() {
    GlobalStore.actions.prova()
  }

  TestBtnDelete() {
    // GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] = GlobalStore.state.testp1.mioarray[GlobalStore.state.testp1.mioarray.length - 1] + 1
    GlobalStore.mutations.setPaoArray_Delete()
  }

}
