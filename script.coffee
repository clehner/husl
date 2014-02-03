old = require './husl.js'
broken = require '../husl/husl.coffee'
for channel in ['R', 'G', 'B']
  for limit in [0, 1]
    console.log "OLD", channel, limit, old._hradExtremum(0.36544577229740066)(channel, limit)

console.log ''

for channel in ['R', 'G', 'B']
  for limit in [0, 1]
    console.log "NEW", channel, limit, broken._hradExtremum(0.36544577229740066)(channel, limit)
