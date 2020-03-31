import msg_website from '../db/i18n_website'

import msg_it from '../../../freeplanet/src/statics/lang/it'
import msg_es from '../../../freeplanet/src/statics/lang/es'
import msg_si from '../../../freeplanet/src/statics/lang/si'
import msg_enUs from '../../../freeplanet/src/statics/lang/enUs'
import msg_fr from '../../../freeplanet/src/statics/lang/fr'
import msg_de from '../../../freeplanet/src/statics/lang/de'
import msg_pt from '../../../freeplanet/src/statics/lang/pt'

const msgit = { ...msg_website.it, ...msg_it.it };
const msgsi = { ...msg_website.si, ...msg_si.si };
const msges = { ...msg_website.es, ...msg_es.es };
const msgfr = { ...msg_website.fr, ...msg_fr.fr };
const msgde = { ...msg_website.de, ...msg_de.de };
const msgpt = { ...msg_website.pt, ...msg_pt.pt };
const msgenUs = { ...msg_website.enUs, ...msg_enUs.enUs };

const messages = {
  it: {
    ...msgit,
    pages: { ...msg_website.it.pages, ...msg_it.it.pages },
    msg: { ...msg_website.it.msg, ...msg_it.it.msg },
  },
  si: {
    ...msgsi,
    pages: { ...msg_website.si.pages, ...msg_si.si.pages },
    msg: { ...msg_website.si.msg, ...msg_si.si.msg },
  },
  es: {
    ...msges,
    pages: { ...msg_website.es.pages, ...msg_es.es.pages },
    msg: { ...msg_website.es.msg, ...msg_es.es.msg },
  },
  enUs: {
    ...msgenUs,
    pages: { ...msg_website.enUs.pages, ...msg_enUs.enUs.pages },
    msg: { ...msg_website.enUs.msg, ...msg_enUs.enUs.msg },
  },
  fr: {
    ...msgfr,
    pages: { ...msg_website.fr.pages, ...msg_fr.fr.pages },
    msg: { ...msg_website.fr.msg, ...msg_fr.fr.msg },
  },
  pt: {
    ...msgpt,
    pages: { ...msg_website.pt.pages, ...msg_pt.pt.pages },
    msg: { ...msg_website.pt.msg, ...msg_pt.pt.msg },
  },
  de: {
    ...msgde,
    pages: { ...msg_website.de.pages, ...msg_de.de.pages },
    msg: { ...msg_website.de.msg, ...msg_de.de.msg },
  }
};

export default messages;

