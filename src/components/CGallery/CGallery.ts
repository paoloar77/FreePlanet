import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { IGallery, IImgGallery } from '../../model/GlobalStore'
import { CMyPage } from '../CMyPage'
import GlobalModule from '../../store/Modules/GlobalStore'
import { GlobalStore } from '../../store/Modules'

@Component({
  name: 'CGallery',
  components: { CMyPage }
})

export default class CGallery extends Vue {
  @Prop({ required: true }) public edit: boolean
  @Prop({ required: true }) public gall: IGallery
  @Prop({ required: true }) public listimages: IImgGallery[]

  get tools() {
    return tools
  }

  get getlistimages() {
    if (this.listimages)
      return this.listimages.sort((a, b) => a.order - b.order)
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
    const draggedEl = document.getElementById(draggedId)
    console.log('draggedId', draggedId, 'draggedEl', draggedEl)

    // check if original parent node
    if (draggedEl.parentNode === e.target) {
      e.target.classList.remove('drag-enter')
      return
    }

    const myindex = this.listimages.findIndex((rec) => rec._id === draggedId)
    const myrec = this.listimages[myindex]
    let myrecprec = null
    if (myindex > 0)
      myrecprec = this.listimages[myindex - 1]

    console.log('myrec', myrec, 'myrecprec', myrecprec, 'ord1', myrec.order, 'ordprec', myrecprec.order)

    if (myrecprec) {
      let diff = (myrec.order - myrecprec.order) / 2
      if (diff <= 0)
        diff++
      myrec.order = myrecprec.order + diff
    } else {
      myrec.order = (myrec.order - 1)
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
    for (const file of this.listimages) {
      if (file.order > myord)
        myord = file.order
    }

    return myord + 10
  }

  public uploaded(info) {
    console.log(info)
    for (const file of info.files) {
      this.listimages.push({ imagefile: file.name, order: this.getlastord  })
    }

    this.save()
  }

  public deleted(rec) {
    console.table(this.listimages)

    const index = this.listimages.findIndex((elem) => elem.imagefile === rec.imagefile)
    if (index > -1) {
      this.listimages.splice(index, 1)
    }

    // this.listimages = this.listimages.pop((elem) => elem.imagefile !== rec.imagefile)

    console.table(this.listimages)

    this.save()
  }

  public getfullname(rec) {
    return 'statics/upload/' + this.gall.directory + `/` + rec.imagefile
  }

  public async deleteFile(rec) {
    const filename = this.getfullname(rec)

    // Delete File on server:
    const ris = await GlobalStore.actions.DeleteFile({filename})
    if (ris)
      this.deleted(rec)

  }

  public save() {
    this.$emit('showandsave', this.listimages)
  }

}
