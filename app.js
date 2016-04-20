(function(){

  // We check for features which are not universally supported, and don't try to
  // show the app if it would error.
  if (!window.addEventListener)
    return;

  // The INSTALL_OPTIONS constant is inserted by the Eager bundler.  It's value is the
  // value of the options defined in the install.json file.
  var options = INSTALL_OPTIONS;

  var zoomLevel = 1;
  var zoomText = 1;
  var el = null;

  var decreaseFont = function() {
    zoomLevel -= 0.1;
    zoomText = zoomLevel.toFixed(1);
    document.documentElement.style.fontSize=zoomLevel + 'em';
    update();
  }

  var increaseFont = function() {
    zoomLevel += 0.1;
    zoomText = zoomLevel.toFixed(1);
    document.documentElement.style.fontSize=zoomLevel + 'em';
    update();
  }

  var updateElement = function(){
    // We pass in the last element to allow us to restore the removed element
    // when we do live updating of the preview.  Details:
    // https://eager.io/developer/docs/install-json/preview#dealing-with-element-fields
    el = Eager.createElement(options.element, el);
    el.className = 'zoom-widget';
  };

  var update = function(){
    updateElement();
    var controls = '<div id="controls"><span>Font Size</span><button id="decrease">-</button>' + zoomText + '<button id="increase">+</button></div>'
    el.innerHTML = '<div class="zoom-widget"><span>zoomer</span>' + controls + '</div>';
      document.getElementById('decrease').addEventListener('click', handler = function(){
        decreaseFont();
      });
      document.getElementById('increase').addEventListener('click', handler = function(){
        increaseFont();
      });
  }

  var setOptions = function(opts){
    options = opts;

    update();
  }



  // Since we're adding an element to the body, we need to wait until the DOM is
  // ready before inserting our widget.
  if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', update);
  else
    update();

  // This is used by the preview to enable live updating of the app while previewing.
  // See the preview.handlers section of the install.json file to see where it's used.
  INSTALL_SCOPE = {
    setOptions: setOptions
  };

})()
