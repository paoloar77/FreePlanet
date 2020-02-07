import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { IGallery, IImgGallery } from '../../model/GlobalStore'
import { CMyPage } from '../CMyPage'
import GlobalModule from '../../store/Modules/GlobalStore'
import { GlobalStore } from '../../store/Modules'
import MixinBase from '../../mixins/mixin-base'

@Component({
  name: 'CGallery',
  components: { CMyPage }
})

export default class CGallery extends MixinBase {
  @Prop({ required: true }) public edit: boolean
  @Prop({ required: true }) public gall: IGallery
  @Prop({ required: true }) public listimages: IImgGallery[]
  public mygall: IGallery = {}
  public mylistimages: IImgGallery[] = []

  @Watch('gall')
  public gallchanged() {
    this.mygall = this.gall
  }

  @Watch('listimages')
  public listimageschanged() {
    this.mylistimages = this.listimages
  }

  public created() {
    this.mygall = this.gall
    this.mylistimages = this.listimages
  }

  get tools() {
    return tools
  }

  get getlistimages() {
    if (this.mylistimages)
      return this.mylistimages.slice().sort((a, b) => a.order - b.order)
    else
      return null
  }

  public onDragStart(e) {
    console.log('onDragStart')
    e.dataTransfer.setData('text', e.target.id)
    e.dataTransfer.dropEffect = 'move'
  }

  public onDragEnter(e) {
    // don't drop on other draggables
    if (e.target.draggable !== true) {
      e.target.classList.add('drag-enter')
    }
  }

  public onDragLeave(e) {
    e.target.classList.remove('drag-enter')
  }

  public onDragOver(e) {
    e.preventDefault()
  }

  public onDrop(e) {
    console.log('onDrop', e)
    e.preventDefault()

    // don't drop on other draggables
    if (e.target.draggable === true) {
      return
    }

    const draggedId = e.dataTransfer.getData('text')
    let dragout = ''
    try {
      dragout = e.target.parentNode.parentNode.id
    } catch (e) {
      dragout = ''
    }
    const draggedEl = document.getElementById(draggedId)
    console.log('draggedId', draggedId, 'draggedEl', draggedEl)
    console.log('dragout', dragout)

    // check if original parent node
    if (draggedEl.parentNode === e.target) {
      e.target.classList.remove('drag-enter')
      return
    }

    const myindex = this.mylistimages.findIndex((rec) => rec._id === draggedId)
    const myrec: IImgGallery = this.mylistimages[myindex]

    let myrecprec: IImgGallery = null
    let myrecout: IImgGallery = null
    const myindexout = this.mylistimages.findIndex((rec) => rec._id === dragout)
    myrecout = this.mylistimages[myindexout]
    let myindexprec = myindexout - 1

    if (myindexprec < 0)
      myindexprec = 0

    if (myindex === myindexout)
      return

    myrecprec = this.listimages[myindexprec]

    console.log('myrec', myrec, 'myrecprec', myrecout)

    if (myrec && myrecout)
      console.log('myrec', myrec, 'myrecprec', myrecout, 'ord1', myrec.order, 'myrecout', myrecout.order)

    if (myrecout) {
      let diff = 0
      const ord2 = myrecprec.order
      const ord1 = myrecout.order
      diff = Math.round((ord1 - ord2) / 2)
      if (diff <= 0)
        diff++
      console.log('diff', diff)
      let mynum = 0
      mynum = myrecprec.order + diff
      console.log('mynum', mynum)
      myrec.order = mynum
    } else {
      myrec.order = Math.round(myrec.order) - 1
    }

    console.log('myrec.order', myrec.order)

    // make the exchange
    // draggedEl.parentNode.removeChild(draggedEl)
    // e.target.appendChild(draggedEl)
    e.target.classList.remove('drag-enter')

    this.save()
  }

  get getclass() {
    return (this.edit) ? 'my-card-gallery' : 'my-card-gallery-view' + ' text-center'
  }

  get getclimg() {
    return (this.edit) ? 'myimg' : 'myimg-view'
  }

  get getlastord() {
    let myord = 0
    for (const file of this.mylistimages) {
      if (file.order > myord)
        myord = file.order
    }

    return myord + 10
  }

  public uploaded(info) {
    console.log(info)
    for (const file of info.files) {
      this.mylistimages.push({ imagefile: file.name, order: this.getlastord })
    }

    this.save()
  }

  public deleted(rec) {
    // console.table(this.mylistimages)

    const index = this.mylistimages.findIndex((elem) => elem.imagefile === rec.imagefile)
    if (index > -1) {
      this.mylistimages.splice(index, 1)
    }

    // this.mylistimages = this.mylistimages.pop((elem) => elem.imagefile !== rec.imagefile)

    // console.table(this.mylistimages)

    this.save()
  }

  public getfullname(rec) {
    return 'statics/upload/' + this.mygall.directory + `/` + rec.imagefile
  }

  public copytoclipboard(rec) {
    const filename = this.getfullname(rec)
    tools.copyStringToClipboard(this, filename, true)
  }

  public async deleteFile(rec) {
    const filename = this.getfullname(rec)

    // Delete File on server:
    const ris = await GlobalStore.actions.DeleteFile({ filename })
    if (ris)
      this.deleted(rec)

  }

  public save() {
    this.$emit('showandsave', this.mylistimages)
  }

  public getsrcimg(mygallery) {

    if (tools.getextfile(mygallery.imagefile) === 'pdf')
      return 'statics/images/images/pdf.jpg'
    else
      return 'statics/upload/' + this.mygall.directory + `/` + mygallery.imagefile
  }

}
