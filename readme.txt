// =====================================================================
// compify2_slim.jsx for After Effects CS4 by fabiantheblind Nov 2010 based on:
//
// compify2.jsx by Joseph M. Morgan - April 2005 based on:
//
// Compify.jsx Byron Nash, Edited and Improved by Paul Tuersley  October 2004
//
// Stripped of most UI stuff.*
//
// To script does as follows:
// 1. take selection in project window.***
// 2. make a target folder (with prompt)
// 3. make a comp of every item in selection with 12 fps, 1 frame long, in the footage size
// 4. apply a effect preset**
// 5. adds the comp to the renderqueue as singleframe****
//
// bugs: has to work from everywhere not only lowest level of proj window
//       this seems to be a bug in compify and also on compify2
//       also the last version at Byron Nashs website: COMPIFYv5.JSX
//       http://www.armoredsquirrel.com/scripts/COMPIFYv5.JSX
//       seems also to have this bug
// bugs: exit() and stop() won't work
// 
// todo: an external xml or json file or txt to read in the variables.
// todo: build the render templates  within
// todo: change render location (use: "Change Render Locations.jsx")
// todo: check within CS5
// 
//
// * Thanx to the great documentation and the straight structure within the code
// ** The applied Preset has to be in the same folder as the script and the name has to be XXX
// *** this must be on the lowest level of the project window needs fixin
// **** the render presets have to exist
//
// =====================================================================
