import msg_it from '../../../freeplanet/src/statics/lang/it'
import msg_es from '../../../freeplanet/src/statics/lang/es'
import msg_si from '../../../freeplanet/src/statics/lang/si'
import msg_enUs from '../../../freeplanet/src/statics/lang/enUs'
import msg_fr from '../../../freeplanet/src/statics/lang/fr'
import msg_de from '../../../freeplanet/src/statics/lang/de'
import msg_pt from '../../../freeplanet/src/statics/lang/pt'

import msg_website_de from "../db/lang/ws_de";
import msg_website_enUs from "../db/lang/ws_enUs";
import msg_website_es from "../db/lang/ws_es";
import msg_website_fr from "../db/lang/ws_fr";
import msg_website_it from "../db/lang/ws_it";
import msg_website_pt from "../db/lang/ws_pt";
import msg_website_si from "../db/lang/ws_si";

const msgde = { ...msg_website_de, ...msg_de.de };
const msgenUs = { ...msg_website_enUs, ...msg_enUs.enUs };
const msges = { ...msg_website_es, ...msg_es.es };
const msgfr = { ...msg_website_fr, ...msg_fr.fr };
const msgit = { ...msg_website_it, ...msg_it.it };
const msgpt = { ...msg_website_pt, ...msg_pt.pt };
const msgsi = { ...msg_website_si, ...msg_si.si };

const messages = {
  it: {
    ...msgit,
    pages: { ...msg_website_it.pages, ...msg_it.it.pages },
    msg: { ...msg_website_it.msg, ...msg_it.it.msg },
  },
  si: {
    ...msgsi,
    pages: { ...msg_website_si.pages, ...msg_si.si.pages },
    msg: { ...msg_website_si.msg, ...msg_si.si.msg },
  },
  es: {
    ...msges,
    pages: { ...msg_website_es.pages, ...msg_es.es.pages },
    msg: { ...msg_website_es.msg, ...msg_es.es.msg },
  },
  enUs: {
    ...msgenUs,
    pages: { ...msg_website_enUs.pages, ...msg_enUs.enUs.pages },
    msg: { ...msg_website_enUs.msg, ...msg_enUs.enUs.msg },
  },
  fr: {
    ...msgfr,
    pages: { ...msg_website_fr.pages, ...msg_fr.fr.pages },
    msg: { ...msg_website_fr.msg, ...msg_fr.fr.msg },
  },
  pt: {
    ...msgpt,
    pages: { ...msg_website_pt.pages, ...msg_pt.pt.pages },
    msg: { ...msg_website_pt.msg, ...msg_pt.pt.msg },
  },
  de: {
    ...msgde,
    pages: { ...msg_website_de.pages, ...msg_de.de.pages },
    msg: { ...msg_website_de.msg, ...msg_de.de.msg },
  }
};

export default messages;

