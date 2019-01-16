
TweenMax.set('.vlogo', {
  opacity: 1
})

TweenMax.set('#words', {
  visibility: 'visible'
})

//repeating for all the birds, uses classes
exports.anima = () => {
  alert("prova")
  const tl = new TimelineMax({
    repeat: 2,
    yoyo: true
  })

  tl.add('start')

  tl.to('.sun ', 1, {
    rotation: -45,
    y: -20,
    transformOrigin: '50% 90%'
  }, 'start')

  tl.timeScale(2)
  return tl
}
