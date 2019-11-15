import jsonOptions from './options.json'
const types = {}
for( let i = 0, lg = jsonOptions.length; i<lg; i++ ){
  let o = jsonOptions[i]
  types[o.id] = o.id
}

types['active'] = 'active'
types['pausedWebsites'] = 'pausedWebsites'
types['pausedPages'] = 'pausedPages'

export default types