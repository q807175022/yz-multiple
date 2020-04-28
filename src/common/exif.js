(function(){var p=false;var r=this;var f=function(A){if(A instanceof f){return A}if(!(this instanceof f)){return new f(A)}this.EXIFwrapped=A};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=f}exports.EXIF=f}else{r.EXIF=f}var v=f.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"};var z=f.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"};var o=f.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"};var n=f.IFD1Tags={256:"ImageWidth",257:"ImageHeight",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",273:"StripOffsets",274:"Orientation",277:"SamplesPerPixel",278:"RowsPerStrip",279:"StripByteCounts",282:"XResolution",283:"YResolution",284:"PlanarConfiguration",296:"ResolutionUnit",513:"JpegIFOffset",514:"JpegIFByteCount",529:"YCbCrCoefficients",530:"YCbCrSubSampling",531:"YCbCrPositioning",532:"ReferenceBlackWhite"};var k=f.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}};function s(A,C,B){if(A.addEventListener){A.addEventListener(C,B,false)}else{if(A.attachEvent){A.attachEvent("on"+C,B)}}}function i(A){return !!(A.exifdata)}function e(D,G){G=G||D.match(/^data\:([^\;]+)\;base64,/mi)[1]||"";D=D.replace(/^data\:([^\;]+)\;base64,/gmi,"");var F=atob(D);var A=F.length;var C=new ArrayBuffer(A);var B=new Uint8Array(C);for(var E=0;E<A;E++){B[E]=F.charCodeAt(E)}return C}function w(B,C){var A=new XMLHttpRequest();A.open("GET",B,true);A.responseType="blob";A.onload=function(D){if(this.status==200||this.status===0){C(this.response)}};A.send()}function b(B,F){function D(I){var H=h(I);B.exifdata=H||{};var G=g(I);B.iptcdata=G||{};if(f.isXmpEnabled){var J=d(I);B.xmpdata=J||{}}if(F){F.call(B)}}if(B.src){if(/^data\:/i.test(B.src)){var E=e(B.src);D(E)}else{if(/^blob\:/i.test(B.src)){var A=new FileReader();A.onload=function(G){D(G.target.result)};w(B.src,function(G){A.readAsArrayBuffer(G)})}else{var C=new XMLHttpRequest();C.onload=function(){if(this.status==200||this.status===0){D(C.response)}else{throw"Could not load image"}C=null};C.open("GET",B.src,true);C.responseType="arraybuffer";C.send(null)}}}else{if(self.FileReader&&(B instanceof self.Blob||B instanceof self.File)){var A=new FileReader();A.onload=function(G){if(p){console.log("Got file of length "+G.target.result.byteLength)}D(G.target.result)};A.readAsArrayBuffer(B)}}}function h(B){var E=new DataView(B);if(p){console.log("Got file of length "+B.byteLength)}if((E.getUint8(0)!=255)||(E.getUint8(1)!=216)){if(p){console.log("Not a valid JPEG")}return false}var D=2,C=B.byteLength,A;while(D<C){if(E.getUint8(D)!=255){if(p){console.log("Not a valid marker at offset "+D+", found: "+E.getUint8(D))}return false}A=E.getUint8(D+1);if(p){console.log(A)}if(A==225){if(p){console.log("Found 0xFFE1 marker")}return u(E,D+4,E.getUint16(D+2)-2)}else{D+=2+E.getUint16(D+2)}}}function g(E){var H=new DataView(E);if(p){console.log("Got file of length "+E.byteLength)}if((H.getUint8(0)!=255)||(H.getUint8(1)!=216)){if(p){console.log("Not a valid JPEG")}return false}var G=2,F=E.byteLength;var B=function(J,I){return(J.getUint8(I)===56&&J.getUint8(I+1)===66&&J.getUint8(I+2)===73&&J.getUint8(I+3)===77&&J.getUint8(I+4)===4&&J.getUint8(I+5)===4)};while(G<F){if(B(H,G)){var D=H.getUint8(G+7);if(D%2!==0){D+=1}if(D===0){D=4}var A=G+8+D;var C=H.getUint16(G+6+D);return x(E,A,C);break}G++}}var a={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};function x(E,H,G){var I=new DataView(E);var F={};var B,K,A,J,C;var D=H;while(D<H+G){if(I.getUint8(D)===28&&I.getUint8(D+1)===2){J=I.getUint8(D+2);if(J in a){A=I.getInt16(D+3);C=A+5;K=a[J];B=q(I,D+5,A);if(F.hasOwnProperty(K)){if(F[K] instanceof Array){F[K].push(B)}else{F[K]=[F[K],B]}}else{F[K]=B}}}D++}return F}function t(A,G,I,F,C){var D=A.getUint16(I,!C),J={},E,H,B;for(B=0;B<D;B++){E=I+B*12+2;H=F[A.getUint16(E,!C)];if(!H&&p){console.log("Unknown tag: "+A.getUint16(E,!C))}J[H]=l(A,E,G,I,C)}return J}function l(F,J,M,N,H){var I=F.getUint16(J+2,!H),L=F.getUint32(J+4,!H),B=F.getUint32(J+8,!H)+M,G,K,E,D,A,C;switch(I){case 1:case 7:if(L==1){return F.getUint8(J+8,!H)}else{G=L>4?B:(J+8);K=[];for(D=0;D<L;D++){K[D]=F.getUint8(G+D)}return K}case 2:G=L>4?B:(J+8);return q(F,G,L-1);case 3:if(L==1){return F.getUint16(J+8,!H)}else{G=L>2?B:(J+8);K=[];for(D=0;D<L;D++){K[D]=F.getUint16(G+2*D,!H)}return K}case 4:if(L==1){return F.getUint32(J+8,!H)}else{K=[];for(D=0;D<L;D++){K[D]=F.getUint32(B+4*D,!H)}return K}case 5:if(L==1){A=F.getUint32(B,!H);C=F.getUint32(B+4,!H);E=new Number(A/C);E.numerator=A;E.denominator=C;return E}else{K=[];for(D=0;D<L;D++){A=F.getUint32(B+8*D,!H);C=F.getUint32(B+4+8*D,!H);K[D]=new Number(A/C);K[D].numerator=A;K[D].denominator=C}return K}case 9:if(L==1){return F.getInt32(J+8,!H)}else{K=[];for(D=0;D<L;D++){K[D]=F.getInt32(B+4*D,!H)}return K}case 10:if(L==1){return F.getInt32(B,!H)/F.getInt32(B+4,!H)}else{K=[];for(D=0;D<L;D++){K[D]=F.getInt32(B+8*D,!H)/F.getInt32(B+4+8*D,!H)}return K}}}function m(C,D,B){var A=C.getUint16(D,!B);return C.getUint32(D+2+A*12,!B)}function j(H,G,E,D){var B=m(H,G+E,D);if(!B){return{}}else{if(B>H.byteLength){return{}}}var A=t(H,G,G+B,n,D);if(A["Compression"]){switch(A["Compression"]){case 6:if(A.JpegIFOffset&&A.JpegIFByteCount){var F=G+A.JpegIFOffset;var C=A.JpegIFByteCount;A["blob"]=new Blob([new Uint8Array(H.buffer,F,C)],{type:"image/jpeg"})}break;case 1:console.log("Thumbnail image format is TIFF, which is not implemented.");break;default:console.log("Unknown thumbnail image format '%s'",A["Compression"])}}else{if(A["PhotometricInterpretation"]==2){console.log("Thumbnail image format is RGB, which is not implemented.")}}return A}function q(B,E,C){var A="";for(var D=E;D<E+C;D++){A+=String.fromCharCode(B.getUint8(D))}return A}function u(E,B){if(q(E,B,4)!="Exif"){if(p){console.log("Not valid EXIF data! "+q(E,B,4))}return false}var F,H,I,D,C,G=B+6;if(E.getUint16(G)==18761){F=false}else{if(E.getUint16(G)==19789){F=true}else{if(p){console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)")}return false}}if(E.getUint16(G+2,!F)!=42){if(p){console.log("Not valid TIFF data! (no 0x002A)")}return false}var A=E.getUint32(G+4,!F);if(A<8){if(p){console.log("Not valid TIFF data! (First offset less than 8)",E.getUint32(G+4,!F))}return false}H=t(E,G,G+A,z,F);if(H.ExifIFDPointer){D=t(E,G,G+H.ExifIFDPointer,v,F);for(I in D){switch(I){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":D[I]=k[I][D[I]];break;case"ExifVersion":case"FlashpixVersion":D[I]=String.fromCharCode(D[I][0],D[I][1],D[I][2],D[I][3]);break;case"ComponentsConfiguration":D[I]=k.Components[D[I][0]]+k.Components[D[I][1]]+k.Components[D[I][2]]+k.Components[D[I][3]];break}H[I]=D[I]}}if(H.GPSInfoIFDPointer){C=t(E,G,G+H.GPSInfoIFDPointer,o,F);for(I in C){switch(I){case"GPSVersionID":C[I]=C[I][0]+"."+C[I][1]+"."+C[I][2]+"."+C[I][3];break}H[I]=C[I]}}H["thumbnail"]=j(E,G,A,F);return H}function d(C){if(!("DOMParser" in self)){return}var J=new DataView(C);if(p){console.log("Got file of length "+C.byteLength)}if((J.getUint8(0)!=255)||(J.getUint8(1)!=216)){if(p){console.log("Not a valid JPEG")}return false}var E=2,A=C.byteLength,F=new DOMParser();while(E<(A-4)){if(q(J,E,4)=="http"){var H=E-1;var G=J.getUint16(E-2)-1;var I=q(J,H,G);var B=I.indexOf("xmpmeta>")+8;I=I.substring(I.indexOf("<x:xmpmeta"),B);var D=I.indexOf("x:xmpmeta")+10;I=I.slice(0,D)+'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '+'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '+'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" '+'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '+'xmlns:exif="http://ns.adobe.com/exif/1.0/" '+'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" '+'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" '+'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" '+'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" '+'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '+I.slice(D);var K=F.parseFromString(I,"text/xml");return c(K)}else{E++}}}function y(C){var E={};if(C.nodeType==1){if(C.attributes.length>0){E["@attributes"]={};for(var B=0;B<C.attributes.length;B++){var F=C.attributes.item(B);E["@attributes"][F.nodeName]=F.nodeValue}}}else{if(C.nodeType==3){return C.nodeValue}}if(C.hasChildNodes()){for(var D=0;D<C.childNodes.length;D++){var H=C.childNodes.item(D);var G=H.nodeName;if(E[G]==null){E[G]=y(H)}else{if(E[G].push==null){var A=E[G];E[G]=[];E[G].push(A)}E[G].push(y(H))}}}return E}function c(G){try{var D={};if(G.children.length>0){for(var E=0;E<G.children.length;E++){var L=G.children.item(E);var C=L.attributes;for(var J in C){var K=C[J];var F=K.nodeName;var A=K.nodeValue;if(F!==undefined){D[F]=A}}var I=L.nodeName;if(typeof(D[I])=="undefined"){D[I]=y(L)}else{if(typeof(D[I].push)=="undefined"){var B=D[I];D[I]=[];D[I].push(B)}D[I].push(y(L))}}}else{D=G.textContent}return D}catch(H){console.log(H.message)}}f.enableXmp=function(){f.isXmpEnabled=true};f.disableXmp=function(){f.isXmpEnabled=false};f.getData=function(A,B){if(((self.Image&&A instanceof self.Image)||(self.HTMLImageElement&&A instanceof self.HTMLImageElement))&&!A.complete){return false}if(!i(A)){b(A,B)}else{if(B){B.call(A)}}return true};f.getTag=function(B,A){if(!i(B)){return}return B.exifdata[A]};f.getIptcTag=function(B,A){if(!i(B)){return}return B.iptcdata[A]};f.getAllTags=function(B){if(!i(B)){return{}}var A,D=B.exifdata,C={};for(A in D){if(D.hasOwnProperty(A)){C[A]=D[A]}}return C};f.getAllIptcTags=function(B){if(!i(B)){return{}}var A,D=B.iptcdata,C={};for(A in D){if(D.hasOwnProperty(A)){C[A]=D[A]}}return C};f.pretty=function(B){if(!i(B)){return""}var A,D=B.exifdata,C="";for(A in D){if(D.hasOwnProperty(A)){if(typeof D[A]=="object"){if(D[A] instanceof Number){C+=A+" : "+D[A]+" ["+D[A].numerator+"/"+D[A].denominator+"]\r\n"}else{C+=A+" : ["+D[A].length+" values]\r\n"}}else{C+=A+" : "+D[A]+"\r\n"}}}return C};f.readFromBinaryFile=function(A){return h(A)};if(typeof define==="function"&&define.amd){define("exif-js",[],function(){return f})}}.call(this));