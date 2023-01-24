function calculateLifespan() {
  const today = new Date();
  let life = parseInt((Date.now() / 1000)-1674116879);

  return life
}

function formatLifespan(life) {
  const days = Math.floor(life/86400)
  const hours = Math.floor((life%86400)/3600)
  const minutes = Math.floor((life%3600)/60)
  const seconds = life % 60

  var d = " Days, "
  if (days == 1){
    d = " Day, "
  }

  var h = " Hours, "
  if (hours == 1){
    h = " Hour, "
  }

  var m = " Minutes, "
  if (minutes == 1){
    m = " Minute, "
  }

  var s = " Seconds"
  if (seconds == 1){
    s = " Second"
  }
  
  lifespan = days + d + hours + h + minutes + m + "and " + seconds + s
  
  return lifespan
}

function getLifespan() {
  return formatLifespan(calculateLifespan())
}

function displayLifespan() {
  const preface = "This webpage has been live for approximately "
  const followup = "."
  let u = getLifespan()
  document.getElementById("LifespanSection").innerHTML =  preface + u + followup;
  setTimeout(displayLifespan, 1000);
}