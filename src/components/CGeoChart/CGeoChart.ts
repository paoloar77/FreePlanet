import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

@Component({})

/**
 *
 * 150 - Europe  154 - Northern Europe  GG, JE, AX, DK, EE, FI, FO, GB, IE, IM, IS, LT, LV, NO, SE, SJ
 * 155 - Western Europe  AT, BE, CH, DE, DD, FR, FX, LI, LU, MC, NL
 * 151 - Eastern Europe  BG, BY, CZ, HU, MD, PL, RO, RU, SU, SK, UA
 * 039 - Southern Europe  AD, AL, BA, ES, GI, GR, HR, IT, ME, MK, MT, RS, PT, SI, SM, VA, YU
 * 019 - Americas  021 - Northern America  BM, CA, GL, PM, US
 * 029 - Caribbean  AG, AI, AN, AW, BB, BL, BS, CU, DM, DO, GD, GP, HT, JM, KN, KY, LC, MF, MQ, MS, PR, TC, TT, VC, VG, VI
 * 013 - Central America  BZ, CR, GT, HN, MX, NI, PA, SV
 * 005 - South America  AR, BO, BR, CL, CO, EC, FK, GF, GY, PE, PY, SR, UY, VE
 *
 */

export default class CGeoChart extends Vue {

  public $t
  public $q
  public data: any[] = []
  public mydatafixed: any[] = []
  public tab = 'world'

  public myoptionsWorld = {
    legend: { textStyle: { color: 'blue', fontSize: 16 } },
    backgroundColor: '#81d4fa',
    colorAxis: { colors: ['#ffd986', '#009524'] },

  }
  public myoptionsEurope = {
    region: '039',
    legend: { textStyle: { color: 'blue', fontSize: 16 } },
    backgroundColor: '#81d4fa',
    colorAxis: { colors: ['#ffd986', '#009524'] },
  }

  @Prop({ required: true }) public mydata: any []

  get tools() {
    return tools
  }

  public mounted() {
    this.mydatafixed = []
    let alldata: any[]

    for (const rec of this.mydata) {
      alldata = []
      alldata.push(tools.getNationsByNationality(rec._id))
      alldata.push(rec.count)

      this.mydatafixed.push(alldata)
    }
  }

  get getmydatafixed() {
    if (!!this.mydatafixed)
      return this.mydatafixed
    else
      return [['Italy', 1]]
  }

}
