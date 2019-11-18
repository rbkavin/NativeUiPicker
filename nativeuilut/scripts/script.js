
// Load in the required modules
const NativeUI = require('NativeUI');
const Scene = require('Scene');
const Textures = require('Textures');
const patch = require('Patches');
const d = require('Diagnostics');
const t = require('Time');
var rectname = patch.getStringValue('rectname');
var toticon = patch.getScalarValue('toticon');
// var rectname = "rectangle";
//  var toticon = 2;

d.log(toticon.pinLastValue() + " icon");
d.log(rectname.pinLastValue() + " rect");

t.setTimeout(() => {


  for (var i = 0; i <= toticon.pinLastValue() - 1; i++) {
    if (i == 0) {
      Scene.root.find(rectname.pinLastValue() + "0").hidden = false;
    }
    else {
      Scene.root.find(rectname.pinLastValue() + i).hidden = true;
    }
  }
  const picker = NativeUI.picker;

  // Set a starting index (optional, will be 0 by default)
  const index = 0;

  // Create a configuration object
  const configuration = {

    // The index of the selected item in the picker
    selectedIndex: index,

    // The image textures to use as the items in the picker
    items: [

      // {image_texture: Textures.get('icon0')},
      // {image_texture:Textures.get('icon1')}

    ]

  };

  for (var i = 0; i <= toticon.pinLastValue() - 1; i++) {
    d.log(i)
    configuration['items'].push({ image_texture: Textures.get('icon' + i) });

  }
  d.log(configuration["items"])
  //==============================================================================
  // Apply the configuration and show the picker
  //==============================================================================

  // Configure the picker using the configuration object
  picker.configure(configuration);

  // Set the picker to be visible (visible is false by default)
  picker.visible = true;

  //==============================================================================
  // Use the picker to set the texture of the plane
  //==============================================================================

  // Subscribe to the selectedIndex scalar signal
  picker.selectedIndex.monitor().subscribe(function (index) {
    for (var i = 0; i <= toticon.pinLastValue() - 1; i++) {
      if (i == index.newValue) {
        Scene.root.find(rectname.pinLastValue() + index.newValue).hidden = false;
      }
      else {
        Scene.root.find(rectname.pinLastValue() + i).hidden = true;
      }
    }
  });
}, 500);