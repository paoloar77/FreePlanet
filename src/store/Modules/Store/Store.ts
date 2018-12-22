import {RootState} from '@store'
import { getStoreBuilder } from 'vuex-typex'

export const storeBuilder = getStoreBuilder<RootState>()
