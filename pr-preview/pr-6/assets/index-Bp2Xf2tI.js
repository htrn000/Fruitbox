var xy=Object.defineProperty;var Ey=(e,t,r)=>t in e?xy(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var te=(e,t,r)=>Ey(e,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();/*!
 * ONNX Runtime Web v1.26.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var yo=Object.defineProperty,Sy=Object.getOwnPropertyDescriptor,Ty=Object.getOwnPropertyNames,ky=Object.prototype.hasOwnProperty,Iy=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),j=(e,t)=>()=>(e&&(t=e(e=0)),t),xi=(e,t)=>{for(var r in t)yo(e,r,{get:t[r],enumerable:!0})},Cy=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Ty(t))!ky.call(e,n)&&n!==r&&yo(e,n,{get:()=>t[n],enumerable:!(i=Sy(t,n))||i.enumerable});return e},ln=e=>Cy(yo({},"__esModule",{value:!0}),e),Gi,mr,mi,il,Vc,Gc=j(()=>{Gi=new Map,mr=[],mi=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=Gi.get(e);if(i===void 0)Gi.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=mr.indexOf(e);n!==-1&&mr.splice(n,1);for(let a=0;a<mr.length;a++)if(Gi.get(mr[a]).priority<=r){mr.splice(a,0,e);return}mr.push(e)}return}throw new TypeError("not a valid backend")},il=async e=>{let t=Gi.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Vc=async e=>{let t=e.executionProviders||[],r=t.map(p=>typeof p=="string"?p:p.name),i=r.length===0?mr:r,n,a=[],s=new Set;for(let p of i){let l=await il(p);typeof l=="string"?a.push({name:p,err:l}):(n||(n=l),n===l&&s.add(p))}if(!n)throw new Error(`no available backend found. ERR: ${a.map(p=>`[${p.name}] ${p.err}`).join(", ")}`);for(let{name:p,err:l}of a)r.includes(p)&&console.warn(`removing requested execution provider "${p}" from session options because it is not available: ${l}`);let u=t.filter(p=>s.has(typeof p=="string"?p:p.name));return[n,new Proxy(e,{get:(p,l)=>l==="executionProviders"?u:Reflect.get(p,l)})]}}),Ay=j(()=>{Gc()}),Hc,zy=j(()=>{Hc="1.26.0"}),Xa,rt,Fc=j(()=>{zy(),Xa="warning",rt={wasm:{},webgl:{},webgpu:{},versions:{common:Hc},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Xa=e}},get logLevel(){return Xa}},Object.defineProperty(rt,"logLevel",{enumerable:!0})}),He,Ry=j(()=>{Fc(),He=rt}),jc,Kc,Oy=j(()=>{jc=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[3]):(n=e.dims[3],a=e.dims[2]);let s=(t==null?void 0:t.format)!==void 0?t.format:"RGB",u=t==null?void 0:t.norm,p,l;u===void 0||u.mean===void 0?p=[255,255,255,255]:typeof u.mean=="number"?p=[u.mean,u.mean,u.mean,u.mean]:(p=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(p[3]=u.mean[3])),u===void 0||u.bias===void 0?l=[0,0,0,0]:typeof u.bias=="number"?l=[u.bias,u.bias,u.bias,u.bias]:(l=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(l[3]=u.bias[3]));let f=a*n,m=0,_=f,w=f*2,v=-1;s==="RGBA"?(m=0,_=f,w=f*2,v=f*3):s==="RGB"?(m=0,_=f,w=f*2):s==="RBG"&&(m=0,w=f,_=f*2);for(let x=0;x<a;x++)for(let I=0;I<n;I++){let k=(e.data[m++]-l[0])*p[0],E=(e.data[_++]-l[1])*p[1],z=(e.data[w++]-l[2])*p[2],C=v===-1?255:(e.data[v++]-l[3])*p[3];i.fillStyle="rgba("+k+","+E+","+z+","+C+")",i.fillRect(I,x,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Kc=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,a,s;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[1],s=e.dims[3]):(n=e.dims[3],a=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",p=t==null?void 0:t.norm,l,f;p===void 0||p.mean===void 0?l=[255,255,255,255]:typeof p.mean=="number"?l=[p.mean,p.mean,p.mean,p.mean]:(l=[p.mean[0],p.mean[1],p.mean[2],255],p.mean[3]!==void 0&&(l[3]=p.mean[3])),p===void 0||p.bias===void 0?f=[0,0,0,0]:typeof p.bias=="number"?f=[p.bias,p.bias,p.bias,p.bias]:(f=[p.bias[0],p.bias[1],p.bias[2],0],p.bias[3]!==void 0&&(f[3]=p.bias[3]));let m=a*n;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let _=4,w=0,v=1,x=2,I=3,k=0,E=m,z=m*2,C=-1;u==="RGBA"?(k=0,E=m,z=m*2,C=m*3):u==="RGB"?(k=0,E=m,z=m*2):u==="RBG"&&(k=0,z=m,E=m*2),i=r.createImageData(n,a);for(let O=0;O<a*n;w+=_,v+=_,x+=_,I+=_,O++)i.data[w]=(e.data[k++]-f[0])*l[0],i.data[v]=(e.data[E++]-f[1])*l[1],i.data[x]=(e.data[z++]-f[2])*l[2],i.data[I]=C===-1?255:(e.data[C++]-f[3])*l[3]}else throw new Error("Can not access image data");return i}}),qn,Xc,Yc,Qc,Zc,Jc,My=j(()=>{_o(),qn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},a,s;typeof n.mean=="number"?a=[n.mean,n.mean,n.mean,n.mean]:a=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?s=[n.bias,n.bias,n.bias,n.bias]:s=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",p=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=r*i,f=p==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),m=4,_=0,w=1,v=2,x=3,I=0,k=l,E=l*2,z=-1;u==="RGB"&&(m=3,_=0,w=1,v=2,x=-1),p==="RGBA"?z=l*3:p==="RBG"?(I=0,E=l,k=l*2):p==="BGR"&&(E=0,k=l,I=l*2);for(let C=0;C<l;C++,_+=m,v+=m,w+=m,x+=m)f[I++]=(e[_]+s[0])/a[0],f[k++]=(e[w]+s[1])/a[1],f[E++]=(e[v]+s[2])/a[2],z!==-1&&x!==-1&&(f[z++]=(e[x]+s[3])/a[3]);return p==="RGBA"?new xt("float32",f,[1,4,r,i]):new xt("float32",f,[1,3,r,i])},Xc=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,u=t??{},p=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=p();f.width=e.width,f.height=e.height;let m=l(f);if(m!=null){let _=e.height,w=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(_=t.resizedHeight,w=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=_,u.width=w}else u.tensorFormat="RGBA",u.height=_,u.width=w;m.drawImage(e,0,0),s=m.getImageData(0,0,w,_).data}else throw new Error("Can not access image data")}else if(i){let f,m;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,m=t.resizedWidth):(f=e.height,m=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=f,u.width=m,t!==void 0){let _=p();_.width=m,_.height=f;let w=l(_);if(w!=null)w.putImageData(e,0,0),s=w.getImageData(0,0,m,f).data;else throw new Error("Can not access image data")}else s=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=p();f.width=e.width,f.height=e.height;let m=l(f);if(m!=null){let _=e.height,w=e.width;return m.drawImage(e,0,0,w,_),s=m.getImageData(0,0,w,_).data,u.height=_,u.width=w,qn(s,u)}else throw new Error("Can not access image data")}else{if(a)return new Promise((f,m)=>{let _=p(),w=l(_);if(!e||!w)return m();let v=new Image;v.crossOrigin="Anonymous",v.src=e,v.onload=()=>{_.width=v.width,_.height=v.height,w.drawImage(v,0,0,_.width,_.height);let x=w.getImageData(0,0,_.width,_.height);u.height=_.height,u.width=_.width,f(qn(x.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return qn(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},Yc=(e,t)=>{let{width:r,height:i,download:n,dispose:a}=t,s=[1,i,r,4];return new xt({location:"texture",type:"float32",texture:e,dims:s,download:n,dispose:a})},Qc=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new xt({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:a})},Zc=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new xt({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:a})},Jc=(e,t,r)=>new xt({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Br,nn,Ya,eh,Ny=j(()=>{Br=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),nn=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ya=!1,eh=()=>{if(!Ya){Ya=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Br.set("int64",BigInt64Array),nn.set(BigInt64Array,"int64")),t&&(Br.set("uint64",BigUint64Array),nn.set(BigUint64Array,"uint64")),i?(Br.set("float16",r),nn.set(r,"float16")):Br.set("float16",Uint16Array)}}}),th,rh,Dy=j(()=>{_o(),th=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},rh=(e,t)=>{switch(e.location){case"cpu":return new xt(e.type,e.data,t);case"cpu-pinned":return new xt({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new xt({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new xt({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new xt({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),xt,_o=j(()=>{Oy(),My(),Ny(),Dy(),xt=class{constructor(e,t,r){eh();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let s=Br.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let p=Br.get(e);if(p===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&p===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${p.name} as data.`);e==="uint64"||e==="int64"?s=p.from(t,BigInt):s=p.from(t)}else if(t instanceof p)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&p!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${p}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let p=typeof e[0];if(p==="string")i="string",s=e;else if(p==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${p}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let p=nn.get(e.constructor);if(p===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=p,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");n=u,this.cpuData=s,this.dataLocation="cpu"}let a=th(n);if(this.cpuData&&a!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=a}static async fromImage(e,t){return Xc(e,t)}static fromTexture(e,t){return Yc(e,t)}static fromGpuBuffer(e,t){return Qc(e,t)}static fromMLTensor(e,t){return Zc(e,t)}static fromPinnedBuffer(e,t,r){return Jc(e,t,r)}toDataURL(e){return jc(this,e)}toImageData(e){return Kc(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return rh(this,e)}}}),kt,ih=j(()=>{_o(),kt=xt}),aa,Qa,Xt,Lt,qr,Ur,nh=j(()=>{Fc(),aa=(e,t)=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.timeStamp(`${e}::ORT::${t}`)},Qa=(e,t)=>{var n;let r=((n=new Error().stack)==null?void 0:n.split(/\r\n|\r|\n/g))||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),aa("CPU",s);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},Xt=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||Qa("BEGIN",e)},Lt=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||Qa("END",e)},qr=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.time(`ORT::${e}`)},Ur=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.timeEnd(`ORT::${e}`)}}),ah,By=j(()=>{Gc(),ih(),nh(),ah=class sh{constructor(t){this.handler=t}async run(t,r,i){Xt(),qr("InferenceSession.run");let n={},a={};if(typeof t!="object"||t===null||t instanceof kt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof kt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);n[l]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,f=Object.getOwnPropertyNames(r);for(let m of this.outputNames)if(f.indexOf(m)!==-1){let _=r[m];(_===null||_ instanceof kt)&&(l=!0,s=!1,n[m]=_)}if(l){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)n[l]=null;let u=await this.handler.run(t,n,a),p={};for(let l in u)if(Object.hasOwnProperty.call(u,l)){let f=u[l];f instanceof kt?p[l]=f:p[l]=new kt(f.type,f.data,f.dims)}return Ur("InferenceSession.run"),Lt(),p}async release(){return this.handler.dispose()}static async create(t,r,i,n){Xt(),qr("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,m=0,_=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteOffset' must be an integer.");if(m<0||m>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(_=t.byteLength-m,typeof i=="number"){if(_=i,!Number.isSafeInteger(_))throw new RangeError("'byteLength' must be an integer.");if(_<=0||m+_>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-m}].`);if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(f,m,_)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,p]=await Vc(s),l=await u.createInferenceSessionHandler(a,p);return Ur("InferenceSession.create"),Lt(),new sh(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),bo,Ly=j(()=>{By(),bo=ah}),Py=j(()=>{}),qy=j(()=>{}),Uy=j(()=>{}),Wy=j(()=>{}),Vy={};xi(Vy,{InferenceSession:()=>bo,TRACE:()=>aa,TRACE_EVENT_BEGIN:()=>qr,TRACE_EVENT_END:()=>Ur,TRACE_FUNC_BEGIN:()=>Xt,TRACE_FUNC_END:()=>Lt,Tensor:()=>kt,env:()=>He,registerBackend:()=>mi});var It=j(()=>{Ay(),Ry(),Ly(),ih(),Py(),qy(),nh(),Uy(),Wy()}),wo=j(()=>{}),oh={};xi(oh,{default:()=>uh});var Za,Ja,uh,Gy=j(()=>{var e;fg(),Hr(),vo(),Za="ort-wasm-proxy-worker",Ja=((e=globalThis.self)==null?void 0:e.name)===Za,Ja&&(self.onmessage=t=>{let{type:r,in:i}=t.data;try{switch(r){case"init-wasm":$o(i.wasm).then(()=>{Po(i).then(()=>{postMessage({type:r})},n=>{postMessage({type:r,err:n})})},n=>{postMessage({type:r,err:n})});break;case"init-ep":{let{epName:n,env:a}=i;qo(a,n).then(()=>{postMessage({type:r})},s=>{postMessage({type:r,err:s})});break}case"copy-from":{let{buffer:n}=i,a=ca(n);postMessage({type:r,out:a});break}case"create":{let{model:n,options:a}=i;Uo(n,a).then(s=>{postMessage({type:r,out:s})},s=>{postMessage({type:r,err:s})});break}case"release":Wo(i),postMessage({type:r});break;case"run":{let{sessionId:n,inputIndices:a,inputs:s,outputIndices:u,options:p}=i;Vo(n,a,s,u,new Array(u.length).fill(null),p).then(l=>{l.some(f=>f[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:l},Ho([...s,...l]))},l=>{postMessage({type:r,err:l})});break}case"end-profiling":Go(i),postMessage({type:r});break;default:}}catch(n){postMessage({type:r,err:n})}}),uh=Ja?null:t=>new Worker(t??$t,{type:"module",name:Za})}),lh={};xi(lh,{default:()=>dh});async function nl(e={}){var tl,rl;var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,n=i&&((tl=self.name)==null?void 0:tl.startsWith("em-pthread"));t.mountExternalData=(o,c)=>{o.startsWith("./")&&(o=o.substring(2)),(t.Xc||(t.Xc=new Map)).set(o,c)},t.unmountExternalData=()=>{delete t.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=o=>async(...c)=>{var y;try{if(t.Yc)throw Error("Session already started");let g=t.Yc={Kd:c[0],errors:[]},T=await o(...c);if(t.Yc!==g)throw Error("Session mismatch");(y=t.dd)==null||y.flush();let A=g.errors;if(0<A.length){let N=await Promise.all(A);if(N=N.filter(W=>W),0<N.length)throw Error(N.join(`
`))}return T}finally{t.Yc=null}};t.jsepInit=(o,c)=>{if(o==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=c;let y=t.dd;t.jsepRegisterBuffer=(g,T,A,N)=>y.registerBuffer(g,T,A,N),t.jsepGetBuffer=g=>y.getBuffer(g),t.jsepCreateDownloader=(g,T,A)=>y.createDownloader(g,T,A),t.jsepOnCreateSession=g=>{y.onCreateSession(g)},t.jsepOnReleaseSession=g=>{y.onReleaseSession(g)},t.jsepOnRunStart=g=>y.onRunStart(g),t.Id=(g,T)=>{y.upload(g,T)}}else if(o==="webnn"){let y=c[0];[t.Wd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=c.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=g=>y.onRunStart(g),t.webnnOnRunEnd=y.onRunEnd.bind(y),t.webnnOnReleaseSession=g=>{y.onReleaseSession(g)},t.webnnCreateMLTensorDownloader=(g,T)=>y.createMLTensorDownloader(g,T),t.webnnRegisterMLTensor=(g,T,A,N)=>y.registerMLTensor(g,T,A,N),t.webnnCreateMLContext=g=>y.createMLContext(g),t.webnnRegisterMLConstant=(g,T,A,N,W,Q)=>y.registerMLConstant(g,T,A,N,W,t.Xc,Q),t.webnnRegisterGraphInput=y.registerGraphInput.bind(y),t.webnnIsGraphInput=y.isGraphInput.bind(y),t.webnnRegisterGraphOutput=y.registerGraphOutput.bind(y),t.webnnIsGraphOutput=y.isGraphOutput.bind(y),t.webnnCreateTemporaryTensor=y.createTemporaryTensor.bind(y),t.webnnIsGraphInputOutputTypeSupported=y.isGraphInputOutputTypeSupported.bind(y)}};let s=()=>{let o=c=>(...y)=>{let g=Tt;return y=c(...y),Tt!=g?new Promise((T,A)=>{b={resolve:T,reject:A}}):y};(()=>{for(let c of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[c]=o(t[c])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s==null||s()};var u,p,l=(o,c)=>{throw c},f=import.meta.url,m="";if(r||i){try{m=new URL(".",f).href}catch{}i&&(p=o=>{var c=new XMLHttpRequest;return c.open("GET",o,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),u=async o=>{if(D(o))return new Promise((y,g)=>{var T=new XMLHttpRequest;T.open("GET",o,!0),T.responseType="arraybuffer",T.onload=()=>{T.status==200||T.status==0&&T.response?y(T.response):g(T.status)},T.onerror=g,T.send(null)});var c=await fetch(o,{credentials:"same-origin"});if(c.ok)return c.arrayBuffer();throw Error(c.status+" : "+c.url)}}var _,w,v,x,I,k,E=console.log.bind(console),z=console.error.bind(console),C=E,O=z,M=!1,D=o=>o.startsWith("file://");function S(){Pt.buffer!=V.buffer&&Z()}if(n){let o=function(c){try{var y=c.data,g=y.Sc;if(g==="load"){let T=[];self.onmessage=A=>T.push(A),k=()=>{postMessage({Sc:"loaded"});for(let A of T)o(A);self.onmessage=o};for(let A of y.xd)t[A]&&!t[A].proxy||(t[A]=(...N)=>{postMessage({Sc:"callHandler",wd:A,args:N})},A=="print"&&(C=t[A]),A=="printErr"&&(O=t[A]));Pt=y.Od,Z(),w=y.Pd,et(),Pn()}else if(g==="run"){(function(T){var A=(S(),ie)[T+52>>>2>>>0];T=(S(),ie)[T+56>>>2>>>0],pu(A,A-T),Ee(A)})(y.Rc),Ua(y.Rc,0,0,1,0,0),_t(),ai(y.Rc),P||(au(),P=!0);try{ga(y.Md,y.bd)}catch(T){if(T!="unwind")throw T}}else y.target!=="setimmediate"&&(g==="checkMailbox"?P&&Ht():g&&(O(`worker: received unknown command ${g}`),O(y)))}catch(T){throw su(),T}};var P=!1;self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=o}var V,re,ae,J,U,ie,se,pe,Ae,Y,ve,K=!1;function Z(){var o=Pt.buffer;t.HEAP8=V=new Int8Array(o),ae=new Int16Array(o),t.HEAPU8=re=new Uint8Array(o),J=new Uint16Array(o),t.HEAP32=U=new Int32Array(o),t.HEAPU32=ie=new Uint32Array(o),se=new Float32Array(o),pe=new Float64Array(o),Ae=new BigInt64Array(o),Y=new BigUint64Array(o)}function oe(){K=!0,n?k():ur.sb()}function X(o){throw O(o="Aborted("+o+")"),M=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),I==null||I(o),o}function Se(){return{a:{ma:Lg,gb:Bg,g:cn,J:hn,f:mn,o:ee,h:ya,ha:_a,b:ht,T:Ti,Ha:Yr,n:Jt,$:Ii,Xa:Tr,Da:tt,Fa:Ci,Ya:gn,Va:Qr,Oa:yn,Ua:Zr,ka:Ai,Ea:kr,Ba:_n,Wa:bt,Ca:Ir,bb:zi,ea:cr,wa:Oi,ua:ti,da:ii,O:Ni,H:ba,va:bn,_:nr,xa:Pi,Ra:Gt,za:si,Ia:vn,sa:$n,fa:oi,Qa:ai,_a:sr,R:L,r:xn,c:ei,hb:xa,y:En,M:Ea,D:Sn,l:Sa,s:Tn,ib:Ta,I:ka,S:Ia,j:Ca,u:Aa,q:za,k:kn,La:Ra,Ma:Oa,Na:Ma,Ja:zn,Ka:Ui,ta:Rn,db:Da,ab:La,v:Pa,aa:qa,ga:ci,$a:Ba,W:Mn,Za:Nn,Aa:Dn,F:Na,U:B,la:ze,ya:vt,fb:ke,eb:gt,Sa:Ft,Ta:Bn,Ga:xr,V:eu,ja:tu,Pa:ru,ia:iu,kb:wy,na:my,lb:by,oa:fy,G:ay,d:Wg,t:qg,w:Pg,A:Zg,mb:py,K:ry,x:Hg,pa:cy,Y:gy,ba:dy,nb:ly,ob:uy,P:Jg,qa:oy,pb:sy,N:iy,Z:hy,e:Ug,B:Gg,m:Vg,jb:vy,p:jg,z:Kg,C:Fg,E:Xg,L:ey,qb:ny,Q:yy,ca:ty,X:_y,rb:Qg,ra:Yg,i:Ng,a:Pt,cb:lt}}}async function et(){function o(g,T){var A=ur=g.exports;g={};for(let[N,W]of Object.entries(A))typeof W=="function"?(A=ui(W),g[N]=A):g[N]=W;return ur=g,ur=(function(){var N=ur,W=ne=>we=>ne(we)>>>0,Q=ne=>()=>ne()>>>0;return(N=Object.assign({},N)).tb=W(N.tb),N.Xb=Q(N.Xb),N.Zb=W(N.Zb),N.lc=W(N.lc),N.mc=Q(N.mc),N.qc=W(N.qc),N})(),Sr.push(ur._b),nu=(g=ur).tb,au=g.ub,t._OrtInit=g.vb,t._OrtGetLastError=g.wb,t._OrtCreateSessionOptions=g.xb,t._OrtAppendExecutionProvider=g.yb,t._OrtAddFreeDimensionOverride=g.zb,t._OrtAddSessionConfigEntry=g.Ab,t._OrtReleaseSessionOptions=g.Bb,t._OrtCreateSession=g.Cb,t._OrtReleaseSession=g.Db,t._OrtGetInputOutputCount=g.Eb,t._OrtGetInputOutputMetadata=g.Fb,t._OrtFree=g.Gb,t._OrtCreateTensor=g.Hb,t._OrtGetTensorData=g.Ib,t._OrtReleaseTensor=g.Jb,t._OrtCreateRunOptions=g.Kb,t._OrtAddRunConfigEntry=g.Lb,t._OrtReleaseRunOptions=g.Mb,t._OrtCreateBinding=g.Nb,t._OrtBindInput=g.Ob,t._OrtBindOutput=g.Pb,t._OrtClearBoundOutputs=g.Qb,t._OrtReleaseBinding=g.Rb,t._OrtRunWithBinding=g.Sb,t._OrtRun=g.Tb,t._OrtEndProfiling=g.Ub,t._JsepOutput=g.Vb,t._JsepGetNodeName=g.Wb,Ln=g.Xb,jt=t._free=g.Yb,Wi=t._malloc=g.Zb,Ua=g.ac,su=g.bc,ou=g.cc,uu=g.dc,Wa=g.ec,lu=g.fc,du=g.gc,Ie=g.hc,Vi=g.ic,pu=g.jc,Ee=g.kc,Va=g.lc,Te=g.mc,cu=g.nc,Ga=g.oc,hu=g.pc,fu=g.qc,mu=g.rc,Ha=g.sc,gu=g.tc,yu=g.uc,_u=g.vc,bu=g.wc,wu=g.xc,vu=g.yc,$u=g.zc,xu=g.Ac,Eu=g.Bc,Su=g.Cc,Tu=g.Dc,ku=g.Ec,Iu=g.Fc,Cu=g.Gc,Au=g.Hc,zu=g.Ic,Ru=g.Jc,Ou=g.Kc,Mu=g.Lc,Nu=g.Mc,Du=g.Nc,Bu=g.Pc,Lu=g.Qc,Pu=g.$c,qu=g.ad,Uu=g.fd,Wu=g.jd,Vu=g.kd,Gu=g.ld,Hu=g.md,Fu=g.nd,ju=g.od,Ku=g.pd,Xu=g.qd,Yu=g.vd,Qu=g.Sd,Zu=g.Td,Ju=g.Ud,el=g.Vd,w=T,ur}var c,y=Se();return t.instantiateWasm?new Promise(g=>{t.instantiateWasm(y,(T,A)=>{g(o(T,A))})}):n?o(new WebAssembly.Instance(w,Se()),w):(ve??(ve=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",m):m+"ort-wasm-simd-threaded.jsep.wasm":new URL("/Fruitbox/pr-preview/pr-6/assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href),c=await(async function(g){var T=ve;if(!_&&!D(T))try{var A=fetch(T,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(A,g)}catch(N){O(`wasm streaming compile failed: ${N}`),O("falling back to ArrayBuffer instantiation")}return(async function(N,W){try{var Q=await(async function(ne){if(!_)try{var we=await u(ne);return new Uint8Array(we)}catch{}if(ne==ve&&_)ne=new Uint8Array(_);else{if(!p)throw"both async and sync fetching of the wasm failed";ne=p(ne)}return ne})(N);return await WebAssembly.instantiate(Q,W)}catch(ne){O(`failed to asynchronously prepare wasm: ${ne}`),X(ne)}})(T,g)})(y),o(c.instance,c.module))}class De{constructor(c){te(this,"name","ExitStatus");this.message=`Program terminated with exit(${c})`,this.status=c}}var Ze=o=>{o.terminate(),o.onmessage=()=>{}},Ye=[],ut=0,nt=null,Le=o=>{Ct.length==0&&(Si(),Ei(Ct[0]));var c=Ct.pop();if(!c)return 6;Er.push(c),At[o.Rc]=c,c.Rc=o.Rc;var y={Sc:"run",Md:o.Ld,bd:o.bd,Rc:o.Rc};return c.postMessage(y,o.rd),0},Be=0,me=(o,c,...y)=>{var g,T=16*y.length,A=Te(),N=Va(T),W=N>>>3;for(g of y)typeof g=="bigint"?((S(),Ae)[W++>>>0]=1n,(S(),Ae)[W++>>>0]=g):((S(),Ae)[W++>>>0]=0n,(S(),pe)[W++>>>0]=g);return o=ou(o,0,T,N,c),Ee(A),o};function lt(o){if(n)return me(0,1,o);if(v=o,!(0<Be)){for(var c of Er)Ze(c);for(c of Ct)Ze(c);Ct=[],Er=[],At={},M=!0}l(0,new De(o))}function Yt(o){if(n)return me(1,0,o);xr(o)}var xr=o=>{if(v=o,n)throw Yt(o),"unwind";lt(o)},Ct=[],Er=[],Sr=[],At={},Qt=o=>{var c=o.Rc;delete At[c],Ct.push(o),Er.splice(Er.indexOf(o),1),o.Rc=0,uu(c)};function _t(){Sr.forEach(o=>o())}var Ei=o=>new Promise(c=>{o.onmessage=T=>{var A=T.data;if(T=A.Sc,A.Zc&&A.Zc!=Ln()){var N=At[A.Zc];N?N.postMessage(A,A.rd):O(`Internal error! Worker sent a message "${T}" to target pthread ${A.Zc}, but that thread no longer exists!`)}else T==="checkMailbox"?Ht():T==="spawnThread"?Le(A):T==="cleanupThread"?Cr(()=>{Qt(At[A.Nd])}):T==="loaded"?(o.loaded=!0,c(o)):A.target==="setimmediate"?o.postMessage(A):T==="uncaughtException"?o.onerror(A.error):T==="callHandler"?t[A.wd](...A.args):T&&O(`worker sent an unknown command ${T}`)},o.onerror=T=>{throw O(`worker sent an error! ${T.filename}:${T.lineno}: ${T.message}`),T};var y,g=[];for(y of[])t.propertyIsEnumerable(y)&&g.push(y);o.postMessage({Sc:"load",xd:g,Od:Pt,Pd:w})});function Si(){var o=new Worker((()=>{let c=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new c("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Ct.push(o)}var Pt,ga=(o,c)=>{Be=0,o=Ha(o,c),0<Be?v=o:Wa(o)},jr=[],ye=0;function cn(o){var c=new St(o>>>=0);return(S(),V)[c.Tc+12>>>0]==0&&(Zt(c,!0),ye--),fn(c,!1),jr.push(c),fu(o)}var qt=0,hn=()=>{Ie(0,0);var o=jr.pop();cu(o.cd),qt=0};function Zt(o,c){c=c?1:0,(S(),V)[o.Tc+12>>>0]=c}function fn(o,c){c=c?1:0,(S(),V)[o.Tc+13>>>0]=c}class St{constructor(c){this.cd=c,this.Tc=c-24}}var Kr=o=>{var c=qt;if(!c)return Vi(0),0;var y=new St(c);(S(),ie)[y.Tc+16>>>2>>>0]=c;var g=(S(),ie)[y.Tc+4>>>2>>>0];if(!g)return Vi(0),c;for(var T of o){if(T===0||T===g)break;if(hu(T,g,y.Tc+16))return Vi(T),c}return Vi(g),c};function mn(){return Kr([])}function ee(o){return Kr([o>>>0])}function ya(o,c,y,g){return Kr([o>>>0,c>>>0,y>>>0,g>>>0])}var _a=()=>{var o=jr.pop();o||X("no exception to throw");var c=o.cd;throw(S(),V)[o.Tc+13>>>0]==0&&(jr.push(o),fn(o,!0),Zt(o,!1),ye++),Ga(c),qt=c};function ht(o,c,y){var g=new St(o>>>=0);throw c>>>=0,y>>>=0,(S(),ie)[g.Tc+16>>>2>>>0]=0,(S(),ie)[g.Tc+4>>>2>>>0]=c,(S(),ie)[g.Tc+8>>>2>>>0]=y,Ga(o),ye++,qt=o}var Ti=()=>ye;function Xr(o,c,y,g){return n?me(2,1,o,c,y,g):Yr(o,c,y,g)}function Yr(o,c,y,g){if(o>>>=0,c>>>=0,y>>>=0,g>>>=0,!globalThis.SharedArrayBuffer)return 6;var T=[];return n&&T.length===0?Xr(o,c,y,g):(o={Ld:y,Rc:o,bd:g,rd:T},n?(o.Sc="spawnThread",postMessage(o,T),0):Le(o))}function Jt(o){throw qt||(qt=o>>>0),qt}var ki=globalThis.TextDecoder&&new TextDecoder,at=(o,c,y,g)=>{if(y=c+y,g)return y;for(;o[c]&&!(c>=y);)++c;return c},er=(o,c=0,y,g)=>{if(16<(y=at(o,c>>>=0,y,g))-c&&o.buffer&&ki)return ki.decode(o.buffer instanceof ArrayBuffer?o.subarray(c,y):o.slice(c,y));for(g="";c<y;){var T=o[c++];if(128&T){var A=63&o[c++];if((224&T)==192)g+=String.fromCharCode((31&T)<<6|A);else{var N=63&o[c++];65536>(T=(240&T)==224?(15&T)<<12|A<<6|N:(7&T)<<18|A<<12|N<<6|63&o[c++])?g+=String.fromCharCode(T):(T-=65536,g+=String.fromCharCode(55296|T>>10,56320|1023&T))}}else g+=String.fromCharCode(T)}return g},Fe=(o,c,y)=>(o>>>=0)?er((S(),re),o,c,y):"";function Ii(o,c,y){return n?me(3,1,o,c,y):0}function Tr(o,c){if(n)return me(4,1,o,c)}function tt(o,c){if(n)return me(5,1,o,c)}function Ci(o,c,y){if(n)return me(6,1,o,c,y)}function gn(o,c,y){return n?me(7,1,o,c,y):0}function Qr(o,c){if(n)return me(8,1,o,c)}function yn(o,c,y){if(n)return me(9,1,o,c,y)}function Zr(o,c,y,g){if(n)return me(10,1,o,c,y,g)}function Ai(o,c,y,g){if(n)return me(11,1,o,c,y,g)}function kr(o,c,y,g){if(n)return me(12,1,o,c,y,g)}function _n(o){if(n)return me(13,1,o)}function bt(o,c){if(n)return me(14,1,o,c)}function Ir(o,c,y){if(n)return me(15,1,o,c,y)}var zi=()=>X(""),wt=o=>{o>>>=0;for(var c="";;){var y=(S(),re)[o++>>>0];if(!y)return c;c+=String.fromCharCode(y)}},Jr={},tr={},rr=class extends Error{constructor(o){super(o),this.name="BindingError"}};function ft(o,c,y={}){return(function(g,T,A={}){var N=T.name;if(!g)throw new rr(`type "${N}" must have a positive integer typeid pointer`);if(tr.hasOwnProperty(g)){if(A.yd)return;throw new rr(`Cannot register type '${N}' twice`)}tr[g]=T,Jr.hasOwnProperty(g)&&(T=Jr[g],delete Jr[g],T.forEach(W=>W()))})(o,c,y)}var Ri=(o,c,y)=>{switch(c){case 1:return y?g=>(S(),V)[g>>>0]:g=>(S(),re)[g>>>0];case 2:return y?g=>(S(),ae)[g>>>1>>>0]:g=>(S(),J)[g>>>1>>>0];case 4:return y?g=>(S(),U)[g>>>2>>>0]:g=>(S(),ie)[g>>>2>>>0];case 8:return y?g=>(S(),Ae)[g>>>3>>>0]:g=>(S(),Y)[g>>>3>>>0];default:throw new TypeError(`invalid integer width (${c}): ${o}`)}};function cr(o,c,y,g,T){o>>>=0,y>>>=0,c=wt(c>>>0);let A=N=>N;if(g=g===0n){let N=8*y;A=W=>BigInt.asUintN(N,W),T=A(T)}ft(o,{name:c,Oc:A,Vc:(N,W)=>(typeof W=="number"&&(W=BigInt(W)),W),Uc:Ri(c,y,!g),Wc:null})}function Oi(o,c,y,g){ft(o>>>=0,{name:c=wt(c>>>0),Oc:function(T){return!!T},Vc:function(T,A){return A?y:g},Uc:function(T){return this.Oc((S(),re)[T>>>0])},Wc:null})}var Mi=[],Ut=[0,1,,1,null,1,!0,1,!1,1];function ei(o){9<(o>>>=0)&&--Ut[o+1]==0&&(Ut[o]=void 0,Mi.push(o))}var mt=o=>{if(!o)throw new rr(`Cannot use deleted val. handle = ${o}`);return Ut[o]},Qe=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=Mi.pop()||Ut.length;return Ut[c]=o,Ut[c+1]=1,c}};function Pe(o){return this.Oc((S(),ie)[o>>>2>>>0])}var ir={name:"emscripten::val",Oc:o=>{var c=mt(o);return ei(o),c},Vc:(o,c)=>Qe(c),Uc:Pe,Wc:null};function ti(o){return ft(o>>>0,ir)}var ri=(o,c)=>{switch(c){case 4:return function(y){return this.Oc((S(),se)[y>>>2>>>0])};case 8:return function(y){return this.Oc((S(),pe)[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${o}`)}};function ii(o,c,y){y>>>=0,ft(o>>>=0,{name:c=wt(c>>>0),Oc:g=>g,Vc:(g,T)=>T,Uc:ri(c,y),Wc:null})}function Ni(o,c,y,g,T){o>>>=0,y>>>=0,c=wt(c>>>0);let A=W=>W;if(g===0){var N=32-8*y;A=W=>W<<N>>>N,T=A(T)}ft(o,{name:c,Oc:A,Vc:(W,Q)=>Q,Uc:Ri(c,y,g!==0),Wc:null})}function ba(o,c,y){function g(A){var N=(S(),ie)[A>>>2>>>0];return A=(S(),ie)[A+4>>>2>>>0],new T((S(),V).buffer,A,N)}var T=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];ft(o>>>=0,{name:y=wt(y>>>0),Oc:g,Uc:g},{yd:!0})}var Wt=(o,c,y)=>{var g=(S(),re);if(c>>>=0,0<y){var T=c;y=c+y-1;for(var A=0;A<o.length;++A){var N=o.codePointAt(A);if(127>=N){if(c>=y)break;g[c++>>>0]=N}else if(2047>=N){if(c+1>=y)break;g[c++>>>0]=192|N>>6,g[c++>>>0]=128|63&N}else if(65535>=N){if(c+2>=y)break;g[c++>>>0]=224|N>>12,g[c++>>>0]=128|N>>6&63,g[c++>>>0]=128|63&N}else{if(c+3>=y)break;g[c++>>>0]=240|N>>18,g[c++>>>0]=128|N>>12&63,g[c++>>>0]=128|N>>6&63,g[c++>>>0]=128|63&N,A++}}g[c>>>0]=0,o=c-T}else o=0;return o},Vt=o=>{for(var c=0,y=0;y<o.length;++y){var g=o.charCodeAt(y);127>=g?c++:2047>=g?c+=2:55296<=g&&57343>=g?(c+=4,++y):c+=3}return c};function bn(o,c){ft(o>>>=0,{name:c=wt(c>>>0),Oc(y){var g=(S(),ie)[y>>>2>>>0];return g=Fe(y+4,g,!0),jt(y),g},Vc(y,g){g instanceof ArrayBuffer&&(g=new Uint8Array(g));var T=typeof g=="string";if(!(T||ArrayBuffer.isView(g)&&g.BYTES_PER_ELEMENT==1))throw new rr("Cannot pass non-string to std::string");var A=T?Vt(g):g.length,N=Wi(4+A+1),W=N+4;return(S(),ie)[N>>>2>>>0]=A,T?Wt(g,W,A+1):(S(),re).set(g,W>>>0),y!==null&&y.push(jt,N),N},Uc:Pe,Wc(y){jt(y)}})}var Di=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,wa=(o,c,y)=>{if(o>>>=1,16<(c=at((S(),J),o,c/2,y))-o&&Di)return Di.decode((S(),J).slice(o,c));for(y="";o<c;++o){var g=(S(),J)[o>>>0];y+=String.fromCharCode(g)}return y},Bi=(o,c,y)=>{if(y??(y=2147483647),2>y)return 0;var g=c;y=(y-=2)<2*o.length?y/2:o.length;for(var T=0;T<y;++T){var A=o.charCodeAt(T);(S(),ae)[c>>>1>>>0]=A,c+=2}return(S(),ae)[c>>>1>>>0]=0,c-g},wn=o=>2*o.length,Li=(o,c,y)=>{var g="";o>>>=2;for(var T=0;!(T>=c/4);T++){var A=(S(),ie)[o+T>>>0];if(!A&&!y)break;g+=String.fromCodePoint(A)}return g},va=(o,c,y)=>{if(c>>>=0,y??(y=2147483647),4>y)return 0;var g=c;y=g+y-4;for(var T=0;T<o.length;++T){var A=o.codePointAt(T);if(65535<A&&T++,(S(),U)[c>>>2>>>0]=A,(c+=4)+4>y)break}return(S(),U)[c>>>2>>>0]=0,c-g},ni=o=>{for(var c=0,y=0;y<o.length;++y)65535<o.codePointAt(y)&&y++,c+=4;return c};function nr(o,c,y){if(o>>>=0,c>>>=0,y=wt(y>>>=0),c===2)var g=wa,T=Bi,A=wn;else g=Li,T=va,A=ni;ft(o,{name:y,Oc:N=>{var W=(S(),ie)[N>>>2>>>0];return W=g(N+4,W*c,!0),jt(N),W},Vc:(N,W)=>{if(typeof W!="string")throw new rr(`Cannot pass non-string to C++ string type ${y}`);var Q=A(W),ne=Wi(4+Q+c);return(S(),ie)[ne>>>2>>>0]=Q/c,T(W,ne+4,Q+c),N!==null&&N.push(jt,ne),ne},Uc:Pe,Wc(N){jt(N)}})}function Pi(o,c){ft(o>>>=0,{zd:!0,name:c=wt(c>>>0),Oc:()=>{},Vc:()=>{}})}function Gt(o){Ua(o>>>0,!i,1,!r,131072,!1),_t()}var Cr=o=>{if(!M)try{if(o(),!(0<Be))try{n?Ln()&&Wa(v):xr(v)}catch(c){c instanceof De||c=="unwind"||l(0,c)}}catch(c){c instanceof De||c=="unwind"||l(0,c)}},$a=!Atomics.waitAsync||((rl=globalThis.navigator)==null?void 0:rl.userAgent)&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function ai(o){o>>>=0,$a||(Atomics.waitAsync((S(),U),o>>>2,o).value.then(Ht),o+=128,Atomics.store((S(),U),o>>>2,1))}var Ht=()=>Cr(()=>{var o=Ln();o&&(ai(o),du())});function si(o,c){(o>>>=0)==c>>>0?setTimeout(Ht):n?postMessage({Zc:o,Sc:"checkMailbox"}):(o=At[o])&&o.postMessage({Sc:"checkMailbox"})}var ar=[];function vn(o,c,y,g,T){for(c>>>=0,T>>>=0,ar.length=0,y=T>>>3,g=T+g>>>3;y<g;){var A;A=(S(),Ae)[y++>>>0]?(S(),Ae)[y++>>>0]:(S(),pe)[y++>>>0],ar.push(A)}return(c?Fa[c]:Dg[o])(...ar)}var $n=()=>{Be=0};function oi(o){o>>>=0,n?postMessage({Sc:"cleanupThread",Nd:o}):Qt(At[o])}function sr(o){}var or=o=>{try{o()}catch(c){X(c)}};function ui(o){var c=(...y)=>{hr.push(o);try{return o(...y)}finally{M||(hr.pop(),Tt&&st===1&&hr.length===0&&(st=0,Be+=1,or(Zu),typeof Fibers<"u"&&Fibers.Zd()))}};return d.set(o,c),c}var st=0,Tt=null,li=0,hr=[],di=new Map,qi=new Map,d=new Map,h=0,b=null,$=[],R=o=>(function(c){if(!M){if(st===0){var y=!1,g=!1;c((T=0)=>{if(!M&&(li=T,y=!0,g)){st=2,or(()=>Ju(Tt)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),T=!1;try{var A=(function(){var Q=(S(),U)[Tt+8>>>2>>>0];return Q=qi.get(Q),Q=d.get(Q),--Be,Q()})()}catch(Q){A=Q,T=!0}var N=!1;if(!Tt){var W=b;W&&(b=null,(T?W.reject:W.resolve)(A),N=!0)}if(T&&!N)throw A}}),g=!0,y||(st=1,Tt=(function(){var T=Wi(65548),A=T+12;if((S(),ie)[T>>>2>>>0]=A,(S(),ie)[T+4>>>2>>>0]=A+65536,A=hr[0],!di.has(A)){var N=h++;di.set(A,N),qi.set(N,A)}return A=di.get(A),(S(),U)[T+8>>>2>>>0]=A,T})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),or(()=>Qu(Tt)))}else st===2?(st=0,or(el),jt(Tt),Tt=null,$.forEach(Cr)):X(`invalid state: ${st}`);return li}})(c=>{o().then(c)});function L(o){return o>>>=0,R(async()=>{var c=await mt(o);return Qe(c)})}var H=[],ge=o=>{var c=H.length;return H.push(o),c},Ue=(o,c)=>{for(var y=Array(o),g=0;g<o;++g){var T=g,A=(S(),ie)[c+4*g>>>2>>>0],N=tr[A];if(N===void 0)throw o=`parameter ${g}`,A=nu(A),c=wt(A),jt(A),new rr(`${o} has unknown type ${c}`);y[T]=N}return y},$e=(o,c,y)=>{var g=[];return o=o(g,y),g.length&&((S(),ie)[c>>>2>>>0]=Qe(g)),o},Ve={},Xe=o=>{var c=Ve[o];return c===void 0?wt(o):c};function xn(o,c,y){var[g,...T]=Ue(o,c>>>0);c=g.Vc.bind(g);var A=T.map(Q=>Q.Uc.bind(Q));o--;var N={toValue:mt};switch(o=A.map((Q,ne)=>{var we=`argFromPtr${ne}`;return N[we]=Q,`${we}(args${ne?"+"+8*ne:""})`}),y){case 0:var W="toValue(handle)";break;case 2:W="new (toValue(handle))";break;case 3:W="";break;case 1:N.getStringOrSymbol=Xe,W="toValue(handle)[getStringOrSymbol(methodName)]"}return W+=`(${o})`,g.zd||(N.toReturnWire=c,N.emval_returnValue=$e,W=`return emval_returnValue(toReturnWire, destructorsRef, ${W})`),W=`return function (handle, methodName, destructorsRef, args) {
  ${W}
  }`,y=new Function(Object.keys(N),W)(...Object.values(N)),W=`methodCaller<(${T.map(Q=>Q.name)}) => ${g.name}>`,ge(Object.defineProperty(y,"name",{value:W}))}function xa(o,c){return c>>>=0,(o=mt(o>>>0))==mt(c)}function En(o){return(o>>>=0)?(o=Xe(o),Qe(globalThis[o])):Qe(globalThis)}function Ea(o){return o=Xe(o>>>0),Qe(t[o])}function Sn(o,c){return c>>>=0,o=mt(o>>>0),c=mt(c),Qe(o[c])}function Sa(o){9<(o>>>=0)&&(Ut[o+1]+=1)}function Tn(o,c,y,g,T){return H[o>>>0](c>>>0,y>>>0,g>>>0,T>>>0)}function Ta(o,c,y,g,T){return Tn(o>>>0,c>>>0,y>>>0,g>>>0,T>>>0)}function ka(){return Qe([])}function Ia(o){o=mt(o>>>0);for(var c=Array(o.length),y=0;y<o.length;y++)c[y]=o[y];return Qe(c)}function Ca(o){return Qe(Xe(o>>>0))}function Aa(){return Qe({})}function za(o){for(var c=mt(o>>>=0);c.length;){var y=c.pop();c.pop()(y)}ei(o)}function kn(o,c,y){c>>>=0,y>>>=0,o=mt(o>>>0),c=mt(c),y=mt(y),o[c]=y}function Ra(o,c){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),c>>>=0,o=new Date(1e3*o),(S(),U)[c>>>2>>>0]=o.getUTCSeconds(),(S(),U)[c+4>>>2>>>0]=o.getUTCMinutes(),(S(),U)[c+8>>>2>>>0]=o.getUTCHours(),(S(),U)[c+12>>>2>>>0]=o.getUTCDate(),(S(),U)[c+16>>>2>>>0]=o.getUTCMonth(),(S(),U)[c+20>>>2>>>0]=o.getUTCFullYear()-1900,(S(),U)[c+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(S(),U)[c+28>>>2>>>0]=o}var In=o=>o%4==0&&(o%100!=0||o%400==0),Cn=[0,31,60,91,121,152,182,213,244,274,305,335],An=[0,31,59,90,120,151,181,212,243,273,304,334];function Oa(o,c){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),c>>>=0,o=new Date(1e3*o),(S(),U)[c>>>2>>>0]=o.getSeconds(),(S(),U)[c+4>>>2>>>0]=o.getMinutes(),(S(),U)[c+8>>>2>>>0]=o.getHours(),(S(),U)[c+12>>>2>>>0]=o.getDate(),(S(),U)[c+16>>>2>>>0]=o.getMonth(),(S(),U)[c+20>>>2>>>0]=o.getFullYear()-1900,(S(),U)[c+24>>>2>>>0]=o.getDay();var y=(In(o.getFullYear())?Cn:An)[o.getMonth()]+o.getDate()-1|0;(S(),U)[c+28>>>2>>>0]=y,(S(),U)[c+36>>>2>>>0]=-60*o.getTimezoneOffset(),y=new Date(o.getFullYear(),6,1).getTimezoneOffset();var g=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(y!=g&&o.getTimezoneOffset()==Math.min(g,y)),(S(),U)[c+32>>>2>>>0]=o}function Ma(o){o>>>=0;var c=new Date((S(),U)[o+20>>>2>>>0]+1900,(S(),U)[o+16>>>2>>>0],(S(),U)[o+12>>>2>>>0],(S(),U)[o+8>>>2>>>0],(S(),U)[o+4>>>2>>>0],(S(),U)[o>>>2>>>0],0),y=(S(),U)[o+32>>>2>>>0],g=c.getTimezoneOffset(),T=new Date(c.getFullYear(),6,1).getTimezoneOffset(),A=new Date(c.getFullYear(),0,1).getTimezoneOffset(),N=Math.min(A,T);return 0>y?(S(),U)[o+32>>>2>>>0]=+(T!=A&&N==g):0<y!=(N==g)&&(T=Math.max(A,T),c.setTime(c.getTime()+6e4*((0<y?N:T)-g))),(S(),U)[o+24>>>2>>>0]=c.getDay(),y=(In(c.getFullYear())?Cn:An)[c.getMonth()]+c.getDate()-1|0,(S(),U)[o+28>>>2>>>0]=y,(S(),U)[o>>>2>>>0]=c.getSeconds(),(S(),U)[o+4>>>2>>>0]=c.getMinutes(),(S(),U)[o+8>>>2>>>0]=c.getHours(),(S(),U)[o+12>>>2>>>0]=c.getDate(),(S(),U)[o+16>>>2>>>0]=c.getMonth(),(S(),U)[o+20>>>2>>>0]=c.getYear(),o=c.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function zn(o,c,y,g,T,A,N){return n?me(16,1,o,c,y,g,T,A,N):-52}function Ui(o,c,y,g,T,A){if(n)return me(17,1,o,c,y,g,T,A)}var Ar={},Na=()=>performance.timeOrigin+performance.now();function Rn(o,c){if(n)return me(18,1,o,c);if(Ar[o]&&(clearTimeout(Ar[o].id),delete Ar[o]),!c)return 0;var y=setTimeout(()=>{delete Ar[o],Cr(()=>lu(o,performance.timeOrigin+performance.now()))},c);return Ar[o]={id:y,Yd:c},0}function Da(o,c,y,g){o>>>=0,c>>>=0,y>>>=0,g>>>=0;var T=new Date().getFullYear(),A=new Date(T,0,1).getTimezoneOffset();T=new Date(T,6,1).getTimezoneOffset();var N=Math.max(A,T);(S(),ie)[o>>>2>>>0]=60*N,(S(),U)[c>>>2>>>0]=+(A!=T),o=(c=W=>{var Q=Math.abs(W);return`UTC${0<=W?"-":"+"}${String(Math.floor(Q/60)).padStart(2,"0")}${String(Q%60).padStart(2,"0")}`})(A),c=c(T),T<A?(Wt(o,y,17),Wt(c,g,17)):(Wt(o,g,17),Wt(c,y,17))}var Ba=()=>Date.now();function La(o,c,y){return y>>>=0,0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),o=Math.round(1e6*o),(S(),Ae)[y>>>3>>>0]=BigInt(o),0):28}var pi=[],On=(o,c)=>{pi.length=0;for(var y;y=(S(),re)[o++>>>0];){var g=y!=105;c+=(g&=y!=112)&&c%8?4:0,pi.push(y==112?(S(),ie)[c>>>2>>>0]:y==106?(S(),Ae)[c>>>3>>>0]:y==105?(S(),U)[c>>>2>>>0]:(S(),pe)[c>>>3>>>0]),c+=g?8:4}return pi};function Pa(o,c,y){return o>>>=0,c=On(c>>>0,y>>>0),Fa[o](...c)}function qa(o,c,y){return o>>>=0,c=On(c>>>0,y>>>0),Fa[o](...c)}var ci=()=>{};function Mn(o,c){return O(Fe(o>>>0,c>>>0))}var Nn=()=>{throw Be+=1,"unwind"};function Dn(){return 4294901760}var B=()=>navigator.hardwareConcurrency,F={},le=o=>{var c;return(c=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+c[1]:(c=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+c[1]:0},he=o=>{for(var c of o)(o=le(c))&&(F[o]=c)};function ke(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),he(o),F.gd=le(o[3]),F.Jd=o,F.gd}function ze(o){if(!(o=F[o>>>0]))return 0;var c;if(c=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=c[1];else if(c=/^\s+at (.*) \(.*\)$/.exec(o))o=c[1];else{if(!(c=/^(.+?)@/.exec(o)))return 0;o=c[1]}jt(ze.hd??0),c=Vt(o)+1;var y=Wi(c);return y&&Wt(o,y,c),ze.hd=y,ze.hd}function vt(o){o>>>=0;var c=(S(),re).length;if(o<=c||4294901760<o)return!1;for(var y=1;4>=y;y*=2){var g=c*(1+.2/y);g=Math.min(g,o+100663296);e:{g=(Math.min(4294901760,65536*Math.ceil(Math.max(o,g)/65536))-Pt.buffer.byteLength+65535)/65536|0;try{Pt.grow(g),Z();var T=1;break e}catch{}T=void 0}if(T)return!0}return!1}function gt(o,c,y){if(o>>>=0,c>>>=0,F.gd==o)var g=F.Jd;else(g=Error().stack.toString().split(`
`))[0]=="Error"&&g.shift(),he(g);for(var T=3;g[T]&&le(g[T])!=o;)++T;for(o=0;o<y&&g[o+T];++o)(S(),U)[c+4*o>>>2>>>0]=le(g[o+T]);return o}var ot,pt={},hi=()=>{var g;if(!ot){var o,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(((g=globalThis.navigator)==null?void 0:g.language)??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in pt)pt[o]===void 0?delete c[o]:c[o]=pt[o];var y=[];for(o in c)y.push(`${o}=${c[o]}`);ot=y}return ot};function Ft(o,c){if(n)return me(19,1,o,c);o>>>=0,c>>>=0;var y,g=0,T=0;for(y of hi()){var A=c+g;(S(),ie)[o+T>>>2>>>0]=A,g+=Wt(y,A,1/0)+1,T+=4}return 0}function Bn(o,c){if(n)return me(20,1,o,c);o>>>=0,c>>>=0;var y=hi();for(var g of((S(),ie)[o>>>2>>>0]=y.length,o=0,y))o+=Vt(g)+1;return(S(),ie)[c>>>2>>>0]=o,0}function eu(o){return n?me(21,1,o):52}function tu(o,c,y,g){return n?me(22,1,o,c,y,g):52}function ru(o,c,y,g){return n?me(23,1,o,c,y,g):70}var Mg=[null,[],[]];function iu(o,c,y,g){if(n)return me(24,1,o,c,y,g);c>>>=0,y>>>=0,g>>>=0;for(var T=0,A=0;A<y;A++){var N=(S(),ie)[c>>>2>>>0],W=(S(),ie)[c+4>>>2>>>0];c+=8;for(var Q=0;Q<W;Q++){var ne=o,we=(S(),re)[N+Q>>>0],Re=Mg[ne];we===0||we===10?((ne===1?C:O)(er(Re)),Re.length=0):Re.push(we)}T+=W}return(S(),ie)[g>>>2>>>0]=T,0}function Ng(o){return o>>>0}n||(function(){for(var o=t.numThreads-1;o--;)Si();Ye.push(async()=>{var c=(async function(){if(!n)return Promise.all(Ct.map(Ei))})();ut++,await c,--ut==0&&nt&&(c=nt,nt=null,c())})})(),n||(Pt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Z()),t.wasmBinary&&(_=t.wasmBinary),t.stackSave=()=>Te(),t.stackRestore=o=>Ee(o),t.stackAlloc=o=>Va(o),t.setValue=function(o,c,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":(S(),V)[o>>>0]=c;break;case"i16":(S(),ae)[o>>>1>>>0]=c;break;case"i32":(S(),U)[o>>>2>>>0]=c;break;case"i64":(S(),Ae)[o>>>3>>>0]=BigInt(c);break;case"float":(S(),se)[o>>>2>>>0]=c;break;case"double":(S(),pe)[o>>>3>>>0]=c;break;case"*":(S(),ie)[o>>>2>>>0]=c;break;default:X(`invalid type for setValue: ${y}`)}},t.getValue=function(o,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return(S(),V)[o>>>0];case"i16":return(S(),ae)[o>>>1>>>0];case"i32":return(S(),U)[o>>>2>>>0];case"i64":return(S(),Ae)[o>>>3>>>0];case"float":return(S(),se)[o>>>2>>>0];case"double":return(S(),pe)[o>>>3>>>0];case"*":return(S(),ie)[o>>>2>>>0];default:X(`invalid type for getValue: ${c}`)}},t.UTF8ToString=Fe,t.stringToUTF8=Wt,t.lengthBytesUTF8=Vt;var nu,au,Ln,jt,Wi,Ua,su,ou,uu,Wa,lu,du,Ie,Vi,pu,Ee,Va,Te,cu,Ga,hu,fu,mu,Ha,gu,yu,_u,bu,wu,vu,$u,xu,Eu,Su,Tu,ku,Iu,Cu,Au,zu,Ru,Ou,Mu,Nu,Du,Bu,Lu,Pu,qu,Uu,Wu,Vu,Gu,Hu,Fu,ju,Ku,Xu,Yu,Qu,Zu,Ju,el,ur,Dg=[lt,Yt,Xr,Ii,Tr,tt,Ci,gn,Qr,yn,Zr,Ai,kr,_n,bt,Ir,zn,Ui,Rn,Ft,Bn,eu,tu,ru,iu],Fa={973212:(o,c,y,g,T)=>{if(t===void 0||!t.Xc)return 1;if((o=Fe(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.Xc.get(o)))return 2;if(c=Number(c>>>0),y=Number(y>>>0),g=Number(g>>>0),c+y>o.byteLength)return 3;try{let A=o.subarray(c,c+y);switch(T){case 0:(S(),re).set(A,g>>>0);break;case 1:t.Qd?t.Qd(g,A):t.Id(g,A);break;default:return 4}return 0}catch{return 4}},974036:(o,c,y)=>{t.td(o,(S(),re).subarray(c>>>0,c+y>>>0))},974100:()=>t.Wd(),974142:o=>{t.sd(o)},974179:()=>{t.Bd()},974210:()=>{t.Cd()},974239:()=>{t.Gd()},974264:o=>t.Ad(o),974297:o=>t.Ed(o),974329:(o,c,y)=>{t.ed(Number(o),Number(c),Number(y),!0)},974392:(o,c,y)=>{t.ed(Number(o),Number(c),Number(y))},974449:()=>typeof wasmOffsetConverter<"u",974506:o=>{t.$b("Abs",o,void 0)},974557:o=>{t.$b("Neg",o,void 0)},974608:o=>{t.$b("Floor",o,void 0)},974661:o=>{t.$b("Ceil",o,void 0)},974713:o=>{t.$b("Reciprocal",o,void 0)},974771:o=>{t.$b("Sqrt",o,void 0)},974823:o=>{t.$b("Exp",o,void 0)},974874:o=>{t.$b("Erf",o,void 0)},974925:o=>{t.$b("Sigmoid",o,void 0)},974980:(o,c,y)=>{t.$b("HardSigmoid",o,{alpha:c,beta:y})},975059:o=>{t.$b("Log",o,void 0)},975110:o=>{t.$b("Sin",o,void 0)},975161:o=>{t.$b("Cos",o,void 0)},975212:o=>{t.$b("Tan",o,void 0)},975263:o=>{t.$b("Asin",o,void 0)},975315:o=>{t.$b("Acos",o,void 0)},975367:o=>{t.$b("Atan",o,void 0)},975419:o=>{t.$b("Sinh",o,void 0)},975471:o=>{t.$b("Cosh",o,void 0)},975523:o=>{t.$b("Asinh",o,void 0)},975576:o=>{t.$b("Acosh",o,void 0)},975629:o=>{t.$b("Atanh",o,void 0)},975682:o=>{t.$b("Tanh",o,void 0)},975734:o=>{t.$b("Not",o,void 0)},975785:(o,c,y)=>{t.$b("Clip",o,{min:c,max:y})},975854:o=>{t.$b("Clip",o,void 0)},975906:(o,c)=>{t.$b("Elu",o,{alpha:c})},975964:o=>{t.$b("Gelu",o,void 0)},976016:o=>{t.$b("Relu",o,void 0)},976068:(o,c)=>{t.$b("LeakyRelu",o,{alpha:c})},976132:(o,c)=>{t.$b("ThresholdedRelu",o,{alpha:c})},976202:(o,c)=>{t.$b("Cast",o,{to:c})},976260:o=>{t.$b("Add",o,void 0)},976311:o=>{t.$b("Sub",o,void 0)},976362:o=>{t.$b("Mul",o,void 0)},976413:o=>{t.$b("Div",o,void 0)},976464:o=>{t.$b("Pow",o,void 0)},976515:o=>{t.$b("Equal",o,void 0)},976568:o=>{t.$b("Greater",o,void 0)},976623:o=>{t.$b("GreaterOrEqual",o,void 0)},976685:o=>{t.$b("Less",o,void 0)},976737:o=>{t.$b("LessOrEqual",o,void 0)},976796:(o,c,y,g,T)=>{t.$b("ReduceMean",o,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},976971:(o,c,y,g,T)=>{t.$b("ReduceMax",o,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},977145:(o,c,y,g,T)=>{t.$b("ReduceMin",o,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},977319:(o,c,y,g,T)=>{t.$b("ReduceProd",o,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},977494:(o,c,y,g,T)=>{t.$b("ReduceSum",o,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},977668:(o,c,y,g,T)=>{t.$b("ReduceL1",o,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},977841:(o,c,y,g,T)=>{t.$b("ReduceL2",o,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},978014:(o,c,y,g,T)=>{t.$b("ReduceLogSum",o,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},978191:(o,c,y,g,T)=>{t.$b("ReduceSumSquare",o,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},978371:(o,c,y,g,T)=>{t.$b("ReduceLogSumExp",o,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},978551:o=>{t.$b("Where",o,void 0)},978604:(o,c,y)=>{t.$b("Transpose",o,{perm:c?Array.from((S(),U).subarray(Number(c)>>>0,Number(y)>>>0)):[]})},978728:(o,c,y,g)=>{t.$b("DepthToSpace",o,{blocksize:c,mode:Fe(y),format:g?"NHWC":"NCHW"})},978861:(o,c,y,g)=>{t.$b("DepthToSpace",o,{blocksize:c,mode:Fe(y),format:g?"NHWC":"NCHW"})},978994:(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge,fr)=>{t.$b("ConvTranspose",o,{format:Q?"NHWC":"NCHW",autoPad:c,dilations:[y],group:g,kernelShape:[T],pads:[A,N],strides:[W],wIsConst:()=>!!(S(),V)[ne>>>0],outputPadding:we?Array.from((S(),U).subarray(Number(we)>>>0,Number(Re)>>>0)):[],outputShape:qe?Array.from((S(),U).subarray(Number(qe)>>>0,Number(Ge)>>>0)):[],activation:Fe(fr)})},979427:(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge)=>{t.$b("ConvTranspose",o,{format:W?"NHWC":"NCHW",autoPad:c,dilations:Array.from((S(),U).subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:g,kernelShape:Array.from((S(),U).subarray(Number(T)>>>0,2+(Number(T)>>>0)>>>0)),pads:Array.from((S(),U).subarray(Number(A)>>>0,4+(Number(A)>>>0)>>>0)),strides:Array.from((S(),U).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!(S(),V)[Q>>>0],outputPadding:ne?Array.from((S(),U).subarray(Number(ne)>>>0,Number(we)>>>0)):[],outputShape:Re?Array.from((S(),U).subarray(Number(Re)>>>0,Number(qe)>>>0)):[],activation:Fe(Ge)})},980088:(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge,fr)=>{t.$b("ConvTranspose",o,{format:Q?"NHWC":"NCHW",autoPad:c,dilations:[y],group:g,kernelShape:[T],pads:[A,N],strides:[W],wIsConst:()=>!!(S(),V)[ne>>>0],outputPadding:we?Array.from((S(),U).subarray(Number(we)>>>0,Number(Re)>>>0)):[],outputShape:qe?Array.from((S(),U).subarray(Number(qe)>>>0,Number(Ge)>>>0)):[],activation:Fe(fr)})},980521:(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge)=>{t.$b("ConvTranspose",o,{format:W?"NHWC":"NCHW",autoPad:c,dilations:Array.from((S(),U).subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:g,kernelShape:Array.from((S(),U).subarray(Number(T)>>>0,2+(Number(T)>>>0)>>>0)),pads:Array.from((S(),U).subarray(Number(A)>>>0,4+(Number(A)>>>0)>>>0)),strides:Array.from((S(),U).subarray(Number(N)>>>0,2+(Number(N)>>>0)>>>0)),wIsConst:()=>!!(S(),V)[Q>>>0],outputPadding:ne?Array.from((S(),U).subarray(Number(ne)>>>0,Number(we)>>>0)):[],outputShape:Re?Array.from((S(),U).subarray(Number(Re)>>>0,Number(qe)>>>0)):[],activation:Fe(Ge)})},981182:(o,c)=>{t.$b("GlobalAveragePool",o,{format:c?"NHWC":"NCHW"})},981273:(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge)=>{t.$b("AveragePool",o,{format:Ge?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:g,storage_order:T,dilations:A?Array.from((S(),U).subarray(Number(A)>>>0,Number(N)>>>0)):[],kernel_shape:W?Array.from((S(),U).subarray(Number(W)>>>0,Number(Q)>>>0)):[],pads:ne?Array.from((S(),U).subarray(Number(ne)>>>0,Number(we)>>>0)):[],strides:Re?Array.from((S(),U).subarray(Number(Re)>>>0,Number(qe)>>>0)):[]})},981752:(o,c)=>{t.$b("GlobalAveragePool",o,{format:c?"NHWC":"NCHW"})},981843:(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge)=>{t.$b("AveragePool",o,{format:Ge?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:g,storage_order:T,dilations:A?Array.from((S(),U).subarray(Number(A)>>>0,Number(N)>>>0)):[],kernel_shape:W?Array.from((S(),U).subarray(Number(W)>>>0,Number(Q)>>>0)):[],pads:ne?Array.from((S(),U).subarray(Number(ne)>>>0,Number(we)>>>0)):[],strides:Re?Array.from((S(),U).subarray(Number(Re)>>>0,Number(qe)>>>0)):[]})},982322:(o,c)=>{t.$b("GlobalMaxPool",o,{format:c?"NHWC":"NCHW"})},982409:(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge)=>{t.$b("MaxPool",o,{format:Ge?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:g,storage_order:T,dilations:A?Array.from((S(),U).subarray(Number(A)>>>0,Number(N)>>>0)):[],kernel_shape:W?Array.from((S(),U).subarray(Number(W)>>>0,Number(Q)>>>0)):[],pads:ne?Array.from((S(),U).subarray(Number(ne)>>>0,Number(we)>>>0)):[],strides:Re?Array.from((S(),U).subarray(Number(Re)>>>0,Number(qe)>>>0)):[]})},982884:(o,c)=>{t.$b("GlobalMaxPool",o,{format:c?"NHWC":"NCHW"})},982971:(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge)=>{t.$b("MaxPool",o,{format:Ge?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:g,storage_order:T,dilations:A?Array.from((S(),U).subarray(Number(A)>>>0,Number(N)>>>0)):[],kernel_shape:W?Array.from((S(),U).subarray(Number(W)>>>0,Number(Q)>>>0)):[],pads:ne?Array.from((S(),U).subarray(Number(ne)>>>0,Number(we)>>>0)):[],strides:Re?Array.from((S(),U).subarray(Number(Re)>>>0,Number(qe)>>>0)):[]})},983446:(o,c,y,g,T)=>{t.$b("Gemm",o,{alpha:c,beta:y,transA:g,transB:T})},983550:o=>{t.$b("MatMul",o,void 0)},983604:(o,c,y,g)=>{t.$b("ArgMax",o,{keepDims:!!c,selectLastIndex:!!y,axis:g})},983712:(o,c,y,g)=>{t.$b("ArgMin",o,{keepDims:!!c,selectLastIndex:!!y,axis:g})},983820:(o,c)=>{t.$b("Softmax",o,{axis:c})},983883:(o,c)=>{t.$b("Concat",o,{axis:c})},983943:(o,c,y,g,T)=>{t.$b("Split",o,{axis:c,numOutputs:y,splitSizes:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},984099:o=>{t.$b("Expand",o,void 0)},984153:(o,c)=>{t.$b("Gather",o,{axis:Number(c)})},984224:(o,c)=>{t.$b("GatherElements",o,{axis:Number(c)})},984303:(o,c)=>{t.$b("GatherND",o,{batch_dims:Number(c)})},984382:(o,c,y,g,T,A,N,W,Q,ne,we)=>{t.$b("Resize",o,{antialias:c,axes:y?Array.from((S(),U).subarray(Number(y)>>>0,Number(g)>>>0)):[],coordinateTransformMode:Fe(T),cubicCoeffA:A,excludeOutside:N,extrapolationValue:W,keepAspectRatioPolicy:Fe(Q),mode:Fe(ne),nearestMode:Fe(we)})},984744:(o,c,y,g,T,A,N)=>{t.$b("Slice",o,{starts:c?Array.from((S(),U).subarray(Number(c)>>>0,Number(y)>>>0)):[],ends:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[],axes:A?Array.from((S(),U).subarray(Number(A)>>>0,Number(N)>>>0)):[]})},985008:o=>{t.$b("Tile",o,void 0)},985060:(o,c,y)=>{t.$b("InstanceNormalization",o,{epsilon:c,format:y?"NHWC":"NCHW"})},985174:(o,c,y)=>{t.$b("InstanceNormalization",o,{epsilon:c,format:y?"NHWC":"NCHW"})},985288:o=>{t.$b("Range",o,void 0)},985341:(o,c)=>{t.$b("Einsum",o,{equation:Fe(c)})},985422:(o,c,y,g,T)=>{t.$b("Pad",o,{mode:c,value:y,pads:g?Array.from((S(),U).subarray(Number(g)>>>0,Number(T)>>>0)):[]})},985565:(o,c,y,g,T,A)=>{t.$b("BatchNormalization",o,{epsilon:c,momentum:y,spatial:!!T,trainingMode:!!g,format:A?"NHWC":"NCHW"})},985734:(o,c,y,g,T,A)=>{t.$b("BatchNormalization",o,{epsilon:c,momentum:y,spatial:!!T,trainingMode:!!g,format:A?"NHWC":"NCHW"})},985903:(o,c,y)=>{t.$b("CumSum",o,{exclusive:Number(c),reverse:Number(y)})},986e3:(o,c,y)=>{t.$b("DequantizeLinear",o,{axis:c,blockSize:y})},986090:(o,c,y,g,T)=>{t.$b("GridSample",o,{align_corners:c,mode:Fe(y),padding_mode:Fe(g),format:T?"NHWC":"NCHW"})},986260:(o,c,y,g,T)=>{t.$b("GridSample",o,{align_corners:c,mode:Fe(y),padding_mode:Fe(g),format:T?"NHWC":"NCHW"})},986430:(o,c)=>{t.$b("ScatterND",o,{reduction:Fe(c)})},986515:(o,c,y,g,T,A,N,W,Q)=>{t.$b("Attention",o,{numHeads:c,isUnidirectional:y,maskFilterValue:g,scale:T,doRotary:A,qkvHiddenSizes:N?Array.from((S(),U).subarray(Number(W)>>>0,Number(W)+N>>>0)):[],pastPresentShareBuffer:!!Q})},986787:o=>{t.$b("BiasAdd",o,void 0)},986842:o=>{t.$b("BiasSplitGelu",o,void 0)},986903:o=>{t.$b("FastGelu",o,void 0)},986959:(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge,fr,ja)=>{t.$b("Conv",o,{format:Re?"NHWC":"NCHW",auto_pad:c,dilations:y?Array.from((S(),U).subarray(Number(y)>>>0,Number(g)>>>0)):[],group:T,kernel_shape:A?Array.from((S(),U).subarray(Number(A)>>>0,Number(N)>>>0)):[],pads:W?Array.from((S(),U).subarray(Number(W)>>>0,Number(Q)>>>0)):[],strides:ne?Array.from((S(),U).subarray(Number(ne)>>>0,Number(we)>>>0)):[],w_is_const:()=>!!(S(),V)[Number(qe)>>>0],activation:Fe(Ge),activation_params:fr?Array.from((S(),se).subarray(Number(fr)>>>0,Number(ja)>>>0)):[]})},987543:o=>{t.$b("Gelu",o,void 0)},987595:(o,c,y,g,T,A,N,W,Q)=>{t.$b("GroupQueryAttention",o,{numHeads:c,kvNumHeads:y,scale:g,softcap:T,doRotary:A,rotaryInterleaved:N,smoothSoftmax:W,localWindowSize:Q})},987812:(o,c,y,g)=>{t.$b("LayerNormalization",o,{axis:c,epsilon:y,simplified:!!g})},987923:(o,c,y,g)=>{t.$b("LayerNormalization",o,{axis:c,epsilon:y,simplified:!!g})},988034:(o,c,y,g,T,A)=>{t.$b("MatMulNBits",o,{k:c,n:y,accuracyLevel:g,bits:T,blockSize:A})},988161:(o,c,y,g,T,A)=>{t.$b("MultiHeadAttention",o,{numHeads:c,isUnidirectional:y,maskFilterValue:g,scale:T,doRotary:A})},988320:(o,c)=>{t.$b("QuickGelu",o,{alpha:c})},988384:(o,c,y,g,T)=>{t.$b("RotaryEmbedding",o,{interleaved:!!c,numHeads:y,rotaryEmbeddingDim:g,scale:T})},988523:(o,c,y)=>{t.$b("SkipLayerNormalization",o,{epsilon:c,simplified:!!y})},988625:(o,c,y)=>{t.$b("SkipLayerNormalization",o,{epsilon:c,simplified:!!y})},988727:(o,c,y,g)=>{t.$b("GatherBlockQuantized",o,{gatherAxis:c,quantizeAxis:y,blockSize:g})},988848:o=>{t.Fd(o)},988882:(o,c)=>t.Hd(Number(o),Number(c),t.Yc.Kd,t.Yc.errors)};function Bg(o,c,y){return R(async()=>{await t.Dd(Number(o),Number(c),Number(y))})}function Lg(){return typeof wasmOffsetConverter<"u"}function Pg(o,c,y,g){var T=Te();try{return xu(o,c,y,g)}catch(A){if(Ee(T),A!==A+0)throw A;Ie(1,0)}}function qg(o,c,y){var g=Te();try{return bu(o,c,y)}catch(T){if(Ee(g),T!==T+0)throw T;Ie(1,0)}}function Ug(o){var c=Te();try{gu(o)}catch(y){if(Ee(c),y!==y+0)throw y;Ie(1,0)}}function Wg(o,c){var y=Te();try{return Ha(o,c)}catch(g){if(Ee(y),g!==g+0)throw g;Ie(1,0)}}function Vg(o,c,y){var g=Te();try{mu(o,c,y)}catch(T){if(Ee(g),T!==T+0)throw T;Ie(1,0)}}function Gg(o,c){var y=Te();try{Eu(o,c)}catch(g){if(Ee(y),g!==g+0)throw g;Ie(1,0)}}function Hg(o,c,y,g,T,A,N){var W=Te();try{return vu(o,c,y,g,T,A,N)}catch(Q){if(Ee(W),Q!==Q+0)throw Q;Ie(1,0)}}function Fg(o,c,y,g,T,A){var N=Te();try{yu(o,c,y,g,T,A)}catch(W){if(Ee(N),W!==W+0)throw W;Ie(1,0)}}function jg(o,c,y,g){var T=Te();try{$u(o,c,y,g)}catch(A){if(Ee(T),A!==A+0)throw A;Ie(1,0)}}function Kg(o,c,y,g,T){var A=Te();try{_u(o,c,y,g,T)}catch(N){if(Ee(A),N!==N+0)throw N;Ie(1,0)}}function Xg(o,c,y,g,T,A,N){var W=Te();try{Tu(o,c,y,g,T,A,N)}catch(Q){if(Ee(W),Q!==Q+0)throw Q;Ie(1,0)}}function Yg(o,c,y,g,T,A,N){var W=Te();try{ku(o,c,y,g,T,A,N)}catch(Q){if(Ee(W),Q!==Q+0)throw Q;Ie(1,0)}}function Qg(o,c,y,g,T,A,N,W){var Q=Te();try{zu(o,c,y,g,T,A,N,W)}catch(ne){if(Ee(Q),ne!==ne+0)throw ne;Ie(1,0)}}function Zg(o,c,y,g,T){var A=Te();try{return Su(o,c,y,g,T)}catch(N){if(Ee(A),N!==N+0)throw N;Ie(1,0)}}function Jg(o,c,y){var g=Te();try{return Ru(o,c,y)}catch(T){if(Ee(g),T!==T+0)throw T;Ie(1,0)}}function ey(o,c,y,g,T,A,N,W){var Q=Te();try{Ou(o,c,y,g,T,A,N,W)}catch(ne){if(Ee(Q),ne!==ne+0)throw ne;Ie(1,0)}}function ty(o,c,y,g,T,A,N,W,Q,ne,we,Re){var qe=Te();try{Iu(o,c,y,g,T,A,N,W,Q,ne,we,Re)}catch(Ge){if(Ee(qe),Ge!==Ge+0)throw Ge;Ie(1,0)}}function ry(o,c,y,g,T,A){var N=Te();try{return Cu(o,c,y,g,T,A)}catch(W){if(Ee(N),W!==W+0)throw W;Ie(1,0)}}function iy(o,c,y){var g=Te();try{return Mu(o,c,y)}catch(T){if(Ee(g),T!==T+0)throw T;return Ie(1,0),0n}}function ny(o,c,y,g,T,A,N,W,Q){var ne=Te();try{wu(o,c,y,g,T,A,N,W,Q)}catch(we){if(Ee(ne),we!==we+0)throw we;Ie(1,0)}}function ay(o){var c=Te();try{return Nu(o)}catch(y){if(Ee(c),y!==y+0)throw y;Ie(1,0)}}function sy(o,c){var y=Te();try{return Yu(o,c)}catch(g){if(Ee(y),g!==g+0)throw g;return Ie(1,0),0n}}function oy(o){var c=Te();try{return Du(o)}catch(y){if(Ee(c),y!==y+0)throw y;return Ie(1,0),0n}}function uy(o,c,y,g){var T=Te();try{return Wu(o,c,y,g)}catch(A){if(Ee(T),A!==A+0)throw A;Ie(1,0)}}function ly(o,c,y,g,T){var A=Te();try{return Vu(o,c,y,g,T)}catch(N){if(Ee(A),N!==N+0)throw N;Ie(1,0)}}function dy(o,c,y,g,T,A){var N=Te();try{return Gu(o,c,y,g,T,A)}catch(W){if(Ee(N),W!==W+0)throw W;Ie(1,0)}}function py(o,c,y,g,T,A){var N=Te();try{return Hu(o,c,y,g,T,A)}catch(W){if(Ee(N),W!==W+0)throw W;Ie(1,0)}}function cy(o,c,y,g,T,A,N,W){var Q=Te();try{return Au(o,c,y,g,T,A,N,W)}catch(ne){if(Ee(Q),ne!==ne+0)throw ne;Ie(1,0)}}function hy(o,c,y,g,T){var A=Te();try{return Fu(o,c,y,g,T)}catch(N){if(Ee(A),N!==N+0)throw N;return Ie(1,0),0n}}function fy(o,c,y,g){var T=Te();try{return ju(o,c,y,g)}catch(A){if(Ee(T),A!==A+0)throw A;Ie(1,0)}}function my(o,c,y,g){var T=Te();try{return Ku(o,c,y,g)}catch(A){if(Ee(T),A!==A+0)throw A;Ie(1,0)}}function gy(o,c,y,g,T,A,N,W,Q,ne,we,Re){var qe=Te();try{return Xu(o,c,y,g,T,A,N,W,Q,ne,we,Re)}catch(Ge){if(Ee(qe),Ge!==Ge+0)throw Ge;Ie(1,0)}}function yy(o,c,y,g,T,A,N,W,Q,ne,we){var Re=Te();try{qu(o,c,y,g,T,A,N,W,Q,ne,we)}catch(qe){if(Ee(Re),qe!==qe+0)throw qe;Ie(1,0)}}function _y(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge,fr,ja){var $y=Te();try{Uu(o,c,y,g,T,A,N,W,Q,ne,we,Re,qe,Ge,fr,ja)}catch(Ka){if(Ee($y),Ka!==Ka+0)throw Ka;Ie(1,0)}}function by(o,c,y){var g=Te();try{return Bu(o,c,y)}catch(T){if(Ee(g),T!==T+0)throw T;Ie(1,0)}}function wy(o,c,y){var g=Te();try{return Lu(o,c,y)}catch(T){if(Ee(g),T!==T+0)throw T;Ie(1,0)}}function vy(o,c,y,g){var T=Te();try{Pu(o,c,y,g)}catch(A){if(Ee(T),A!==A+0)throw A;Ie(1,0)}}function Pn(){if(0<ut)nt=Pn;else if(n)x==null||x(t),oe();else{for(var o=Ye;0<o.length;)o.shift()(t);0<ut?nt=Pn:(t.calledRun=!0,M||(oe(),x==null||x(t)))}}return n||(ur=await et(),Pn()),t.PTR_SIZE=4,K?t:new Promise((o,c)=>{x=o,I=c})}var dh,al,Hy=j(()=>{var e,t;dh=nl,al=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),al&&nl()}),es,Ys,sl,$t,ph,Un,ol,ul,ts,ll,rs,ch,is,hh,vo=j(()=>{wo(),es=typeof location>"u"?void 0:location.origin,Ys=import.meta.url>"file:"&&import.meta.url<"file;",sl=()=>{{if(Ys){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,es).href}return import.meta.url}},$t=sl(),ph=()=>{if($t&&!$t.startsWith("blob:"))return $t.substring(0,$t.lastIndexOf("/")+1)},Un=(e,t)=>{try{let r=t??$t;return(r?new URL(e,r):new URL(e)).origin===es}catch{return!1}},ol=(e,t)=>{let r=t??$t;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},ul=(e,t)=>`${t??"./"}${e}`,ts=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},ll=async e=>(await import(e)).default,rs=(Gy(),ln(oh)).default,ch=async()=>{if(!$t)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Un($t))return[void 0,rs()];let e=await ts($t);return[e,rs(e)]},is=(Hy(),ln(lh)).default,hh=async(e,t,r,i)=>{let n=is&&!(e||t);if(n)if($t)n=Un($t)||i&&!r;else if(i&&!r)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,is];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??ol(a,t),u=r&&s&&!Un(s,t),p=u?await ts(s):s??ul(a,t);return[u?p:void 0,await ll(p)]}}}),ns,Wn,Hi,as,dl,pl,cl,$o,We,Hr=j(()=>{vo(),Wn=!1,Hi=!1,as=!1,dl=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},pl=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},cl=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},$o=async e=>{if(Wn)return Promise.resolve();if(Hi)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(as)throw new Error("previous call to 'initializeWebAssembly()' failed.");Hi=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!cl())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!pl())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=dl();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,a=typeof n=="string"?n:void 0,s=n==null?void 0:n.mjs,u=(s==null?void 0:s.href)??s,p=n==null?void 0:n.wasm,l=(p==null?void 0:p.href)??p,f=e.wasmBinary,[m,_]=await hh(u,a,r>1,!!f||!!l),w=!1,v=[];if(t>0&&v.push(new Promise(x=>{setTimeout(()=>{w=!0,x()},t)})),v.push(new Promise((x,I)=>{let k={numThreads:r};if(f)k.wasmBinary=f,k.locateFile=E=>E;else if(l||a)k.locateFile=E=>l??a+E;else if(u&&u.indexOf("blob:")!==0)k.locateFile=E=>new URL(E,u).href;else if(m){let E=ph();E&&(k.locateFile=z=>E+z)}_(k).then(E=>{Hi=!1,Wn=!0,ns=E,x(),m&&URL.revokeObjectURL(m)},E=>{Hi=!1,as=!0,I(E)})})),await Promise.race(v),w)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},We=()=>{if(Wn&&ns)return ns;throw new Error("WebAssembly is not initialized yet.")}}),Bt,sa,Ne,xo=j(()=>{Hr(),Bt=(e,t)=>{let r=We(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},sa=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,a])=>{let s=t?t+n:n;if(typeof a=="object")sa(a,s+".",r,i);else if(typeof a=="string"||typeof a=="number")i(s,a.toString());else if(typeof a=="boolean")i(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},Ne=e=>{let t=We(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let a=Number(t.getValue(n,i===4?"i32":"i64")),s=t.getValue(n+i,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),fh,Fy=j(()=>{Hr(),xo(),fh=e=>{let t=We(),r=0,i=[],n=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(n.terminate=!1);let a=0;return(e==null?void 0:e.tag)!==void 0&&(a=Bt(e.tag,i)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,a),r===0&&Ne("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&sa(e.extra,"",new WeakSet,(s,u)=>{let p=Bt(s,i),l=Bt(u,i);t._OrtAddRunConfigEntry(r,p,l)!==0&&Ne(`Can't set a run config entry: ${s} - ${u}.`)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),a}}}),hl,fl,ml,zr,gl,mh,jy=j(()=>{Hr(),xo(),hl=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},fl=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},ml=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},zr=(e,t,r,i)=>{let n=Bt(t,i),a=Bt(r,i);We()._OrtAddSessionConfigEntry(e,n,a)!==0&&Ne(`Can't set a session config entry: ${t} - ${r}.`)},gl=async(e,t,r)=>{let i=t.executionProviders;for(let n of i){let a=typeof n=="string"?n:n.name,s=[];switch(a){case"webnn":if(a="WEBNN",zr(e,"session.disable_quant_qdq","1",r),zr(e,"session.disable_qdq_constant_folding","1",r),typeof n!="string"){let m=n==null?void 0:n.deviceType;m&&zr(e,"deviceType",m,r)}break;case"webgpu":if(a="JS",typeof n!="string"){let m=n;if(m!=null&&m.preferredLayout){if(m.preferredLayout!=="NCHW"&&m.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${m.preferredLayout}`);zr(e,"preferredLayout",m.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let u=Bt(a,r),p=s.length,l=0,f=0;if(p>0){l=We()._malloc(p*We().PTR_SIZE),r.push(l),f=We()._malloc(p*We().PTR_SIZE),r.push(f);for(let m=0;m<p;m++)We().setValue(l+m*We().PTR_SIZE,s[m][0],"*"),We().setValue(f+m*We().PTR_SIZE,s[m][1],"*")}await We()._OrtAppendExecutionProvider(e,u,l,f,p)!==0&&Ne(`Can't append execution provider: ${a}.`)}},mh=async e=>{let t=We(),r=0,i=[],n=e||{};ml(n);try{let a=hl(n.graphOptimizationLevel??"all"),s=fl(n.executionMode??"sequential"),u=typeof n.logId=="string"?Bt(n.logId,i):0,p=n.logSeverityLevel??2;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log severity level is not valid: ${p}`);let l=n.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let f=typeof n.optimizedModelFilePath=="string"?Bt(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(a,!!n.enableCpuMemArena,!!n.enableMemPattern,s,!!n.enableProfiling,0,u,p,l,f),r===0&&Ne("Can't create session options."),n.executionProviders&&await gl(r,n,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);zr(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[m,_]of Object.entries(n.freeDimensionOverrides)){if(typeof m!="string")throw new Error(`free dimension override name must be a string: ${m}`);if(typeof _!="number"||!Number.isInteger(_)||_<0)throw new Error(`free dimension override value must be a non-negative integer: ${_}`);let w=Bt(m,i);t._OrtAddFreeDimensionOverride(r,w,_)!==0&&Ne(`Can't set a free dimension override: ${m} - ${_}.`)}return n.extra!==void 0&&sa(n.extra,"",new WeakSet,(m,_)=>{zr(r,m,_,i)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&Ne("Can't release session options."),i.forEach(s=>t._free(s)),a}}}),Lr,dr,Pr,ma,oa,Eo,So,Qs,fe=j(()=>{Lr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},dr=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Pr=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,a)=>n*a,1);return r>0?Math.ceil(i*r):void 0},ma=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},oa=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Eo=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",So=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Qs=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),To,gh=j(()=>{wo(),To=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),a;try{a=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let p=Math.ceil(i/65536);a=new WebAssembly.Memory({initial:p,maximum:p}).buffer}else throw u}let s=0;for(;;){let{done:u,value:p}=await n.read();if(u)break;let l=p.byteLength;new Uint8Array(a,s,l).set(p),s+=l}return new Uint8Array(a,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),yl,_l,bl,wl,ko,vl,Ce,pr=j(()=>{fe(),yl=["V","I","W","E","F"],_l=(e,t)=>{console.log(`[${yl[e]},${new Date().toISOString()}]${t}`)},ko=(e,t)=>{bl=e,wl=t},vl=(e,t)=>{let r=oa(e),i=oa(bl);r>=i&&_l(r,typeof t=="function"?t():t)},Ce=(...e)=>{wl&&vl(...e)}}),$l,bi,q,ua,yh,_h,bh,_e=j(()=>{$l=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},bi=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(r){if(i<2||n<2)return;let u=$l.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=r?3:1;u<=a;u++){let p=i-u<0?1:e[i-u],l=n-u<0?1:t[n-u];if(p!==l&&p>1&&l>1)return;let f=Math.max(p,l);if(p&&l)s[a-u]=Math.max(p,l);else{if(f>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},q=class ra{static size(t){return ra.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),a=i-1;for(;a>=0;){if(t[a]%r===0){n[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");n[a]=1,r/=t[a],a--}for(a--;a>=0;a--)n[a]=t[a];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return ra.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return ra.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let a=r;a<i;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[a])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,a)=>n+r[a]+r[a+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},ua=class an{static adjustPoolAttributes(t,r,i,n,a,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=i[u]||s[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,a,s,u){if(u){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let p=0;p<t.length-2;p++)an.adjustPadAndReturnShape(t[p+(s?1:2)],r[p],i[p],n[p],a,p,p+t.length-2,u)}}static computePoolOutputShape(t,r,i,n,a,s,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let p=[r[0],r[1]];return an.computeShapeHelper(t,r,p,i,n,a,s,u),p}static computeConvOutputShape(t,r,i,n,a,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let p=[t[0],r[0]];return an.computeShapeHelper(!1,t,p,i,n,a,s,u),p}static computeShapeHelper(t,r,i,n,a,s,u,p){if(t)for(let l=0;l<r.length-2;l++)i.push(1);else for(let l=0;l<r.length-2;l++)i.push(an.adjustPadAndReturnShape(r[l+2],n[l],a[l],s[l],u,l,l+r.length-2,p))}static adjustPadAndReturnShape(t,r,i,n,a,s,u,p){let l=i*(n-1)+1;if(p&&p!=="NOTSET")switch(p){case"VALID":return a[s]=0,a[u]=0,Math.floor((t-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((t+r-1)/r-1)*r+n-t;return a[s]=Math.floor(p==="SAME_LOWER"?(f+1)/2:f/2),a[u]=f-a[s],Math.floor((t+f-n)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[u]-l)/r+1)}},yh=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let a,s,u;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let p=-1;if(i?(u=r[0],p=1):(u=r[1],p=0),r[p]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(n&&!bi.isValidBroadcast(n,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},_h=-34028234663852886e22,bh=34028234663852886e22}),Io,wh=j(()=>{fe(),Io=(e,t)=>new(ma(t))(e)}),ss,Zs,os,xl,us,El,ls,ds,ps,Sl,vh,Ky=j(()=>{fe(),pr(),ss=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Zs=(e,t)=>{if(t==="int32")return e;let r=ss.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,a=new(ma(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let s=new Int32Array(n);for(let u=0;u<n;u++){let p=a[u];if(p>2147483647n||p<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(p)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},os=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},xl=1,us=()=>xl++,El=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),ls=(e,t)=>{let r=ss.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},ds=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return ls(this.dataType,this.tensorShape)}destroy(){Ce("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=os(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},ps=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!(a!=null&&a.input.dataTypes.includes(t))){if(s=El.get(t),!s||(a==null?void 0:a.input.dataTypes.includes(s)))throw new Error(`WebNN backend does not support data type: ${t}`);Ce("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==ls(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Zs(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else Ce("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,r;if(this.activeUpload){let i=(t=this.wrapper)!=null&&t.isDataConverted?os(this.activeUpload,(r=this.wrapper)==null?void 0:r.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(i):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(i);return}else return i.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Sl=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=us();return this.tensorTrackersById.set(e,new ps(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){Ce("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){Ce("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),a=us(),s=new ds({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(a,new ps(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,r,i,n,a,s){let u=this.getMLContext(e);for(let[l,f]of this.freeTensors.entries())if(f.canReuseTensor(u,t,r)){Ce("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let m=this.freeTensors.splice(l,1)[0];return m.sessionId=e,m}Ce("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let p=await u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:n,readable:a});return new ds({sessionId:e,context:u,tensor:p,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},vh=(...e)=>new Sl(...e)}),Fi,Tl,$h,Xy=j(()=>{fe(),Hr(),wh(),Ky(),pr(),Fi=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Tl=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,a)=>n===i[a]&&e[n]===t[n])},$h=class{constructor(e){this.tensorManager=vh(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,ko(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){Ce("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){Ce("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)Ce("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Tl(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){Ce("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let a=Fi.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,i,n)}async createTemporaryTensor(e,t,r){Ce("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=Fi.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!We().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");Ce("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Io(r,t)}}registerMLTensor(e,t,r,i){let n=Fi.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.registerTensor(e,t,n,i);return Ce("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,r,i,n,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let p=a.get(u);if(!p)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>p.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=p.slice(t,t+r).buffer,f;switch(n.dataType){case"float32":f=new Float32Array(l);break;case"float16":f=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(l):new Uint16Array(l);break;case"int32":f=new Int32Array(l);break;case"uint32":f=new Uint32Array(l);break;case"int64":if(s){let m=Zs(new Uint8Array(l),"int64");f=new Int32Array(m.buffer),n.dataType="int32"}else f=new BigInt64Array(l);break;case"uint64":f=new BigUint64Array(l);break;case"int8":f=new Int8Array(l);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return Ce("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(n,f)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=Fi.get(Lr(t)),n=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!(n!=null&&n.input.dataTypes.includes(i)):!!(n!=null&&n.output.dataTypes.includes(i))}flush(){}}}),Co=j(()=>{}),cs,Vn,Gn,kl,Il,hs,Js,Cl,xh,Yy=j(()=>{pr(),Co(),cs=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Vn=[],Gn=e=>Math.ceil(Number(e)/16)*16,kl=e=>{for(let t=0;t<Vn.length;t++){let r=Vn[t];if(e<=r)return r}return Math.ceil(e/16)*16},Il=1,hs=()=>Il++,Js=async(e,t,r,i)=>{let n=Gn(r),a=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,n),e.flush(),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange();if(i){let p=i();return p.set(new Uint8Array(u,0,r)),p}else return new Uint8Array(u.slice(0,r))}finally{a.destroy()}},Cl=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of cs)Vn.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,a=Gn(n),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${n}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),p=u.getMappedRange();new Uint8Array(p).set(new Uint8Array(r,i,n)),u.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([l.finish()]),u.destroy(),Ce("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Gn(r.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return Ce("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=hs();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),Ce("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),Ce("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=kl(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||a){let u=(n?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:hs(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),Ce("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return Ce("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Js(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=cs.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(Ce("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},xh=(...e)=>new Cl(...e)}),Al,Me,Ke=j(()=>{Al=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Me=e=>new Al(e)}),wi,Hn,Je,dt,ce,je,eo,gi,vr,de,ji,G,ue,Eh,Ao,zl,Sh,be=j(()=>{fe(),_e(),wi=64,Hn=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Je=(e,t=1)=>{let r=Hn(e,t);return typeof r=="string"?r:r[0]},dt=(e,t=1)=>{let r=Hn(e,t);return typeof r=="string"?r:r[1]},ce=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:q.computeStrides(r)})}),t},je=e=>e%4===0?4:e%2===0?2:1,eo=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,gi=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,vr=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,de=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,ji=(e,t,r,i,n)=>{let a=typeof r=="number",s=a?r:r.length,u=[...new Array(s).keys()],p=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=Hn(t,n),f=typeof l=="string"?l:l[1],m=typeof l=="string"?l:l[0],_={indices:p,value:f,storage:m,tensor:t},w=K=>typeof K=="string"?K:`${K}u`,v={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},x=a?"uniforms.":"",I=`${x}${e}_shape`,k=`${x}${e}_strides`,E="";for(let K=0;K<s-1;K++)E+=`
    let dim${K} = current / ${de(k,K,s)};
    let rest${K} = current % ${de(k,K,s)};
    indices[${K}] = dim${K};
    current = rest${K};
    `;E+=`indices[${s-1}] = current;`;let z=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${_.indices} {
    var indices: ${_.indices};
    var current = offset;
    ${E}
    return indices;
  }`,C=K=>(v.offsetToIndices=!0,s<2?K:`o2i_${e}(${K})`),O=[];if(s>=2)for(let K=s-1;K>=0;K--)O.push(`${de(k,K,s)} * (indices[${K}])`);let M=s<2?"":`
  fn i2o_${e}(indices: ${_.indices}) -> u32 {
    return ${O.join("+")};
  }`,D=K=>(v.indicesToOffset=!0,s<2?K:`i2o_${e}(${K})`),S=(...K)=>s===0?"0u":`${_.indices}(${K.map(w).join(",")})`,P=(K,Z)=>s<2?`${K}`:`${de(K,Z,s)}`,V=(K,Z,oe)=>s<2?`${K}=${oe};`:`${de(K,Z,s)}=${oe};`,re={},ae=(K,Z)=>{v.broadcastedIndicesToOffset=!0;let oe=`${Z.name}broadcastedIndicesTo${e}Offset`;if(oe in re)return`${oe}(${K})`;let X=[];for(let Se=s-1;Se>=0;Se--){let et=Z.indicesGet("outputIndices",Se+Z.rank-s);X.push(`${P(k,Se)} * (${et} % ${P(I,Se)})`)}return re[oe]=`fn ${oe}(outputIndices: ${Z.type.indices}) -> u32 {
             return ${X.length>0?X.join("+"):"0u"};
           }`,`${oe}(${K})`},J=(K,Z)=>(()=>{if(_.storage===_.value)return`${e}[${K}]=${Z};`;if(_.storage==="vec2<u32>"&&_.value==="i32")return`${e}[${K}]=vec2<u32>(u32(${Z}), select(0u, 0xFFFFFFFFu, ${Z} < 0));`;if(_.storage==="vec2<u32>"&&_.value==="u32")return`${e}[${K}]=vec2<u32>(u32(${Z}), 0u);`;if(_.storage==="u32"&&_.value==="vec4<bool>")return`${e}[${K}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${Z}));`;throw new Error(`not supported combination of storage type ${_.storage} and value type ${_.value} yet`)})(),U=K=>(()=>{if(_.storage===_.value)return`${e}[${K}]`;if(_.storage==="vec2<u32>"&&_.value==="i32")return`i32(${e}[${K}].x)`;if(_.storage==="vec2<u32>"&&_.value==="u32")return`u32(${e}[${K}].x)`;if(_.storage==="u32"&&_.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${K}] & 0xFFu), bool(${e}[${K}] & 0xFF00u), bool(${e}[${K}] & 0xFF0000u), bool(${e}[${K}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${_.storage} and value type ${_.value} yet`)})(),ie=s<2?"":`
  fn get_${e}ByIndices(indices: ${_.indices}) -> ${f} {
    return ${U(`i2o_${e}(indices)`)};
  }`,se=s<2?"":(()=>{let K=u.map(oe=>`d${oe}: u32`).join(", "),Z=u.map(oe=>`d${oe}`).join(", ");return`
  fn get_${e}(${K}) -> ${f} {
    return get_${e}ByIndices(${S(Z)});
  }`})(),pe=(...K)=>{if(K.length!==s)throw new Error(`indices length must be ${s}`);let Z=K.map(w).join(",");return s===0?U("0u"):s===1?U(Z[0]):(v.get=!0,v.getByIndices=!0,v.indicesToOffset=!0,`get_${e}(${Z})`)},Ae=K=>s<2?U(K):(v.getByIndices=!0,v.indicesToOffset=!0,`get_${e}ByIndices(${K})`),Y=s<2?"":`
  fn set_${e}ByIndices(indices: ${_.indices}, value: ${f}) {
    ${J(`i2o_${e}(indices)`,"value")}
  }`,ve=s<2?"":(()=>{let K=u.map(oe=>`d${oe}: u32`).join(", "),Z=u.map(oe=>`d${oe}`).join(", ");return`
  fn set_${e}(${K}, value: ${f}) {
    set_${e}ByIndices(${S(Z)}, value);
  }`})();return{impl:()=>{let K=[],Z=!1;return v.offsetToIndices&&(K.push(z),Z=!0),v.indicesToOffset&&(K.push(M),Z=!0),v.broadcastedIndicesToOffset&&(Object.values(re).forEach(oe=>K.push(oe)),Z=!0),v.set&&(K.push(ve),Z=!0),v.setByIndices&&(K.push(Y),Z=!0),v.get&&(K.push(se),Z=!0),v.getByIndices&&(K.push(ie),Z=!0),!a&&Z&&K.unshift(`const ${I} = ${_.indices}(${r.join(",")});`,`const ${k} = ${_.indices}(${q.computeStrides(r).join(",")});`),K.join(`
`)},type:_,offsetToIndices:C,indicesToOffset:D,broadcastedIndicesToOffset:ae,indices:S,indicesGet:P,indicesSet:V,set:(...K)=>{if(K.length!==s+1)throw new Error(`indices length must be ${s}`);let Z=K[s];if(typeof Z!="string")throw new Error("value must be string");let oe=K.slice(0,s).map(w).join(",");return s===0?J("0u",Z):s===1?J(oe[0],Z):(v.set=!0,v.setByIndices=!0,v.indicesToOffset=!0,`set_${e}(${oe}, ${Z})`)},setByOffset:J,setByIndices:(K,Z)=>s<2?J(K,Z):(v.setByIndices=!0,v.indicesToOffset=!0,`set_${e}ByIndices(${K}, ${Z});`),get:pe,getByOffset:U,getByIndices:Ae,usage:i,name:e,strides:k,shape:I,rank:s}},G=(e,t,r,i=1)=>ji(e,t,r,"input",i),ue=(e,t,r,i=1)=>ji(e,t,r,"output",i),Eh=(e,t,r)=>ji(e,t,r,"atomicOutput",1),Ao=(e,t,r,i=1)=>ji(e,t,r,"internal",i),zl=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=wi){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Sh=(e,t)=>new zl(e,t)}),Rl,fs,Ol,Ml,Nl,Dl,Et,Th,kh,$r=j(()=>{fe(),_e(),Ke(),be(),Rl=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},fs=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Ol=(e,t)=>q.sortBasedOnPerm(e,fs(e.length,t)),Ml=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)n+=`a[${e[a]}]=i[${a}];`;return n+="return a;}"},Nl=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},Dl=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Et=(e,t)=>{let r=e.dataType,i=e.dims.length,n=fs(i,t),a=Ol(e.dims,n),s=e.dims,u=a,p=i<2||Dl(n,e.dims),l;if(p)return l=v=>{let x=G("input",r,s,4),I=ue("output",r,u,4);return`
  ${v.registerUniform("output_size","u32").declareVariables(x,I)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let v=q.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(v/64/4)},programUniforms:[{type:12,data:Math.ceil(v/4)}]}},getShaderSource:l};let{newShape:f,newPerm:m}=Nl(e.dims,n),_=q.areEqual(m,[2,3,1]),w=q.areEqual(m,[3,1,2]);if(f.length===2||_||w){s=_?[f[0],f[1]*f[2]]:w?[f[0]*f[1],f[2]]:f,u=[s[1],s[0]];let v=16;return l=x=>{let I=G("a",r,s.length),k=ue("output",r,u.length);return`
  ${x.registerUniform("output_size","u32").declareVariables(I,k)}
  var<workgroup> tile : array<array<${k.type.value}, ${v+1}>, ${v}>;
  ${x.mainStart([v,v,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${v} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${v}u + local_id.x;
    let input_row = workgroup_id_x * ${v}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${I.getByIndices(`${I.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${v}u + local_id.x;
    let output_row = workgroup_id_y * ${v}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${k.setByIndices(`${k.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let x=q.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/v),y:Math.ceil(u[0]/v)},programUniforms:[{type:12,data:x},...ce(s,u)]}},getShaderSource:l}}return l=v=>{let x=G("a",r,s.length),I=ue("output",r,u.length);return`
  ${v.registerUniform("output_size","u32").declareVariables(x,I)}

  ${Ml(n,i,x,I)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${I.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${I.setByOffset("global_idx",x.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let v=q.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:[{type:12,data:v},...ce(s,u)]}},getShaderSource:l}},Th=(e,t)=>{Rl(e.inputs,t.perm),e.compute(Et(e.inputs[0],t.perm))},kh=e=>Me({perm:e.perm})}),Bl,Ll,Pl,ql,Ul,Wl,Vl,Gl,Hl,Fl,zt,Ih,Ch,Ah,zh,Rh,Oh,Mh,Nh,Dh,Bh,Qy=j(()=>{fe(),_e(),be(),zo(),$r(),Bl={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Ll={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Pl={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},ql={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Ul=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},Wl=(e,t)=>{let r=[],i=e.length;for(let a=0;a<i;a++)t.indexOf(a)===-1&&r.push(e[a]);let n=t.map(a=>e[a]);return[r,n]},Vl=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?i.push(e[n++]):i.push(1);return i},Gl=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Hl=(e,t)=>{let r=[];if(!Gl(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},Fl=(e,t,r,i,n,a,s)=>{let u=r[0].dims,p=q.size(a),l=q.size(s),f=G("_A",r[0].dataType,u),m=ue("output",n,a),_=64;p===1&&(_=256);let w=`
          var<workgroup> aBestValues : array<f32, ${_}>;
       `,v=x=>`
        ${x.registerUniform("reduceSize","u32").declareVariables(f,m)}
        ${w}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${x.mainStart(_)}

          let outputIndex = global_idx / ${_};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Pl[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${_}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${Bl[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${_}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Ll[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${i==="mean"?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${ql[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${_}`,inputDependencies:["type"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:p},programUniforms:[{type:12,data:l}]})}},zt=(e,t,r,i)=>{let n=e.inputs.length===1?r:to(e.inputs,r),a=n.axes;a.length===0&&!n.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((w,v)=>v));let s=q.normalizeAxes(a,e.inputs[0].dims.length),u=s,p=e.inputs[0],l=Hl(u,e.inputs[0].dims.length);l.length>0&&(p=e.compute(Et(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],u=Ul(u.length,p.dims.length));let[f,m]=Wl(p.dims,u),_=f;n.keepDims&&(_=Vl(f,s)),e.compute(Fl(t,n.cacheKey,[p],i,e.inputs[0].dataType,_,m),{inputs:[p]})},Ih=(e,t)=>{zt(e,"ReduceMeanShared",t,"mean")},Ch=(e,t)=>{zt(e,"ReduceL1Shared",t,"l1")},Ah=(e,t)=>{zt(e,"ReduceL2Shared",t,"l2")},zh=(e,t)=>{zt(e,"ReduceLogSumExpShared",t,"logSumExp")},Rh=(e,t)=>{zt(e,"ReduceMaxShared",t,"max")},Oh=(e,t)=>{zt(e,"ReduceMinShared",t,"min")},Mh=(e,t)=>{zt(e,"ReduceProdShared",t,"prod")},Nh=(e,t)=>{zt(e,"ReduceSumShared",t,"sum")},Dh=(e,t)=>{zt(e,"ReduceSumSquareShared",t,"sumSquare")},Bh=(e,t)=>{zt(e,"ReduceLogSumShared",t,"logSum")}}),Rt,jl,la,to,Ot,Kl,Xl,Yl,Ql,Zl,Jl,ed,td,rd,id,Mt,Lh,Ph,qh,Uh,Wh,Vh,Gh,Hh,Fh,jh,zo=j(()=>{fe(),_e(),Ke(),be(),Qy(),Rt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},jl=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],la=(e,t,r,i,n,a,s=!1,u=!1)=>{let p=[],l=r[0].dims,f=l.length,m=q.normalizeAxes(n,f),_=!u&&m.length===0;l.forEach((x,I)=>{_||m.indexOf(I)>=0?s&&p.push(1):p.push(x)});let w=p.length,v=q.size(p);return{name:e,shaderCache:t,getShaderSource:x=>{let I=[],k=G("_A",r[0].dataType,f),E=ue("output",a,w),z=i(k,E,m),C=z[2];for(let O=0,M=0;O<f;O++)_||m.indexOf(O)>=0?(s&&M++,C=`for(var j${O}: u32 = 0; j${O} < ${l[O]}; j${O}++) {
                  ${z[2].includes("last_index")?`let last_index = j${O};`:""}
                  ${k.indicesSet("input_indices",O,`j${O}`)}
                  ${C}
                }`):(I.push(`${k.indicesSet("input_indices",O,E.indicesGet("output_indices",M))};`),M++);return`

        ${x.registerUniform("output_size","u32").declareVariables(k,E)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${k.type.indices};
          let output_indices = ${E.offsetToIndices("global_idx")};

          ${I.join(`
`)}
          ${z[0]}       // init ops for reduce max/min
          ${z[1]}
          ${C}
          ${z[3]}
          ${z.length===4?E.setByOffset("global_idx","value"):z.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:p,dataType:a}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:[{type:12,data:v},...ce(l,p)]})}},to=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),Me({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ot=(e,t,r,i)=>{let n=e.inputs,a=n.length===1?r:to(n,r);e.compute(la(t,{hint:a.cacheKey,inputDependencies:["rank"]},[n[0]],a.noopWithEmptyAxes&&a.axes.length===0?jl:i,a.axes,n[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},Kl=(e,t)=>{Rt(e.inputs),Ot(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},Xl=(e,t)=>{Rt(e.inputs),Ot(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},Yl=(e,t)=>{Rt(e.inputs),Ot(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Ql=(e,t)=>{Rt(e.inputs),Ot(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},Zl=(e,t)=>{Rt(e.inputs),Ot(e,"ReduceMax",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(r.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},Jl=(e,t)=>{Rt(e.inputs),Ot(e,"ReduceMean",t,(r,i,n)=>{let a=1;for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${a});`]})},ed=(e,t)=>{Rt(e.inputs),Ot(e,"ReduceMin",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},td=(e,t)=>{Rt(e.inputs),Ot(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},rd=(e,t)=>{Rt(e.inputs),Ot(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},id=(e,t)=>{Rt(e.inputs),Ot(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Mt=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?i*=e[a]:n*=e[a];return n<32&&i>1024},Lh=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Jl(e,t):Ih(e,t)},Ph=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xl(e,t):Ch(e,t)},qh=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yl(e,t):Ah(e,t)},Uh=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ql(e,t):zh(e,t)},Wh=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zl(e,t):Rh(e,t)},Vh=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ed(e,t):Oh(e,t)},Gh=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?td(e,t):Mh(e,t)},Hh=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rd(e,t):Nh(e,t)},Fh=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?id(e,t):Dh(e,t)},jh=(e,t)=>{Mt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Kl(e,t):Bh(e,t)}}),ms,Kh,Xh,ro,Zy=j(()=>{fe(),Ke(),zo(),ms=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Kh=(e,t)=>{ms(e.inputs);let r=(i,n,a)=>{let s=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(la("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Xh=(e,t)=>{ms(e.inputs);let r=(i,n,a)=>{let s=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(la("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ro=e=>Me(e)}),nd,Fn,ad,sd,od,dn,ud,Yh,Ro=j(()=>{fe(),_e(),Co(),be(),nd=(e,t)=>{let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let p=r.dims[0],l=r.dims[1],f=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let m=n.dims[0]/3,_=m,w=_;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let z of t.qkvHiddenSizes)if(z%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");m=t.qkvHiddenSizes[0],_=t.qkvHiddenSizes[1],w=t.qkvHiddenSizes[2]}let v=l;if(m!==_)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==m+_+w)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let x=0;if(s){if(_!==w)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==p)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==_/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(x=s.dims[3])}let I=v+x,k=-1,E=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==l||u.dims[3]!==I)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:l,pastSequenceLength:x,kvSequenceLength:v,totalSequenceLength:I,maxSequenceLength:k,inputHiddenSize:f,hiddenSize:m,vHiddenSize:w,headSize:Math.floor(m/t.numHeads),vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:E,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Fn=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,ad=(e,t,r,i,n,a,s,u)=>{let p=je(s?1:a),l=64,f=a/p;f<l&&(l=32);let m=Math.ceil(a/p/l),_=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:f},{type:12,data:m}],w=Je(e.dataType,p),v=dt(1,p),x=["type"];s&&x.push("type"),u&&x.push("type");let I=k=>{let E=ue("x",e.dataType,e.dims,p),z=[E],C=s?G("seq_lens",s.dataType,s.dims):void 0;C&&z.push(C);let O=u?G("total_sequence_length_input",u.dataType,u.dims):void 0;O&&z.push(O);let M=dt(e.dataType),D=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${k.registerUniforms(D).declareVariables(...z)}
  ${k.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Fn(C,O,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${v}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${v}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(p){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${p}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${v}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${v}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(p){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${p}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${E.type.value}(${M}(1.0) / ${M}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${v}(x[offset + i]);
        x[offset + i] = ${E.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${E.type.value}(${M}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${w};${p}`,inputDependencies:x},getShaderSource:I,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:_})}},sd=(e,t,r,i,n,a,s,u,p)=>{let l=s+a.kvSequenceLength,f=[a.batchSize,a.numHeads,a.sequenceLength,l],m=e>1&&i,_=a.kvNumHeads?a.kvNumHeads:a.numHeads,w=m?[a.batchSize,_,l,a.headSize]:void 0,v=a.nReps?a.nReps:1,x=a.scale===0?1/Math.sqrt(a.headSize):a.scale,I=je(a.headSize),k=a.headSize/I,E=12,z={x:Math.ceil(l/E),y:Math.ceil(a.sequenceLength/E),z:a.batchSize*a.numHeads},C=[{type:12,data:a.sequenceLength},{type:12,data:k},{type:12,data:l},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:x},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:v}],O=m&&i&&q.size(i.dims)>0,M=["type","type"];O&&M.push("type"),n&&M.push("type"),u&&M.push("type"),p&&M.push("type");let D=[{dims:f,dataType:t.dataType,gpuDataType:0}];m&&D.push({dims:w,dataType:t.dataType,gpuDataType:0});let S=P=>{let V=G("q",t.dataType,t.dims,I),re=G("key",r.dataType,r.dims,I),ae=[V,re];if(O){let Y=G("past_key",i.dataType,i.dims,I);ae.push(Y)}n&&ae.push(G("attention_bias",n.dataType,n.dims));let J=u?G("seq_lens",u.dataType,u.dims):void 0;J&&ae.push(J);let U=p?G("total_sequence_length_input",p.dataType,p.dims):void 0;U&&ae.push(U);let ie=ue("output",t.dataType,f),se=[ie];m&&se.push(ue("present_key",t.dataType,w,I));let pe=dt(1,I),Ae=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${E}u;

  var<workgroup> tileQ: array<${V.type.storage}, ${E*E}>;
  var<workgroup> tileK: array<${V.type.storage}, ${E*E}>;
  ${P.registerUniforms(Ae).declareVariables(...ae,...se)}
  ${P.mainStart([E,E,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${v===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${v===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Fn(J,U,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${O&&m?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${m?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${pe}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${O&&m?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${m?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${pe}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(I){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${I}`)}})()};
        output[outputIdx] = ${ie.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${I};${n!==void 0};${i!==void 0};${e}`,inputDependencies:M},getRunData:()=>({outputs:D,dispatchGroup:z,programUniforms:C}),getShaderSource:S}},od=(e,t,r,i,n,a,s=void 0,u=void 0)=>{let p=a+n.kvSequenceLength,l=n.nReps?n.nReps:1,f=n.vHiddenSize*l,m=e>1&&i,_=n.kvNumHeads?n.kvNumHeads:n.numHeads,w=m?[n.batchSize,_,p,n.headSize]:void 0,v=[n.batchSize,n.sequenceLength,f],x=12,I={x:Math.ceil(n.vHeadSize/x),y:Math.ceil(n.sequenceLength/x),z:n.batchSize*n.numHeads},k=[{type:12,data:n.sequenceLength},{type:12,data:p},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:f},{type:12,data:a},{type:12,data:n.kvSequenceLength},{type:12,data:l}],E=m&&i&&q.size(i.dims)>0,z=["type","type"];E&&z.push("type"),s&&z.push("type"),u&&z.push("type");let C=[{dims:v,dataType:t.dataType,gpuDataType:0}];m&&C.push({dims:w,dataType:t.dataType,gpuDataType:0});let O=M=>{let D=G("probs",t.dataType,t.dims),S=G("v",r.dataType,r.dims),P=[D,S];E&&P.push(G("past_value",i.dataType,i.dims));let V=s?G("seq_lens",s.dataType,s.dims):void 0;s&&P.push(V);let re=u?G("total_sequence_length_input",u.dataType,u.dims):void 0;u&&P.push(re);let ae=[ue("output",t.dataType,v)];m&&ae.push(ue("present_value",t.dataType,w));let J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;
  var<workgroup> tileQ: array<${D.type.value}, ${x*x}>;
  var<workgroup> tileV: array<${D.type.value}, ${x*x}>;
  ${M.registerUniforms(J).declareVariables(...P,...ae)}
  ${M.mainStart([x,x,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Fn(V,re,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${E&&m?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${m?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${D.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${E&&m?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${m?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:z},getRunData:()=>({outputs:C,dispatchGroup:I,programUniforms:k}),getShaderSource:O}},dn=(e,t,r,i,n,a,s,u,p,l,f=void 0,m=void 0)=>{let _=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),w=_>1?s:void 0,v=_>1?u:void 0,x=_>1?l.pastSequenceLength:0,I=x+l.kvSequenceLength,k=p&&q.size(p.dims)>0?p:void 0,E=[t,r];w&&q.size(w.dims)>0&&E.push(w),k&&E.push(k),f&&E.push(f),m&&E.push(m);let z=e.compute(sd(_,t,r,w,k,l,x,f,m),{inputs:E,outputs:_>1?[-1,1]:[-1]})[0];e.compute(ad(z,l.batchSize,l.numHeads,x,l.sequenceLength,I,f,m),{inputs:f&&m?[z,f,m]:[z],outputs:[]});let C=[z,i];v&&q.size(v.dims)>0&&C.push(v),f&&C.push(f),m&&C.push(m),e.compute(od(_,z,i,v,l,x,f,m),{inputs:C,outputs:_>1?[0,2]:[0]})},ud=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,a=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},p=[e.inputs[0],e.inputs[1],e.inputs[2]],l=[{type:12,data:i},{type:12,data:n},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=m=>{let _=ue("output_q",p[0].dataType,r),w=ue("output_k",p[0].dataType,r),v=ue("output_v",p[0].dataType,r),x=G("input",p[0].dataType,p[0].dims),I=G("weight",p[1].dataType,p[1].dims),k=G("bias",p[2].dataType,p[2].dims),E=x.type.storage,z=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${E}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${E}, ${s*s}>;
  var<workgroup> tileWeightK: array<${E}, ${s*s}>;
  var<workgroup> tileWeightV: array<${E}, ${s*s}>;
  ${m.registerUniforms(z).declareVariables(x,I,k,_,w,v)}
  ${m.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${E}(0);
    var valueK = ${E}(0);
    var valueV = ${E}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:l}),getShaderSource:f},{inputs:p,outputs:[-1,-1,-1]})},Yh=(e,t)=>{let r=nd(e.inputs,t),[i,n,a]=ud(e,r);return dn(e,i,n,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),ld,dd,pd,Qh,Jy=j(()=>{It(),fe(),_e(),Ke(),be(),ld=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,a)=>{let s=n.length;if(s!==i.length)throw new Error(`${a}: num dimensions != ${s}`);n.forEach((u,p)=>{if(u!==i[p])throw new Error(`${a}: dim[${p}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},dd=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,a=e[0].dims,s=i?je(a[a.length-1]):1,u=n==="NHWC"&&a.length>1?s:1,p=q.size(a)/s,l=i,f=l?a.length:a,m=G("x",e[0].dataType,e[0].dims,s),_=G("scale",e[1].dataType,e[1].dims,u),w=G("bias",e[2].dataType,e[2].dims,u),v=G("inputMean",e[3].dataType,e[3].dims,u),x=G("inputVar",e[4].dataType,e[4].dims,u),I=ue("y",e[0].dataType,f,s),k=()=>{let z="";if(i)z=`let cOffset = ${a.length===1?"0u":n==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(n==="NCHW")z=`
            ${I.indicesSet("outputIndices","0","0")}
            let cOffset = ${I.indicesToOffset("outputIndices")};`;else{z=`var cIndices = ${_.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let C=1;C<_.rank;C++)z+=`cIndices[${C}] = outputIndices[${C}];`;z+=`let cOffset = ${_.indicesToOffset("cIndices")};`}return z},E=z=>`
  const epsilon = ${r};
  ${z.registerUniform("outputSize","u32").declareVariables(m,_,w,v,x,I)}
  ${z.mainStart()}
  ${z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${I.offsetToIndices(`global_idx * ${s}`)};
    ${k()}
    let scale = ${_.getByOffset("cOffset")};
    let bias = ${w.getByOffset("cOffset")};
    let inputMean = ${v.getByOffset("cOffset")};
    let inputVar = ${x.getByOffset("cOffset")};
    let x = ${m.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${I.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:E,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:l?[{type:12,data:p},...ce(a)]:[{type:12,data:p}]})}},pd=e=>Me(e),Qh=(e,t)=>{let{inputs:r,outputCount:i}=e,n=pd({...t,outputCount:i});if(He.webgpu.validateInputContent&&ld(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(dd(r,n))}}),cd,hd,Zh,e0=j(()=>{_e(),be(),cd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},hd=e=>{let t=e[0].dims,r=e[0].dims[2],i=q.size(t)/4,n=e[0].dataType,a=G("input",n,t,4),s=G("bias",n,[r],4),u=G("residual",n,t,4),p=ue("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const channels = ${r}u / 4;
  ${l.declareVariables(a,s,u,p)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${p.setByOffset("global_idx","value")}
  }`}},Zh=e=>{cd(e.inputs),e.compute(hd(e.inputs))}}),fd,Oe,Jh,ef,tf,rf,nf,af,sf,of,uf,md,lf,df,pf,cf,sn,hf,ia,ff,mf,gf,yf,_f,bf,wf,vf,$f,xf,Ef,Sf,Tf,kf,If,Cf,gs,Af,io,no,zf,Rf,Of,gd,yd,Mf,Oo=j(()=>{fe(),_e(),Ke(),be(),fd=(e,t,r,i,n,a,s)=>{let u=Math.ceil(t/4),p="";typeof n=="string"?p=`${n}(a)`:p=n("a");let l=G("inputData",r,[u],4),f=ue("outputData",i,[u],4),m=[{name:"vec_size",type:"u32"}];return s&&m.push(...s),`
      ${e.registerUniforms(m).declareVariables(l,f)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",p)}
  }`},Oe=(e,t,r,i,n,a=e.dataType,s,u)=>{let p=[{type:12,data:Math.ceil(q.size(e.dims)/4)}];return s&&p.push(...s),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:l=>fd(l,q.size(e.dims),e.dataType,a,r,i,u),getRunData:l=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(q.size(l[0].dims)/64/4)},programUniforms:p})}},Jh=e=>{e.compute(Oe(e.inputs[0],"Abs","abs"))},ef=e=>{e.compute(Oe(e.inputs[0],"Acos","acos"))},tf=e=>{e.compute(Oe(e.inputs[0],"Acosh","acosh"))},rf=e=>{e.compute(Oe(e.inputs[0],"Asin","asin"))},nf=e=>{e.compute(Oe(e.inputs[0],"Asinh","asinh"))},af=e=>{e.compute(Oe(e.inputs[0],"Atan","atan"))},sf=e=>{e.compute(Oe(e.inputs[0],"Atanh","atanh"))},of=e=>Me(e),uf=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(Oe(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},md=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return Me({min:t,max:r})},lf=(e,t)=>{let r=t||md(e.inputs),i=dt(e.inputs[0].dataType);e.compute(Oe(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},df=e=>{e.compute(Oe(e.inputs[0],"Ceil","ceil"))},pf=e=>{e.compute(Oe(e.inputs[0],"Cos","cos"))},cf=e=>{e.compute(Oe(e.inputs[0],"Cosh","cosh"))},sn=e=>Me(e),hf=(e,t)=>{let r=dt(e.inputs[0].dataType);e.compute(Oe(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},ia=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,ff=e=>{let t=dt(e.inputs[0].dataType);e.compute(Oe(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,ia(t)))},mf=e=>{e.compute(Oe(e.inputs[0],"Exp","exp"))},gf=e=>{e.compute(Oe(e.inputs[0],"Floor","floor"))},yf=e=>{let t=dt(e.inputs[0].dataType);e.compute(Oe(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,ia(t)))},_f=(e,t)=>{let r=dt(e.inputs[0].dataType);e.compute(Oe(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},bf=e=>{e.compute(Oe(e.inputs[0],"Not",t=>`!${t}`))},wf=e=>{e.compute(Oe(e.inputs[0],"Neg",t=>`-${t}`))},vf=e=>{e.compute(Oe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},$f=e=>{let t=dt(e.inputs[0].dataType);e.compute(Oe(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},xf=e=>{e.compute(Oe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Ef=e=>Me(e),Sf=(e,t)=>{let r=dt(e.inputs[0].dataType);e.compute(Oe(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Tf=e=>{e.compute(Oe(e.inputs[0],"Sin","sin"))},kf=e=>{e.compute(Oe(e.inputs[0],"Sinh","sinh"))},If=e=>{e.compute(Oe(e.inputs[0],"Sqrt","sqrt"))},Cf=e=>{e.compute(Oe(e.inputs[0],"Tan","tan"))},gs=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Af=e=>{e.compute(Oe(e.inputs[0],"Tanh",gs))},io=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${gs("v")};
}
`,no=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,zf=e=>{let t=dt(e.inputs[0].dataType);e.compute(Oe(e.inputs[0],"FastGelu",no,io(t),void 0,e.inputs[0].dataType))},Rf=(e,t)=>{let r=dt(e.inputs[0].dataType);return e.compute(Oe(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Of=e=>{e.compute(Oe(e.inputs[0],"Log","log"))},gd=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,yd=e=>`quick_gelu_impl(${e})`,Mf=(e,t)=>{let r=dt(e.inputs[0].dataType);e.compute(Oe(e.inputs[0],"QuickGelu",yd,gd(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),_d,bd,Nf,t0=j(()=>{_e(),be(),Oo(),_d=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},bd=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=G("input",e[0].dataType,e[0].dims,4),i=G("bias",e[0].dataType,[e[0].dims[2]],4),n=ue("output",e[0].dataType,t,4),a=q.size(t)/4,s=Je(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,n)}

  ${ia(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Nf=e=>{_d(e.inputs),e.compute(bd(e.inputs))}}),wd,vd,Nt,Df,Bf,Lf,Pf,qf,Uf,Wf,Vf,Gf,Hf,r0=j(()=>{fe(),_e(),be(),wd=(e,t,r,i,n,a,s,u,p,l,f,m)=>{let _,w;typeof u=="string"?_=w=(E,z)=>`${u}((${E}),(${z}))`:typeof u=="function"?_=w=u:(_=u.scalar,w=u.vector);let v=ue("outputData",f,i.length,4),x=G("aData",p,t.length,4),I=G("bData",l,r.length,4),k;if(n)if(a){let E=q.size(t)===1,z=q.size(r)===1,C=t.length>0&&t[t.length-1]%4===0,O=r.length>0&&r[r.length-1]%4===0;E||z?k=v.setByOffset("global_idx",w(E?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"),z?`${I.type.value}(${I.getByOffset("0")}.x)`:I.getByOffset("global_idx"))):k=`
            let outputIndices = ${v.offsetToIndices("global_idx * 4u")};
            let offsetA = ${x.broadcastedIndicesToOffset("outputIndices",v)};
            let offsetB = ${I.broadcastedIndicesToOffset("outputIndices",v)};
            ${v.setByOffset("global_idx",w(s||C?x.getByOffset("offsetA / 4u"):`${x.type.value}(${x.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||O?I.getByOffset("offsetB / 4u"):`${I.type.value}(${I.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else k=v.setByOffset("global_idx",w(x.getByOffset("global_idx"),I.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let E=(z,C,O="")=>{let M=`aData[indexA${C}][componentA${C}]`,D=`bData[indexB${C}][componentB${C}]`;return`
            let outputIndices${C} = ${v.offsetToIndices(`global_idx * 4u + ${C}u`)};
            let offsetA${C} = ${x.broadcastedIndicesToOffset(`outputIndices${C}`,v)};
            let offsetB${C} = ${I.broadcastedIndicesToOffset(`outputIndices${C}`,v)};
            let indexA${C} = offsetA${C} / 4u;
            let indexB${C} = offsetB${C} / 4u;
            let componentA${C} = offsetA${C} % 4u;
            let componentB${C} = offsetB${C} % 4u;
            ${z}[${C}] = ${O}(${_(M,D)});
          `};f===9?k=`
            var data = vec4<u32>(0);
            ${E("data",0,"u32")}
            ${E("data",1,"u32")}
            ${E("data",2,"u32")}
            ${E("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:k=`
            ${E("outputData[global_idx]",0)}
            ${E("outputData[global_idx]",1)}
            ${E("outputData[global_idx]",2)}
            ${E("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(x,I,v)}

        ${m??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${k}
      }`},vd=(e,t,r,i,n,a,s=r.dataType)=>{let u=r.dims.map(Number),p=i.dims.map(Number),l=!q.areEqual(u,p),f=u,m=q.size(u),_=!1,w=!1,v=[l];if(l){let x=bi.calcShape(u,p,!1);if(!x)throw new Error("Can't perform binary op on the given tensors");f=x.slice(),m=q.size(f);let I=q.size(u)===1,k=q.size(p)===1,E=u.length>0&&u[u.length-1]%4===0,z=p.length>0&&p[p.length-1]%4===0;v.push(I),v.push(k),v.push(E),v.push(z);let C=1;for(let O=1;O<f.length;O++){let M=u[u.length-O],D=p[p.length-O];if(M===D)C*=M;else break}C%4===0?(w=!0,_=!0):(I||k||E||z)&&(_=!0)}else _=!0;return v.push(_),{name:e,shaderCache:{hint:t+v.map(x=>x.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:x=>wd(x,u,p,f,_,l,w,n,r.dataType,i.dataType,s,a),getRunData:()=>({outputs:[{dims:f,dataType:s}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(q.size(f)/4)},...ce(u,p,f)]})}},Nt=(e,t,r,i,n,a)=>{e.compute(vd(t,n??"",e.inputs[0],e.inputs[1],r,i,a))},Df=e=>{Nt(e,"Add",(t,r)=>`${t}+${r}`)},Bf=e=>{Nt(e,"Div",(t,r)=>`${t}/${r}`)},Lf=e=>{Nt(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Pf=e=>{Nt(e,"Mul",(t,r)=>`${t}*${r}`)},qf=e=>{let t=G("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Nt(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Uf=e=>{Nt(e,"Sub",(t,r)=>`${t}-${r}`)},Wf=e=>{Nt(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Vf=e=>{Nt(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Gf=e=>{Nt(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Hf=e=>{Nt(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),$d,xd,Ed,Sd,Ff,jf,i0=j(()=>{fe(),_e(),Ke(),be(),$d=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,a=i.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==n)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((p,l)=>{if(l!==t&&p!==i.dims[l])throw new Error("non concat dimensions must match")})}})},xd=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Ed=(e,t)=>{let r=e.length,i=[];for(let n=0;n<r;++n){let a=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?i.push(a):n===0?i.push(`if (inputIndex == ${n}u) { ${a} }`):n===r-1?i.push(`else { ${a} }`):i.push(`else if (inputIndex == ${n}) { ${a} }`)}return i.join(`
`)},Sd=(e,t,r,i)=>{let n=q.size(r),a=new Array(e.length),s=new Array(e.length),u=0,p=[],l=[],f=[{type:12,data:n}];for(let x=0;x<e.length;++x)u+=e[x].dims[t],a[x]=u,l.push(e[x].dims.length),s[x]=G(`input${x}`,i,l[x]),p.push("rank"),f.push({type:12,data:a[x]});for(let x=0;x<e.length;++x)f.push(...ce(e[x].dims));f.push(...ce(r));let m=ue("output",i,r.length),_=m.indicesGet("indices",t),w=Array.from(Array(a.length).keys()).map(x=>`uniforms.sizeInConcatAxis${x}`).join(","),v=x=>`

  ${(()=>{x.registerUniform("outputSize","u32");for(let I=0;I<e.length;I++)x.registerUniform(`sizeInConcatAxis${I}`,"u32");return x.declareVariables(...s,m)})()}

  ${xd(a.length,w)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${m.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${_});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${w});
      ${_} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Ed(s,m)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:f}),getShaderSource:v}},Ff=(e,t)=>{let r=e.inputs,i=r[0].dims,n=q.normalizeAxis(t.axis,i.length);$d(r,n);let a=i.slice();a[n]=r.reduce((u,p)=>u+(p.dims.length>n?p.dims[n]:0),0);let s=r.filter(u=>q.size(u.dims)>0);e.compute(Sd(s,n,a,r[0].dataType),{inputs:s})},jf=e=>Me({axis:e.axis})}),Wr,Vr,Gr,Mo,Fr=j(()=>{fe(),_e(),Wr=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Vr=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Gr=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Mo=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,i]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=(e==null?void 0:e.activation_params)||[_h,bh];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),it,Kf,No=j(()=>{it=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Kf=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Xf,n0=j(()=>{Xf=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),un,Do,Bo=j(()=>{fe(),_e(),be(),Fr(),un=(e,t,r,i,n)=>{let a=i-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${de(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,de(n,u+a,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},Do=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,u=e[1].dims,p=s[s.length-2],l=u[u.length-1],f=s[s.length-1],m=je(l),_=je(f),w=je(p),v=q.size(r)/m/w,x=e.length>2,I=i?i.slice(0,-2):r.slice(0,-2),k=[q.size(I),p,l],E=[{type:12,data:v},{type:12,data:p},{type:12,data:l},{type:12,data:f}];Vr(t,E),E.push(...ce(I,s,u)),x&&E.push(...ce(e[2].dims)),E.push(...ce(k));let z=C=>{let O=Ao("batch_dims",e[0].dataType,I.length),M=G("a",e[0].dataType,s.length,_),D=G("b",e[1].dataType,u.length,m),S=ue("output",e[0].dataType,k.length,m),P=Je(S.type.tensor),V=Wr(t,S.type.value,P),re=[M,D],ae="";if(x){let ie=n?m:1;re.push(G("bias",e[2].dataType,e[2].dims.length,ie)),ae=`${n?`value += bias[col / ${ie}];`:`value += ${S.type.value}(bias[row + i]);`}`}let J=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Gr(t,J);let U=()=>{let ie=`var a_data: ${M.type.value};`;for(let se=0;se<_;se++)ie+=`
              let b_data${se} = b[(b_offset + (k + ${se}) * uniforms.N + col) / ${m}];`;for(let se=0;se<w;se++){ie+=`a_data = a[(a_offset + (row + ${se}) * uniforms.K + k) / ${_}];`;for(let pe=0;pe<_;pe++)ie+=`
            values[${se}] = fma(${D.type.value}(a_data${_===1?"":`[${pe}]`}), b_data${pe}, values[${se}]);
`}return ie};return`
  ${C.registerUniforms(J).registerInternalVariables(O).declareVariables(...re,S)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${m})) * ${m};
    var index1 = global_idx / (uniforms.N / ${m});
    let stride1 = uniforms.M / ${w};
    let row = (index1 % stride1) * ${w};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${O.offsetToIndices("batch")};`}

    var a_indices: ${M.type.indices};
    ${un("a_indices",M,M.rank-2,O.rank,"batch_indices")}
    ${M.indicesSet("a_indices",M.rank-2,0)}
    ${M.indicesSet("a_indices",M.rank-1,0)}
    let a_offset = ${M.indicesToOffset("a_indices")};

    var b_indices: ${D.type.indices};
    ${un("b_indices",D,D.rank-2,O.rank,"batch_indices")}
    ${D.indicesSet("b_indices",D.rank-2,0)}
    ${D.indicesSet("b_indices",D.rank-1,0)}
    let b_offset = ${D.indicesToOffset("b_indices")};
    var values: array<${S.type.value}, ${w}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${_}) {
      ${U()}
    }
    for (var i = 0u; i < ${w}u; i++) {
      var value = values[i];
      ${ae}
      ${V}
      let cur_indices = ${S.type.indices}(batch, row + i, col);
      let offset = ${S.indicesToOffset("cur_indices")};
      ${S.setByOffset(`offset / ${m}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${m};${_};${w};${n}`,inputDependencies:x?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:E}),getShaderSource:z}}}),Td,kd,ao,ys,Id,so,Cd,da,Lo=j(()=>{fe(),_e(),be(),Fr(),Bo(),No(),Td=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,kd=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,ao=(e,t,r="f32",i,n=!1,a=32,s=!1,u=32)=>{let p=t[1]*e[1],l=t[0]*e[0],f=n?p:a,m=n?a:p,_=f/t[0],w=a/t[1];if(!((n&&_===4&&e[1]===4||!n&&(_===3||_===4))&&f%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${_} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${_} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${_}<${r}>, ${f/_}>, ${m}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${_};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${p};

  let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${w};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Td(n,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${_===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${kd(n,_)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},ys=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Id=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",so=(e,t,r="f32",i,n=!1,a=32,s=!1,u=32,p=!1)=>{let l=e[1]*t[1],f=e[0]*t[0],m=n?l:a,_=n?a:l;if(!(_%t[1]===0&&m%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${_} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let w=_/t[1],v=m/t[0],x=a/t[1],I=p?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${_}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
          ${ys(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${w};
let tileColA = i32(localId.x) * ${v};
let tileRowB = i32(localId.y) * ${x};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${v}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${ys(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${x}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Id(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${m}>, ${_}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${I}
  }
`},Cd=(e,t,r,i,n=!1)=>{let[a,s,u,p]=i,l=Je(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${it(e,l)} {
      var value = ${it(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${un("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${it(e,l)} {
      var value = ${it(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${un("bIndices",u,u.rank-2,a.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${it(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${it(e,l)}(bias[row])`};`:""}
        ${r}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},da=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,u=e[1].dims,p=s.slice(0,-2),l=u.slice(0,-2),f=i?i.slice(0,-2):r.slice(0,-2),m=q.size(f),_=s[s.length-2],w=s[s.length-1],v=u[u.length-1],x=w%4===0&&v%4===0,I=_<=8?[4,1,1]:[4,4,1],k=[8,8,1],E=[Math.ceil(v/k[0]/I[0]),Math.ceil(_/k[1]/I[1]),Math.ceil(m/k[2]/I[2])],z=x?4:1,C=[...p,_,w/z],O=C.length,M=[...l,w,v/z],D=M.length,S=[m,_,v/z],P=[{type:6,data:_},{type:6,data:v},{type:6,data:w}];Vr(t,P),P.push(...ce(f,C,M));let V=["rank","rank"],re=e.length>2;re&&(P.push(...ce(e[2].dims)),V.push("rank")),P.push(...ce(S));let ae=J=>{let U=f.length,ie=Ao("batchDims",e[0].dataType,U,1),se=Je(e[0].dataType),pe=G("a",e[0].dataType,O,z),Ae=G("b",e[1].dataType,D,z),Y=ue("result",e[0].dataType,S.length,z),ve=[pe,Ae];if(re){let Se=n?z:1;ve.push(G("bias",e[2].dataType,e[2].dims.length,Se))}let K=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Gr(t,K);let Z=Je(Y.type.tensor),oe=Wr(t,Y.type.value,Z),X=Cd(z,re,oe,[ie,pe,Ae,Y],n);return`
  ${J.registerUniforms(K).registerInternalVariables(ie).declareVariables(...ve,Y)}
  ${X}
  ${x?ao(I,k,se,ie):so(I,k,se,ie)}
                   `};return{name:"MatMul",shaderCache:{hint:`${I};${t.activation};${x};${n}`,inputDependencies:V},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:E[0],y:E[1],z:E[2]},programUniforms:P}),getShaderSource:ae}}}),Ad,Yf,a0=j(()=>{fe(),pr(),be(),Fr(),No(),n0(),Lo(),Ad=(e,t,r,i,n=!1,a,s=4,u=4,p=4,l="f32")=>{let f=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},m=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},_=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,w=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,v=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",x=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",I=e?"row":"col",k=e?"col":"row",E=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${I} / outWidth;
    let outCol = ${I} % outWidth;

    let WRow = ${k} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${k} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${k} % inChannels;
    var resData = ${it(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${v} && xCol >= 0 && xCol < ${x}) {
      ${_}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`,z=e?t&&i?`
    let col = colIn * ${s};
    ${E}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${E}
    }
    return ${it(s,l)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${E}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${E}
    }
    return ${it(s,l)}(0.0);`,C=e?i&&r?m(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m(u)}
    }
    return ${it(u,l)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${m(u)}
    }
    return ${it(u,l)}(0.0);`,O=it(p,l),M=it(e?s:u,l),D=it(e?u:s,l),S=Wr(a,O,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${M} {
      ${e?z:C}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${D} {
      ${e?C:z}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${O}) {
      let col = colIn * ${p};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${w}
      ${Kf(n)}
      ${S}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Yf=(e,t,r,i,n,a,s,u,p)=>{let l=t.format==="NHWC",f=l?e[0].dims[3]:e[0].dims[1],m=r[0],_=l?r[2]:r[3],w=l?r[1]:r[2],v=l?r[3]:r[1],x=l&&(f%4===0||f%3===0)&&v%4===0,I=l?v:_*w,k=l?_*w:v,E=[8,8,1],z=i<=8?[4,1,1]:[4,4,1],C=[Math.ceil(I/E[0]/z[0]),Math.ceil(k/E[1]/z[1]),Math.ceil(m/E[2]/z[2])];Ce("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${C}`);let O=x?l&&f%4!==0?3:4:1,M=E[1]*z[1],D=E[0]*z[0],S=Math.max(E[0]*O,E[1]),P=i%M===0,V=n%D===0,re=a%S===0,ae=x?[O,4,4]:[1,1,1],J=[{type:6,data:i},{type:6,data:n},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Vr(t,J),J.push(...ce(e[0].dims,e[1].dims));let U=["rank","rank"];s&&(J.push(...ce(e[2].dims)),U.push("rank")),J.push(...ce(r));let ie=se=>{let pe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Gr(t,pe);let Ae=x?4:1,Y=Je(e[0].dataType),ve=`
      fn setOutputAtIndex(flatIndex : i32, value : ${x?`vec4<${Y}>`:Y}) {
        result[flatIndex] = ${x?`vec4<${Y}>`:Y}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${x?`vec4<${Y}>`:Y}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${x?"/ 4":""}, value);
      }`,K=G("x",e[0].dataType,e[0].dims.length,O===3?1:O),Z=G("w",e[1].dataType,e[1].dims.length,Ae),oe=[K,Z],X=ue("result",e[0].dataType,r.length,Ae);if(s){let Se=G("bias",e[2].dataType,e[2].dims.length,Ae);oe.push(Se),ve+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${x?`vec4<${Y}>`:Y} {
          return bias[coords.${l?"w":"y"}${x?"/ 4":""}];
        }`}return`
        ${Xf("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${se.registerUniforms(pe).declareVariables(...oe,X)}
        ${ve}
        ${Ad(l,P,V,re,s,t,ae[0],ae[1],ae[2],Y)}
        ${x?ao(z,E,Y,void 0,!l,S):so(z,E,Y,void 0,!l,S,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${O};${x};${P};${V};${re};${M};${D};${S}`,inputDependencies:U},getRunData:()=>({outputs:[{dims:p?p(r):r,dataType:e[0].dataType}],dispatchGroup:{x:C[0],y:C[1],z:C[2]},programUniforms:J}),getShaderSource:ie}}}),zd,_s,Ki,Rd,bs,Od,Qf,Zf,s0=j(()=>{fe(),pr(),_e(),be(),Fr(),No(),zd=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},_s=e=>typeof e=="number"?[e,e,e]:e,Ki=(e,t)=>t<=1?e:e+(e-1)*(t-1),Rd=(e,t,r,i=1)=>{let n=Ki(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},bs=(e,t,r,i,n)=>{n==null&&(n=Rd(e,t[0],i[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*n>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*n)/i[s]+1));return a},Od=(e,t,r,i,n,a,s,u,p,l)=>{let f,m,_,w;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let v=bs([t,r,i,1],[u,p,l],1,[n,a,s],e);m=v[0],_=v[1],w=v[2]}else if(Array.isArray(e)){if(!e.every((x,I,k)=>x===k[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let v=bs([t,r,i,1],[u,p,l],1,[n,a,s],e[0]);m=v[0],_=v[1],w=v[2]}else if(e==="SAME_UPPER"){m=Math.ceil(t/n),_=Math.ceil(r/a),w=Math.ceil(i/s);let v=(m-1)*n+u-t,x=(_-1)*a+p-r,I=(w-1)*s+l-i,k=Math.floor(v/2),E=v-k,z=Math.floor(x/2),C=x-z,O=Math.floor(I/2),M=I-O;f={top:z,bottom:C,left:O,right:M,front:k,back:E}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:m,outHeight:_,outWidth:w}},Qf=(e,t,r,i,n,a=!1,s="channelsLast")=>{let u,p,l,f,m;if(s==="channelsLast")[u,p,l,f,m]=e;else if(s==="channelsFirst")[u,m,p,l,f]=e;else throw new Error(`Unknown dataFormat ${s}`);let[_,,w,v,x]=t,[I,k,E]=_s(r),[z,C,O]=_s(i),M=Ki(w,z),D=Ki(v,C),S=Ki(x,O),{padInfo:P,outDepth:V,outHeight:re,outWidth:ae}=Od(n,p,l,f,I,k,E,M,D,S),J=a?_*m:_,U=[0,0,0,0,0];return s==="channelsFirst"?U=[u,J,V,re,ae]:s==="channelsLast"&&(U=[u,V,re,ae,J]),{batchSize:u,dataFormat:s,inDepth:p,inHeight:l,inWidth:f,inChannels:m,outDepth:V,outHeight:re,outWidth:ae,outChannels:J,padInfo:P,strideDepth:I,strideHeight:k,strideWidth:E,filterDepth:w,filterHeight:v,filterWidth:x,effectiveFilterDepth:M,effectiveFilterHeight:D,effectiveFilterWidth:S,dilationDepth:z,dilationHeight:C,dilationWidth:O,inShape:e,outShape:U,filterShape:t}},Zf=(e,t,r,i,n,a)=>{let s=a==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let u=[64,1,1],p={x:r.map((I,k)=>k)},l=[Math.ceil(zd(p.x.map(I=>r[I]))/u[0]),1,1];Ce("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${l}`);let f=1,m=q.size(r),_=[{type:12,data:m},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Vr(t,_),_.push(...ce(e[0].dims,e[1].dims));let w=["rank","rank"],v=e.length===3;v&&(_.push(...ce(e[2].dims)),w.push("rank")),_.push(...ce(r));let x=I=>{let k=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Gr(t,k);let E=1,z=Je(e[0].dataType),C=G("x",e[0].dataType,e[0].dims.length,f),O=G("W",e[1].dataType,e[1].dims.length,E),M=[C,O],D=ue("result",e[0].dataType,r.length,E),S="";if(v){let re=G("bias",e[2].dataType,e[2].dims.length,E);M.push(re),S+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${z} {
          return bias[${s?de("coords",4,5):de("coords",1,5)}];
        }`}let P=it(f,z),V=Wr(t,P,z);return`
            ${S}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${O.getByIndices("aIndices")};
            }
          ${I.registerUniforms(k).declareVariables(...M,D)}
          ${I.mainStart()}
          ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${D.offsetToIndices("global_idx")};
              let batch = ${de("coords",0,C.rank)};
              let d2 = ${s?de("coords",C.rank-1,C.rank):de("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${s?de("coords",1,C.rank):de("coords",2,C.rank)},
              ${s?de("coords",2,C.rank):de("coords",3,C.rank)},
              ${s?de("coords",3,C.rank):de("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?de("uniforms.x_shape",1,C.rank):de("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${s?de("uniforms.x_shape",2,C.rank):de("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${s?de("uniforms.x_shape",3,C.rank):de("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${s?de("uniforms.x_shape",4,C.rank):de("uniforms.x_shape",1,C.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${v?"value = value + getBiasByOutputCoords(coords)":""};
              ${V}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${f};${v}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:l[0],y:l[1],z:l[2]},programUniforms:_}),getShaderSource:x}}}),Jf,em,o0=j(()=>{fe(),_e(),be(),Fr(),Jf=(e,t,r,i)=>{let n=e.length>2,a=n?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,p=t.format==="NHWC",l=p?r[3]:r[1],f=l/t.group,m=p&&f>=4?je(l):1,_=q.size(r)/m,w=[{type:12,data:_},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];Vr(t,w),w.push(...ce(s,[u[0],u[1],u[2],u[3]/m]));let v=n?["rank","rank","rank"]:["rank","rank"];w.push(...ce([r[0],r[1],r[2],r[3]/m]));let x=I=>{let k=ue("output",e[0].dataType,r.length,m),E=Je(k.type.tensor),z=Wr(t,k.type.value,E),C=G("x",e[0].dataType,s.length),O=G("w",e[1].dataType,u.length,m),M=[C,O];n&&M.push(G("b",e[2].dataType,e[2].dims,m));let D=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Gr(t,D);let S=p?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${C.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${O.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${C.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${O.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${I.registerUniforms(D).declareVariables(...M,k)}

  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${k.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${p?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${p?1:2}], outputIndices[${p?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${m} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${p?2:1}];

    var value: ${k.type.value} = ${k.type.value}(0);
    ${S}
    ${a}
    ${z}
    ${k.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${m}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:w}),getShaderSource:x}},em=(e,t,r,i)=>{let n=e.length>2,a=je(r[3]),s=je(r[2]),u=q.size(r)/a/s,p=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],f=[r[0],r[1],r[2],r[3]/a],m=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Vr(t,m),m.push(...ce(p,l,f));let _=(s-1)*t.strides[1]+l[1],w=v=>{let x=ue("output",e[0].dataType,f.length,a),I=Je(x.type.tensor),k=Wr(t,x.type.value,I),E=G("x",e[0].dataType,p.length,a),z=G("w",e[1].dataType,l.length,a),C=[E,z];n&&C.push(G("b",e[2].dataType,e[2].dims,a));let O=n?"value += b[output_channel];":"",M=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Gr(t,M),`
  ${v.registerUniforms(M).declareVariables(...C,x)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${E.type.value}, ${_}>;
    var values: array<${x.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${_}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${E.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${E.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${z.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${O}
      ${k}
      ${x.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${_};${l[0]};${l[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:w}}}),Md,jn,Nd,Kn,oo,ws,Dd,Bd,uo,u0=j(()=>{_e(),a0(),s0(),Lo(),o0(),Fr(),Bo(),$r(),Md=(e,t,r,i,n,a)=>{let s=e[0],u=e.slice(a?1:2,a?3:4),p=u.length,l=t[0],f=t.slice(2).map((_,w)=>_+(_-1)*(r[w]-1)),m=u.map((_,w)=>_+i[w]+i[w+p]).map((_,w)=>Math.floor((_-f[w]+n[w])/n[w]));return m.splice(0,0,s),m.splice(a?3:1,0,l),m},jn=[2,3,1,0],Nd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Kn=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let i=e.pads.slice();ua.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},oo=e=>{let t=Mo(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,a=e.group,s=e.kernel_shape,u=e.pads,p=e.strides,l=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,pads:u,strides:p,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},ws=(e,t,r,i)=>{let n=r.format==="NHWC",a=Md(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let M=[t[0]];if(n){let D=e.kernelCustomData.wT??e.compute(Et(t[1],jn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=D),M.push(D)}else M.push(t[1]);t.length===3&&M.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(em(M,r,a,i),{inputs:M}):e.compute(Jf(M,r,a,i),{inputs:M});return}let s=t.length===3,u=t[0].dims[n?1:2],p=t[0].dims[n?2:3],l=t[0].dims[n?3:1],f=t[1].dims[2],m=t[1].dims[3],_=a[n?1:2],w=a[n?2:3],v=a[n?3:1],x=n&&f===u&&m===p&&r.pads[0]===0&&r.pads[1]===0;if(x||f===1&&m===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let M=a[0],D,S,P,V=[];if(n){let J=e.kernelCustomData.wT??e.compute(Et(t[1],jn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=J),x){let U=u*p*l;D=t[0].reshape([1,M,U]),S=J.reshape([1,U,v]),P=[1,M,v]}else D=t[0].reshape([M,u*p,l]),S=J.reshape([1,l,v]),P=[M,_*w,v];V.push(D),V.push(S)}else D=t[0].reshape([M,l,u*p]),S=t[1].reshape([1,v,l]),P=[M,v,_*w],V.push(S),V.push(D);s&&V.push(t[2]);let re=P[2],ae=V[0].dims[V[0].dims.length-1];re<8&&ae<8?e.compute(Do(V,r,a,P,n,i),{inputs:V}):e.compute(da(V,r,a,P,n,i),{inputs:V});return}let I=!0,k=e.kernelCustomData.wT??e.compute(Et(t[1],jn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=k);let E=[t[0],k];s&&E.push(t[2]);let z=n?_*w:v,C=n?v:_*w,O=f*m*l;e.compute(Yf(E,r,a,z,C,O,s,I,i),{inputs:E})},Dd=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),p=Kn({...t,pads:n,strides:a,dilations:s,kernelShape:u},i);ws(e,i,p,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},Bd=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=Kn(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=Qf(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,i);e.compute(Zf(t,n,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},uo=(e,t)=>{if(Nd(e.inputs,t),e.inputs[0].dims.length===3)Dd(e,t);else if(e.inputs[0].dims.length===5)Bd(e,e.inputs,t);else{let r=Kn(t,e.inputs);ws(e,e.inputs,r)}}}),tm,l0=j(()=>{fe(),pr(),_e(),be(),tm=(e,t,r)=>{let i=e.length>2,n=t.outputShape,a=t.format==="NHWC",s=t.group,u=e[1].dims,p=u[2]/s,l=u[3],f=a?je(p):1,m=a&&l===1&&p>=4,_=m?Math.floor(p/4)*4:Math.floor(p/f)*f,w=p-_,v=a?je(l):1,x=a?l===1?f:v:1,I=q.size(n)/v,k=[Math.ceil(I/64),1,1];Ce("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${k}`);let E=["rank","rank"],z=[t.strides[0],t.strides[1]],C=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],O=[t.dilations[0],t.dilations[1]],M=[C[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),C[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],D=[M[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),M[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],S=[{type:12,data:I},{type:12,data:z},{type:12,data:C},{type:12,data:O},{type:12,data:M},{type:6,data:D},{type:12,data:_},{type:12,data:p},{type:12,data:l},...ce(e[0].dims,e[1].dims)];i&&(S.push(...ce(e[2].dims)),E.push("rank")),S.push(...ce(n));let P=V=>{let re=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:z.length},{name:"filter_dims",type:"u32",length:C.length},{name:"dilations",type:"u32",length:C.length},{name:"effective_filter_dims",type:"u32",length:M.length},{name:"pads",type:"i32",length:D.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],ae=Je(e[0].dataType),J=a?1:2,U=a?2:3,ie=a?3:1,se=G("W",e[1].dataType,e[1].dims.length,x),pe=G("Dy",e[0].dataType,e[0].dims.length,f),Ae=[pe,se];i&&Ae.push(G("bias",e[2].dataType,[n[ie]].length,v));let Y=ue("result",e[0].dataType,n.length,v),ve=()=>{let oe="";if(m)f===4?oe+=`
        let xValue = ${pe.getByOffset("x_offset")};
        let wValue = ${se.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:f===2?oe+=`
          dotProd = dotProd + dot(vec4<${ae}>(${pe.getByOffset("x_offset")}, ${pe.getByOffset("x_offset + 1u")}), vec4<${ae}>(${se.getByOffset("w_offset")}, ${se.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:f===1&&(oe+=`
          dotProd = dotProd + dot(vec4<${ae}>(${pe.getByOffset("x_offset")}, ${pe.getByOffset("x_offset + 1u")}, ${pe.getByOffset("x_offset + 2u")}, ${pe.getByOffset("x_offset + 3u")}), vec4<${ae}>(${se.getByOffset("w_offset")}, ${se.getByOffset("w_offset + 1u")}, ${se.getByOffset("w_offset + 2u")}, ${se.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(oe+=`
                  let xValue = ${a?pe.getByOffset(`${pe.indicesToOffset(`${pe.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):pe.get("batch","inputChannel","idyR","idyC")};
        `,f===1)oe+=`
          let w_offset = ${se.indicesToOffset(`${se.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${se.getByOffset(`w_offset / ${x}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let X=0;X<f;X++)oe+=`
            let wValue${X} = ${se.getByOffset(`${se.indicesToOffset(`${se.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${X}, wOutChannel)`)} / ${x}`)};
            dotProd = dotProd + xValue[${X}] * wValue${X};`;return oe},K=()=>{if(w===0)return"";if(!m)throw new Error(`packInputAs4 ${m} is not true.`);let oe="";if(f===1){oe+="dotProd = dotProd";for(let X=0;X<w;X++)oe+=`
            + ${pe.getByOffset(`x_offset + ${X}`)} * ${se.getByOffset(`w_offset + ${X}`)}`;oe+=";"}else if(f===2){if(w!==2)throw new Error(`Invalid inputChannelsRemainder ${w}.`);oe+=`
          let xValue = ${pe.getByOffset("x_offset")};
          let wValue = ${se.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return oe},Z=`
            let outputIndices = ${Y.offsetToIndices(`global_idx * ${v}`)};
            let batch = ${Y.indicesGet("outputIndices",0)};
            let d1 = ${Y.indicesGet("outputIndices",ie)};
            let r = ${Y.indicesGet("outputIndices",J)};
            let c = ${Y.indicesGet("outputIndices",U)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Y.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${ae}(dyRCorner) + ${ae}(wR)) / ${ae}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${ae}(uniforms.Dy_shape[${J}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${ae}(dyCCorner) + ${ae}(wC)) / ${ae}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${ae}(uniforms.Dy_shape[${U}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${m?`
                var x_offset = ${pe.indicesToOffset(`${pe.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${se.indicesToOffset(`${se.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${x};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${m?4:f}) {
                  ${ve()}
                  inputChannel = inputChannel + ${m?4:f};
                }
                ${K()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${v}]`:""};
            ${Y.setByOffset("global_idx","value")};
          `;return`
    ${V.registerUniforms(re).declareVariables(...Ae,Y)}
      ${V.mainStart()}
      ${V.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Z}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${x}${v}${m}${w}`,inputDependencies:E},getRunData:()=>({dispatchGroup:{x:k[0],y:k[1],z:k[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:S}),getShaderSource:P}}}),Ld,Pd,qd,vs,rm,Ud,$s,Wd,im,d0=j(()=>{l0(),Fr(),$r(),Ld=(e,t,r,i,n,a)=>(e-1)*t+r+(i-1)*n+1-a,Pd=(e,t,r,i,n)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=a,r[n]=e-a):t==="SAME_LOWER"&&(r[i]=e-a,r[n]=a)},qd=(e,t,r,i,n,a,s,u,p,l)=>{let f=e.length-2,m=l.length===0;p.length<f&&p.push(...Array(f-p.length).fill(0));let _=e[0],w=t[u?3:1]*n;for(let v=0,x=e.length-f-(u?1:0);v<f;++v,++x){let I=e[x],k=m?I*s[v]:l[v],E=Ld(I,s[v],a[v],t[x],r[v],k);Pd(E,i,a,v,v+f),m&&l.push(s[v]*(I-1)+p[v]+(t[x]-1)*r[v]+1-a[v]-a[v+f])}l.splice(0,0,_),l.splice(u?3:1,0,w)},vs=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((m,_)=>m*_,1)===0){r.length=0;for(let m=2;m<t[1].dims.length;++m)r.push(t[1].dims[m])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,p=e.dilations.slice();if(p.reduce((m,_)=>m+_,0)===0){let m=t[0].dims.length-2;p=new Array(m).fill(1)}let l=e.strides.slice();if(l.reduce((m,_)=>m+_,0)===0){let m=t[0].dims.length-2;l=new Array(m).fill(1)}qd(u,r,p,e.autoPad,e.group,n,l,i,s,a);let f=Object.assign({},e);return Object.assign(f,{kernelShape:r,pads:n,outputPadding:s,outputShape:a,dilations:p,strides:l}),f},rm=e=>{let t=Mo(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,a=e.group??1,s=e.kernelShape,u=e.pads,p=e.strides,l=e.wIsConst(),f=e.outputPadding,m=e.outputShape;return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,outputPadding:f,outputShape:m,pads:u,strides:p,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},Ud=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},$s=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(Et(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let a=[t[0],n];t.length===3&&a.push(t[2]),e.compute(tm(a,r,i),{inputs:a})},Wd=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),a=[1].concat(a),n=[1].concat(n);let p=t.outputPadding;p=[0].concat(p);let l=vs({...t,pads:u,strides:s,dilations:a,kernelShape:n,outputPadding:p},i);$s(e,i,l,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},im=(e,t)=>{if(Ud(e.inputs,t),e.inputs[0].dims.length===3)Wd(e,t);else{let r=vs(t,e.inputs);$s(e,e.inputs,r)}}}),Vd,nm,am,p0=j(()=>{fe(),_e(),Ke(),be(),Vd=(e,t,r,i)=>{let n=q.size(t),a=t.length,s=G("input",e,a),u=ue("output",e,a),p=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=q.normalizeAxis(p,a),f=m=>{let _=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,w=de("uniforms.input_shape","uniforms.axis",a),v=i.reverse?_+(i.exclusive?" + 1":""):"0",x=i.reverse?w:_+(i.exclusive?"":" + 1");return`
                ${m.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${m.mainStart()}
                  ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${v};
                  let last : i32 = ${x};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:l},...ce(t,t)]}),getShaderSource:f}},nm=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(Vd(i,r,n,t),{inputs:[0]})},am=e=>{let t=e.exclusive===1,r=e.reverse===1;return Me({exclusive:t,reverse:r})}}),Gd,Hd,Fd,sm,om,c0=j(()=>{fe(),_e(),Ke(),be(),Gd=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Hd=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)n.push(r.indicesSet("a",e[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)},Fd=(e,t)=>{let r,i,n,a,s,u,p=t.format==="NHWC",l=t.blocksize,f=t.mode==="DCR";p?([r,i,n,a]=e.dims,s=f?[r,i,n,l,l,a/l**2]:[r,i,n,a/l**2,l,l],u=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=f?[r,l,l,a/l**2,i,n]:[r,a/l**2,l,l,i,n],u=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let m=e.reshape(s),_=m.dims.length,w=e.dataType,v=G("a",w,_),x=ue("output",w,_),I=k=>`
  ${k.registerUniform("output_size","u32").declareVariables(v,x)}

  ${Hd(u,_,v,x)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:k=>{let E=p?[r,i*l,n*l,a/l**2]:[r,a/l**2,i*l,n*l],z=q.size(E),C=m.dims,O=q.sortBasedOnPerm(C,u);return{outputs:[{dims:E,dataType:k[0].dataType}],dispatchGroup:{x:Math.ceil(z/64)},programUniforms:[{type:12,data:z},...ce(C,O)]}},getShaderSource:I}},sm=(e,t)=>{Gd(e.inputs),e.compute(Fd(e.inputs[0],t))},om=e=>Me({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Xn,Xi,xs,jd,Kd,Xd,Yd,Es,Qd,um,lm,h0=j(()=>{fe(),_e(),Ke(),be(),Xn="[a-zA-Z]|\\.\\.\\.",Xi="("+Xn+")+",xs="^"+Xi+"$",jd="("+Xi+",)*"+Xi,Kd="^"+jd+"$",Xd=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Yd=class{constructor(e,t){var n;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Kd)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,s)=>{let u=e[s].dims.slice();if(!a.match(RegExp(xs)))throw new Error("Invalid LHS term");let p=this.processTerm(a,!0,u,s);this.lhs.push(p)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,s])=>s.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(Xi)))throw new Error("Invalid RHS");(n=i.match(RegExp(Xn,"g")))==null||n.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(a);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,a=!1,s=[],u=0;if(!e.match(RegExp(xs))&&!t&&e!=="")throw new Error("Invalid LHS term");let p=e.match(RegExp(Xn,"g")),l=new Xd(i);return p==null||p.forEach((f,m)=>{if(f==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let _=n-p.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+_),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let w=0;w<s.length;w++){let v=String.fromCharCode(48+w);l.addSymbol(v,m+w),this.addSymbol(v,r[u++],i)}}else l.addSymbol(f,m+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,r[u++],i)}),l}},Es=e=>e+"_max",Qd=(e,t,r,i)=>{let n=e.map(l=>l.length).map((l,f)=>G(`input${f}`,t,l)),a=q.size(i),s=ue("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(l=>!r.rhs.symbolToIndices.has(l)),p=l=>{let f=[],m="var prod = 1.0;",_="var sum = 0.0;",w="sum += prod;",v=[],x=[],I=[],k=[],E=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((C,O)=>{var M;if(r.rhs.symbolToIndices.has(O)){let D=(M=r.rhs.symbolToIndices.get(O))==null?void 0:M[0];D!==void 0&&r.lhs.forEach((S,P)=>{if(C.inputIndices.includes(P)){let V=S.symbolToIndices.get(O);if(V===void 0)throw new Error("Invalid symbol error");V.forEach(re=>{f.push(`${n[P].indicesSet(`input${P}Indices`,re,s.indicesGet("outputIndices",D))}`)})}})}else r.lhs.forEach((D,S)=>{if(C.inputIndices.includes(S)){let P=D.symbolToIndices.get(O);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(V=>{v.push(`${n[S].indicesSet(`input${S}Indices`,V,`${O}`)}`)}),k.push(`prod *= ${n[S].getByIndices(`input${S}Indices`)};`)}}),x.push(`for(var ${O}: u32 = 0; ${O} < uniforms.${Es(O)}; ${O}++) {`),I.push("}")});let z=E?[...f,`let sum = ${n.map((C,O)=>C.getByIndices(`input${O}Indices`)).join(" * ")};`]:[...f,_,...x,...v,m,...k,w,...I];return`
            ${l.registerUniforms(u.map(C=>({name:`${Es(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,s)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${n.map((C,O)=>`var input${O}Indices: ${n[O].type.indices};`).join(`
`)}
            ${z.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let l=u.filter(m=>r.symbolToInfo.has(m)).map(m=>{var _;return{type:12,data:((_=r.symbolToInfo.get(m))==null?void 0:_.dimValue)||0}});l.push({type:12,data:a});let f=e.map((m,_)=>[...ce(m)]).reduce((m,_)=>m.concat(_),l);return f.push(...ce(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}},getShaderSource:p}},um=(e,t)=>{let r=new Yd(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((a,s)=>a.dims);e.compute(Qd(n,e.inputs[0].dataType,r,i))},lm=e=>{let t=e.equation.replace(/\s+/g,"");return Me({equation:t})}}),Zd,Ss,Jd,ep,dm,f0=j(()=>{fe(),_e(),be(),Zd=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Ss=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},Jd=(e,t)=>e.length>t.length?Ss(e,t):Ss(t,e),ep=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=Jd(t,r),n=e[0].dataType,a=n===9||q.size(t)===1,s=n===9||t.length>0&&t[t.length-1]%4===0?4:1,u=a||i.length>0&&i[i.length-1]%4===0?4:1,p=Math.ceil(q.size(i)/u),l=m=>{let _=G("input",n,t.length,s),w=ue("output",n,i.length,u),v;if(n===9){let x=(I,k,E="")=>`
          let outputIndices${k} = ${w.offsetToIndices(`outputOffset + ${k}u`)};
          let offset${k} = ${_.broadcastedIndicesToOffset(`outputIndices${k}`,w)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${I}[${k}] = ${E}(${_.getByOffset(`index${k}`)}[component${k}]);
        `;v=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${x("data",0,"u32")}
        ${x("data",1,"u32")}
        ${x("data",2,"u32")}
        ${x("data",3,"u32")}
        ${w.setByOffset("global_idx","data")}
      }`}else v=`
        let outputIndices = ${w.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${_.broadcastedIndicesToOffset("outputIndices",w)};
        let data = ${w.type.value}(${_.getByOffset(`inputOffset / ${s}`)});
        ${w.setByOffset("global_idx","data")}
      }`;return`
    ${m.registerUniform("vec_size","u32").declareVariables(_,w)}
    ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${v}`},f=[{type:12,data:p},...ce(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f})}},dm=e=>{Zd(e.inputs),e.compute(ep(e.inputs),{inputs:[0]})}}),tp,pm,m0=j(()=>{fe(),_e(),be(),Oo(),tp=e=>{let t=e[0].dataType,r=q.size(e[0].dims),i=q.size(e[1].dims),n=i%4===0,a=s=>{let u=G("x",t,[1],4),p=G("bias",t,[1],4),l=ue("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],m=w=>`
      let bias${w}_offset: u32 = (global_idx * 4 + ${w}) % uniforms.bias_size;
      let bias${w} = ${p.getByOffset(`bias${w}_offset / 4`)}[bias${w}_offset % 4];`,_=n?`
      let bias = ${p.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${m(0)}${m(1)}${m(2)}${m(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(f).declareVariables(u,p,l)}

    ${io(dt(t))}

    ${s.mainStart(wi)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${_}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",no("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/wi/4)}})}},pm=e=>{e.inputs.length<2||q.size(e.inputs[1].dims)===0?zf(e):e.compute(tp(e.inputs))}}),rp,ip,cm,hm,g0=j(()=>{fe(),_e(),Ke(),be(),rp=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},ip=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=q.normalizeAxis(t.axis,n),s=r.slice(0);s.splice(a,1,...i);let u=r[a],p=e[0].dataType===9?4:1,l=Math.ceil(q.size(s)/p),f=[{type:12,data:l},{type:6,data:u},{type:12,data:a},...ce(e[0].dims,e[1].dims,s)],m=_=>{let w=G("data",e[0].dataType,e[0].dims.length,p),v=G("inputIndices",e[1].dataType,e[1].dims.length),x=ue("output",e[0].dataType,s.length,p),I=E=>{let z=i.length,C=`var indicesIndices${E}  = ${v.type.indices}(0);`;for(let O=0;O<z;O++)C+=`${z>1?`indicesIndices${E}[${O}]`:`indicesIndices${E}`} = ${s.length>1?`outputIndices${E}[uniforms.axis + ${O}]`:`outputIndices${E}`};`;C+=`
          var idx${E} = ${v.getByIndices(`indicesIndices${E}`)};
          if (idx${E} < 0) {
            idx${E} = idx${E} + uniforms.axisDimLimit;
          }
          var dataIndices${E} : ${w.type.indices};
        `;for(let O=0,M=0;O<n;O++)O===a?(C+=`${n>1?`dataIndices${E}[${O}]`:`dataIndices${E}`} = u32(idx${E});`,M+=z):(C+=`${n>1?`dataIndices${E}[${O}]`:`dataIndices${E}`} = ${s.length>1?`outputIndices${E}[${M}]`:`outputIndices${E}`};`,M++);return C},k;if(e[0].dataType===9){let E=(z,C,O="")=>`
          let outputIndices${C} = ${x.offsetToIndices(`outputOffset + ${C}u`)};
          ${I(C)};
          let offset${C} = ${w.indicesToOffset(`dataIndices${C}`)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${z}[${C}] = ${O}(${w.getByOffset(`index${C}`)}[component${C}]);
        `;k=`
        let outputOffset = global_idx * ${p};
        var value = vec4<u32>(0);
        ${E("value",0,"u32")}
        ${E("value",1,"u32")}
        ${E("value",2,"u32")}
        ${E("value",3,"u32")}
        ${x.setByOffset("global_idx","value")}
      `}else k=`
      let outputIndices = ${x.offsetToIndices("global_idx")};
      ${I("")};
      let value = ${w.getByIndices("dataIndices")};
      ${x.setByOffset("global_idx","value")};
      `;return`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(w,v,x)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${k}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:m}},cm=e=>Me({axis:e.axis}),hm=(e,t)=>{let r=e.inputs;rp(r),e.compute(ip(e.inputs,t))}}),np,fm,mm,y0=j(()=>{fe(),_e(),be(),np=(e,t,r,i,n,a,s,u,p)=>{let l=[{type:12,data:a},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:p}],f=[a];l.push(...ce(t.dims,f));let m=_=>{let w=G("indices_data",t.dataType,t.dims.length),v=ue("input_slice_offsets_data",12,1,1),x=[w,v],I=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${_.registerUniforms(I).declareVariables(...x)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:m},{inputs:[t],outputs:[-1]})[0]},fm=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,a=r[1].dims,s=a[a.length-1],u=q.sizeToDimension(a,a.length-1),p=q.sizeFromDimension(i,t.batchDims+s),l=q.sizeToDimension(i,t.batchDims),f=q.sizeFromDimension(i,t.batchDims),m=u/l,_=new Array(s),w=p;for(let C=0;C<s;++C)_[s-1-C]=w,w*=i[t.batchDims+s-1-C];let v=np(e,r[1],_,t.batchDims,i,u,m,f,s),x=t.batchDims+s;if(x>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let I=a.slice(0,-1).concat(i.slice(x)),k=q.size(I),E=[{type:12,data:k},{type:12,data:p},...ce(r[0].dims,v.dims,I)],z=C=>{let O=G("data",r[0].dataType,r[0].dims.length),M=G("slice_offsets",12,v.dims.length),D=ue("output",r[0].dataType,I.length);return`
          ${C.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(O,M,D)}
            ${C.mainStart()}
            ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:I,dataType:n}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:E}),getShaderSource:z},{inputs:[r[0],v]})},mm=e=>({batchDims:e.batch_dims,cacheKey:""})}),ap,sp,gm,ym,_0=j(()=>{fe(),_e(),Ke(),be(),ap=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=q.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==n.dims.length||!n.dims.map((u,p)=>p===r?Math.ceil(u/i)===a.dims[p]:u===a.dims[p]).reduce((u,p)=>u&&p,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((u,p)=>u===a.dims[p]).reduce((u,p)=>u&&p,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},sp=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=q.normalizeAxis(t.gatherAxis,n),s=q.normalizeAxis(t.quantizeAxis,n),u=r.slice(0);u.splice(a,1,...i);let p=q.size(u),l=e[2].dataType,f=e[0].dataType===22,m=[{type:12,data:p},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...ce(...e.map((w,v)=>w.dims),u)],_=w=>{let v=G("data",e[0].dataType,e[0].dims.length),x=G("inputIndices",e[1].dataType,e[1].dims.length),I=G("scales",e[2].dataType,e[2].dims.length),k=e.length>3?G("zeroPoint",e[3].dataType,e[3].dims.length):void 0,E=ue("output",l,u.length),z=[v,x,I];k&&z.push(k);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${w.registerUniforms(C).declareVariables(...z,E)}
        ${w.mainStart()}
        let output_indices = ${E.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${E.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${E.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${v.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${E.indicesGet("output_indices","i")};
          ${v.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${v.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${E.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${v.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${v.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${v.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${I.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${I.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${I.getByIndices("scale_indices")};
        ${k?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${k.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${k.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${dt(l)}(quantized_data - zero_point) * scale;
        ${E.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((w,v)=>v!==1).map(w=>w.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(w,v)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:l}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:_}},gm=(e,t)=>{let r=e.inputs;ap(r,t),e.compute(sp(e.inputs,t))},ym=e=>Me({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),op,up,_m,bm,b0=j(()=>{fe(),_e(),Ke(),be(),op=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},up=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,a=e[1].dims,s=e[1].dataType,u=q.normalizeAxis(t.axis,n),p=r[u],l=a.slice(0),f=q.size(l),m=G("input",i,n),_=G("indicesInput",s,a.length),w=ue("output",i,l.length),v=[{type:12,data:f},{type:6,data:p},{type:12,data:u}];return v.push(...ce(r,a,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:v}),getShaderSource:x=>`
      ${x.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,_,w)}
      ${x.mainStart()}
      ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${w.offsetToIndices("global_idx")};

      var idx = ${_.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${m.type.indices}(outputIndices);
      ${m.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${m.getByIndices("inputIndices")};

      ${w.setByOffset("global_idx","value")};
  }`}},_m=e=>Me({axis:e.axis}),bm=(e,t)=>{let r=e.inputs;op(r),e.compute(up(e.inputs,t))}}),lp,dp,wm,vm,w0=j(()=>{fe(),_e(),be(),lp=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},dp=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,a,s]=yh.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[n,a];if(!u)throw new Error("Can't use gemm on the given tensors");let p=16,l=Math.ceil(a/p),f=Math.ceil(n/p),m=!0,_=q.size(u),w=[{type:12,data:m?l:_},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],v=["type","type"];e.length===3&&(w.push(...ce(e[2].dims)),v.push("rank")),w.push(...ce(u));let x=k=>{let E="";t.transA&&t.transB?E="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?E="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?E="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(E="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let z=t.alpha===1?"":"value *= uniforms.alpha;",C=G("a",e[0].dataType,e[0].dims),O=G("b",e[1].dataType,e[1].dims),M=C.type.value,D=null,S=[C,O];e.length===3&&(D=G("c",e[2].dataType,e[2].dims.length),S.push(D));let P=ue("output",e[0].dataType,u.length);S.push(P);let V=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${k.registerUniforms(V).declareVariables(...S)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${M}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${E}
    }

    ${z}
    ${D!=null?`let cOffset = ${D.broadcastedIndicesToOffset("vec2(m, n)",P)}; value += ${M}(uniforms.beta) * ${D.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},I=k=>{let E=G("a",e[0].dataType,e[0].dims),z=G("b",e[1].dataType,e[1].dims),C=null,O=[E,z];e.length===3&&(C=G("c",e[2].dataType,e[2].dims.length),O.push(C));let M=ue("output",e[0].dataType,u.length);O.push(M);let D=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],S="",P="";t.transA&&t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${E.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${z.type.value}(0);
      }
      `,S="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${E.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${z.type.value}(0);
      }
      `,S="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${E.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${z.type.value}(0);
      }
      `,S="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${E.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${z.type.value}(0);
      }
      `,S="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let V=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${k.registerUniforms(D).declareVariables(...O)}
  var<workgroup> tile_a: array<array<${E.type.storage}, ${p}>, ${p}>;
  var<workgroup> tile_b: array<array<${z.type.storage}, ${p}>, ${p}>;
  ${k.mainStart([p,p,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${p};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${p};
    let num_tiles = (uniforms.K - 1) / ${p} + 1;
    var k_start = 0u;
    var value = ${M.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${P}
      k_start = k_start + ${p};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${p}; k++) {
        ${S}
      }
      workgroupBarrier();
    }

    ${V}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",M)}; value += ${M.type.value}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return m?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:l*f},programUniforms:w}),getShaderSource:I}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:w}),getShaderSource:x}},wm=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},vm=(e,t)=>{lp(e.inputs),e.compute(dp(e.inputs,t))}}),Kt,lr,Rr,Or,pp,cp,hp,fp,mp,gp,yp,_p,$m,xm,v0=j(()=>{fe(),_e(),Ke(),be(),[Kt,lr,Rr,Or]=[0,1,2,3],pp=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},cp=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,hp=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,fp=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,mp=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,gp=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Kt}] = batch;
     indices[${lr}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Rr}] = u32(r);
            indices[${Or}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Rr}] = u32(clamp(r, 0, H - 1));
          indices[${Or}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Rr}] = gs_reflect(r, border[1], border[3]);
          indices[${Or}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,yp=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Kt}], indices[${lr}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Kt}], indices[${lr}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Kt}], indices[${lr}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Kt}], indices[${lr}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Kt}], indices[${lr}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Kt}], indices[${lr}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,_p=(e,t)=>{let r=G("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=G("grid",e[1].dataType,i.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Kt,lr,Rr,Or]=[0,3,1,2]);let s=ue("output",e[0].dataType,a.length),u=r.type.value,p=q.size(a),l=[{type:12,data:p},...ce(e[0].dims,i,a)],f=m=>`
  ${m.registerUniform("output_size","u32").declareVariables(r,n,s)}
  ${cp}
  ${hp(u)}
  ${fp(t)}
  ${mp(t)}
  ${gp(r,u,t)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Rr}]);
      let W_in = i32(uniforms.x_shape[${Or}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Kt}], indices[${Rr}], indices[${Or}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${yp(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:m=>{let _=q.size(a);return{outputs:[{dims:a,dataType:m[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:l}},getShaderSource:f}},$m=(e,t)=>{pp(e.inputs),e.compute(_p(e.inputs,t))},xm=e=>Me({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),ct,bp,Em,Ts,wp,on,Sm,Tm=j(()=>{fe(),_e(),Ke(),Co(),Ro(),be(),$r(),ct=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,bp=(e,t)=>{let r=e[0],i=ct(e,1),n=ct(e,2),a=ct(e,3),s=ct(e,4),u=ct(e,5),p=ct(e,6),l=ct(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=r.dims[0],m=r.dims[1],_=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],w=m,v=0,x=0,I=Math.floor(_/t.numHeads);if(p&&l&&q.size(p.dims)&&q.size(l.dims)){if(p.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(p.dims[0]!==f||p.dims[1]!==t.numHeads||p.dims[3]!==I)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==f||l.dims[1]!==t.numHeads||l.dims[3]!==I)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');v=p.dims[2],x=p.dims[2]}else if(p&&q.size(p.dims)||l&&q.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let k;if(i&&q.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');k=2,w=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==I)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');k=5,w=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==I)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');k=0,w=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');k=3}if(a&&q.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let E=v+w,z=0;if(s&&q.size(s.dims)>0){z=8;let D=s.dims;throw D.length===1?D[0]===f?z=1:D[0]===3*f+2&&(z=3):D.length===2&&D[0]===f&&D[1]===E&&(z=5),z===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let C=!1,O=_;if(n&&q.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(w!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');O=n.dims[2]}else{if(w!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');O=n.dims[1]*n.dims[3],C=!0}}let M=!1;if(s&&q.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&q.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==f||u.dims[1]!==t.numHeads||u.dims[2]!==m||u.dims[3]!==E)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:m,pastSequenceLength:v,kvSequenceLength:w,totalSequenceLength:E,maxSequenceLength:x,inputHiddenSize:0,hiddenSize:_,vHiddenSize:O,headSize:I,vHeadSize:Math.floor(O/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:z,scale:t.scale,broadcastResPosBias:M,passPastInKv:C,qkvFormat:k}},Em=e=>Me({...e}),Ts=Me({perm:[0,2,1,3]}),wp=(e,t,r,i,n,a,s)=>{let u=[i,n,a],p=q.size(u),l=[{type:12,data:p},{type:12,data:s},{type:12,data:a}],f=m=>{let _=ue("qkv_with_bias",t.dataType,u),w=G("qkv",t.dataType,u),v=G("bias",r.dataType,u),x=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${m.registerUniforms(x).declareVariables(w,v,_)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:l}),getShaderSource:f},{inputs:[t,r],outputs:[-1]})[0]},on=(e,t,r,i,n,a,s,u)=>{let p=a;if(s&&q.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return p=wp(e,a,s,t,i,r*n,u),p=p.reshape([t,i,r,n]),r===1||i===1?p:e.compute(Et(p,Ts.perm),{inputs:[p],outputs:[-1]})[0]}else return a.dims.length===3&&(p=a.reshape([t,i,r,n])),r===1||i===1?p:e.compute(Et(p,Ts.perm),{inputs:[p],outputs:[-1]})[0]},Sm=(e,t)=>{let r=bp(e.inputs,t),i=e.inputs[0],n=ct(e.inputs,1),a=ct(e.inputs,2),s=ct(e.inputs,3),u=ct(e.inputs,4),p=ct(e.inputs,5),l=ct(e.inputs,6),f=ct(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if((n==null?void 0:n.dims.length)===5)throw new Error("Packed KV is not implemented");let m=n&&a&&n.dims.length===4&&a.dims.length===4,_=on(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(m)return dn(e,_,n,a,u,void 0,l,f,p,r);if(!n||!a)throw new Error("key and value must be provided");let w=on(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,s,r.hiddenSize),v=on(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);dn(e,_,w,v,u,void 0,l,f,p,r)}}),vp,$p,xp,Ep,lo,km,Im,Cm=j(()=>{fe(),_e(),Ke(),be(),vp=e=>{if(!e||e.length<1)throw new Error("too few inputs")},$p=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),Me({numOutputs:i,axis:t.axis,splitSizes:r})},xp=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${de("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Ep=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},lo=(e,t)=>{let r=e[0].dims,i=q.size(r),n=e[0].dataType,a=q.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=G("input",n,r.length),p=new Array(t.numOutputs),l=[],f=[],m=0,_=[{type:12,data:i}];for(let v=0;v<t.numOutputs;v++){m+=t.splitSizes[v],p[v]=m;let x=r.slice();x[a]=t.splitSizes[v],f.push(x),s[v]=ue(`output${v}`,n,x.length),l.push({dims:f[v],dataType:e[0].dataType})}_.push({type:12,data:p},...ce(r,...f));let w=v=>`
  ${v.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",p.length).declareVariables(u,...s)}
  ${xp(p.length)}
  ${Ep(s)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${de("uniforms.size_in_split_axis","output_number - 1u",p.length)};
      ${u.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:_})}},km=(e,t)=>{vp(e.inputs);let r=e.inputs.length===1?t:$p(e.inputs,t);e.compute(lo(e.inputs,r),{inputs:[0]})},Im=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return Me({axis:t,numOutputs:i,splitSizes:r})}}),Sp,pa,Am,zm=j(()=>{fe(),_e(),Ke(),be(),Sp=(e,t)=>{let[r,i,n,a]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!q.areEqual(i.dims,[])&&!q.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!q.areEqual(n.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let p=r.dims[0],l=r.dims[r.dims.length-2],f=n.dims[0],m=q.sizeFromDimension(r.dims,1)/l,_=u===0?n.dims[1]*2:m/s;if(u>_)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(p!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(l!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(l>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(_/2!==n.dims[1]&&u/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`)},pa=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:a}=t,s=e[0].dims[0],u=q.sizeFromDimension(e[0].dims,1),p=e[0].dims[e[0].dims.length-2],l=u/p,f=e[2].dims[1],m=n===0?f*2:l/i,_=new Array(s,p,l/m,m-f),w=q.computeStrides(_),v=[{type:1,data:a},{type:12,data:_},{type:12,data:w},...e[0].dims.length===3?new Array({type:12,data:[u,l,m,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,m,p*m,1]}):[],...ce(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],x=I=>{let k=G("input",e[0].dataType,e[0].dims.length),E=G("position_ids",e[1].dataType,e[1].dims.length),z=G("cos_cache",e[2].dataType,e[2].dims.length),C=G("sin_cache",e[3].dataType,e[3].dims.length),O=ue("output",e[0].dataType,e[0].dims.length);return I.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:_.length},{name:"global_strides",type:"u32",length:w.length},{name:"input_output_strides",type:"u32",length:w.length}]),`
        ${I.declareVariables(k,E,z,C,O)}

        ${I.mainStart(wi)}
          let half_rotary_emb_dim = uniforms.${z.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${I.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${E.broadcastedIndicesToOffset("bsnh.xy",ue("",E.type.tensor,2))};
            let position_id =
                u32(${E.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${k.getByOffset("i")} * ${z.get("position_id","bsnh[3]")} -
                ${k.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${O.setByOffset("i","re")}
            let im = ${k.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} +
                ${k.getByOffset("j")} * ${z.get("position_id","bsnh[3]")};
            ${O.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${O.setByOffset("k",k.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:Me({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(q.size(_)/wi)},programUniforms:v})}},Am=(e,t)=>{Sp(e.inputs,t),e.compute(pa(e.inputs,t))}}),Tp,kp,ks,Ip,Rm,$0=j(()=>{Ke(),fe(),Ro(),Tm(),Cm(),$r(),zm(),be(),Tp=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,p=r.dims[0],l=r.dims[1],f=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],m=l,_=0,w=!i||i.dims.length===0,v=Math.floor(w?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);w&&(f=v*t.numHeads);let x=a&&a.dims.length!==0,I=s&&s.dims.length!==0;if(x&&a.dims.length===4&&a.dims[0]===p&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===v)throw new Error("BSNH pastKey/pastValue is not supported");if(x&&I){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=a.dims[2]}else if(x||I)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let k=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');m=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==v)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');m=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==v)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');m=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');k=3}let E=0,z=!1,C=t.kvNumHeads?v*t.kvNumHeads:f;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(m!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=n.dims[2]}else{if(m!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=n.dims[1]*n.dims[3],z=!0}}let O=e.length>4?e[5]:void 0;if(O){if(O.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let M=O.dims.reduce((D,S)=>D*S,1);if(M!==p)throw new Error(`seqlens_k must have batch_size (${p}) elements, got ${M}.`);for(let D=0;D<O.dims.length;D++)if(O.dims[D]!==1&&O.dims[D]!==p)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${p}), got dims[${D}] = ${O.dims[D]}.`)}return{batchSize:p,sequenceLength:l,pastSequenceLength:_,kvSequenceLength:m,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:C,headSize:v,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:E,scale:t.scale,broadcastResPosBias:!1,passPastInKv:z,qkvFormat:k}},kp=Me({perm:[0,2,1,3]}),ks=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(Et(i,kp.perm),{inputs:[i],outputs:[-1]})[0]),i},Ip=(e,t,r,i)=>{let n=7,a=["type","type"],s=[e*t],u=e*t,p=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],l=f=>{let m=G("seq_lens",r.dataType,r.dims),_=G("total_seq_lens",i.dataType,i.dims),w=ue("pos_ids",n,s),v=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${f.registerUniforms(v).declareVariables(m,_,w)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${_.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${m.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${w.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${w.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${w.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:l}},Rm=(e,t)=>{var C;let r=Tp(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((C=e.inputs[1])==null?void 0:C.dims.length)===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,p=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,f=r.kvNumHeads?r.kvNumHeads:r.numHeads,m=Me({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,f*r.headSize,f*r.headSize]}),[_,w,v]=!n&&!a?e.compute(lo([i],m),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,a],x,I;if(t.doRotary){let O=e.compute(Ip(r.batchSize,r.sequenceLength,p,l),{inputs:[p,l],outputs:[-1]})[0],M=e.inputs[7],D=e.inputs[8],S=Me({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),P=[_,O,M,D],V=[-1];x=e.compute(pa(P,S),{inputs:P,outputs:V})[0],P.splice(0,1,w);let re=Me({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});I=e.compute(pa(P,re),{inputs:P,outputs:V})[0]}let k=on(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?x:_,void 0,0),E=ks(e,t.doRotary?I:w,r),z=ks(e,v,r);dn(e,k,E,z,void 0,void 0,s,u,void 0,r,p,l)}}),Is,Cp,Ap,Om,x0=j(()=>{fe(),_e(),$r(),be(),Is=(e,t,r,i,n,a,s,u)=>{let p=je(a),l=p===1?"f32":`vec${p}f`,f=p===1?"vec2f":`mat2x${p}f`,m=n*s,_=64;m===1&&(_=256);let w=[n,s,a/p],v=[n,s,2],x=["rank","type","type"],I=[];I.push(...ce(w,v));let k=E=>{let z=G("x",t.dataType,3,p),C=G("scale",r.dataType,r.dims),O=G("bias",i.dataType,i.dims),M=ue("output",1,3,2),D=[z,C,O,M];return`
  var<workgroup> workgroup_shared : array<${f}, ${_}>;
  const workgroup_size = ${_}u;
  ${E.declareVariables(...D)}
  ${E.mainStart(_)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${z.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${vr("workgroup_shared[0][0]",p)} / f32(hight * ${p});
      let squared_sum_final = ${vr("workgroup_shared[0][1]",p)} / f32(hight * ${p});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${p};${u};${_}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:v,dataType:1}],dispatchGroup:{x:m},programUniforms:I}),getShaderSource:k},{inputs:[t,r,i],outputs:[-1]})[0]},Cp=(e,t,r)=>{let i=t[0].dims,n=i,a=2,s=i[0],u=i[1],p=q.sizeFromDimension(i,a),l=je(p),f=q.size(n)/l,m=Is(e,t[0],t[1],t[2],s,p,u,r.epsilon),_=[s,u,p/l],w=[s,u],v=["type","none"],x=I=>{let k=G("x",t[0].dataType,_.length,l),E=G("scale_shift",1,w.length,2),z=ue("output",t[0].dataType,_.length,l),C=[k,E,z];return`
  ${I.registerUniform("output_size","u32").declareVariables(...C)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${z.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${E.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${k.getByOffset("global_idx")} * ${z.type.value}(scale_shift.x) + ${z.type.value}(scale_shift.y);
      ${z.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...ce(_,w,_)]}),getShaderSource:x},{inputs:[t[0],m]})},Ap=(e,t,r)=>{let i=t[0].dims,n=i,a=i[0],s=i[i.length-1],u=q.sizeFromDimension(i,1)/s,p=je(s),l=q.size(n)/p,f=[{type:12,data:u},{type:12,data:Math.floor(s/p)}],m=["type","type"],_=!1,w=[0,i.length-1];for(let k=0;k<i.length-2;k++)_=_||i[k+1]!==1,w.push(k+1);_=_&&i[i.length-1]!==1;let v=_?e.compute(Et(e.inputs[0],w),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(k,E)=>i[w[E]])),x=Is(e,v,t[1],t[2],a,u,s,r.epsilon),I=k=>{let E=Je(t[0].dataType),z=p===1?"vec2f":`mat${p}x2f`,C=D=>{let S=D===0?"x":"y",P=p===1?"f32":`vec${p}f`;switch(p){case 1:return`${E}(${P}(scale.${S}))`;case 2:return`vec2<${E}>(${P}(scale[0].${S}, scale[1].${S}))`;case 4:return`vec4<${E}>(${P}(scale[0].${S}, scale[1].${S}, scale[2].${S}, scale[3].${S}))`;default:throw new Error(`Not supported compoents ${p}`)}},O=G("input",t[0].dataType,t[0].dims,p),M=ue("output",t[0].dataType,n,p);return`
  @group(0) @binding(0) var<storage, read> input : array<${O.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${z}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${M.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${k.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${C(0)}, ${C(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${p}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:I},{inputs:[t[0],x]})},Om=(e,t)=>{t.format==="NHWC"?Ap(e,e.inputs,t):Cp(e,e.inputs,t)}}),zp,Rp,Mm,E0=j(()=>{fe(),_e(),be(),zp=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Rp=(e,t,r)=>{let i=t.simplified,n=e[0].dims,a=e[1],s=!i&&e[2],u=n,p=q.normalizeAxis(t.axis,n.length),l=q.sizeToDimension(n,p),f=q.sizeFromDimension(n,p),m=q.size(a.dims),_=s?q.size(s.dims):0;if(m!==f||s&&_!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${m} and bias size of ${_}`);let w=[];for(let O=0;O<n.length;++O)O<p?w.push(n[O]):w.push(1);let v=je(f),x=["type","type"],I=[{type:12,data:l},{type:1,data:f},{type:12,data:Math.floor(f/v)},{type:1,data:t.epsilon}];s&&x.push("type");let k=r>1,E=r>2,z=O=>{let M=Je(e[0].dataType),D=[G("x",e[0].dataType,e[0].dims,v),G("scale",a.dataType,a.dims,v)];s&&D.push(G("bias",s.dataType,s.dims,v)),D.push(ue("output",e[0].dataType,u,v)),k&&D.push(ue("mean_data_output",1,w)),E&&D.push(ue("inv_std_output",1,w));let S=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${O.registerUniforms(S).declareVariables(...D)}
  ${O.mainStart()}
    ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${eo("f32",v)};
    var mean_square_vector = ${eo("f32",v)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${gi(M,v,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${vr("mean_vector",v)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${vr("mean_square_vector",v)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${gi(M,v,"x[j + offset]")};
      let f32scale = ${gi(M,v,"scale[j]")};
      output[j + offset] = ${D[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${gi(M,v,"bias[j]")}`:""}
      );
    }

    ${k?"mean_data_output[global_idx] = mean":""};
    ${E?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},C=[{dims:u,dataType:e[0].dataType}];return k&&C.push({dims:w,dataType:1}),E&&C.push({dims:w,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${v};${r};${i}`,inputDependencies:x},getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:I}),getShaderSource:z}},Mm=(e,t)=>{zp(e.inputs),e.compute(Rp(e.inputs,t,e.outputCount))}}),Op,Nm,S0=j(()=>{_e(),Bo(),Lo(),Op=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Nm=e=>{Op(e.inputs);let t=bi.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(Do(e.inputs,{activation:""},t));else{let n=t[t.length-2],a=q.size(e.inputs[0].dims.slice(0,-2)),s=q.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&n===1&&s===1){let u=e.inputs[0].reshape([1,a,i]),p=e.inputs[1].reshape([1,i,r]),l=[1,a,r],f=[u,p];e.compute(da(f,{activation:""},t,l),{inputs:f})}else e.compute(da(e.inputs,{activation:""},t))}}}),Mp,Np,Dp,Dm,Bm,T0=j(()=>{fe(),_e(),Ke(),be(),Mp=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!q.areEqual(s.dims,[t.n,n,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(q.size(u)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let p=e[3].dims,l=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(q.size(p)!==l)throw new Error("zeroPoints input size error.")}},Np=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,u=r.slice(0,i-2),p=q.size(u),l=e[1].dims[2]/4,f=e[0].dataType,m=je(t.k),_=je(l),w=je(s),v=u.concat([n,s]),x=n>1&&s/w%2===0?2:1,I=q.size(v)/w/x,k=64,E=[],z=[p,n,a/m],C=q.convertShape(e[1].dims).slice();C.splice(-1,1,l/_),E.push(...ce(z)),E.push(...ce(C)),E.push(...ce(e[2].dims)),e.length===4&&E.push(...ce(q.convertShape(e[3].dims)));let O=[p,n,s/w];E.push(...ce(O));let M=D=>{let S=z.length,P=G("a",e[0].dataType,S,m),V=G("b",12,C.length,_),re=G("scales",e[2].dataType,e[2].dims.length),ae=[P,V,re],J=e.length===4?G("zero_points",12,e[3].dims.length):void 0;J&&ae.push(J);let U=O.length,ie=ue("output",e[0].dataType,U,w),se=Je(e[0].dataType),pe=(()=>{switch(m){case 1:return`array<${se}, 8>`;case 2:return`mat4x2<${se}>`;case 4:return`mat2x4<${se}>`;default:throw new Error(`${m}-component is not supported.`)}})(),Ae=Math.floor(32/t.bits),Y=Math.floor(Ae/8),ve=()=>{let oe="";for(let X=0;X<Y;X++){let Se=X*t.bits*4,et=Se+t.bits;oe+=`
          // reuse a data (pass ${X})
            var input_offset${X>0?X:""} = ${X===0?P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${X>0?X:""}: ${pe};
            for (var j${X>0?X:""}: u32 = 0; j${X>0?X:""} < ${8/m}; j${X>0?X:""}++) {
              a_data${X>0?X:""}[j${X>0?X:""}] = ${P.getByOffset(`input_offset${X>0?X:""}`)};
              input_offset${X>0?X:""}++;
            }
          `;for(let De=0;De<w*x;De++)oe+=`
            b_value = ${_===1?`b${De}_data`:`b${De}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${X*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${Se}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${et}u) & b_mask);`}
            b_quantized_values = ${pe}(${Array.from({length:4},(Ze,Ye)=>`${se}(b_value_lower[${Ye}]), ${se}(b_value_upper[${Ye}])`).join(", ")});
            b_dequantized_values = ${m===1?`${pe}(${Array.from({length:8},(Ze,Ye)=>`(b_quantized_values[${Ye}] - ${J?`zero_point${De}`:"zero_point"}) * scale${De}`).join(", ")});`:`(b_quantized_values - ${pe}(${Array(8).fill(`${J?`zero_point${De}`:"zero_point"}`).join(",")})) * scale${De};`};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(De/w)}]${w>1?`[${De%w}]`:""} += ${Array.from({length:8/m},(Ze,Ye)=>`${m===1?`a_data${X>0?X:""}[${Ye}] * b_dequantized_values[${Ye}]`:`dot(a_data${X>0?X:""}[${Ye}], b_dequantized_values[${Ye}])`}`).join(" + ")};
          `}return oe},K=()=>{let oe=`
            var col_index = col * ${w};
            ${J?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${se}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let X=0;X<w*x;X++)oe+=`
            let scale${X} = ${re.getByOffset("col_index * nBlocksPerCol + block")};
            ${J?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${X} = ${se}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return oe},Z=()=>{let oe=`col_index = col * ${w};`;for(let X=0;X<w*x;X++)oe+=`
            let b${X}_data = ${V.getByIndices(`${V.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return oe+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${pe};
            var b_dequantized_values: ${pe};`,oe};return`
        var<workgroup> workgroup_shared: array<${ie.type.value}, ${x*k}>;
        ${D.declareVariables(...ae,ie)}
        ${D.mainStart([k,1,1])}
          let output_indices = ${ie.offsetToIndices(`(global_idx / ${k}) * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${k}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/m};
            ${K()}
            for (var word: u32 = 0; word < ${l}; word += ${_}) {
              ${Z()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${ve()}
                word_offset += ${Ae/m};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${x}) {
            var output_value: ${ie.type.value} = ${ie.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${k}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${ie.setByIndices(`${ie.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${m};${_};${w};${x};${k}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:v,dataType:f}],dispatchGroup:{x:I},programUniforms:E}),getShaderSource:M}},Dp=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,u=r.slice(0,i-2),p=q.size(u),l=e[1].dims[2]/4,f=e[0].dataType,m=je(t.k),_=je(l),w=u.concat([n,s]),v=128,x=s%8===0?8:s%4===0?4:1,I=v/x,k=Math.floor(32/t.bits),E=I*_*k,z=E/m,C=E/t.blockSize,O=q.size(w)/x,M=[],D=[p,n,a/m],S=q.convertShape(e[1].dims).slice();S.splice(-1,1,l/_),M.push(...ce(D)),M.push(...ce(S)),M.push(...ce(e[2].dims)),e.length===4&&M.push(...ce(q.convertShape(e[3].dims)));let P=[p,n,s];M.push(...ce(P));let V=re=>{let ae=D.length,J=G("a",e[0].dataType,ae,m),U=G("b",12,S.length,_),ie=G("scales",e[2].dataType,e[2].dims.length),se=[J,U,ie],pe=e.length===4?G("zero_points",12,e[3].dims.length):void 0;pe&&se.push(pe);let Ae=P.length,Y=ue("output",e[0].dataType,Ae),ve=Je(e[0].dataType),K=()=>{switch(m){case 1:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${m}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${J.type.value}, ${z}>;
        var<workgroup> inter_results: array<array<${Y.type.value}, ${I}>, ${x}>;
        ${re.declareVariables(...se,Y)}
        ${re.mainStart([I,x,1])}
          let output_indices = ${Y.offsetToIndices(`workgroup_index * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${C} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${z};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${z}; a_offset += ${v})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${J.getByIndices(`${J.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${J.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${C} + local_id.x;
            ${pe?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${pe.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ve}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${ve}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${ie.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${U.getByIndices(`${U.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/m};
            for (var i: u32 = 0; i < ${_}; i++) {
              let b_value = ${_===1?"b_data":"b_data[i]"};
              ${(()=>{let Z=Math.floor(k/8),oe="";for(let X=0;X<Z;X++){let Se=X*t.bits*4,et=Se+t.bits;oe+=`
              ${K()}
              {${t.bits===2?`
                let half_word = b_value >> ${X*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${Se}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${et}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${ve}>(${Array.from({length:4},(De,Ze)=>`${ve}(b_value_lower[${Ze}]), ${ve}(b_value_upper[${Ze}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${ve}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(De,Ze)=>`${`dot(a_data${Ze}, b_dequantized_values[${Ze}])`}`).join(" + ")};
              }
              word_offset += ${8/m};`}return oe})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${x}) {
            var output_value: ${Y.type.value} = ${Y.type.value}(0);
            for (var b = 0u; b < ${I}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Y.setByIndices(`${Y.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${m};${_};${I};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:f}],dispatchGroup:{x:O},programUniforms:M}),getShaderSource:V}},Dm=(e,t)=>{Mp(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Dp(e.inputs,t)):e.compute(Np(e.inputs,t))},Bm=e=>Me(e)}),Bp,Lp,Pp,qp,Up,Wp,Vp,Gp,Lm,k0=j(()=>{fe(),_e(),be(),Bp=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Lp=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${de("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${de("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${de("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},Pp=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${de("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${de("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${de("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${de("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},qp=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${de("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${de("uniforms.x_shape",n,t)})) {
                  k = i32(${de("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${de("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Up=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${de("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${de("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${de("uniforms.x_shape",n,t)})) {
                  k -= i32(${de("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${de("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Wp=(e,t,r)=>{switch(r.mode){case 0:return Lp(e,t,r.pads.length);case 1:return Pp(e,t,r.pads.length);case 2:return qp(e,t,r.pads.length);case 3:return Up(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Vp=(e,t)=>{let r=q.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=q.size(r),a=[{type:12,data:n},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...ce(e[0].dims,r));let u=["rank"],p=l=>{let f=ue("output",e[0].dataType,r.length),m=G("x",e[0].dataType,i.length),_=m.type.value,w=Wp(f,i.length,t),v=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&v.push({name:"constant_value",type:s?_:"f32"}),`
            ${l.registerUniforms(v).declareVariables(m,f)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${_}(0);
            ${w}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(q.size(r)/64)},programUniforms:a}),getShaderSource:p}},Gp=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,a=new Int32Array(2*n).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let p=0;p<u.length;p++)a[Number(u[p])]=Number(r[p]),a[Number(u[p])+n]=Number(r[p+u.length])}else r.forEach((u,p)=>a[Number(p)]=Number(u));let s=[];return a.forEach(u=>s.push(u)),{mode:t.mode,value:i,pads:s}}else return t},Lm=(e,t)=>{Bp(e.inputs);let r=Gp(e.inputs,t);e.compute(Vp(e.inputs,r),{inputs:[0]})}}),Yi,Cs,As,zs,Rs,Hp,Fp,Os,Ms,Pm,qm,Ns,Um,Wm,Ds,Vm,Gm,Hm,Fm,I0=j(()=>{It(),fe(),_e(),be(),Yi=e=>{if(He.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Cs=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),p=a?t.dilations.slice():[],l=t.pads.slice();ua.adjustPoolAttributes(r,n,s,u,p,l);let f=ua.computePoolOutputShape(r,n,u,p,s,l,t.autoPad),m=Object.assign({},t);a?Object.assign(m,{kernelShape:s,strides:u,pads:l,dilations:p,cacheKey:t.cacheKey}):Object.assign(m,{kernelShape:s,strides:u,pads:l,cacheKey:t.cacheKey});let _=f.slice();return _.push(_.splice(1,1)[0]),[m,i?_:f]},As=(e,t)=>{let r=t.format==="NHWC",i=q.size(e),n=q.size(t.kernelShape),a=[{type:12,data:i},{type:12,data:n}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],p=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],m=!!(l+f);a.push({type:12,data:u},{type:12,data:p},{type:12,data:l},{type:12,data:f}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let _=!1;if(t.kernelShape.length===2){let w=t.kernelShape[t.kernelShape.length-2],v=t.strides[t.strides.length-2],x=t.pads[t.pads.length/2-2],I=t.pads[t.pads.length-2];_=!!(x+I),a.push({type:12,data:w},{type:12,data:v},{type:12,data:x},{type:12,data:I}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,m,_]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=q.computeStrides(t.kernelShape);a.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let p=t.pads.reduce((l,f)=>l+f);return[a,s,!!p,!1,!1]}},zs=(e,t,r,i,n,a,s,u,p,l,f,m)=>{let _=n.format==="NHWC",w=t.type.value,v=ue("output",t.type.tensor,i);if(n.kernelShape.length<=2){let x="",I="",k="",E=r-(_?2:1);if(f?x=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${E}] = indices[${E}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${E}] < 0 || xIndices[${E}]
                      >= uniforms.x_shape[${E}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:x=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${E}] = indices[${E}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,n.kernelShape.length===2){let z=r-(_?3:2);m?I=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${z}] = indices[${z}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${z}] < 0 || xIndices[${z}] >= uniforms.x_shape[${z}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:I=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${z}] = indices[${z}] * uniforms.sh - uniforms.phStart + j;
                `,k=`
              }
            `}return`
            ${e.registerUniforms(p).declareVariables(t,v)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${v.offsetToIndices("global_idx")};
              var xIndices = ${v.offsetToIndices("global_idx")};

              var value = ${w}(${u});
              var pad = 0;
              ${I}
              ${x}
              ${k}
              ${s}

              output[global_idx] = value;
            }`}else{if(_)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let x=n.kernelShape.length,I=n.pads.length,k="";return l?k=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:k=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(p).declareVariables(t,v)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${v.offsetToIndices("global_idx")};
              var xIndices = ${v.offsetToIndices("global_idx")};

              var offsets: array<u32, ${x}>;

              var value = ${w}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${x-1}u; j++) {
                  offsets[j] = offset / ${de("uniforms.kernelStrides","j",x)};
                  offset -= offsets[j] * ${de("uniforms.kernelStrides","j",x)};
                }
                offsets[${x-1}] = offset;

                isPad = false;
                for (var j = ${r-x}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${de("uniforms.strides",`j - ${r-x}u`,x)}
                    + offsets[j - ${r-x}u] - ${de("uniforms.pads","j - 2u",I)};
                  ${k}
              }
              ${s}

              output[global_idx] = value;
            }`}},Rs=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Hp=e=>`${Rs(e)};${e.countIncludePad}`,Fp=e=>`${Rs(e)};${e.storageOrder};${e.dilations}`,Os=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Ms=(e,t,r,i)=>{let[n,a]=Cs(t,i,r),s=G("x",t.dataType,t.dims.length),u=s.type.value,p="value += x_val;",l="";n.countIncludePad?l+=`value /= ${u}(uniforms.kernelSize);`:l+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[f,m,_,w,v]=As(a,n);f.push(...ce(t.dims,a));let x=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${_};${w};${v}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(q.size(a)/64)},programUniforms:f}),getShaderSource:I=>zs(I,s,t.dims.length,a.length,n,p,l,0,m,_,w,v)}},Pm=e=>{let t=e.count_include_pad!==0,r=Os(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:Hp(i)}},qm=(e,t)=>{Yi(e.inputs),e.compute(Ms("AveragePool",e.inputs[0],!1,t))},Ns={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Um=e=>{let t=e.format;return{format:t,...Ns,cacheKey:t}},Wm=(e,t)=>{Yi(e.inputs),e.compute(Ms("GlobalAveragePool",e.inputs[0],!0,t))},Ds=(e,t,r,i)=>{let[n,a]=Cs(t,i,r),s=`
      value = max(x_val, value);
    `,u="",p=G("x",t.dataType,t.dims.length),l=["rank"],[f,m,_,w,v]=As(a,n);return f.push(...ce(t.dims,a)),{name:e,shaderCache:{hint:`${i.cacheKey};${_};${w};${v}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(q.size(a)/64)},programUniforms:f}),getShaderSource:x=>zs(x,p,t.dims.length,a.length,n,s,u,t.dataType===10?-65504:-1e5,m,_,w,v)}},Vm=(e,t)=>{Yi(e.inputs),e.compute(Ds("MaxPool",e.inputs[0],!1,t))},Gm=e=>{let t=e.storage_order,r=e.dilations,i=Os(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:Fp(n)}},Hm=e=>{let t=e.format;return{format:t,...Ns,cacheKey:t}},Fm=(e,t)=>{Yi(e.inputs),e.compute(Ds("GlobalMaxPool",e.inputs[0],!0,t))}}),jp,Kp,jm,Km,C0=j(()=>{fe(),_e(),Ke(),be(),jp=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,a)=>a===t.axis||n===e[0].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Kp=(e,t)=>{let r=q.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,a=e[0].dims,s=e[1].dataType,u=q.size(a),p=i===3||i===2,l=p?[Math.ceil(q.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,m=e.length>2?e[2]:void 0,_=m?p?[Math.ceil(q.size(m.dims)/4)]:m.dims:void 0,w=f.length===0||f.length===1&&f[0]===1,v=w===!1&&f.length===1,x=je(u),I=w&&(!p||x===4),k=I?x:1,E=I&&!p?x:1,z=G("input",p?12:i,l.length,E),C=G("scale",s,f.length),O=m?G("zero_point",p?12:i,_.length):void 0,M=ue("output",s,a.length,k),D=[z,C];O&&D.push(O);let S=[l,f];m&&S.push(_);let P=[{type:12,data:u/k},{type:12,data:r},{type:12,data:t.blockSize},...ce(...S,a)],V=re=>{let ae=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${re.registerUniforms(ae).declareVariables(...D,M)}
      ${re.mainStart()}
          ${re.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${M.offsetToIndices("global_idx")};

          // Set input x
          ${p?`
            let input = ${z.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${k===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${z.getByOffset("global_idx")};`};

          // Set scale input
          ${w?`let scale_value= ${C.getByOffset("0")}`:v?`
            let scale_index = ${M.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${C.getByOffset("scale_index")};`:`
            var scale_indices: ${C.type.indices} = output_indices;
            let index = ${C.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${C.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${C.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${O?w?p?`
                let zero_point_input = ${O.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${O.getByOffset("0")}`:v?p?`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${O.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${M.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${O.getByOffset("zero_point_index")};`:p?`
                let zero_point_offset = ${C.indicesToOffset("scale_indices")};
                let zero_point_input = ${O.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${O.getByIndices("scale_indices")};`:`let zero_point_value = ${p?n?"i32":"u32":z.type.value}(0);`};
      // Compute and write output
      ${M.setByOffset("global_idx",`${M.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:O?["rank","rank","rank"]:["rank","rank"]},getShaderSource:V,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(u/k/64),y:1,z:1},programUniforms:P})}},jm=(e,t)=>{jp(e.inputs,t),e.compute(Kp(e.inputs,t))},Km=e=>Me({axis:e.axis,blockSize:e.blockSize})}),Xp,Yp,Xm,A0=j(()=>{It(),fe(),be(),Xp=(e,t,r)=>{let i=e===t,n=e<t&&r<0,a=e>t&&r>0;if(i||n||a)throw new Error("Range these inputs' contents are invalid.")},Yp=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),a=[n],s=n,u=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...ce(a)],p=l=>{let f=ue("output",i,a.length),m=f.type.value,_=[{name:"outputSize",type:"u32"},{name:"start",type:m},{name:"delta",type:m}];return`
        ${l.registerUniforms(_).declareVariables(f)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${m}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:p,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},Xm=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),He.webgpu.validateInputContent&&Xp(t,r,i),e.compute(Yp(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),Qp,Zp,Ym,Qm,z0=j(()=>{fe(),_e(),Ke(),be(),Qp=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${n}bitcast<${i}>(oldValue) + (${r})${a}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${a}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Zp=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,a=1,s=Math.ceil(q.sizeToDimension(i,i.length-1)/a),u=i[i.length-1],p=q.sizeFromDimension(r,u),l=[{type:12,data:s},{type:12,data:u},{type:12,data:p},...ce(e[1].dims,e[2].dims,n)],f=m=>{let _=G("indices",e[1].dataType,e[1].dims.length),w=G("updates",e[2].dataType,e[2].dims.length,a),v=t.reduction!=="none"&&t.reduction!==""?Eh("output",e[0].dataType,n.length):ue("output",e[0].dataType,n.length,a);return`
      ${m.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(_,w,v)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Qp(t.reduction,"output[data_offset + i]","value",v.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:f}},Ym=e=>Me({reduction:e.reduction}),Qm=(e,t)=>{e.compute(Zp(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Jp,ec,tc,Bs,rc,ic,nc,ac,sc,oc,uc,lc,Ls,dc,pc,cc,hc,fc,Zm,Jm,R0=j(()=>{fe(),_e(),Ke(),be(),Jp=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},ec=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,a)=>i[n]=e[a]),i},tc=(e,t,r,i,n,a)=>{let[s,u,p]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(f=>a.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(f=>i.push(f)),i.length!==0&&i.length!==l&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Jp(i,t),t.axes.length>0&&ec(i,t.axes,l).forEach((f,m)=>i[m]=f)}if(p>0&&e.length>p&&e[p].dims.length===1&&e[p].dims[0]>0&&(e[p].getBigInt64Array().forEach(f=>n.push(Number(f))),n.length!==0&&n.length!==l&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},Bs=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,rc=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Bs("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Bs("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",ic=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",nc=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((a,s)=>{i[a]=n[s],i[s+r]=n[t.length+s]}),i):n},ac=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(a=>n.push(a)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((a,s)=>n[a]=r[s])}else r.forEach(a=>n.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((a,s)=>Math.round(a*t[s]))}return n},sc=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=i),r.axes.forEach(a=>n[a]=Math.round(e[a]*t[a]))):(t.fill(i,0,t.length),n.forEach((a,s)=>n[s]=Math.round(a*t[s]))),n},oc=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${de("uniforms.scales","i",i)};
        var roi_low = ${de("uniforms.roi","i",n)};
        var roi_hi = ${de("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${de("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${de("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,uc=(e,t,r,i,n,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${de("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${de("uniforms.roi","i",a)};
          var roi_hi = ${de("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${de("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${de("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,lc=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${de("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Ls=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",dc=(e,t,r,i,n)=>{let[a,s,u,p]=r.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${Ls(e,p,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${s}];
      var col:${l} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},pc=(e,t,r,i,n,a,s,u,p,l)=>{let f=r.length===2,[m,_]=f?[0,1]:[2,3],w=e.type.value,v=x=>{let I=x===m?"row":"col";return`
      fn ${I}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${w} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${w} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[x]},
        ${i[x]}, ${r[x]}, ${a[x]}, ${a[x]} + ${r.length});
        var fractOriginalIdx: ${w} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[x]} - 1))) {
          return ${p};
        }
        var data: array<${w}, 4> = array<${w}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${I}: ${w} = originalIdx + ${w}(i);
          if (${I} < 0 || ${I} >= ${r[x]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${p};`:`${I} = max(0, min(${I}, ${r[x]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${I})`)};
          data[i + 1] = ${x===m?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${v(m)};
    ${v(_)};
  fn getCubicInterpolationCoefs(s: ${w}) -> array<${w}, 4> {
    var absS = abs(s);
    var coeffs: array<${w}, 4> = array<${w}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${w} = 1.0 - absS;
    var twoMinusAbsS: ${w} = 2.0 - absS;
    var onePlusAbsS: ${w} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${w}, 4>, coefs: array<${w}, 4>) -> ${w} {
    var coefsSum: ${w} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${w} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},cc=(e,t,r,i,n)=>{let[a,s,u,p,l]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(width, ${r[p]} - 1))`)};
      ${Ls(e,l,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${s}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${p}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[p]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[p]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},hc=(e,t,r,i,n,a)=>{let s=e.dims,u=nc(a,t.axes,s.length),p=ac(s,i,n,t.axes),l=i.slice();i.length===0&&(l=s.map((E,z)=>E===0?1:p[z]/E),t.keepAspectRatioPolicy!=="stretch"&&(p=sc(s,l,t)));let f=ue("output",e.dataType,p.length),m=G("input",e.dataType,s.length),_=q.size(p),w=s.length===p.length&&s.every((E,z)=>E===p[z]),v=t.coordinateTransformMode==="tf_crop_and_resize",x=t.extrapolationValue,I=m.type.value,k=E=>`
      ${w?"":`
      ${rc(t.coordinateTransformMode,I)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${lc(m,s)};
              ${ic(t.nearestMode,r,I)};
              ${uc(m,f,s,p,l.length,u.length,v)};
              `;case"linear":return`
              ${oc(f,s,p,l.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${dc(m,f,s,v,x)}`;if(s.length===3||s.length===5)return`${cc(m,f,s,v,x)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${pc(m,f,s,p,l,u,t.cubicCoeffA,v,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${E.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",u.length).declareVariables(m,f)}
      ${E.mainStart()}
        ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${w?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${m.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${m.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${l.length>0?t.mode==="cubic"?l:l.length:""}|${n.length>0?n:""}|${u.length>0?u:""}|${w}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:k,getRunData:()=>({outputs:[{dims:p,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},{type:1,data:l},{type:1,data:u},...ce(s,p)]})}},fc=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Zm=(e,t)=>{let r=[],i=[],n=[],a=fc(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");tc(e.inputs,t,a,r,i,n),e.compute(hc(e.inputs[0],t,a,r,i,n),{inputs:[0]})},Jm=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,p=e.mode,l=e.nearestMode===""?"simple":e.nearestMode;return Me({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:u,mode:p,nearestMode:l})}}),mc,gc,eg,O0=j(()=>{fe(),_e(),be(),mc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},gc=(e,t,r,i)=>{let n=t.simplified,a=e[0].dims,s=q.size(a),u=a,p=s,l=a.slice(-1)[0],f=i?a.slice(0,-1).concat(1):[],m=!n&&e.length>3,_=e.length>4,w=i&&r>1,v=i&&r>2,x=r>3,I=64,k=je(l),E=[{type:12,data:p},{type:12,data:k},{type:12,data:l},{type:1,data:t.epsilon}],z=O=>{let M=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],D=[G("x",e[0].dataType,e[0].dims,k),G("skip",e[1].dataType,e[1].dims,k),G("gamma",e[2].dataType,e[2].dims,k)];m&&D.push(G("beta",e[3].dataType,e[3].dims,k)),_&&D.push(G("bias",e[4].dataType,e[4].dims,k)),D.push(ue("output",e[0].dataType,u,k)),w&&D.push(ue("mean_output",1,f)),v&&D.push(ue("inv_std_output",1,f)),x&&D.push(ue("input_skip_bias_sum",e[0].dataType,u,k));let S=Je(e[0].dataType),P=Je(1,k);return`

      ${O.registerUniforms(M).declareVariables(...D)}
      var<workgroup> sum_shared : array<${P}, ${I}>;
      var<workgroup> sum_squared_shared : array<${P}, ${I}>;

      ${O.mainStart([I,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${I};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${I};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${I-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${_?"bias[offset1d + i]":S+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${x?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${gi(S,k,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${I};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${vr("sum",k)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${vr("square_sum",k)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${w?"mean_output[global_idx] = mean;":""}
        ${v?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${S}(mean)`}) *
            ${S}(inv_std_dev) * gamma[offset1d + i]
            ${m?"+ beta[offset1d + i]":""};
        }
      }`},C=[{dims:u,dataType:e[0].dataType}];return r>1&&C.push({dims:f,dataType:1}),r>2&&C.push({dims:f,dataType:1}),r>3&&C.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${k};${w};${v};${x}`,inputDependencies:e.map((O,M)=>"type")},getShaderSource:z,getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(p/l)},programUniforms:E})}},eg=(e,t)=>{mc(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(gc(e.inputs,t,e.outputCount,!1),{outputs:r})}}),yc,Qi,_c,Ps,bc,wc,tg,rg,M0=j(()=>{fe(),_e(),Ke(),be(),yc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},Qi=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},_c=(e,t)=>{if(e.length>1){let r=Qi(e,1),i=Qi(e,2),n=Qi(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),Me({starts:r,ends:i,axes:n})}else return t},Ps=(e,t,r,i,n)=>{let a=e;return e<0&&(a+=r[i[t]]),n[t]<0?Math.max(0,Math.min(a,r[i[t]]-1)):Math.max(0,Math.min(a,r[i[t]]))},bc=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${de("uniforms.input_shape","i",r.length)};
            let steps_i = ${de("uniforms.steps","i",r.length)};
            let signs_i = ${de("uniforms.signs","i",r.length)};
            let starts_i = ${de("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,wc=(e,t)=>{let r=e[0].dims,i=q.size(r),n=t.axes.length>0?q.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=Qi(e,4);a.forEach(k=>k!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(n.length).fill(1));let s=t.starts.map((k,E)=>Ps(k,E,r,n,a)),u=t.ends.map((k,E)=>Ps(k,E,r,n,a));if(n.length!==s.length||n.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let k=0;k<r.length;++k)n.includes(k)||(s.splice(k,0,0),u.splice(k,0,r[k]),a.splice(k,0,1));let p=a.map(k=>Math.sign(k));a.forEach((k,E,z)=>{if(k<0){let C=(u[E]-s[E])/k,O=s[E],M=O+C*a[E];s[E]=M,u[E]=O,z[E]=-k}});let l=r.slice(0);n.forEach((k,E)=>{l[k]=Math.ceil((u[k]-s[k])/a[k])});let f={dims:l,dataType:e[0].dataType},m=ue("output",e[0].dataType,l.length),_=G("input",e[0].dataType,e[0].dims.length),w=q.size(l),v=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:p.length},{name:"steps",type:"u32",length:a.length}],x=[{type:12,data:w},{type:12,data:s},{type:6,data:p},{type:12,data:a},...ce(e[0].dims,l)],I=k=>`
      ${k.registerUniforms(v).declareVariables(_,m)}
        ${bc(_,m,r)}
        ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${m.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${m.setByOffset("global_idx",_.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${p.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:I,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:x})}},tg=(e,t)=>{yc(e.inputs,t);let r=_c(e.inputs,t);e.compute(wc(e.inputs,r),{inputs:[0]})},rg=e=>{let t=e.starts,r=e.ends,i=e.axes;return Me({starts:t,ends:r,axes:i})}}),vc,$c,ig,ng,N0=j(()=>{fe(),_e(),Ke(),$r(),be(),vc=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},$c=(e,t)=>{let r=e.inputs[0],i=r.dims,n=q.size(i),a=i.length,s=q.normalizeAxis(t.axis,a),u=s<i.length-1,p,l=[];u?(l=Array.from({length:a},(D,S)=>S),l[s]=a-1,l[a-1]=s,p=e.compute(Et(r,l),{inputs:[r],outputs:[-1]})[0]):p=r;let f=p.dims,m=f[a-1],_=n/m,w=je(m),v=m/w,x=64;_===1&&(x=256);let I=(D,S)=>S===4?`max(max(${D}.x, ${D}.y), max(${D}.z, ${D}.w))`:S===2?`max(${D}.x, ${D}.y)`:S===3?`max(max(${D}.x, ${D}.y), ${D}.z)`:D,k=G("x",p.dataType,p.dims,w),E=ue("result",p.dataType,p.dims,w),z=k.type.value,C=Je(p.dataType)==="f32"?`var threadMax = ${z}(-3.4028234663852886e+38f);`:`var threadMax = ${z}(-65504.0h);`,O=D=>`
      var<workgroup> rowMaxShared : ${z};
      var<workgroup> rowSumShared : ${z};
      var<workgroup> threadShared : array<${z}, ${x}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${z} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${z}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${D.registerUniform("packedCols","i32").declareVariables(k,E)}
      ${D.mainStart(x)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${x};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${C}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${z}(${I("threadShared[0]",w)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${z}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${z}(${vr("threadShared[0]",w)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${z}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,M=e.compute({name:"Softmax",shaderCache:{hint:`${w};${x}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:p.dataType}],dispatchGroup:{x:_},programUniforms:[{type:6,data:v}]}),getShaderSource:O},{inputs:[p],outputs:[u?-1:0]})[0];u&&e.compute(Et(M,l),{inputs:[M]})},ig=(e,t)=>{vc(e.inputs),$c(e,t)},ng=e=>Me({axis:e.axis})}),qs,xc,Ec,Sc,ag,D0=j(()=>{fe(),_e(),be(),qs=e=>Array.from(e.getBigInt64Array(),Number),xc=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(qs(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Ec=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Sc=(e,t)=>{let r=e[0].dims,i=t??qs(e[1]),n=Ec(r,i),a=q.size(n),s=e[0].dataType,u=G("input",s,r.length),p=ue("output",s,n.length),l=f=>`
      const inputShape = ${u.indices(...r)};
      ${f.registerUniform("output_size","u32").declareVariables(u,p)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${p.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${p.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${p.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...ce(e[0].dims,n)]}),getShaderSource:l}},ag=e=>{xc(e.inputs),e.compute(Sc(e.inputs),{inputs:[0]})}}),Tc,kc,sg,B0=j(()=>{fe(),_e(),be(),Tc=(e,t,r,i,n)=>{let a=ue("output_data",n,r.length,4),s=G("a_data",t[1].dataType,t[1].dims.length,4),u=G("b_data",t[2].dataType,t[2].dims.length,4),p=G("c_data",t[0].dataType,t[0].dims.length,4),l,f=(m,_,w)=>`select(${_}, ${m}, ${w})`;if(!i)l=a.setByOffset("global_idx",f(s.getByOffset("global_idx"),u.getByOffset("global_idx"),p.getByOffset("global_idx")));else{let m=(_,w,v="")=>{let x=`a_data[index_a${w}][component_a${w}]`,I=`b_data[index_b${w}][component_b${w}]`,k=`bool(c_data[index_c${w}] & (0xffu << (component_c${w} * 8)))`;return`
            let output_indices${w} = ${a.offsetToIndices(`global_idx * 4u + ${w}u`)};
            let offset_a${w} = ${s.broadcastedIndicesToOffset(`output_indices${w}`,a)};
            let offset_b${w} = ${u.broadcastedIndicesToOffset(`output_indices${w}`,a)};
            let offset_c${w} = ${p.broadcastedIndicesToOffset(`output_indices${w}`,a)};
            let index_a${w} = offset_a${w} / 4u;
            let index_b${w} = offset_b${w} / 4u;
            let index_c${w} = offset_c${w} / 4u;
            let component_a${w} = offset_a${w} % 4u;
            let component_b${w} = offset_b${w} % 4u;
            let component_c${w} = offset_c${w} % 4u;
            ${_}[${w}] = ${v}(${f(x,I,k)});
          `};n===9?l=`
            var data = vec4<u32>(0);
            ${m("data",0,"u32")}
            ${m("data",1,"u32")}
            ${m("data",2,"u32")}
            ${m("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${m("output_data[global_idx]",0)}
            ${m("output_data[global_idx]",1)}
            ${m("output_data[global_idx]",2)}
            ${m("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(p,s,u,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},kc=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,a=!(q.areEqual(t,r)&&q.areEqual(r,i)),s=t,u=q.size(t);if(a){let l=bi.calcShape(bi.calcShape(t,r,!1),i,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,u=q.size(s)}let p=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>Tc(l,e,s,a,n),getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:p},...ce(i,t,r,s)]})}},sg=e=>{e.compute(kc(e.inputs))}}),og,L0=j(()=>{Zy(),Ro(),Jy(),e0(),t0(),r0(),i0(),u0(),d0(),p0(),c0(),h0(),f0(),m0(),g0(),y0(),_0(),b0(),w0(),v0(),$0(),x0(),E0(),S0(),T0(),Tm(),k0(),I0(),C0(),A0(),z0(),zo(),R0(),zm(),O0(),M0(),N0(),Cm(),D0(),$r(),Oo(),B0(),og=new Map([["Abs",[Jh]],["Acos",[ef]],["Acosh",[tf]],["Add",[Df]],["ArgMax",[Xh,ro]],["ArgMin",[Kh,ro]],["Asin",[rf]],["Asinh",[nf]],["Atan",[af]],["Atanh",[sf]],["Attention",[Yh]],["AveragePool",[qm,Pm]],["BatchNormalization",[Qh]],["BiasAdd",[Zh]],["BiasSplitGelu",[Nf]],["Cast",[uf,of]],["Ceil",[df]],["Clip",[lf]],["Concat",[Ff,jf]],["Conv",[uo,oo]],["ConvTranspose",[im,rm]],["Cos",[pf]],["Cosh",[cf]],["CumSum",[nm,am]],["DepthToSpace",[sm,om]],["DequantizeLinear",[jm,Km]],["Div",[Bf]],["Einsum",[um,lm]],["Elu",[hf,sn]],["Equal",[Lf]],["Erf",[ff]],["Exp",[mf]],["Expand",[dm]],["FastGelu",[pm]],["Floor",[gf]],["FusedConv",[uo,oo]],["Gather",[hm,cm]],["GatherElements",[bm,_m]],["GatherBlockQuantized",[gm,ym]],["GatherND",[fm,mm]],["Gelu",[yf]],["Gemm",[vm,wm]],["GlobalAveragePool",[Wm,Um]],["GlobalMaxPool",[Fm,Hm]],["Greater",[Wf]],["GreaterOrEqual",[Gf]],["GridSample",[$m,xm]],["GroupQueryAttention",[Rm]],["HardSigmoid",[Sf,Ef]],["InstanceNormalization",[Om]],["LayerNormalization",[Mm]],["LeakyRelu",[_f,sn]],["Less",[Vf]],["LessOrEqual",[Hf]],["Log",[Of]],["MatMul",[Nm]],["MatMulNBits",[Dm,Bm]],["MaxPool",[Vm,Gm]],["Mul",[Pf]],["MultiHeadAttention",[Sm,Em]],["Neg",[wf]],["Not",[bf]],["Pad",[Lm]],["Pow",[qf]],["QuickGelu",[Mf,sn]],["Range",[Xm]],["Reciprocal",[vf]],["ReduceMin",[Vh]],["ReduceMean",[Lh]],["ReduceMax",[Wh]],["ReduceSum",[Hh]],["ReduceProd",[Gh]],["ReduceL1",[Ph]],["ReduceL2",[qh]],["ReduceLogSum",[jh]],["ReduceLogSumExp",[Uh]],["ReduceSumSquare",[Fh]],["Relu",[$f]],["Resize",[Zm,Jm]],["RotaryEmbedding",[Am]],["ScatterND",[Qm,Ym]],["Sigmoid",[xf]],["Sin",[Tf]],["Sinh",[kf]],["Slice",[tg,rg]],["SkipLayerNormalization",[eg]],["Split",[km,Im]],["Sqrt",[If]],["Softmax",[ig,ng]],["Sub",[Uf]],["Tan",[Cf]],["Tanh",[Af]],["ThresholdedRelu",[Rf,sn]],["Tile",[ag]],["Transpose",[Th,kh]],["Where",[sg]]])}),ug,P0=j(()=>{It(),pr(),be(),ug=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){Xt(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let l of t)u.push({binding:u.length,resource:{buffer:l.buffer}});for(let l of r)u.push({binding:u.length,resource:{buffer:l.buffer}});n&&u.push({binding:u.length,resource:n});let p=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:p,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}s.setPipeline(e.computePipeline),s.setBindGroup(0,p),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Lt(e.programInfo.name)}dispose(){}build(e,t){Xt(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(l=>{r.features.has(l.feature)&&i.push(`enable ${l.extension};`)});let n=Sh(t,this.backend.device.limits),a=e.getShaderSource(n),s=`${i.join(`
`)}
${n.additionalImplementations}
${a}`,u=r.createShaderModule({code:s,label:e.name});Ce("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let p=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Lt(e.name),{programInfo:e,computePipeline:p,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let a=t*r*i,s=Math.ceil(Math.sqrt(a));if(s>n){if(s=Math.ceil(Math.cbrt(a)),s>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),lg={};xi(lg,{WebGpuBackend:()=>dg});var Ic,Cc,Ac,dg,q0=j(()=>{It(),fe(),pr(),wh(),Yy(),L0(),P0(),Ic=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let a=e[i].dims.length;r.push(`${n};${a}`);break}case"dims":{let a=e[i].dims.join(",");r.push(`${n};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Cc=(e,t,r)=>{var n,a;let i=e.name;return(n=e.shaderCache)!=null&&n.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Ic(t,((a=e.shaderCache)==null?void 0:a.inputDependencies)??new Array(t.length).fill("dims"))}`,i},Ac=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},dg=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=a=>t.features.has(a)&&r.push(a)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new Ac(t.info||await t.requestAdapterInfo()),this.gpuDataManager=xh(this),this.programManager=new ug(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,ko(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){var e;typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&((e=this.env)!=null&&e.webgpu)&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Xt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var i;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let n=0;n<t.length/2;n++){let a=r[n],s=a.kernelId,u=this.kernels.get(s),p=u.kernelType,l=u.kernelName,f=a.programName,m=a.inputTensorViews,_=a.outputTensorViews,w=t[n*2],v=t[n*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=w);let x=Number(w-this.queryTimeBase),I=Number(v-this.queryTimeBase);if(!Number.isSafeInteger(x)||!Number.isSafeInteger(I))throw new RangeError("incorrect timestamp range");if((i=this.env.webgpu.profiling)!=null&&i.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:m.map(k=>({dims:k.dims,dataType:dr(k.dataType)})),outputsMetadata:_.map(k=>({dims:k.dims,dataType:dr(k.dataType)})),kernelId:s,kernelType:p,kernelName:l,programName:f,startTime:x,endTime:I});else{let k="";m.forEach((z,C)=>{k+=`input[${C}]: [${z.dims}] | ${dr(z.dataType)}, `});let E="";_.forEach((z,C)=>{E+=`output[${C}]: [${z.dims}] | ${dr(z.dataType)}, `}),console.log(`[profiling] kernel "${s}|${p}|${l}|${f}" ${k}${E}start time: ${x} ns, execution time: ${I-x} ns`)}aa("GPU",`${f}::${w}::${v}`)}e.unmap(),this.pendingQueries.delete(e)}),Lt()}run(e,t,r,i,n,a){Xt(e.name);let s=[];for(let E=0;E<t.length;++E){let z=t[E].data;if(z===0)continue;let C=this.gpuDataManager.get(z);if(!C)throw new Error(`no GPU data for input: ${z}`);s.push(C)}let{outputs:u,dispatchGroup:p,programUniforms:l}=e.getRunData(t),f=r.length===0?u.map((E,z)=>z):r;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let m=[],_=[];for(let E=0;E<u.length;++E){if(!Number.isInteger(f[E])||f[E]<-3||f[E]>=a)throw new Error(`Invalid output index: ${f[E]}`);if(f[E]===-3)continue;let z=f[E]===-1,C=f[E]===-2,O=z||C?n(u[E].dataType,u[E].dims):i(f[E],u[E].dataType,u[E].dims);if(m.push(O),O.data===0)continue;let M=this.gpuDataManager.get(O.data);if(!M)throw new Error(`no GPU data for output: ${O.data}`);if(z&&this.temporaryData.push(M),C){let D=this.kernelPersistentData.get(this.currentKernelId);D||(D=[],this.kernelPersistentData.set(this.currentKernelId,D)),D.push(M)}_.push(M)}if(s.length!==t.length||_.length!==m.length){if(_.length===0)return Lt(e.name),m;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let w;if(l){let E=0,z=[];l.forEach(D=>{let S=typeof D.data=="number"?[D.data]:D.data;if(S.length===0)return;let P=D.type===10?2:4,V,re;D.type===10?(re=S.length>4?16:S.length>2?8:S.length*P,V=S.length>4?16:P*S.length):(re=S.length<=2?S.length*P:16,V=16),E=Math.ceil(E/re)*re,z.push(E);let ae=D.type===10?8:4;E+=S.length>4?Math.ceil(S.length/ae)*V:S.length*P});let C=16;E=Math.ceil(E/C)*C;let O=new ArrayBuffer(E);l.forEach((D,S)=>{let P=z[S],V=typeof D.data=="number"?[D.data]:D.data;if(D.type===6)new Int32Array(O,P,V.length).set(V);else if(D.type===12)new Uint32Array(O,P,V.length).set(V);else if(D.type===10)new Uint16Array(O,P,V.length).set(V);else if(D.type===1)new Float32Array(O,P,V.length).set(V);else throw new Error(`Unsupported uniform type: ${dr(D.type)}`)});let M=this.gpuDataManager.create(E,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(M.buffer,0,O,0,E),this.gpuDataManager.release(M.id),w={offset:0,size:E,buffer:M.buffer}}let v=this.programManager.normalizeDispatchGroupSize(p),x=v[1]===1&&v[2]===1,I=Cc(e,t,x),k=this.programManager.getArtifact(I);if(k||(k=this.programManager.build(e,v),this.programManager.setArtifact(I,k),Ce("info",()=>`[artifact] key: ${I}, programName: ${e.name}`)),l&&k.uniformVariablesInfo){if(l.length!==k.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${k.uniformVariablesInfo.length}, got ${l.length} in program "${k.programInfo.name}".`);for(let E=0;E<l.length;E++){let z=l[E],C=z.type,O=typeof z.data=="number"?1:z.data.length,[M,D]=k.uniformVariablesInfo[E];if(C!==M||O!==D)throw new Error(`Uniform variable ${E} mismatch: expect type ${M} with size ${D}, got type ${C} with size ${O} in program "${k.programInfo.name}".`)}}if(Ce("info",()=>`[ProgramManager] run "${e.name}" (key=${I}) with ${v[0]}x${v[1]}x${v[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let E={kernelId:this.currentKernelId,programName:k.programInfo.name,inputTensorViews:t,outputTensorViews:m};this.pendingKernels.push(E),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(E)}return this.programManager.run(k,s,_,v,w),Lt(e.name),m}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=og.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,a=i.kernelName,s=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),Ce("info",()=>`[WebGPU] Start to run kernel "[${n}] ${a}"...`);let p=this.env.debug;this.temporaryData=[];try{return p&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(l){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${a}" failed. ${l}`)),1}finally{p&&r.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${n}] ${a}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let a=n.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,a);return n.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Js(this,e,t);return Io(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){Ce("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){Ce("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){Ce("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),a=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(a.computePipeline),n.setBindGroup(0,a.bindGroup),n.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),pg={};xi(pg,{init:()=>cg});var Yn,zc,cg,U0=j(()=>{fe(),pr(),_e(),Xy(),Yn=class hg{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=q.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=q.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=q.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=q.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(q.size(t)!==q.size(this.dims))throw new Error("Invalid new shape");return new hg(this.module,this.dataType,this.data,t)}},zc=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,a=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,a));let s=Number(e.getValue(i*n++,a));this.outputCount=Number(e.getValue(i*n++,a)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,a));let u=[];for(let p=0;p<s;p++){let l=Number(e.getValue(i*n++,a)),f=Number(e.getValue(i*n++,"*")),m=Number(e.getValue(i*n++,a)),_=[];for(let w=0;w<m;w++)_.push(Number(e.getValue(i*n++,a)));u.push(new Yn(e,l,f,_))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var s;let r=((s=t==null?void 0:t.inputs)==null?void 0:s.map(u=>typeof u=="number"?this.inputs[u]:u))??this.inputs,i=(t==null?void 0:t.outputs)??[],n=(u,p,l)=>new Yn(this.module,p,this.output(u,l),l),a=(u,p)=>{let l=Pr(u,p);if(!l)throw new Error(`Unsupported data type: ${u}`);let f=l>0?this.backend.gpuDataManager.create(l).id:0;return new Yn(this.module,u,f,p)};return this.backend.run(e,r,i,n,a,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,n);for(let s=0;s<t.length;s++)this.module.setValue(a+i*(s+1),t[s],n);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},cg=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(q0(),ln(lg)).WebGpuBackend,s=new a;await s.initialize(r,i),n("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,p,l,f=!1)=>{if(f)Ce("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(p)}, size=${Number(l)}`),s.memcpy(Number(u),Number(p));else{Ce("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(p)}, size=${Number(l)}`);let m=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(l));s.upload(Number(p),m)}},async(u,p,l)=>{Ce("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${p}, size=${l}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(p)>>>0,Number(p+l)>>>0))},(u,p,l)=>s.createKernel(u,Number(p),l,t.UTF8ToString(t._JsepGetNodeName(Number(p)))),u=>s.releaseKernel(u),(u,p,l,f)=>{Ce("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${u}, contextDataOffset=${p}`);let m=new zc(t,s,Number(p));return s.computeKernel(Number(u),m,f)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new $h(r);n("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,u,p,l,f)=>a.ensureTensor(s,u,p,l,f),(s,u)=>{a.uploadTensor(s,u)},async(s,u)=>a.downloadTensor(s,u),(s,u)=>a.registerMLContext(s,u),!!r.trace])}}}),Rc,Po,qo,gr,Oc,Us,ca,Uo,Wo,Ws,Vo,Go,Ho,fg=j(()=>{It(),Fy(),jy(),fe(),Hr(),xo(),gh(),Rc=(e,t)=>{We()._OrtInit(e,t)!==0&&Ne("Can't initialize onnxruntime.")},Po=async e=>{Rc(e.wasm.numThreads,oa(e.logLevel))},qo=async(e,t)=>{var i,n;(n=(i=We()).asyncInit)==null||n.call(i);let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:s}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let a=(U0(),ln(pg)).init;t==="webgpu"&&await a("webgpu",We(),e,r),t==="webnn"&&await a("webnn",We(),e)}},gr=new Map,Oc=e=>{let t=We(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&Ne("Can't get session input/output count.");let a=i===4?"i32":"i64";return[Number(t.getValue(n,a)),Number(t.getValue(n+i,a))]}finally{t.stackRestore(r)}},Us=(e,t)=>{let r=We(),i=r.stackSave(),n=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&Ne("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));n=Number(r.getValue(s+a,"*"));let p=r.HEAP32[n/4];if(p===0)return[u,0];let l=r.HEAPU32[n/4+1],f=[];for(let m=0;m<l;m++){let _=Number(r.getValue(n+8+m*a,"*"));f.push(_!==0?r.UTF8ToString(_):Number(r.getValue(n+8+(m+l)*a,"*")))}return[u,p,f]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},ca=e=>{let t=We(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Uo=async(e,t)=>{var m,_,w,v;let r,i,n=We();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=ca(e);let a=0,s=0,u=0,p=[],l=[],f=[];try{if([s,p]=await mh(t),(t==null?void 0:t.externalData)&&n.mountExternalData){let S=[];for(let P of t.externalData){let V=typeof P=="string"?P:P.path;S.push(To(typeof P=="string"?P:P.data).then(re=>{n.mountExternalData(V,re)}))}await Promise.all(S)}for(let S of(t==null?void 0:t.executionProviders)??[])if((typeof S=="string"?S:S.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof S!="string"){let P=S,V=P==null?void 0:P.context,re=P==null?void 0:P.gpuDevice,ae=P==null?void 0:P.deviceType,J=P==null?void 0:P.powerPreference;V?n.currentContext=V:re?n.currentContext=await n.webnnCreateMLContext(re):n.currentContext=await n.webnnCreateMLContext({deviceType:ae,powerPreference:J})}else n.currentContext=await n.webnnCreateMLContext();break}a=await n._OrtCreateSession(r,i,s),(m=n.webgpuOnCreateSession)==null||m.call(n,a),a===0&&Ne("Can't create a session."),(_=n.jsepOnCreateSession)==null||_.call(n),n.currentContext&&(n.webnnRegisterMLContext(a,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[x,I]=Oc(a),k=!!(t!=null&&t.enableGraphCapture),E=[],z=[],C=[],O=[],M=[];for(let S=0;S<x;S++){let[P,V,re]=Us(a,S);P===0&&Ne("Can't get an input name."),l.push(P);let ae=n.UTF8ToString(P);E.push(ae),C.push(V===0?{name:ae,isTensor:!1}:{name:ae,isTensor:!0,type:dr(V),shape:re})}for(let S=0;S<I;S++){let[P,V,re]=Us(a,S+x);P===0&&Ne("Can't get an output name."),f.push(P);let ae=n.UTF8ToString(P);z.push(ae),O.push(V===0?{name:ae,isTensor:!1}:{name:ae,isTensor:!0,type:dr(V),shape:re});{if(k&&(t==null?void 0:t.preferredOutputLocation)===void 0){M.push("gpu-buffer");continue}let J=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((w=t==null?void 0:t.preferredOutputLocation)==null?void 0:w[ae])??"cpu",U=n.webnnIsGraphOutput;if(J==="cpu"&&U&&U(a,ae)){M.push("ml-tensor-cpu-output");continue}if(J!=="cpu"&&J!=="cpu-pinned"&&J!=="gpu-buffer"&&J!=="ml-tensor")throw new Error(`Not supported preferred output location: ${J}.`);if(k&&J!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${J}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);M.push(J)}}let D=null;return M.some(S=>S==="gpu-buffer"||S==="ml-tensor"||S==="ml-tensor-cpu-output")&&(u=n._OrtCreateBinding(a),u===0&&Ne("Can't create IO binding."),D={handle:u,outputPreferredLocations:M,outputPreferredLocationsEncoded:M.map(S=>S==="ml-tensor-cpu-output"?"ml-tensor":S).map(S=>Qs(S))}),gr.set(a,[a,l,f,D,k,!1]),[a,E,z,C,O]}catch(x){throw l.forEach(I=>n._OrtFree(I)),f.forEach(I=>n._OrtFree(I)),u!==0&&n._OrtReleaseBinding(u)!==0&&Ne("Can't release IO binding."),a!==0&&n._OrtReleaseSession(a)!==0&&Ne("Can't release session."),x}finally{n._free(r),s!==0&&n._OrtReleaseSessionOptions(s)!==0&&Ne("Can't release session options."),p.forEach(x=>n._free(x)),(v=n.unmountExternalData)==null||v.call(n)}},Wo=e=>{var p,l,f;let t=We(),r=gr.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,a,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&Ne("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&Ne("Can't release IO binding.")),(p=t.jsepOnReleaseSession)==null||p.call(t,e),(l=t.webnnOnReleaseSession)==null||l.call(t,e),(f=t.webgpuOnReleaseSession)==null||f.call(t,e),n.forEach(m=>t._OrtFree(m)),a.forEach(m=>t._OrtFree(m)),t._OrtReleaseSession(i)!==0&&Ne("Can't release session."),gr.delete(e)},Ws=async(e,t,r,i,n,a,s=!1)=>{if(!e){t.push(0);return}let u=We(),p=u.PTR_SIZE,l=e[0],f=e[1],m=e[3],_=m,w,v;if(l==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let k=e[2].gpuBuffer;v=Pr(Lr(l),f);{let E=u.jsepRegisterBuffer;if(!E)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');w=E(i,a,k,v)}}else if(m==="ml-tensor"){let k=e[2].mlTensor;v=Pr(Lr(l),f);let E=u.webnnRegisterMLTensor;if(!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');w=E(i,k,Lr(l),f)}else{let k=e[2];if(Array.isArray(k)){v=p*k.length,w=u._malloc(v),r.push(w);for(let E=0;E<k.length;E++){if(typeof k[E]!="string")throw new TypeError(`tensor data at index ${E} is not a string`);u.setValue(w+E*p,Bt(k[E],r),"*")}}else{let E=u.webnnIsGraphInput,z=u.webnnIsGraphOutput;if(l!=="string"&&E&&z){let C=u.UTF8ToString(n);if(E(i,C)||z(i,C)){let O=Lr(l);v=Pr(O,f),_="ml-tensor";let M=u.webnnCreateTemporaryTensor,D=u.webnnUploadTensor;if(!M||!D)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let S=await M(i,O,f);D(S,new Uint8Array(k.buffer,k.byteOffset,k.byteLength)),w=S}else v=k.byteLength,w=u._malloc(v),r.push(w),u.HEAPU8.set(new Uint8Array(k.buffer,k.byteOffset,v),w)}else v=k.byteLength,w=u._malloc(v),r.push(w),u.HEAPU8.set(new Uint8Array(k.buffer,k.byteOffset,v),w)}}let x=u.stackSave(),I=u.stackAlloc(4*f.length);try{f.forEach((E,z)=>u.setValue(I+z*p,E,p===4?"i32":"i64"));let k=u._OrtCreateTensor(Lr(l),w,v,I,f.length,Qs(_));k===0&&Ne(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push(k)}finally{u.stackRestore(x)}},Vo=async(e,t,r,i,n,a)=>{var ae,J,U,ie;let s=We(),u=s.PTR_SIZE,p=gr.get(e);if(!p)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=p[0],f=p[1],m=p[2],_=p[3],w=p[4],v=p[5],x=t.length,I=i.length,k=0,E=[],z=[],C=[],O=[],M=[],D=s.stackSave(),S=s.stackAlloc(x*u),P=s.stackAlloc(x*u),V=s.stackAlloc(I*u),re=s.stackAlloc(I*u);try{[k,E]=fh(a),qr("wasm prepareInputOutputTensor");for(let Y=0;Y<x;Y++)await Ws(r[Y],z,O,e,f[t[Y]],t[Y],w);for(let Y=0;Y<I;Y++)await Ws(n[Y],C,O,e,m[i[Y]],x+i[Y],w);Ur("wasm prepareInputOutputTensor");for(let Y=0;Y<x;Y++)s.setValue(S+Y*u,z[Y],"*"),s.setValue(P+Y*u,f[t[Y]],"*");for(let Y=0;Y<I;Y++)s.setValue(V+Y*u,C[Y],"*"),s.setValue(re+Y*u,m[i[Y]],"*");if(_&&!v){let{handle:Y,outputPreferredLocations:ve,outputPreferredLocationsEncoded:K}=_;if(f.length!==x)throw new Error(`input count from feeds (${x}) is expected to be always equal to model's input count (${f.length}).`);qr("wasm bindInputsOutputs");for(let Z=0;Z<x;Z++){let oe=t[Z];await s._OrtBindInput(Y,f[oe],z[Z])!==0&&Ne(`Can't bind input[${Z}] for session=${e}.`)}for(let Z=0;Z<I;Z++){let oe=i[Z];(ae=n[Z])!=null&&ae[3]?(M.push(C[Z]),s._OrtBindOutput(Y,m[oe],C[Z],0)!==0&&Ne(`Can't bind pre-allocated output[${Z}] for session=${e}.`)):s._OrtBindOutput(Y,m[oe],0,K[oe])!==0&&Ne(`Can't bind output[${Z}] to ${ve[Z]} for session=${e}.`)}Ur("wasm bindInputsOutputs"),gr.set(e,[l,f,m,_,w,!0])}(J=s.jsepOnRunStart)==null||J.call(s,l),(U=s.webnnOnRunStart)==null||U.call(s,l);let se;_?se=await s._OrtRunWithBinding(l,_.handle,I,V,k):se=await s._OrtRun(l,P,S,x,re,I,V,k),se!==0&&Ne("failed to call OrtRun().");let pe=[],Ae=[];qr("wasm ProcessOutputTensor");for(let Y=0;Y<I;Y++){let ve=Number(s.getValue(V+Y*u,"*"));if(ve===C[Y]||M.includes(C[Y])){pe.push(n[Y]),ve!==C[Y]&&s._OrtReleaseTensor(ve)!==0&&Ne("Can't release tensor.");continue}let K=s.stackSave(),Z=s.stackAlloc(4*u),oe=!1,X,Se=0;try{s._OrtGetTensorData(ve,Z,Z+u,Z+2*u,Z+3*u)!==0&&Ne(`Can't access output tensor data on index ${Y}.`);let et=u===4?"i32":"i64",De=Number(s.getValue(Z,et));Se=s.getValue(Z+u,"*");let Ze=s.getValue(Z+u*2,"*"),Ye=Number(s.getValue(Z+u*3,et)),ut=[];for(let Be=0;Be<Ye;Be++)ut.push(Number(s.getValue(Ze+Be*u,et)));s._OrtFree(Ze)!==0&&Ne("Can't free memory for tensor dims.");let nt=ut.reduce((Be,me)=>Be*me,1);X=dr(De);let Le=_==null?void 0:_.outputPreferredLocations[i[Y]];if(X==="string"){if(Le==="gpu-buffer"||Le==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Be=[];for(let me=0;me<nt;me++){let lt=s.getValue(Se+me*u,"*"),Yt=s.getValue(Se+(me+1)*u,"*"),xr=me===nt-1?void 0:Yt-lt;Be.push(s.UTF8ToString(lt,xr))}pe.push([X,ut,Be,"cpu"])}else if(Le==="gpu-buffer"&&nt>0){let Be=s.jsepGetBuffer;if(!Be)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let me=Be(Se),lt=Pr(De,nt);if(lt===void 0||!Eo(X))throw new Error(`Unsupported data type: ${X}`);oe=!0,pe.push([X,ut,{gpuBuffer:me,download:s.jsepCreateDownloader(me,lt,X),dispose:()=>{s._OrtReleaseTensor(ve)!==0&&Ne("Can't release tensor.")}},"gpu-buffer"])}else if(Le==="ml-tensor"&&nt>0){let Be=s.webnnEnsureTensor,me=s.webnnIsGraphInputOutputTypeSupported;if(!Be||!me)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Pr(De,nt)===void 0||!So(X))throw new Error(`Unsupported data type: ${X}`);if(!me(e,X,!1))throw new Error(`preferredLocation "ml-tensor" for ${X} output is not supported by current WebNN Context.`);let lt=await Be(e,Se,De,ut,!1);oe=!0,pe.push([X,ut,{mlTensor:lt,download:s.webnnCreateMLTensorDownloader(Se,X),dispose:()=>{s.webnnReleaseTensorId(Se),s._OrtReleaseTensor(ve)}},"ml-tensor"])}else if(Le==="ml-tensor-cpu-output"&&nt>0){let Be=s.webnnCreateMLTensorDownloader(Se,X)(),me=pe.length;oe=!0,Ae.push((async()=>{let lt=[me,await Be];return s.webnnReleaseTensorId(Se),s._OrtReleaseTensor(ve),lt})()),pe.push([X,ut,[],"cpu"])}else{let Be=ma(X),me=new Be(nt);new Uint8Array(me.buffer,me.byteOffset,me.byteLength).set(s.HEAPU8.subarray(Se,Se+me.byteLength)),pe.push([X,ut,me,"cpu"])}}finally{s.stackRestore(K),X==="string"&&Se&&s._free(Se),oe||s._OrtReleaseTensor(ve)}}_&&!w&&(s._OrtClearBoundOutputs(_.handle)!==0&&Ne("Can't clear bound outputs."),gr.set(e,[l,f,m,_,w,!1]));for(let[Y,ve]of await Promise.all(Ae))pe[Y][2]=ve;return Ur("wasm ProcessOutputTensor"),pe}finally{(ie=s.webnnOnRunEnd)==null||ie.call(s,l),s.stackRestore(D),z.forEach(se=>s._OrtReleaseTensor(se)),C.forEach(se=>s._OrtReleaseTensor(se)),O.forEach(se=>s._free(se)),k!==0&&s._OrtReleaseRunOptions(k),E.forEach(se=>s._free(se))}},Go=e=>{let t=We(),r=gr.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&Ne("Can't get an profile file name."),t._OrtFree(n)},Ho=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),yr,yt,fi,Zi,Ji,Qn,Vs,Zn,Mr,Nr,Mc,mg,gg,yg,_g,bg,wg,vg,$g=j(()=>{It(),fg(),Hr(),vo(),yr=()=>!!He.wasm.proxy&&typeof document<"u",fi=!1,Zi=!1,Ji=!1,Zn=new Map,Mr=(e,t)=>{let r=Zn.get(e);r?r.push(t):Zn.set(e,[t])},Nr=()=>{if(fi||!Zi||Ji||!yt)throw new Error("worker not ready")},Mc=e=>{switch(e.data.type){case"init-wasm":fi=!1,e.data.err?(Ji=!0,Vs[1](e.data.err)):(Zi=!0,Vs[0]()),Qn&&(URL.revokeObjectURL(Qn),Qn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Zn.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},mg=async()=>{if(!Zi){if(fi)throw new Error("multiple calls to 'initWasm()' detected.");if(Ji)throw new Error("previous call to 'initWasm()' failed.");if(fi=!0,yr())return new Promise((e,t)=>{yt==null||yt.terminate(),ch().then(([r,i])=>{try{yt=i,yt.onerror=a=>t(a),yt.onmessage=Mc,Vs=[e,t];let n={type:"init-wasm",in:He};!n.in.wasm.wasmPaths&&(r||Ys)&&(n.in.wasm.wasmPaths={wasm:new URL("/Fruitbox/pr-preview/pr-6/assets/ort-wasm-simd-threaded.jsep-CyqnNavA.wasm",import.meta.url).href}),yt.postMessage(n),Qn=r}catch(n){t(n)}},t)});try{await $o(He.wasm),await Po(He),Zi=!0}catch(e){throw Ji=!0,e}finally{fi=!1}}},gg=async e=>{if(yr())return Nr(),new Promise((t,r)=>{Mr("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:He}};yt.postMessage(i)});await qo(He,e)},yg=async e=>yr()?(Nr(),new Promise((t,r)=>{Mr("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};yt.postMessage(i,[e.buffer])})):ca(e),_g=async(e,t)=>{if(yr()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Nr(),new Promise((r,i)=>{Mr("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),yt.postMessage(n,a)})}else return Uo(e,t)},bg=async e=>{if(yr())return Nr(),new Promise((t,r)=>{Mr("release",[t,r]);let i={type:"release",in:e};yt.postMessage(i)});Wo(e)},wg=async(e,t,r,i,n,a)=>{if(yr()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Nr(),new Promise((s,u)=>{Mr("run",[s,u]);let p=r,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:p,outputIndices:i,options:a}};yt.postMessage(l,Ho(p))})}else return Vo(e,t,r,i,n,a)},vg=async e=>{if(yr())return Nr(),new Promise((t,r)=>{Mr("end-profiling",[t,r]);let i={type:"end-profiling",in:e};yt.postMessage(i)});Go(e)}}),Gs,Nc,xg,W0=j(()=>{It(),$g(),fe(),wo(),gh(),Gs=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Nc=e=>{switch(e[3]){case"cpu":return new kt(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Eo(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return kt.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!So(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return kt.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},xg=class{async fetchModelAndCopyToWasmMemory(e){return yg(await To(e))}async loadModel(e,t){Xt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await _g(r,t),Lt()}async dispose(){return bg(this.sessionId)}async run(e,t,r){Xt();let i=[],n=[];Object.entries(e).forEach(m=>{let _=m[0],w=m[1],v=this.inputNames.indexOf(_);if(v===-1)throw new Error(`invalid input '${_}'`);i.push(w),n.push(v)});let a=[],s=[];Object.entries(t).forEach(m=>{let _=m[0],w=m[1],v=this.outputNames.indexOf(_);if(v===-1)throw new Error(`invalid output '${_}'`);a.push(w),s.push(v)});let u=i.map((m,_)=>Gs(m,()=>`input "${this.inputNames[n[_]]}"`)),p=a.map((m,_)=>m?Gs(m,()=>`output "${this.outputNames[s[_]]}"`):null),l=await wg(this.sessionId,n,u,s,p,r),f={};for(let m=0;m<l.length;m++)f[this.outputNames[s[m]]]=a[m]??Nc(l[m]);return Lt(),f}startProfiling(){}endProfiling(){vg(this.sessionId)}}}),Eg={};xi(Eg,{OnnxruntimeWebAssemblyBackend:()=>co,initializeFlags:()=>po,wasmBackend:()=>Sg});var po,co,Sg,V0=j(()=>{It(),$g(),W0(),po=()=>{(typeof He.wasm.initTimeout!="number"||He.wasm.initTimeout<0)&&(He.wasm.initTimeout=0);let e=He.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),He.wasm.simd=!1),typeof He.wasm.proxy!="boolean"&&(He.wasm.proxy=!1),typeof He.wasm.trace!="boolean"&&(He.wasm.trace=!1),typeof He.wasm.numThreads!="number"||!Number.isInteger(He.wasm.numThreads)||He.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)He.wasm.numThreads=1;else{let t=typeof navigator>"u"?Iy("node:os").cpus().length:navigator.hardwareConcurrency;He.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},co=class{async init(e){po(),await mg(),await gg(e)}async createInferenceSessionHandler(e,t){let r=new xg;return await r.loadModel(e,t),r}},Sg=new co});It();It();It();var G0="1.26.0";{let e=(V0(),ln(Eg)).wasmBackend;mi("webgpu",e,5),mi("webnn",e,5),mi("cpu",e,10),mi("wasm",e,10)}Object.defineProperty(He.versions,"web",{value:G0,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ho=52,_i=16,Tg=72,Fo=17,jo=10,H0=Fo*jo,Hs=.5;function F0(e=jo,t=Fo){return[t*ho+_i*2,e*ho+_i*2+Tg]}const ha=50,Dt=14,Dr=80,fo=24,na=Fo*ha,kg=jo*ha,_r=na*2+Dt*4+fo,Jn=kg+Dt*2+Dr,j0="https://huggingface.co/Fungster/fruitbox-ppo/resolve/main/fruitbox_policy.onnx",K0="0.26.4",Ig=`https://cdn.jsdelivr.net/pyodide/v${K0}/full/`;let ea=null,Fs="idle",Dc=null;const X0="/Fruitbox/pr-preview/pr-6/fruitbox_policy.onnx";function Cg(e){return ea||(ea=(async()=>{Fs="loading",e==null||e("Preloading AI model…"),He.wasm.numThreads=1;const t=[X0,j0];let r=null;for(const i of t)try{e==null||e(`Loading model from ${i.includes("huggingface")?"Hugging Face":"local"}…`);const n=await bo.create(i,{executionProviders:["wasm"]});return Fs="ready",Dc=null,e==null||e("AI model ready"),n}catch(n){r=n}throw Fs="error",Dc=String(r),r})(),ea)}class Ko{constructor(t,r){te(this,"session");te(this,"n");this.session=t,this.n=r}static async create(){const t=await Cg();return new Ko(t,H0)}async predict(t,r,i=!0){var _;const n=t.grid instanceof Int8Array?t.grid:Int8Array.from(t.grid),a=t.score instanceof Float32Array?t.score:Float32Array.from(t.score),s=new Float32Array(n.length);for(let w=0;w<n.length;w++)s[w]=n[w];const u={grid:new kt("float32",s,[1,this.n]),score:new kt("float32",a,[1,1])},l=(_=(await this.session.run(u)).logits)==null?void 0:_.data;if(!l)throw new Error("ONNX model missing logits output");let f=0,m=-1/0;for(let w=0;w<l.length;w++){if(r&&!r[w])continue;const v=r&&!r[w]?-1e9:l[w];v>m&&(m=v,f=w)}return f}}let ta=null;async function Y0(){window.loadPyodide||await new Promise((e,t)=>{const r=document.createElement("script");r.src=`${Ig}pyodide.js`,r.onload=()=>e(),r.onerror=()=>t(new Error("Failed to load Pyodide")),document.head.appendChild(r)})}async function Q0(e,t){return ta||(ta=(async()=>{if(e==null||e("Loading Python runtime…"),await Y0(),!window.loadPyodide)throw new Error("loadPyodide missing");const r=await window.loadPyodide({indexURL:Ig});e==null||e("Loading numpy…"),await r.loadPackage("numpy"),await r.loadPackage("micropip");const i="/Fruitbox/pr-preview/pr-6/wheels/fruitbox_core-0.1.0-py3-none-any.whl";return e==null||e("Installing fruitbox-core…"),await r.runPythonAsync(`
import micropip
await micropip.install("gymnasium")
await micropip.install("${i}")
`),e==null||e("Python ready"),r})(),ta)}function Z0(e){var r;return(r=e.toJs)==null?void 0:r.call(e,{create_proxies:!1})}function J0(e){var r;const t=(r=e.toJs)==null?void 0:r.call(e,{create_proxies:!1});if(t instanceof Float32Array)return t;if(Array.isArray(t))return Float32Array.from(t);throw new Error("Expected float array from Python")}function e_(e){var r;const t=(r=e.toJs)==null?void 0:r.call(e,{create_proxies:!1});if(t instanceof Int8Array)return t;if(Array.isArray(t))return Int8Array.from(t);throw new Error("Expected int8 array from Python")}function t_(e){var r;const t=(r=e.toJs)==null?void 0:r.call(e,{create_proxies:!1});if(Array.isArray(t))return t;throw new Error("Expected boolean mask from Python")}function r_(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var js={exports:{}},Bc;function i_(){return Bc||(Bc=1,(function(e,t){var r=void 0,i=function(n){return r||(r=new Promise(function(a,s){var di,qi;var u=typeof n<"u"?n:{},p=u.onAbort;u.onAbort=function(d){s(new Error(d)),p&&p(d)},u.postRun=u.postRun||[],u.postRun.push(function(){a(u)}),e=void 0;var l;l||(l=typeof u<"u"?u:{});var f=!!globalThis.window,m=!!globalThis.WorkerGlobalScope;l.onRuntimeInitialized=function(){function d(B,F){switch(typeof F){case"boolean":qa(B,F?1:0);break;case"number":La(B,F);break;case"string":On(B,F,-1,-1);break;case"object":if(F===null)pi(B);else if(F.length!=null){var le=si(F.length);M.set(F,le),Pa(B,le,F.length,-1),ar(le)}else ci(B,"Wrong API use : tried to return a value of an unknown type ("+F+").",-1);break;default:pi(B)}}function h(B,F){for(var le=[],he=0;he<B;he+=1){var ke=De(F+4*he,"i32"),ze=Ar(ke);if(ze===1||ze===2)ke=Ba(ke);else if(ze===3)ke=Rn(ke);else if(ze===4){ze=ke,ke=Na(ze),ze=Da(ze);for(var vt=new Uint8Array(ke),gt=0;gt<ke;gt+=1)vt[gt]=M[ze+gt];ke=vt}else ke=null;le.push(ke)}return le}function b(B,F){this.Qa=B,this.db=F,this.Oa=1,this.yb=[]}function $(B,F){if(this.db=F,this.ob=ni(B),this.ob===null)throw Error("Unable to allocate memory for the SQL string");this.ub=this.ob,this.gb=this.Fb=null}function R(B){if(this.filename="dbfile_"+(4294967295*Math.random()>>>0),B!=null){var F=this.filename,le="/",he=F;if(le&&(le=typeof le=="string"?le:Ti(le),he=F?me(le+"/"+F):le),F=cn(!0,!0),he=_n(he,F),B){if(typeof B=="string"){le=Array(B.length);for(var ke=0,ze=B.length;ke<ze;++ke)le[ke]=B.charCodeAt(ke);B=le}ft(he,F|146),le=cr(he,577),ei(le,B,0,B.length,0),Oi(le),ft(he,F)}}this.handleError(ge(this.filename,L)),this.db=De(L,"i32"),Nn(this.db),this.pb={},this.Sa={}}var L=sr(4),H=l.cwrap,ge=H("sqlite3_open","number",["string","number"]),Ue=H("sqlite3_close_v2","number",["number"]),$e=H("sqlite3_exec","number",["number","string","number","number","number"]),Ve=H("sqlite3_changes","number",["number"]),Xe=H("sqlite3_prepare_v2","number",["number","string","number","number","number"]),xn=H("sqlite3_sql","string",["number"]),xa=H("sqlite3_normalized_sql","string",["number"]),En=H("sqlite3_prepare_v2","number",["number","number","number","number","number"]),Ea=H("sqlite3_bind_text","number",["number","number","number","number","number"]),Sn=H("sqlite3_bind_blob","number",["number","number","number","number","number"]),Sa=H("sqlite3_bind_double","number",["number","number","number"]),Tn=H("sqlite3_bind_int","number",["number","number","number"]),Ta=H("sqlite3_bind_parameter_index","number",["number","string"]),ka=H("sqlite3_step","number",["number"]),Ia=H("sqlite3_errmsg","string",["number"]),Ca=H("sqlite3_column_count","number",["number"]),Aa=H("sqlite3_data_count","number",["number"]),za=H("sqlite3_column_double","number",["number","number"]),kn=H("sqlite3_column_text","string",["number","number"]),Ra=H("sqlite3_column_blob","number",["number","number"]),In=H("sqlite3_column_bytes","number",["number","number"]),Cn=H("sqlite3_column_type","number",["number","number"]),An=H("sqlite3_column_name","string",["number","number"]),Oa=H("sqlite3_reset","number",["number"]),Ma=H("sqlite3_clear_bindings","number",["number"]),zn=H("sqlite3_finalize","number",["number"]),Ui=H("sqlite3_create_function_v2","number","number string number number number number number number number".split(" ")),Ar=H("sqlite3_value_type","number",["number"]),Na=H("sqlite3_value_bytes","number",["number"]),Rn=H("sqlite3_value_text","string",["number"]),Da=H("sqlite3_value_blob","number",["number"]),Ba=H("sqlite3_value_double","number",["number"]),La=H("sqlite3_result_double","",["number","number"]),pi=H("sqlite3_result_null","",["number"]),On=H("sqlite3_result_text","",["number","string","number","number"]),Pa=H("sqlite3_result_blob","",["number","number","number","number"]),qa=H("sqlite3_result_int","",["number","number"]),ci=H("sqlite3_result_error","",["number","string","number"]),Mn=H("sqlite3_aggregate_context","number",["number","number"]),Nn=H("RegisterExtensionFunctions","number",["number"]),Dn=H("sqlite3_update_hook","number",["number","number","number"]);b.prototype.bind=function(B){if(!this.Qa)throw"Statement closed";return this.reset(),Array.isArray(B)?this.Wb(B):B!=null&&typeof B=="object"?this.Xb(B):!0},b.prototype.step=function(){if(!this.Qa)throw"Statement closed";this.Oa=1;var B=ka(this.Qa);switch(B){case 100:return!0;case 101:return!1;default:throw this.db.handleError(B)}},b.prototype.Pb=function(B){return B==null&&(B=this.Oa,this.Oa+=1),za(this.Qa,B)},b.prototype.hc=function(B){if(B==null&&(B=this.Oa,this.Oa+=1),B=kn(this.Qa,B),typeof BigInt!="function")throw Error("BigInt is not supported");return BigInt(B)},b.prototype.mc=function(B){return B==null&&(B=this.Oa,this.Oa+=1),kn(this.Qa,B)},b.prototype.getBlob=function(B){B==null&&(B=this.Oa,this.Oa+=1);var F=In(this.Qa,B);B=Ra(this.Qa,B);for(var le=new Uint8Array(F),he=0;he<F;he+=1)le[he]=M[B+he];return le},b.prototype.get=function(B,F){F=F||{},B!=null&&this.bind(B)&&this.step(),B=[];for(var le=Aa(this.Qa),he=0;he<le;he+=1)switch(Cn(this.Qa,he)){case 1:var ke=F.useBigInt?this.hc(he):this.Pb(he);B.push(ke);break;case 2:B.push(this.Pb(he));break;case 3:B.push(this.mc(he));break;case 4:B.push(this.getBlob(he));break;default:B.push(null)}return B},b.prototype.Db=function(){for(var B=[],F=Ca(this.Qa),le=0;le<F;le+=1)B.push(An(this.Qa,le));return B},b.prototype.Ob=function(B,F){B=this.get(B,F),F=this.Db();for(var le={},he=0;he<F.length;he+=1)le[F[he]]=B[he];return le},b.prototype.lc=function(){return xn(this.Qa)},b.prototype.ic=function(){return xa(this.Qa)},b.prototype.Jb=function(B){return B!=null&&this.bind(B),this.step(),this.reset()},b.prototype.Lb=function(B,F){F==null&&(F=this.Oa,this.Oa+=1),B=ni(B),this.yb.push(B),this.db.handleError(Ea(this.Qa,F,B,-1,0))},b.prototype.Vb=function(B,F){F==null&&(F=this.Oa,this.Oa+=1);var le=si(B.length);M.set(B,le),this.yb.push(le),this.db.handleError(Sn(this.Qa,F,le,B.length,0))},b.prototype.Kb=function(B,F){F==null&&(F=this.Oa,this.Oa+=1),this.db.handleError((B===(B|0)?Tn:Sa)(this.Qa,F,B))},b.prototype.Yb=function(B){B==null&&(B=this.Oa,this.Oa+=1),Sn(this.Qa,B,0,0,0)},b.prototype.Mb=function(B,F){switch(F==null&&(F=this.Oa,this.Oa+=1),typeof B){case"string":this.Lb(B,F);return;case"number":this.Kb(B,F);return;case"bigint":this.Lb(B.toString(),F);return;case"boolean":this.Kb(B+0,F);return;case"object":if(B===null){this.Yb(F);return}if(B.length!=null){this.Vb(B,F);return}}throw"Wrong API use : tried to bind a value of an unknown type ("+B+")."},b.prototype.Xb=function(B){var F=this;return Object.keys(B).forEach(function(le){var he=Ta(F.Qa,le);he!==0&&F.Mb(B[le],he)}),!0},b.prototype.Wb=function(B){for(var F=0;F<B.length;F+=1)this.Mb(B[F],F+1);return!0},b.prototype.reset=function(){return this.Cb(),Ma(this.Qa)===0&&Oa(this.Qa)===0},b.prototype.Cb=function(){for(var B;(B=this.yb.pop())!==void 0;)ar(B)},b.prototype.cb=function(){this.Cb();var B=zn(this.Qa)===0;return delete this.db.pb[this.Qa],this.Qa=0,B},$.prototype.next=function(){if(this.ob===null)return{done:!0};if(this.gb!==null&&(this.gb.cb(),this.gb=null),!this.db.db)throw this.Ab(),Error("Database closed");var B=or(),F=sr(4);Ye(L),Ye(F);try{this.db.handleError(En(this.db.db,this.ub,-1,L,F)),this.ub=De(F,"i32");var le=De(L,"i32");return le===0?(this.Ab(),{done:!0}):(this.gb=new b(le,this.db),this.db.pb[le]=this.gb,{value:this.gb,done:!1})}catch(he){throw this.Fb=Le(this.ub),this.Ab(),he}finally{oi(B)}},$.prototype.Ab=function(){ar(this.ob),this.ob=null},$.prototype.jc=function(){return this.Fb!==null?this.Fb:Le(this.ub)},typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"&&($.prototype[Symbol.iterator]=function(){return this}),R.prototype.Jb=function(B,F){if(!this.db)throw"Database closed";if(F){B=this.Gb(B,F);try{B.step()}finally{B.cb()}}else this.handleError($e(this.db,B,0,0,L));return this},R.prototype.exec=function(B,F,le){if(!this.db)throw"Database closed";var he=null,ke=null,ze=null;try{ze=ke=ni(B);var vt=sr(4);for(B=[];De(ze,"i8")!==0;){Ye(L),Ye(vt),this.handleError(En(this.db,ze,-1,L,vt));var gt=De(L,"i32");if(ze=De(vt,"i32"),gt!==0){var ot=null;for(he=new b(gt,this),F!=null&&he.bind(F);he.step();)ot===null&&(ot={columns:he.Db(),values:[]},B.push(ot)),ot.values.push(he.get(null,le));he.cb()}}return B}catch(pt){throw he&&he.cb(),pt}finally{ke&&ar(ke)}},R.prototype.ec=function(B,F,le,he,ke){typeof F=="function"&&(he=le,le=F,F=void 0),B=this.Gb(B,F);try{for(;B.step();)le(B.Ob(null,ke))}finally{B.cb()}if(typeof he=="function")return he()},R.prototype.Gb=function(B,F){if(Ye(L),this.handleError(Xe(this.db,B,-1,L,0)),B=De(L,"i32"),B===0)throw"Nothing to prepare";var le=new b(B,this);return F!=null&&le.bind(F),this.pb[B]=le},R.prototype.pc=function(B){return new $(B,this)},R.prototype.fc=function(){Object.values(this.pb).forEach(function(F){F.cb()}),Object.values(this.Sa).forEach(Gt),this.Sa={},this.handleError(Ue(this.db));var B=mt(this.filename);return this.handleError(ge(this.filename,L)),this.db=De(L,"i32"),Nn(this.db),B},R.prototype.close=function(){this.db!==null&&(Object.values(this.pb).forEach(function(B){B.cb()}),Object.values(this.Sa).forEach(Gt),this.Sa={},this.fb&&(Gt(this.fb),this.fb=void 0),this.handleError(Ue(this.db)),Jr("/"+this.filename),this.db=null)},R.prototype.handleError=function(B){if(B===0)return null;throw B=Ia(this.db),Error(B)},R.prototype.kc=function(){return Ve(this.db)},R.prototype.bc=function(B,F){Object.prototype.hasOwnProperty.call(this.Sa,B)&&(Gt(this.Sa[B]),delete this.Sa[B]);var le=Ht(function(he,ke,ze){ke=h(ke,ze);try{var vt=F.apply(null,ke)}catch(gt){ci(he,gt,-1);return}d(he,vt)},"viii");return this.Sa[B]=le,this.handleError(Ui(this.db,B,F.length,1,0,le,0,0,0)),this},R.prototype.ac=function(B,F){var le=F.init||function(){return null},he=F.finalize||function(ot){return ot},ke=F.step;if(!ke)throw"An aggregate function must have a step function in "+B;var ze={};Object.hasOwnProperty.call(this.Sa,B)&&(Gt(this.Sa[B]),delete this.Sa[B]),F=B+"__finalize",Object.hasOwnProperty.call(this.Sa,F)&&(Gt(this.Sa[F]),delete this.Sa[F]);var vt=Ht(function(ot,pt,hi){var Ft=Mn(ot,1);Object.hasOwnProperty.call(ze,Ft)||(ze[Ft]=le()),pt=h(pt,hi),pt=[ze[Ft]].concat(pt);try{ze[Ft]=ke.apply(null,pt)}catch(Bn){delete ze[Ft],ci(ot,Bn,-1)}},"viii"),gt=Ht(function(ot){var pt=Mn(ot,1);try{var hi=he(ze[pt])}catch(Ft){delete ze[pt],ci(ot,Ft,-1);return}d(ot,hi),delete ze[pt]},"vi");return this.Sa[B]=vt,this.Sa[F]=gt,this.handleError(Ui(this.db,B,ke.length-1,1,0,0,vt,gt,0)),this},R.prototype.vc=function(B){return this.fb&&(Dn(this.db,0,0),Gt(this.fb),this.fb=void 0),B?(this.fb=Ht(function(F,le,he,ke,ze){switch(le){case 18:F="insert";break;case 23:F="update";break;case 9:F="delete";break;default:throw"unknown operationCode in updateHook callback: "+le}if(he=Le(he),ke=Le(ke),ze>Number.MAX_SAFE_INTEGER)throw"rowId too big to fit inside a Number";B(F,he,ke,Number(ze))},"viiiij"),Dn(this.db,this.fb,0),this):this},b.prototype.bind=b.prototype.bind,b.prototype.step=b.prototype.step,b.prototype.get=b.prototype.get,b.prototype.getColumnNames=b.prototype.Db,b.prototype.getAsObject=b.prototype.Ob,b.prototype.getSQL=b.prototype.lc,b.prototype.getNormalizedSQL=b.prototype.ic,b.prototype.run=b.prototype.Jb,b.prototype.reset=b.prototype.reset,b.prototype.freemem=b.prototype.Cb,b.prototype.free=b.prototype.cb,$.prototype.next=$.prototype.next,$.prototype.getRemainingSQL=$.prototype.jc,R.prototype.run=R.prototype.Jb,R.prototype.exec=R.prototype.exec,R.prototype.each=R.prototype.ec,R.prototype.prepare=R.prototype.Gb,R.prototype.iterateStatements=R.prototype.pc,R.prototype.export=R.prototype.fc,R.prototype.close=R.prototype.close,R.prototype.handleError=R.prototype.handleError,R.prototype.getRowsModified=R.prototype.kc,R.prototype.create_function=R.prototype.bc,R.prototype.create_aggregate=R.prototype.ac,R.prototype.updateHook=R.prototype.vc,l.Database=R};var _="./this.program",w=(qi=(di=globalThis.document)==null?void 0:di.currentScript)==null?void 0:qi.src;m&&(w=self.location.href);var v="",x,I;if(f||m){try{v=new URL(".",w).href}catch{}m&&(I=d=>{var h=new XMLHttpRequest;return h.open("GET",d,!1),h.responseType="arraybuffer",h.send(null),new Uint8Array(h.response)}),x=async d=>{if(d=await fetch(d,{credentials:"same-origin"}),d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var k=console.log.bind(console),E=console.error.bind(console),z,C=!1,O,M,D,S,P,V,re,ae,J;function U(){var d=ui.buffer;M=new Int8Array(d),S=new Int16Array(d),D=new Uint8Array(d),P=new Int32Array(d),V=new Uint32Array(d),re=new Float32Array(d),ae=new Float64Array(d),J=new BigInt64Array(d),new BigUint64Array(d)}function ie(d){var h;throw(h=l.onAbort)==null||h.call(l,d),d="Aborted("+d+")",E(d),C=!0,new WebAssembly.RuntimeError(d+". Build with -sASSERTIONS for more info.")}var se;async function pe(d){if(!z)try{var h=await x(d);return new Uint8Array(h)}catch{}if(d==se&&z)d=new Uint8Array(z);else if(I)d=I(d);else throw"both async and sync fetching of the wasm failed";return d}async function Ae(d,h){try{var b=await pe(d);return await WebAssembly.instantiate(b,h)}catch($){E(`failed to asynchronously prepare wasm: ${$}`),ie($)}}async function Y(d){var h=se;if(!z)try{var b=fetch(h,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(b,d)}catch($){E(`wasm streaming compile failed: ${$}`),E("falling back to ArrayBuffer instantiation")}return Ae(h,d)}class ve{constructor(h){te(this,"name","ExitStatus");this.message=`Program terminated with exit(${h})`,this.status=h}}var K=d=>{for(;0<d.length;)d.shift()(l)},Z=[],oe=[],X=()=>{var d=l.preRun.shift();oe.push(d)},Se=0,et=null;function De(d,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":return M[d];case"i8":return M[d];case"i16":return S[d>>1];case"i32":return P[d>>2];case"i64":return J[d>>3];case"float":return re[d>>2];case"double":return ae[d>>3];case"*":return V[d>>2];default:ie(`invalid type for getValue: ${h}`)}}var Ze=!0;function Ye(d){var h="i32";switch(h.endsWith("*")&&(h="*"),h){case"i1":M[d]=0;break;case"i8":M[d]=0;break;case"i16":S[d>>1]=0;break;case"i32":P[d>>2]=0;break;case"i64":J[d>>3]=BigInt(0);break;case"float":re[d>>2]=0;break;case"double":ae[d>>3]=0;break;case"*":V[d>>2]=0;break;default:ie(`invalid type for setValue: ${h}`)}}var ut=new TextDecoder,nt=(d,h,b,$)=>{if(b=h+b,$)return b;for(;d[h]&&!(h>=b);)++h;return h},Le=(d,h,b)=>d?ut.decode(D.subarray(d,nt(D,d,h,b))):"",Be=(d,h)=>{for(var b=0,$=d.length-1;0<=$;$--){var R=d[$];R==="."?d.splice($,1):R===".."?(d.splice($,1),b++):b&&(d.splice($,1),b--)}if(h)for(;b;b--)d.unshift("..");return d},me=d=>{var h=d.charAt(0)==="/",b=d.slice(-1)==="/";return(d=Be(d.split("/").filter($=>!!$),!h).join("/"))||h||(d="."),d&&b&&(d+="/"),(h?"/":"")+d},lt=d=>{var h=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(d).slice(1);return d=h[0],h=h[1],!d&&!h?".":(h&&(h=h.slice(0,-1)),d+h)},Yt=d=>d&&d.match(/([^\/]+|\/)\/*$/)[1],xr=()=>d=>crypto.getRandomValues(d),Ct=d=>{(Ct=xr())(d)},Er=(...d)=>{for(var h="",b=!1,$=d.length-1;-1<=$&&!b;$--){if(b=0<=$?d[$]:"/",typeof b!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!b)return"";h=b+"/"+h,b=b.charAt(0)==="/"}return h=Be(h.split("/").filter(R=>!!R),!b).join("/"),(b?"/":"")+h||"."},Sr=d=>{var h=nt(d,0);return ut.decode(d.buffer?d.subarray(0,h):new Uint8Array(d.slice(0,h)))},At=[],Qt=d=>{for(var h=0,b=0;b<d.length;++b){var $=d.charCodeAt(b);127>=$?h++:2047>=$?h+=2:55296<=$&&57343>=$?(h+=4,++b):h+=3}return h},_t=(d,h,b,$)=>{if(!(0<$))return 0;var R=b;$=b+$-1;for(var L=0;L<d.length;++L){var H=d.codePointAt(L);if(127>=H){if(b>=$)break;h[b++]=H}else if(2047>=H){if(b+1>=$)break;h[b++]=192|H>>6,h[b++]=128|H&63}else if(65535>=H){if(b+2>=$)break;h[b++]=224|H>>12,h[b++]=128|H>>6&63,h[b++]=128|H&63}else{if(b+3>=$)break;h[b++]=240|H>>18,h[b++]=128|H>>12&63,h[b++]=128|H>>6&63,h[b++]=128|H&63,L++}}return h[b]=0,b-R},Ei=[];function Si(d,h){Ei[d]={input:[],output:[],kb:h},Zr(d,Pt)}var Pt={open(d){var h=Ei[d.node.nb];if(!h)throw new ee(43);d.Va=h,d.seekable=!1},close(d){d.Va.kb.lb(d.Va)},lb(d){d.Va.kb.lb(d.Va)},read(d,h,b,$){if(!d.Va||!d.Va.kb.Qb)throw new ee(60);for(var R=0,L=0;L<$;L++){try{var H=d.Va.kb.Qb(d.Va)}catch{throw new ee(29)}if(H===void 0&&R===0)throw new ee(6);if(H==null)break;R++,h[b+L]=H}return R&&(d.node.$a=Date.now()),R},write(d,h,b,$){if(!d.Va||!d.Va.kb.Hb)throw new ee(60);try{for(var R=0;R<$;R++)d.Va.kb.Hb(d.Va,h[b+R])}catch{throw new ee(29)}return $&&(d.node.Ua=d.node.Ta=Date.now()),R}},ga={Qb(){var b;e:{if(!At.length){var d=null;if((b=globalThis.window)!=null&&b.prompt&&(d=window.prompt("Input: "),d!==null&&(d+=`
`)),!d){var h=null;break e}h=Array(Qt(d)+1),d=_t(d,h,0,h.length),h.length=d,At=h}h=At.shift()}return h},Hb(d,h){h===null||h===10?(k(Sr(d.output)),d.output=[]):h!=0&&d.output.push(h)},lb(d){var h;0<((h=d.output)==null?void 0:h.length)&&(k(Sr(d.output)),d.output=[])},Dc(){return{yc:25856,Ac:5,xc:191,zc:35387,wc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Ec(){return 0},Fc(){return[24,80]}},jr={Hb(d,h){h===null||h===10?(E(Sr(d.output)),d.output=[]):h!=0&&d.output.push(h)},lb(d){var h;0<((h=d.output)==null?void 0:h.length)&&(E(Sr(d.output)),d.output=[])}},ye={Za:null,ab(){return ye.createNode(null,"/",16895,0)},createNode(d,h,b,$){if((b&61440)===24576||(b&61440)===4096)throw new ee(63);return ye.Za||(ye.Za={dir:{node:{Wa:ye.La.Wa,Xa:ye.La.Xa,mb:ye.La.mb,rb:ye.La.rb,Tb:ye.La.Tb,xb:ye.La.xb,vb:ye.La.vb,Ib:ye.La.Ib,wb:ye.La.wb},stream:{Ya:ye.Ma.Ya}},file:{node:{Wa:ye.La.Wa,Xa:ye.La.Xa},stream:{Ya:ye.Ma.Ya,read:ye.Ma.read,write:ye.Ma.write,sb:ye.Ma.sb,tb:ye.Ma.tb}},link:{node:{Wa:ye.La.Wa,Xa:ye.La.Xa,eb:ye.La.eb},stream:{}},Nb:{node:{Wa:ye.La.Wa,Xa:ye.La.Xa},stream:yn}}),b=ki(d,h,b,$),at(b.mode)?(b.La=ye.Za.dir.node,b.Ma=ye.Za.dir.stream,b.Na={}):(b.mode&61440)===32768?(b.La=ye.Za.file.node,b.Ma=ye.Za.file.stream,b.Ra=0,b.Na=null):(b.mode&61440)===40960?(b.La=ye.Za.link.node,b.Ma=ye.Za.link.stream):(b.mode&61440)===8192&&(b.La=ye.Za.Nb.node,b.Ma=ye.Za.Nb.stream),b.$a=b.Ua=b.Ta=Date.now(),d&&(d.Na[h]=b,d.$a=d.Ua=d.Ta=b.$a),b},Cc(d){return d.Na?d.Na.subarray?d.Na.subarray(0,d.Ra):new Uint8Array(d.Na):new Uint8Array(0)},La:{Wa(d){var h={};return h.cc=(d.mode&61440)===8192?d.id:1,h.oc=d.id,h.mode=d.mode,h.rc=1,h.uid=0,h.nc=0,h.nb=d.nb,at(d.mode)?h.size=4096:(d.mode&61440)===32768?h.size=d.Ra:(d.mode&61440)===40960?h.size=d.link.length:h.size=0,h.$a=new Date(d.$a),h.Ua=new Date(d.Ua),h.Ta=new Date(d.Ta),h.Zb=4096,h.$b=Math.ceil(h.size/h.Zb),h},Xa(d,h){for(var b of["mode","atime","mtime","ctime"])h[b]!=null&&(d[b]=h[b]);h.size!==void 0&&(h=h.size,d.Ra!=h&&(h==0?(d.Na=null,d.Ra=0):(b=d.Na,d.Na=new Uint8Array(h),b&&d.Na.set(b.subarray(0,Math.min(h,d.Ra))),d.Ra=h)))},mb(){throw ye.zb||(ye.zb=new ee(44),ye.zb.stack="<generic error, no stack>"),ye.zb},rb(d,h,b,$){return ye.createNode(d,h,b,$)},Tb(d,h,b){try{var $=Jt(h,b)}catch{}if($){if(at(d.mode))for(var R in $.Na)throw new ee(55);Yr($)}delete d.parent.Na[d.name],h.Na[b]=d,d.name=b,h.Ta=h.Ua=d.parent.Ta=d.parent.Ua=Date.now()},xb(d,h){delete d.Na[h],d.Ta=d.Ua=Date.now()},vb(d,h){var b=Jt(d,h),$;for($ in b.Na)throw new ee(55);delete d.Na[h],d.Ta=d.Ua=Date.now()},Ib(d){return[".","..",...Object.keys(d.Na)]},wb(d,h,b){return d=ye.createNode(d,h,41471,0),d.link=b,d},eb(d){if((d.mode&61440)!==40960)throw new ee(28);return d.link}},Ma:{read(d,h,b,$,R){var L=d.node.Na;if(R>=d.node.Ra)return 0;if(d=Math.min(d.node.Ra-R,$),8<d&&L.subarray)h.set(L.subarray(R,R+d),b);else for($=0;$<d;$++)h[b+$]=L[R+$];return d},write(d,h,b,$,R,L){if(h.buffer===M.buffer&&(L=!1),!$)return 0;if(d=d.node,d.Ua=d.Ta=Date.now(),h.subarray&&(!d.Na||d.Na.subarray)){if(L)return d.Na=h.subarray(b,b+$),d.Ra=$;if(d.Ra===0&&R===0)return d.Na=h.slice(b,b+$),d.Ra=$;if(R+$<=d.Ra)return d.Na.set(h.subarray(b,b+$),R),$}L=R+$;var H=d.Na?d.Na.length:0;if(H>=L||(L=Math.max(L,H*(1048576>H?2:1.125)>>>0),H!=0&&(L=Math.max(L,256)),H=d.Na,d.Na=new Uint8Array(L),0<d.Ra&&d.Na.set(H.subarray(0,d.Ra),0)),d.Na.subarray&&h.subarray)d.Na.set(h.subarray(b,b+$),R);else for(L=0;L<$;L++)d.Na[R+L]=h[b+L];return d.Ra=Math.max(d.Ra,R+$),$},Ya(d,h,b){if(b===1?h+=d.position:b===2&&(d.node.mode&61440)===32768&&(h+=d.node.Ra),0>h)throw new ee(28);return h},sb(d,h,b,$,R){if((d.node.mode&61440)!==32768)throw new ee(43);if(d=d.node.Na,R&2||!d||d.buffer!==M.buffer){R=!0,$=65536*Math.ceil(h/65536);var L=vn(65536,$);if(L&&D.fill(0,L,L+$),$=L,!$)throw new ee(48);d&&((0<b||b+h<d.length)&&(d.subarray?d=d.subarray(b,b+h):d=Array.prototype.slice.call(d,b,b+h)),M.set(d,$))}else R=!1,$=d.byteOffset;return{tc:$,Ub:R}},tb(d,h,b,$){return ye.Ma.write(d,h,0,$,b,!1),0}}},cn=(d,h)=>{var b=0;return d&&(b|=365),h&&(b|=146),b},qt=null,hn={},Zt=[],fn=1,St=null,Kr=!1,mn=!0,ee=class{constructor(d){te(this,"name","ErrnoError");this.Pa=d}},ya=class{constructor(){te(this,"qb",{});te(this,"node",null)}get flags(){return this.qb.flags}set flags(d){this.qb.flags=d}get position(){return this.qb.position}set position(d){this.qb.position=d}},_a=class{constructor(d,h,b,$){te(this,"La",{});te(this,"Ma",{});te(this,"ib",null);d||(d=this),this.parent=d,this.ab=d.ab,this.id=fn++,this.name=h,this.mode=b,this.nb=$,this.$a=this.Ua=this.Ta=Date.now()}get read(){return(this.mode&365)===365}set read(d){d?this.mode|=365:this.mode&=-366}get write(){return(this.mode&146)===146}set write(d){d?this.mode|=146:this.mode&=-147}};function ht(d,h={}){if(!d)throw new ee(44);h.Bb??(h.Bb=!0),d.charAt(0)==="/"||(d="//"+d);var b=0;e:for(;40>b;b++){d=d.split("/").filter(ge=>!!ge);for(var $=qt,R="/",L=0;L<d.length;L++){var H=L===d.length-1;if(H&&h.parent)break;if(d[L]!==".")if(d[L]==="..")if(R=lt(R),$===$.parent){d=R+"/"+d.slice(L+1).join("/"),b--;continue e}else $=$.parent;else{R=me(R+"/"+d[L]);try{$=Jt($,d[L])}catch(ge){if((ge==null?void 0:ge.Pa)===44&&H&&h.sc)return{path:R};throw ge}if(!$.ib||H&&!h.Bb||($=$.ib.root),($.mode&61440)===40960&&(!H||h.hb)){if(!$.La.eb)throw new ee(52);$=$.La.eb($),$.charAt(0)==="/"||($=lt(R)+"/"+$),d=$+"/"+d.slice(L+1).join("/");continue e}}}return{path:R,node:$}}throw new ee(32)}function Ti(d){for(var h;;){if(d===d.parent)return d=d.ab.Sb,h?d[d.length-1]!=="/"?`${d}/${h}`:d+h:d;h=h?`${d.name}/${h}`:d.name,d=d.parent}}function Xr(d,h){for(var b=0,$=0;$<h.length;$++)b=(b<<5)-b+h.charCodeAt($)|0;return(d+b>>>0)%St.length}function Yr(d){var h=Xr(d.parent.id,d.name);if(St[h]===d)St[h]=d.jb;else for(h=St[h];h;){if(h.jb===d){h.jb=d.jb;break}h=h.jb}}function Jt(d,h){var b=at(d.mode)?(b=er(d,"x"))?b:d.La.mb?0:2:54;if(b)throw new ee(b);for(b=St[Xr(d.id,h)];b;b=b.jb){var $=b.name;if(b.parent.id===d.id&&$===h)return b}return d.La.mb(d,h)}function ki(d,h,b,$){return d=new _a(d,h,b,$),h=Xr(d.parent.id,d.name),d.jb=St[h],St[h]=d}function at(d){return(d&61440)===16384}function er(d,h){return mn?0:h.includes("r")&&!(d.mode&292)||h.includes("w")&&!(d.mode&146)||h.includes("x")&&!(d.mode&73)?2:0}function Fe(d,h){if(!at(d.mode))return 54;try{return Jt(d,h),20}catch{}return er(d,"wx")}function Ii(d,h,b){try{var $=Jt(d,h)}catch(R){return R.Pa}if(d=er(d,"wx"))return d;if(b){if(!at($.mode))return 54;if($===$.parent||Ti($)==="/")return 10}else if(at($.mode))return 31;return 0}function Tr(d){if(!d)throw new ee(63);return d}function tt(d){if(d=Zt[d],!d)throw new ee(8);return d}function Ci(d,h=-1){if(d=Object.assign(new ya,d),h==-1)e:{for(h=0;4096>=h;h++)if(!Zt[h])break e;throw new ee(33)}return d.bb=h,Zt[h]=d}function gn(d,h=-1){var b,$;return d=Ci(d,h),($=(b=d.Ma)==null?void 0:b.Bc)==null||$.call(b,d),d}function Qr(d,h,b){var $=d==null?void 0:d.Ma.Xa;d=$?d:h,$??($=h.La.Xa),Tr($),$(d,b)}var yn={open(d){var h,b;d.Ma=hn[d.node.nb].Ma,(b=(h=d.Ma).open)==null||b.call(h,d)},Ya(){throw new ee(70)}};function Zr(d,h){hn[d]={Ma:h}}function Ai(d,h){var b=h==="/";if(b&&qt)throw new ee(10);if(!b&&h){var $=ht(h,{Bb:!1});if(h=$.path,$=$.node,$.ib)throw new ee(10);if(!at($.mode))throw new ee(54)}h={type:d,Gc:{},Sb:h,qc:[]},d=d.ab(h),d.ab=h,h.root=d,b?qt=d:$&&($.ib=h,$.ab&&$.ab.qc.push(h))}function kr(d,h,b){var $=ht(d,{parent:!0}).node;if(d=Yt(d),!d)throw new ee(28);if(d==="."||d==="..")throw new ee(20);var R=Fe($,d);if(R)throw new ee(R);if(!$.La.rb)throw new ee(63);return $.La.rb($,d,h,b)}function _n(d,h=438){return kr(d,h&4095|32768,0)}function bt(d,h=511){return kr(d,h&1023|16384,0)}function Ir(d,h,b){typeof b>"u"&&(b=h,h=438),kr(d,h|8192,b)}function zi(d,h){if(!Er(d))throw new ee(44);var b=ht(h,{parent:!0}).node;if(!b)throw new ee(44);h=Yt(h);var $=Fe(b,h);if($)throw new ee($);if(!b.La.wb)throw new ee(63);b.La.wb(b,h,d)}function wt(d){var h=ht(d,{parent:!0}).node;d=Yt(d);var b=Jt(h,d),$=Ii(h,d,!0);if($)throw new ee($);if(!h.La.vb)throw new ee(63);if(b.ib)throw new ee(10);h.La.vb(h,d),Yr(b)}function Jr(d){var h=ht(d,{parent:!0}).node;if(!h)throw new ee(44);d=Yt(d);var b=Jt(h,d),$=Ii(h,d,!1);if($)throw new ee($);if(!h.La.xb)throw new ee(63);if(b.ib)throw new ee(10);h.La.xb(h,d),Yr(b)}function tr(d,h){return d=ht(d,{hb:!h}).node,Tr(d.La.Wa)(d)}function rr(d,h,b,$){Qr(d,h,{mode:b&4095|h.mode&-4096,Ta:Date.now(),dc:$})}function ft(d,h){d=typeof d=="string"?ht(d,{hb:!0}).node:d,rr(null,d,h)}function Ri(d,h,b){if(at(h.mode))throw new ee(31);if((h.mode&61440)!==32768)throw new ee(28);var $=er(h,"w");if($)throw new ee($);Qr(d,h,{size:b,timestamp:Date.now()})}function cr(d,h,b=438){if(d==="")throw new ee(44);if(typeof h=="string"){var $={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[h];if(typeof $>"u")throw Error(`Unknown file open mode: ${h}`);h=$}if(b=h&64?b&4095|32768:0,typeof d=="object")$=d;else{var R=d.endsWith("/"),L=ht(d,{hb:!(h&131072),sc:!0});$=L.node,d=L.path}if(L=!1,h&64)if($){if(h&128)throw new ee(20)}else{if(R)throw new ee(31);$=kr(d,b|511,0),L=!0}if(!$)throw new ee(44);if(($.mode&61440)===8192&&(h&=-513),h&65536&&!at($.mode))throw new ee(54);if(!L&&($?($.mode&61440)===40960?R=32:(R=["r","w","rw"][h&3],h&512&&(R+="w"),R=at($.mode)&&(R!=="r"||h&576)?31:er($,R)):R=44,R))throw new ee(R);return h&512&&!L&&(R=$,R=typeof R=="string"?ht(R,{hb:!0}).node:R,Ri(null,R,0)),h=Ci({node:$,path:Ti($),flags:h&-131713,seekable:!0,position:0,Ma:$.Ma,uc:[],error:!1}),h.Ma.open&&h.Ma.open(h),L&&ft($,b&511),h}function Oi(d){if(d.bb===null)throw new ee(8);d.Eb&&(d.Eb=null);try{d.Ma.close&&d.Ma.close(d)}catch(h){throw h}finally{Zt[d.bb]=null}d.bb=null}function Mi(d,h,b){if(d.bb===null)throw new ee(8);if(!d.seekable||!d.Ma.Ya)throw new ee(70);if(b!=0&&b!=1&&b!=2)throw new ee(28);d.position=d.Ma.Ya(d,h,b),d.uc=[]}function Ut(d,h,b,$,R){if(0>$||0>R)throw new ee(28);if(d.bb===null)throw new ee(8);if((d.flags&2097155)===1)throw new ee(8);if(at(d.node.mode))throw new ee(31);if(!d.Ma.read)throw new ee(28);var L=typeof R<"u";if(!L)R=d.position;else if(!d.seekable)throw new ee(70);return h=d.Ma.read(d,h,b,$,R),L||(d.position+=h),h}function ei(d,h,b,$,R){if(0>$||0>R)throw new ee(28);if(d.bb===null)throw new ee(8);if((d.flags&2097155)===0)throw new ee(8);if(at(d.node.mode))throw new ee(31);if(!d.Ma.write)throw new ee(28);d.seekable&&d.flags&1024&&Mi(d,0,2);var L=typeof R<"u";if(!L)R=d.position;else if(!d.seekable)throw new ee(70);return h=d.Ma.write(d,h,b,$,R,void 0),L||(d.position+=h),h}function mt(d){var h=h||0;h=cr(d,h),d=tr(d).size;var b=new Uint8Array(d);return Ut(h,b,0,d,0),Oi(h),b}function Qe(d,h,b){d=me("/dev/"+d);var $=cn(!!h,!!b);Qe.Rb??(Qe.Rb=64);var R=Qe.Rb++<<8|0;Zr(R,{open(L){L.seekable=!1},close(){var L;(L=b==null?void 0:b.buffer)!=null&&L.length&&b(10)},read(L,H,ge,Ue){for(var $e=0,Ve=0;Ve<Ue;Ve++){try{var Xe=h()}catch{throw new ee(29)}if(Xe===void 0&&$e===0)throw new ee(6);if(Xe==null)break;$e++,H[ge+Ve]=Xe}return $e&&(L.node.$a=Date.now()),$e},write(L,H,ge,Ue){for(var $e=0;$e<Ue;$e++)try{b(H[ge+$e])}catch{throw new ee(29)}return Ue&&(L.node.Ua=L.node.Ta=Date.now()),$e}}),Ir(d,$,R)}var Pe={};function ir(d,h,b){if(h.charAt(0)==="/")return h;if(d=d===-100?"/":tt(d).path,h.length==0){if(!b)throw new ee(44);return d}return d+"/"+h}function ti(d,h){V[d>>2]=h.cc,V[d+4>>2]=h.mode,V[d+8>>2]=h.rc,V[d+12>>2]=h.uid,V[d+16>>2]=h.nc,V[d+20>>2]=h.nb,J[d+24>>3]=BigInt(h.size),P[d+32>>2]=4096,P[d+36>>2]=h.$b;var b=h.$a.getTime(),$=h.Ua.getTime(),R=h.Ta.getTime();return J[d+40>>3]=BigInt(Math.floor(b/1e3)),V[d+48>>2]=b%1e3*1e6,J[d+56>>3]=BigInt(Math.floor($/1e3)),V[d+64>>2]=$%1e3*1e6,J[d+72>>3]=BigInt(Math.floor(R/1e3)),V[d+80>>2]=R%1e3*1e6,J[d+88>>3]=BigInt(h.oc),0}var ri=void 0,ii=()=>{var d=P[+ri>>2];return ri+=4,d},Ni=0,ba=[0,31,60,91,121,152,182,213,244,274,305,335],Wt=[0,31,59,90,120,151,181,212,243,273,304,334],Vt={},bn=d=>{if(!(d instanceof ve||d=="unwind"))throw d},Di=d=>{var h;throw O=d,Ze||0<Ni||((h=l.onExit)==null||h.call(l,d),C=!0),new ve(d)},wa=d=>{if(!C)try{d()}catch(h){bn(h)}finally{if(!(Ze||0<Ni))try{O=d=O,Di(d)}catch(h){bn(h)}}},Bi={},wn=()=>{var $;if(!Li){var d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:((($=globalThis.navigator)==null?void 0:$.language)??"C").replace("-","_")+".UTF-8",_:_||"./this.program"},h;for(h in Bi)Bi[h]===void 0?delete d[h]:d[h]=Bi[h];var b=[];for(h in d)b.push(`${h}=${d[h]}`);Li=b}return Li},Li,va=(d,h,b,$)=>{var R={string:$e=>{var Ve=0;if($e!=null&&$e!==0){Ve=Qt($e)+1;var Xe=sr(Ve);_t($e,D,Xe,Ve),Ve=Xe}return Ve},array:$e=>{var Ve=sr($e.length);return M.set($e,Ve),Ve}};d=l["_"+d];var L=[],H=0;if($)for(var ge=0;ge<$.length;ge++){var Ue=R[b[ge]];Ue?(H===0&&(H=or()),L[ge]=Ue($[ge])):L[ge]=$[ge]}return b=d(...L),b=(function($e){return H!==0&&oi(H),h==="string"?Le($e):h==="boolean"?!!$e:$e})(b)},ni=d=>{var h=Qt(d)+1,b=si(h);return b&&_t(d,D,b,h),b},nr,Pi=[],Gt=d=>{nr.delete(st.get(d)),st.set(d,null),Pi.push(d)},Cr=d=>{const h=d.length;return[h%128|128,h>>7,...d]},$a={i:127,p:127,j:126,f:125,d:124,e:111},ai=d=>Cr(Array.from(d,h=>$a[h])),Ht=(d,h)=>{if(!nr){nr=new WeakMap;var b=st.length;if(nr)for(var $=0;$<0+b;$++){var R=st.get($);R&&nr.set(R,$)}}if(b=nr.get(d)||0)return b;b=Pi.length?Pi.pop():st.grow(1);try{st.set(b,d)}catch(L){if(!(L instanceof TypeError))throw L;h=Uint8Array.of(0,97,115,109,1,0,0,0,1,...Cr([1,96,...ai(h.slice(1)),...ai(h[0]==="v"?"":h[0])]),2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),h=new WebAssembly.Module(h),h=new WebAssembly.Instance(h,{e:{f:d}}).exports.f,st.set(b,h)}return nr.set(d,b),b};if(St=Array(4096),Ai(ye,"/"),bt("/tmp"),bt("/home"),bt("/home/web_user"),(function(){bt("/dev"),Zr(259,{read:()=>0,write:($,R,L,H)=>H,Ya:()=>0}),Ir("/dev/null",259),Si(1280,ga),Si(1536,jr),Ir("/dev/tty",1280),Ir("/dev/tty1",1536);var d=new Uint8Array(1024),h=0,b=()=>(h===0&&(Ct(d),h=d.byteLength),d[--h]);Qe("random",b),Qe("urandom",b),bt("/dev/shm"),bt("/dev/shm/tmp")})(),(function(){bt("/proc");var d=bt("/proc/self");bt("/proc/self/fd"),Ai({ab(){var h=ki(d,"fd",16895,73);return h.Ma={Ya:ye.Ma.Ya},h.La={mb(b,$){b=+$;var R=tt(b);return b={parent:null,ab:{Sb:"fake"},La:{eb:()=>R.path},id:b+1},b.parent=b},Ib(){return Array.from(Zt.entries()).filter(([,b])=>b).map(([b])=>b.toString())}},h}},"/proc/self/fd")})(),l.noExitRuntime&&(Ze=l.noExitRuntime),l.print&&(k=l.print),l.printErr&&(E=l.printErr),l.wasmBinary&&(z=l.wasmBinary),l.thisProgram&&(_=l.thisProgram),l.preInit)for(typeof l.preInit=="function"&&(l.preInit=[l.preInit]);0<l.preInit.length;)l.preInit.shift()();l.stackSave=()=>or(),l.stackRestore=d=>oi(d),l.stackAlloc=d=>sr(d),l.cwrap=(d,h,b,$)=>{var R=!b||b.every(L=>L==="number"||L==="boolean");return h!=="string"&&R&&!$?l["_"+d]:(...L)=>va(d,h,b,L)},l.addFunction=Ht,l.removeFunction=Gt,l.UTF8ToString=Le,l.stringToNewUTF8=ni,l.writeArrayToMemory=(d,h)=>{M.set(d,h)};var si,ar,vn,$n,oi,sr,or,ui,st,Tt={a:(d,h,b,$)=>ie(`Assertion failed: ${Le(d)}, at: `+[h?Le(h):"unknown filename",b,$?Le($):"unknown function"]),i:function(d,h){try{return d=Le(d),ft(d,h),0}catch(b){if(typeof Pe>"u"||b.name!=="ErrnoError")throw b;return-b.Pa}},L:function(d,h,b){try{if(h=Le(h),h=ir(d,h),b&-8)return-28;var $=ht(h,{hb:!0}).node;return $?(d="",b&4&&(d+="r"),b&2&&(d+="w"),b&1&&(d+="x"),d&&er($,d)?-2:0):-44}catch(R){if(typeof Pe>"u"||R.name!=="ErrnoError")throw R;return-R.Pa}},j:function(d,h){try{var b=tt(d);return rr(b,b.node,h,!1),0}catch($){if(typeof Pe>"u"||$.name!=="ErrnoError")throw $;return-$.Pa}},h:function(d){try{var h=tt(d);return Qr(h,h.node,{timestamp:Date.now(),dc:!1}),0}catch(b){if(typeof Pe>"u"||b.name!=="ErrnoError")throw b;return-b.Pa}},b:function(d,h,b){ri=b;try{var $=tt(d);switch(h){case 0:var R=ii();if(0>R)break;for(;Zt[R];)R++;return gn($,R).bb;case 1:case 2:return 0;case 3:return $.flags;case 4:return R=ii(),$.flags|=R,0;case 12:return R=ii(),S[R+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(L){if(typeof Pe>"u"||L.name!=="ErrnoError")throw L;return-L.Pa}},g:function(d,h){try{var b=tt(d),$=b.node,R=b.Ma.Wa;d=R?b:$,R??(R=$.La.Wa),Tr(R);var L=R(d);return ti(h,L)}catch(H){if(typeof Pe>"u"||H.name!=="ErrnoError")throw H;return-H.Pa}},H:function(d,h){h=-9007199254740992>h||9007199254740992<h?NaN:Number(h);try{if(isNaN(h))return-61;var b=tt(d);if(0>h||(b.flags&2097155)===0)throw new ee(28);return Ri(b,b.node,h),0}catch($){if(typeof Pe>"u"||$.name!=="ErrnoError")throw $;return-$.Pa}},G:function(d,h){try{if(h===0)return-28;var b=Qt("/")+1;return h<b?-68:(_t("/",D,d,h),b)}catch($){if(typeof Pe>"u"||$.name!=="ErrnoError")throw $;return-$.Pa}},K:function(d,h){try{return d=Le(d),ti(h,tr(d,!0))}catch(b){if(typeof Pe>"u"||b.name!=="ErrnoError")throw b;return-b.Pa}},C:function(d,h,b){try{return h=Le(h),h=ir(d,h),bt(h,b),0}catch($){if(typeof Pe>"u"||$.name!=="ErrnoError")throw $;return-$.Pa}},J:function(d,h,b,$){try{h=Le(h);var R=$&256;return h=ir(d,h,$&4096),ti(b,R?tr(h,!0):tr(h))}catch(L){if(typeof Pe>"u"||L.name!=="ErrnoError")throw L;return-L.Pa}},x:function(d,h,b,$){ri=$;try{h=Le(h),h=ir(d,h);var R=$?ii():0;return cr(h,b,R).bb}catch(L){if(typeof Pe>"u"||L.name!=="ErrnoError")throw L;return-L.Pa}},v:function(d,h,b,$){try{if(h=Le(h),h=ir(d,h),0>=$)return-28;var R=ht(h).node;if(!R)throw new ee(44);if(!R.La.eb)throw new ee(28);var L=R.La.eb(R),H=Math.min($,Qt(L)),ge=M[b+H];return _t(L,D,b,$+1),M[b+H]=ge,H}catch(Ue){if(typeof Pe>"u"||Ue.name!=="ErrnoError")throw Ue;return-Ue.Pa}},u:function(d){try{return d=Le(d),wt(d),0}catch(h){if(typeof Pe>"u"||h.name!=="ErrnoError")throw h;return-h.Pa}},f:function(d,h){try{return d=Le(d),ti(h,tr(d))}catch(b){if(typeof Pe>"u"||b.name!=="ErrnoError")throw b;return-b.Pa}},r:function(d,h,b){try{if(h=Le(h),h=ir(d,h),b)if(b===512)wt(h);else return-28;else Jr(h);return 0}catch($){if(typeof Pe>"u"||$.name!=="ErrnoError")throw $;return-$.Pa}},q:function(d,h,b){try{h=Le(h),h=ir(d,h,!0);var $=Date.now(),R,L;if(b){var H=V[b>>2]+4294967296*P[b+4>>2],ge=P[b+8>>2];ge==1073741823?R=$:ge==1073741822?R=null:R=1e3*H+ge/1e6,b+=16,H=V[b>>2]+4294967296*P[b+4>>2],ge=P[b+8>>2],ge==1073741823?L=$:ge==1073741822?L=null:L=1e3*H+ge/1e6}else L=R=$;if((L??R)!==null){d=R;var Ue=ht(h,{hb:!0}).node;Tr(Ue.La.Xa)(Ue,{$a:d,Ua:L})}return 0}catch($e){if(typeof Pe>"u"||$e.name!=="ErrnoError")throw $e;return-$e.Pa}},m:()=>ie(""),l:()=>{Ze=!1,Ni=0},A:function(d,h){d=-9007199254740992>d||9007199254740992<d?NaN:Number(d),d=new Date(1e3*d),P[h>>2]=d.getSeconds(),P[h+4>>2]=d.getMinutes(),P[h+8>>2]=d.getHours(),P[h+12>>2]=d.getDate(),P[h+16>>2]=d.getMonth(),P[h+20>>2]=d.getFullYear()-1900,P[h+24>>2]=d.getDay();var b=d.getFullYear();P[h+28>>2]=(b%4!==0||b%100===0&&b%400!==0?Wt:ba)[d.getMonth()]+d.getDate()-1|0,P[h+36>>2]=-(60*d.getTimezoneOffset()),b=new Date(d.getFullYear(),6,1).getTimezoneOffset();var $=new Date(d.getFullYear(),0,1).getTimezoneOffset();P[h+32>>2]=(b!=$&&d.getTimezoneOffset()==Math.min($,b))|0},y:function(d,h,b,$,R,L,H){R=-9007199254740992>R||9007199254740992<R?NaN:Number(R);try{var ge=tt($);if((h&2)!==0&&(b&2)===0&&(ge.flags&2097155)!==2)throw new ee(2);if((ge.flags&2097155)===1)throw new ee(2);if(!ge.Ma.sb)throw new ee(43);if(!d)throw new ee(28);var Ue=ge.Ma.sb(ge,d,R,h,b),$e=Ue.tc;return P[L>>2]=Ue.Ub,V[H>>2]=$e,0}catch(Ve){if(typeof Pe>"u"||Ve.name!=="ErrnoError")throw Ve;return-Ve.Pa}},z:function(d,h,b,$,R,L){L=-9007199254740992>L||9007199254740992<L?NaN:Number(L);try{var H=tt(R);if(b&2){if((H.node.mode&61440)!==32768)throw new ee(43);$&2||H.Ma.tb&&H.Ma.tb(H,D.slice(d,d+h),L,h,$)}}catch(ge){if(typeof Pe>"u"||ge.name!=="ErrnoError")throw ge;return-ge.Pa}},n:(d,h)=>{if(Vt[d]&&(clearTimeout(Vt[d].id),delete Vt[d]),!h)return 0;var b=setTimeout(()=>{delete Vt[d],wa(()=>$n(d,performance.now()))},h);return Vt[d]={id:b,Hc:h},0},B:(d,h,b,$)=>{var R=new Date().getFullYear(),L=new Date(R,0,1).getTimezoneOffset();R=new Date(R,6,1).getTimezoneOffset(),V[d>>2]=60*Math.max(L,R),P[h>>2]=+(L!=R),h=H=>{var ge=Math.abs(H);return`UTC${0<=H?"-":"+"}${String(Math.floor(ge/60)).padStart(2,"0")}${String(ge%60).padStart(2,"0")}`},d=h(L),h=h(R),R<L?(_t(d,D,b,17),_t(h,D,$,17)):(_t(d,D,$,17),_t(h,D,b,17))},d:()=>Date.now(),s:()=>2147483648,c:()=>performance.now(),o:d=>{var h=D.length;if(d>>>=0,2147483648<d)return!1;for(var b=1;4>=b;b*=2){var $=h*(1+.2/b);$=Math.min($,d+100663296);e:{$=(Math.min(2147483648,65536*Math.ceil(Math.max(d,$)/65536))-ui.buffer.byteLength+65535)/65536|0;try{ui.grow($),U();var R=1;break e}catch{}R=void 0}if(R)return!0}return!1},E:(d,h)=>{var b=0,$=0,R;for(R of wn()){var L=h+b;V[d+$>>2]=L,b+=_t(R,D,L,1/0)+1,$+=4}return 0},F:(d,h)=>{var b=wn();V[d>>2]=b.length,d=0;for(var $ of b)d+=Qt($)+1;return V[h>>2]=d,0},e:function(d){try{var h=tt(d);return Oi(h),0}catch(b){if(typeof Pe>"u"||b.name!=="ErrnoError")throw b;return b.Pa}},p:function(d,h){try{var b=tt(d);return M[h]=b.Va?2:at(b.mode)?3:(b.mode&61440)===40960?7:4,S[h+2>>1]=0,J[h+8>>3]=BigInt(0),J[h+16>>3]=BigInt(0),0}catch($){if(typeof Pe>"u"||$.name!=="ErrnoError")throw $;return $.Pa}},w:function(d,h,b,$){try{e:{var R=tt(d);d=h;for(var L,H=h=0;H<b;H++){var ge=V[d>>2],Ue=V[d+4>>2];d+=8;var $e=Ut(R,M,ge,Ue,L);if(0>$e){var Ve=-1;break e}if(h+=$e,$e<Ue)break;typeof L<"u"&&(L+=$e)}Ve=h}return V[$>>2]=Ve,0}catch(Xe){if(typeof Pe>"u"||Xe.name!=="ErrnoError")throw Xe;return Xe.Pa}},D:function(d,h,b,$){h=-9007199254740992>h||9007199254740992<h?NaN:Number(h);try{if(isNaN(h))return 61;var R=tt(d);return Mi(R,h,b),J[$>>3]=BigInt(R.position),R.Eb&&h===0&&b===0&&(R.Eb=null),0}catch(L){if(typeof Pe>"u"||L.name!=="ErrnoError")throw L;return L.Pa}},I:function(d){var b,$;try{var h=tt(d);return($=(b=h.Ma)==null?void 0:b.lb)==null?void 0:$.call(b,h)}catch(R){if(typeof Pe>"u"||R.name!=="ErrnoError")throw R;return R.Pa}},t:function(d,h,b,$){try{e:{var R=tt(d);d=h;for(var L,H=h=0;H<b;H++){var ge=V[d>>2],Ue=V[d+4>>2];d+=8;var $e=ei(R,M,ge,Ue,L);if(0>$e){var Ve=-1;break e}if(h+=$e,$e<Ue)break;typeof L<"u"&&(L+=$e)}Ve=h}return V[$>>2]=Ve,0}catch(Xe){if(typeof Pe>"u"||Xe.name!=="ErrnoError")throw Xe;return Xe.Pa}},k:Di};function li(){function d(){var R;if(l.calledRun=!0,!C){if(!l.noFSInit&&!Kr){var h,b;Kr=!0,h??(h=l.stdin),b??(b=l.stdout),$??($=l.stderr),h?Qe("stdin",h):zi("/dev/tty","/dev/stdin"),b?Qe("stdout",null,b):zi("/dev/tty","/dev/stdout"),$?Qe("stderr",null,$):zi("/dev/tty1","/dev/stderr"),cr("/dev/stdin",0),cr("/dev/stdout",1),cr("/dev/stderr",1)}if(hr.N(),mn=!1,(R=l.onRuntimeInitialized)==null||R.call(l),l.postRun)for(typeof l.postRun=="function"&&(l.postRun=[l.postRun]);l.postRun.length;){var $=l.postRun.shift();Z.push($)}K(Z)}}if(0<Se)et=li;else{if(l.preRun)for(typeof l.preRun=="function"&&(l.preRun=[l.preRun]);l.preRun.length;)X();K(oe),0<Se?et=li:l.setStatus?(l.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>l.setStatus(""),1),d()},1)):d()}}var hr;return(async function(){var b;function d($){var R;return $=hr=$.exports,l._sqlite3_free=$.P,l._sqlite3_value_text=$.Q,l._sqlite3_prepare_v2=$.R,l._sqlite3_step=$.S,l._sqlite3_reset=$.T,l._sqlite3_exec=$.U,l._sqlite3_finalize=$.V,l._sqlite3_column_name=$.W,l._sqlite3_column_text=$.X,l._sqlite3_column_type=$.Y,l._sqlite3_errmsg=$.Z,l._sqlite3_clear_bindings=$._,l._sqlite3_value_blob=$.$,l._sqlite3_value_bytes=$.aa,l._sqlite3_value_double=$.ba,l._sqlite3_value_int=$.ca,l._sqlite3_value_type=$.da,l._sqlite3_result_blob=$.ea,l._sqlite3_result_double=$.fa,l._sqlite3_result_error=$.ga,l._sqlite3_result_int=$.ha,l._sqlite3_result_int64=$.ia,l._sqlite3_result_null=$.ja,l._sqlite3_result_text=$.ka,l._sqlite3_aggregate_context=$.la,l._sqlite3_column_count=$.ma,l._sqlite3_data_count=$.na,l._sqlite3_column_blob=$.oa,l._sqlite3_column_bytes=$.pa,l._sqlite3_column_double=$.qa,l._sqlite3_bind_blob=$.ra,l._sqlite3_bind_double=$.sa,l._sqlite3_bind_int=$.ta,l._sqlite3_bind_text=$.ua,l._sqlite3_bind_parameter_index=$.va,l._sqlite3_sql=$.wa,l._sqlite3_normalized_sql=$.xa,l._sqlite3_changes=$.ya,l._sqlite3_close_v2=$.za,l._sqlite3_create_function_v2=$.Aa,l._sqlite3_update_hook=$.Ba,l._sqlite3_open=$.Ca,si=l._malloc=$.Da,ar=l._free=$.Ea,l._RegisterExtensionFunctions=$.Fa,vn=$.Ga,$n=$.Ha,oi=$.Ia,sr=$.Ja,or=$.Ka,ui=$.M,st=$.O,U(),Se--,(R=l.monitorRunDependencies)==null||R.call(l,Se),Se==0&&et&&($=et,et=null,$()),hr}Se++,(b=l.monitorRunDependencies)==null||b.call(l,Se);var h={a:Tt};return l.instantiateWasm?new Promise($=>{l.instantiateWasm(h,(R,L)=>{$(d(R))})}):(se??(se=l.locateFile?l.locateFile("sql-wasm-browser.wasm",v):v+"sql-wasm-browser.wasm"),d((await Y(h)).instance))})(),li(),u}),r)};e.exports=i,e.exports.default=i})(js)),js.exports}var n_=i_();const a_=r_(n_),s_="/Fruitbox/pr-preview/pr-6/assets/sql-wasm-UFUCzYNW.wasm",Lc=`
CREATE TABLE IF NOT EXISTS game_history (
    game_id      TEXT PRIMARY KEY,
    gamemode     TEXT,
    grid_type    TEXT,
    self_score   INTEGER,
    opp_score    INTEGER,
    time_elapsed REAL,
    seed         INTEGER
);
`,o_="fruitbox-pwa",pn="sqlite",Ag="fruitbox_stats.db",u_={total_games:0,total_time:0,vs_wins:0,vs_losses:0,vs_ties:0,random_best:null,random_best_seed:null,random_best_time:null,solvable_best:null,solvable_best_seed:null,solvable_best_time:null};let Ks=null;function l_(){return Ks||(Ks=a_({locateFile:()=>s_})),Ks}function zg(){return new Promise((e,t)=>{const r=indexedDB.open(o_,1);r.onupgradeneeded=()=>{r.result.createObjectStore(pn)},r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}async function d_(){const e=await zg();return new Promise((t,r)=>{const n=e.transaction(pn,"readonly").objectStore(pn).get(Ag);n.onsuccess=()=>t(n.result??null),n.onerror=()=>r(n.error)})}async function p_(e){const t=await zg();return new Promise((r,i)=>{const n=t.transaction(pn,"readwrite");n.objectStore(pn).put(e,Ag),n.oncomplete=()=>r(),n.onerror=()=>i(n.error)})}function c_(){return crypto.randomUUID()}const yi=class yi{constructor(t){te(this,"db");this.db=t,this.db.run(Lc)}static async create(){const t=await l_();yi.sql=t;const r=await d_(),i=r?new t.Database(r):new t.Database;return new yi(i)}async persist(){await p_(this.db.export())}record(t){const r=c_();return this.db.run("INSERT INTO game_history VALUES (?, ?, ?, ?, ?, ?, ?)",[r,t.gamemode,t.grid_type,t.self_score,t.opp_score??null,Math.round(t.time_elapsed),t.seed]),r}getSummary(){var f;const t=this.db.exec(`
      SELECT COUNT(*) AS total_games, COALESCE(SUM(time_elapsed), 0) AS total_time
      FROM game_history
    `);if(!t.length||!t[0].values.length)return{...u_};const[r,i]=t[0].values[0],n=this.db.exec(`
      SELECT
        COALESCE(SUM(CASE WHEN self_score > opp_score THEN 1 ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN self_score < opp_score THEN 1 ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN self_score = opp_score THEN 1 ELSE 0 END), 0)
      FROM game_history WHERE gamemode = 'vs_ai'
    `),[a,s,u]=((f=n[0])==null?void 0:f.values[0])??[0,0,0],p=this._bestFor("random"),l=this._bestFor("solvable");return{total_games:r,total_time:Math.trunc(i),vs_wins:a,vs_losses:s,vs_ties:u,random_best:(p==null?void 0:p.self_score)??null,random_best_seed:(p==null?void 0:p.seed)??null,random_best_time:(p==null?void 0:p.time_elapsed)??null,solvable_best:(l==null?void 0:l.self_score)??null,solvable_best_seed:(l==null?void 0:l.seed)??null,solvable_best_time:(l==null?void 0:l.time_elapsed)??null}}_bestFor(t){const r=this.db.exec(`
      SELECT game_id, gamemode, grid_type, self_score, opp_score, time_elapsed, seed
      FROM game_history
      WHERE grid_type = ? AND gamemode IN ('single_player', 'vs_ai')
      ORDER BY self_score DESC, time_elapsed ASC LIMIT 1
    `,[t]);if(!r.length||!r[0].values.length)return null;const i=r[0].values[0];return{game_id:String(i[0]),gamemode:String(i[1]),grid_type:String(i[2]),self_score:Number(i[3]),opp_score:i[4]==null?null:Number(i[4]),time_elapsed:Number(i[5]),seed:Number(i[6])}}getVsStats(){const t=this.db.exec(`
      SELECT
        SUM(CASE WHEN self_score > opp_score THEN 1 ELSE 0 END),
        SUM(CASE WHEN self_score < opp_score THEN 1 ELSE 0 END),
        SUM(CASE WHEN self_score = opp_score THEN 1 ELSE 0 END)
      FROM game_history WHERE gamemode = 'vs_ai'
    `);if(!t.length||!t[0].values.length)return{wins:0,losses:0,ties:0};const[r,i,n]=t[0].values[0];return{wins:r??0,losses:i??0,ties:n??0}}getHistory(){const t=this.db.exec("SELECT game_id, gamemode, grid_type, self_score, opp_score, time_elapsed, seed FROM game_history ORDER BY rowid DESC");if(!t.length)return[];const r=t[0].columns;return t[0].values.map(i=>{const n={};return r.forEach((a,s)=>{n[a]=i[s]}),n})}exportDatabase(){return this.db.export()}importDatabase(t){this.db.close(),this.db=new yi.sql.Database(t),this.db.run(Lc)}};te(yi,"sql");let mo=yi;async function h_(e,t="fruitbox_stats.db"){const r=e.exportDatabase(),i=new Blob([new Uint8Array(r)],{type:"application/x-sqlite3"}),n=URL.createObjectURL(i),a=document.createElement("a");a.href=n,a.download=t,a.click(),URL.revokeObjectURL(n)}function f_(){return new Promise((e,t)=>{const r=document.createElement("input");r.type="file",r.accept=".db,application/x-sqlite3",r.onchange=async()=>{var n;const i=(n=r.files)==null?void 0:n[0];if(!i){t(new Error("No file selected"));return}e(new Uint8Array(await i.arrayBuffer()))},r.click()})}function br(e,...t){return e(...t)}class vi{constructor(t,r){te(this,"py");this.py=r}static create(t,r={}){const n=t.pyimport("fruitbox_core.game").FruitBoxGame,a=new n({rows:r.rows??10,columns:r.columns??17,time_limit:r.timeLimit??120,grid_type:r.gridType??"random"});return new vi(t,a)}static fromProxy(t,r){return new vi(t,r)}syncGridFrom(t){const r=t.py.grid,i=br(r.copy);this.py.grid=i,this.py.seed=t.py.seed}get rows(){return this.py.rows}get columns(){return this.py.columns}get score(){return this.py.score}get seed(){return this.py.seed}get gridType(){return this.py.grid_type}get timeLimit(){return this.py.time_limit}get paused(){return this.py.paused}get timeRemaining(){return this.py.time_remaining}reset(t){return br(this.py.reset,t??null),this.grid()}tick(t){return br(this.py.tick,t)}togglePause(){br(this.py.toggle_pause)}pause(){br(this.py.pause)}resume(){br(this.py.resume)}validateMove(t,r,i,n){return br(this.py.validate_move,t,r,i,n)}applyMove(t,r,i,n){var u;const a=br(this.py.apply_move,t,r,i,n);if(Array.isArray(a))return{points:a[0],done:a[1]};const s=(u=a.toJs)==null?void 0:u.call(a,{create_proxies:!1});return{points:s[0],done:s[1]}}grid(){return Z0(this.py.grid)}syncElapsed(t){this.py.elapsed=t}destroy(){var t,r;(r=(t=this.py).destroy)==null||r.call(t)}}const m_={BG:"#f5f3ee",CELL_BG:"#ffffff",CELL_BORDER:"#d2d0c8",CLEARED_BG:"#e6e4de",HUD_BG:"#ebe9e2",CARD_BG:"#ffffff",CARD_BORDER:"#d2d0c8",DIVIDER:"#dcdad2",TEXT_PRIMARY:"#2c2c2a",TEXT_SECONDARY:"#5f5e5a",TEXT_CLEARED:"#b4b2aa",ACCENT:"#185fa5",ACCENT_LIGHT:"#dcebff",SEL_FILL:"rgba(55, 138, 221, 0.24)",SEL_BORDER:"#185fa5",INVALID_FILL:"rgba(226, 75, 74, 0.24)",INVALID_BOR:"#a32d2d",VALID_FILL:"rgba(29, 158, 117, 0.24)",VALID_BOR:"#0f6e56",TIMER_OK:"#0f6e56",TIMER_WARN:"#ba7517",TIMER_DANGER:"#a32d2d",BTN:"#d2d0c8",BTN_HOV:"#bebcb4",BTN_BORDER:"#a09e96",DIM:"rgba(44, 44, 42, 0.63)",PAUSE_COVER:"#b4b2aa",WIN_CARD_BG:"#e8fcf0",WIN_CARD_BOR:"#16a34a",LOSE_CARD_BG:"#feeaea",LOSE_CARD_BOR:"#b93c3c",TIE_CARD_BG:"#fffbdc",TIE_CARD_BOR:"#b48c1e"},g_={BG:"#161614",CELL_BG:"#262522",CELL_BORDER:"#3a3834",CLEARED_BG:"#1e1e1b",HUD_BG:"#1c1c1a",CARD_BG:"#262522",CARD_BORDER:"#413f3a",DIVIDER:"#373531",TEXT_PRIMARY:"#dcdad4",TEXT_SECONDARY:"#82807a",TEXT_CLEARED:"#413f3a",ACCENT:"#5096e6",ACCENT_LIGHT:"#142d50",SEL_FILL:"rgba(80, 150, 230, 0.24)",SEL_BORDER:"#5096e6",INVALID_FILL:"rgba(226, 75, 74, 0.24)",INVALID_BOR:"#c84646",VALID_FILL:"rgba(29, 158, 117, 0.24)",VALID_BOR:"#148c69",TIMER_OK:"#148c69",TIMER_WARN:"#d28c23",TIMER_DANGER:"#c84646",BTN:"#373632",BTN_HOV:"#46443f",BTN_BORDER:"#504e48",DIM:"rgba(0, 0, 0, 0.7)",PAUSE_COVER:"#2d2c28",WIN_CARD_BG:"#0f2d19",WIN_CARD_BOR:"#16a34a",LOSE_CARD_BG:"#370f0f",LOSE_CARD_BOR:"#b93c3c",TIE_CARD_BG:"#322d0a",TIE_CARD_BOR:"#b48c1e"};let Xo=localStorage.getItem("fruitbox_dark")==="1";function Pc(){return Xo}function y_(e){Xo=e,localStorage.setItem("fruitbox_dark",e?"1":"0")}function Yo(){return Xo?g_:m_}function xe(e){const t=Yo()[e];return typeof t=="string"?t:`rgba(${t.r}, ${t.g}, ${t.b}, ${t.a})`}function $i(e,t,r,i,n,a){const s=Math.min(a,i/2,n/2);e.beginPath(),e.moveTo(t+s,r),e.arcTo(t+i,r,t+i,r+n,s),e.arcTo(t+i,r+n,t,r+n,s),e.arcTo(t,r+n,t,r,s),e.arcTo(t,r,t+i,r,s),e.closePath()}function Xs(e,t,r){const{cell:i,padding:n,hudH:a,offsetX:s=0}=r;return{x:s+n+t*i,y:a+n+e*i,w:i-1,h:i-1}}function fa(e,t,r,i,n){const{cell:a,padding:s,hudH:u,offsetX:p=0}=n,l=Math.floor((e-p-s)/a),f=Math.floor((t-u-s)/a);return f>=0&&f<r&&l>=0&&l<i?[f,l]:null}function Qo(e,t){return!e||!t?null:[Math.min(e[0],t[0]),Math.min(e[1],t[1]),Math.max(e[0],t[0]),Math.max(e[1],t[1])]}function __(e,t,r,i,n,a){const s=a.hudH;e.fillStyle=xe("HUD_BG"),e.fillRect(0,0,t,s),e.strokeStyle=xe("CELL_BORDER"),e.beginPath(),e.moveTo(0,s),e.lineTo(t,s),e.stroke(),e.fillStyle=xe("TEXT_SECONDARY"),e.font="13px system-ui, sans-serif",e.fillText("SCORE",_i,24),e.fillStyle=xe("TEXT_PRIMARY"),e.font="bold 20px system-ui, sans-serif",e.fillText(String(r),_i,48);const u=i,p=u>30?xe("TIMER_OK"):u>10?xe("TIMER_WARN"):xe("TIMER_DANGER"),l=180,f=t-_i-l,m=Math.max(0,Math.floor(l*(u/n)));e.fillStyle=xe("TEXT_SECONDARY"),e.font="13px system-ui, sans-serif",e.fillText("TIME",f,24),e.fillStyle=p,e.font="bold 20px system-ui, sans-serif",e.fillText(`${Math.floor(u)}s`,f,48),$i(e,f,48,l,6,3),e.fillStyle=xe("CELL_BORDER"),e.fill(),$i(e,f,48,m,6,3),e.fillStyle=p,e.fill()}function go(e,t,r,i,n,a){var l;const s=t.length,u=((l=t[0])==null?void 0:l.length)??0,p=Qo(i,n);for(let f=0;f<s;f++)for(let m=0;m<u;m++){const _=Xs(f,m,r),w=t[f][m],v=w===-1;if($i(e,_.x,_.y,_.w,_.h,6),e.fillStyle=xe(v?"CLEARED_BG":"CELL_BG"),e.fill(),e.strokeStyle=xe("CELL_BORDER"),e.lineWidth=1,e.stroke(),!v){e.fillStyle=xe("TEXT_PRIMARY"),e.font="bold 20px system-ui, sans-serif";const x=String(w),I=e.measureText(x).width;e.fillText(x,_.x+(_.w-I)/2,_.y+_.h/2+7)}}if(p){const[f,m,_,w]=p,v=a(f,m,_,w),x=Xs(f,m,r),I=Xs(_,w,r),k={x:x.x,y:x.y,w:I.x+I.w-x.x,h:I.y+I.h-x.y};$i(e,k.x,k.y,k.w,k.h,8),e.fillStyle=xe(v?"VALID_FILL":"SEL_FILL"),e.fill(),e.strokeStyle=xe(v?"VALID_BOR":"SEL_BORDER"),e.lineWidth=2,e.stroke()}}function Rg(e,t,r,i,n,a,s){const u=n*i.cell,p=a*i.cell,l=i.offsetX??0+i.padding,f=i.hudH+i.padding;e.save(),e.globalAlpha=s,e.fillStyle=xe("PAUSE_COVER"),e.fillRect(l+i.padding-i.padding,f,u,p),e.fillStyle=xe("TEXT_PRIMARY"),e.font="bold 36px system-ui, sans-serif";const m="Paused";e.fillText(m,(t-e.measureText(m).width)/2,r/2),e.restore()}function Og(e,t,r,i,n){e.fillStyle=xe("DIM"),e.fillRect(0,0,t,r);const a=340,s=210,u=(t-a)/2,p=(r-s)/2;$i(e,u,p,a,s,14),e.fillStyle=xe("CARD_BG"),e.fill(),e.strokeStyle=xe("CARD_BORDER"),e.lineWidth=1,e.stroke(),e.fillStyle=xe("TEXT_PRIMARY"),e.font="bold 36px system-ui, sans-serif";const l="Game over";e.fillText(l,u+(a-e.measureText(l).width)/2,p+52),e.fillStyle=xe("TEXT_SECONDARY"),e.font="18px system-ui, sans-serif",e.fillText(i,u+(a-e.measureText(i).width)/2,p+92);const f=`Final score: ${n}`;e.fillStyle=xe("TEXT_PRIMARY"),e.font="bold 20px system-ui, sans-serif",e.fillText(f,u+(a-e.measureText(f).width)/2,p+124);const m=new DOMRect(u+(a-90)/2,p+156,90,34);$i(e,m.x,m.y,m.width,m.height,6),e.fillStyle=xe("BTN"),e.fill(),e.strokeStyle=xe("BTN_BORDER"),e.stroke(),e.fillStyle=xe("TEXT_PRIMARY"),e.font="bold 13px system-ui, sans-serif",e.fillText("Restart",m.x+16,m.y+22);const _=new DOMRect(u+a-34,p+8,26,26);return e.fillStyle=xe("TEXT_SECONDARY"),e.fillText("X",_.x+8,_.y+18),{restart:m,close:_}}const en={cell:ho,padding:_i,hudH:Tg};function qc(e,t,r){return t>=e.x&&t<=e.x+e.width&&r>=e.y&&r<=e.y+e.height}class b_{constructor(t,r,i,n,a,s){te(this,"canvas");te(this,"ctx");te(this,"game");te(this,"stats");te(this,"gamemode");te(this,"onMenu");te(this,"dragStart",null);te(this,"dragEnd",null);te(this,"gameOver",!1);te(this,"overReason","");te(this,"showGameOver",!0);te(this,"gameStart",0);te(this,"resultRecorded",!1);te(this,"pauseAlpha",0);te(this,"raf",0);te(this,"lastTs",0);te(this,"restartRect",null);te(this,"closeRect",null);te(this,"loop",t=>{const r=Math.min(.05,(t-this.lastTs)/1e3);this.lastTs=t,this.gameOver||this.game.tick(r)&&(this.gameOver=!0,this.overReason="Time's up!",this.recordResult()),this.pauseAlpha=this.game.paused?Math.min(1,this.pauseAlpha+r*3):0,this.draw(),this.raf=requestAnimationFrame(this.loop)});this.game=r,this.stats=i,this.gamemode=n,this.onMenu=a;const[u,p]=F0(r.rows,r.columns);this.canvas=document.createElement("canvas"),this.canvas.width=u,this.canvas.height=p,this.ctx=this.canvas.getContext("2d"),t.replaceChildren(this.canvas);const l=document.createElement("div");l.className="game-toolbar",l.innerHTML=`
      <button type="button" data-action="menu">Menu</button>
      <button type="button" data-action="pause">Pause</button>
      <button type="button" data-action="restart">Restart</button>
    `,t.prepend(l),l.querySelector('[data-action="menu"]').addEventListener("click",()=>this.onMenu()),l.querySelector('[data-action="pause"]').addEventListener("click",()=>this.togglePause()),l.querySelector('[data-action="restart"]').addEventListener("click",()=>this.restart()),this.game.reset(s??null),this.gameStart=performance.now()/1e3,this.bindInput(),this.lastTs=performance.now(),this.loop(this.lastTs)}bindInput(){this.canvas.addEventListener("pointerdown",t=>this.onPointerDown(t)),this.canvas.addEventListener("pointermove",t=>this.onPointerMove(t)),this.canvas.addEventListener("pointerup",()=>this.onPointerUp()),window.addEventListener("keydown",t=>{t.key==="Escape"&&this.onMenu(),(t.key==="r"||t.key==="R")&&this.restart(),t.key===" "&&(t.preventDefault(),this.togglePause())})}togglePause(){this.gameOver||(this.game.togglePause(),this.game.paused||(this.dragStart=this.dragEnd=null))}restart(){this.game.reset(this.game.seed),this.game.resume(),this.dragStart=this.dragEnd=null,this.gameOver=!1,this.overReason="",this.showGameOver=!0,this.resultRecorded=!1,this.gameStart=performance.now()/1e3,this.pauseAlpha=0}onPointerDown(t){const r=this.canvas.getBoundingClientRect(),i=(t.clientX-r.left)/r.width*this.canvas.width,n=(t.clientY-r.top)/r.height*this.canvas.height;if(this.gameOver&&this.showGameOver){this.restartRect&&qc(this.restartRect,i,n)?this.restart():this.closeRect&&qc(this.closeRect,i,n)&&(this.showGameOver=!1);return}if(this.gameOver||this.game.paused)return;const a=fa(i,n,this.game.rows,this.game.columns,en);a&&(this.dragStart=a,this.dragEnd=a)}onPointerMove(t){if(!this.dragStart||this.gameOver||this.game.paused)return;const r=this.canvas.getBoundingClientRect(),i=(t.clientX-r.left)/r.width*this.canvas.width,n=(t.clientY-r.top)/r.height*this.canvas.height,a=fa(i,n,this.game.rows,this.game.columns,en);a&&(this.dragEnd=a)}async recordResult(){if(this.resultRecorded)return;const t={gamemode:this.gamemode,grid_type:this.game.gridType,self_score:this.game.score,time_elapsed:performance.now()/1e3-this.gameStart,seed:this.game.seed};this.stats.record(t),await this.stats.persist(),this.resultRecorded=!0}onPointerUp(){if(!this.gameOver&&!this.game.paused){const t=Qo(this.dragStart,this.dragEnd);if(t){const{done:r}=this.game.applyMove(t[0],t[1],t[2],t[3]);r&&(this.gameOver=!0,this.overReason="No more valid moves",this.recordResult())}}this.dragStart=this.dragEnd=null}draw(){const t=this.ctx,r=this.canvas.width,i=this.canvas.height;if(t.fillStyle=xe("BG"),t.fillRect(0,0,r,i),__(t,r,this.game.score,this.game.timeRemaining,this.game.timeLimit,en),go(t,this.game.grid(),en,this.dragStart,this.dragEnd,(n,a,s,u)=>this.game.validateMove(n,a,s,u)),this.game.paused&&Rg(t,r,i,en,this.game.columns,this.game.rows,this.pauseAlpha),this.gameOver&&this.showGameOver){const n=Og(t,r,i,this.overReason,this.game.score);this.restartRect=n.restart,this.closeRect=n.close}}destroy(){cancelAnimationFrame(this.raf),this.game.destroy()}}const tn=["random","solvable"];class Uc{constructor(t,r){te(this,"root");te(this,"gridTypeIdx",0);te(this,"onAction");this.root=t,this.onAction=r,this.render()}get gridType(){return tn[this.gridTypeIdx]}render(){const t=Yo();this.root.className="menu-screen",this.root.innerHTML=`
      <div class="menu-card" style="background:${t.CARD_BG};border-color:${t.CARD_BORDER}">
        <h1 style="color:${t.TEXT_PRIMARY}">Fruit Box</h1>
        <p class="menu-sub" style="color:${t.TEXT_SECONDARY}">Select fruits that sum to 10</p>
        <div class="grid-pill" style="background:${t.PILL_BG};border-color:${t.PILL_BORDER}">
          <button type="button" class="pill-arrow" data-action="grid-prev">‹</button>
          <span style="color:${t.ACCENT}">${tn[this.gridTypeIdx]}</span>
          <button type="button" class="pill-arrow" data-action="grid-next">›</button>
        </div>
        <button type="button" class="menu-btn primary" data-action="single_player">Single Player</button>
        <button type="button" class="menu-btn" data-action="vs_ai">VS AI</button>
        <button type="button" class="menu-btn" data-action="stats">Stats</button>
        <button type="button" class="menu-btn subtle" data-action="dark">${Pc()?"Light mode":"Dark mode"}</button>
      </div>
    `,this.root.querySelector('[data-action="single_player"]').addEventListener("click",()=>this.onAction("single_player")),this.root.querySelector('[data-action="vs_ai"]').addEventListener("click",()=>this.onAction("vs_ai")),this.root.querySelector('[data-action="stats"]').addEventListener("click",()=>this.onAction("stats")),this.root.querySelector('[data-action="dark"]').addEventListener("click",()=>{y_(!Pc()),this.onAction("dark"),this.render()}),this.root.querySelector('[data-action="grid-prev"]').addEventListener("click",()=>{this.gridTypeIdx=(this.gridTypeIdx-1+tn.length)%tn.length,this.render()}),this.root.querySelector('[data-action="grid-next"]').addEventListener("click",()=>{this.gridTypeIdx=(this.gridTypeIdx+1)%tn.length,this.render()})}}class w_{constructor(t,r,i){te(this,"root");te(this,"stats");te(this,"onClose");te(this,"view","summary");this.root=t,this.stats=r,this.onClose=i,this.render()}fmtTime(t){if(t<60)return`${t}s`;if(t<3600){const i=Math.floor(t/60),n=t%60;return`${i}m ${n}s`}return`${Math.floor(t/3600)}h ${Math.floor(t%3600/60)}m`}render(){var i,n,a,s;const t=Yo(),r=this.stats.getSummary();this.root.className="stats-overlay",this.root.innerHTML=`
      <div class="stats-card" style="background:${t.CARD_BG};border-color:${t.CARD_BORDER}">
        <button type="button" class="stats-close" data-action="close">×</button>
        <h2 style="color:${t.TEXT_PRIMARY}">${this.view==="summary"?"Stats":"History"}</h2>
        ${this.view==="summary"?`
          <div class="stats-grid">
            <div><span style="color:${t.TEXT_SECONDARY}">Games</span><strong style="color:${t.TEXT_PRIMARY}">${r.total_games}</strong></div>
            <div><span style="color:${t.TEXT_SECONDARY}">Time played</span><strong style="color:${t.TEXT_PRIMARY}">${this.fmtTime(r.total_time)}</strong></div>
            <div><span style="color:${t.TEXT_SECONDARY}">VS AI</span><strong style="color:${t.TEXT_PRIMARY}">${r.vs_wins}W / ${r.vs_losses}L / ${r.vs_ties}T</strong></div>
            <div><span style="color:${t.TEXT_SECONDARY}">Best random</span><strong style="color:${t.TEXT_PRIMARY}">${r.random_best??"—"}</strong></div>
            <div><span style="color:${t.TEXT_SECONDARY}">Best solvable</span><strong style="color:${t.TEXT_PRIMARY}">${r.solvable_best??"—"}</strong></div>
          </div>
          <div class="stats-actions">
            <button type="button" data-action="history">History</button>
            <button type="button" data-action="export">Export .db</button>
            <button type="button" data-action="import">Import .db</button>
          </div>
        `:`
          <div class="history-list">
            ${this.stats.getHistory().slice(0,20).map(u=>`
              <div class="history-row" style="border-color:${t.DIVIDER}">
                <span style="color:${t.TEXT_PRIMARY}">${u.gamemode} · ${u.grid_type}</span>
                <span style="color:${t.TEXT_SECONDARY}">${u.self_score}${u.opp_score!=null?` vs ${u.opp_score}`:""} · seed ${u.seed}</span>
              </div>`).join("")}
          </div>
          <button type="button" data-action="back">Back</button>
        `}
      </div>
    `,this.root.querySelector('[data-action="close"]').addEventListener("click",()=>this.onClose()),(i=this.root.querySelector('[data-action="history"]'))==null||i.addEventListener("click",()=>{this.view="history",this.render()}),(n=this.root.querySelector('[data-action="back"]'))==null||n.addEventListener("click",()=>{this.view="summary",this.render()}),(a=this.root.querySelector('[data-action="export"]'))==null||a.addEventListener("click",async()=>{await h_(this.stats)}),(s=this.root.querySelector('[data-action="import"]'))==null||s.addEventListener("click",async()=>{try{const u=await f_();this.stats.importDatabase(u),await this.stats.persist(),this.render()}catch{}})}}function rn(e,...t){return e(...t)}class Zo{constructor(t){te(this,"py");this.py=t}static create(t,r="random"){const n=t.pyimport("fruitbox_core.env").FruitBoxEnv,a=new n({grid_type:r});return rn(a.reset),new Zo(a)}get game(){return this.py.game}obs(){const r=rn(this.py._obs).get;return{grid:e_(r("grid")),score:J0(r("score"))}}actionMasks(){return t_(rn(this.py.action_masks))}decodeAction(t){var i;const r=rn(this.py._decode,t);return(i=r.toJs)==null?void 0:i.call(r,{create_proxies:!1})}reset(){rn(this.py.reset)}destroy(){var t,r;(r=(t=this.py).destroy)==null||r.call(t)}}function Wc(e,t,r){return t>=e.x&&t<=e.x+e.width&&r>=e.y&&r<=e.y+e.height}class Jo{constructor(t,r,i,n,a,s,u,p){te(this,"canvas");te(this,"ctx");te(this,"human");te(this,"ai");te(this,"aiEnv");te(this,"agent");te(this,"stats");te(this,"onMenu");te(this,"gridType");te(this,"dragStart",null);te(this,"dragEnd",null);te(this,"aiDragStart",null);te(this,"aiDragEnd",null);te(this,"aiSelClearAt",0);te(this,"humanOver",!1);te(this,"aiOver",!1);te(this,"gameOver",!1);te(this,"overReason","");te(this,"showGameOver",!0);te(this,"gameStart",0);te(this,"resultRecorded",!1);te(this,"pauseAlpha",0);te(this,"aiBoardVisible",!1);te(this,"lastAiMove",0);te(this,"vsStats",{wins:0,losses:0,ties:0});te(this,"raf",0);te(this,"lastTs",0);te(this,"restartRect",null);te(this,"closeRect",null);te(this,"humanLayout",{cell:ha,padding:Dt,hudH:Dr,offsetX:Dt});te(this,"aiLayout",{cell:ha,padding:Dt,hudH:Dr,offsetX:Dt*2+na+fo});te(this,"loop",t=>{const r=Math.min(.05,(t-this.lastTs)/1e3);this.lastTs=t;const i=performance.now()/1e3;if(!this.gameOver){const n=this.human.tick(r),a=this.human.timeLimit-this.human.timeRemaining;if(this.ai.syncElapsed(a),n&&(this.humanOver=!0,this.aiOver=!0),!this.aiOver&&!this.human.paused&&i>=this.lastAiMove&&(this.lastAiMove=i+Hs,this.stepAi()),i>=this.aiSelClearAt&&(this.aiDragStart=this.aiDragEnd=null),this.humanOver&&this.aiOver){this.gameOver=!0;const s=this.human.score,u=this.ai.score;s>u?this.overReason=`You win!  ${s} – ${u}`:u>s?this.overReason=`ONNX wins!  ${s} – ${u}`:this.overReason=`Tie!  ${s} – ${u}`,this.recordResult()}}this.pauseAlpha=this.human.paused?Math.min(1,this.pauseAlpha+r*3):0,this.draw(),this.raf=requestAnimationFrame(this.loop)});this.human=r,this.ai=i,this.aiEnv=n,this.agent=a,this.stats=s,this.gridType=u,this.onMenu=p,this.vsStats=s.getVsStats(),this.canvas=document.createElement("canvas"),this.canvas.width=_r,this.canvas.height=Jn,this.ctx=this.canvas.getContext("2d");const l=document.createElement("div");l.className="game-toolbar",l.innerHTML=`
      <button type="button" data-action="menu">Menu</button>
      <button type="button" data-action="pause">Pause</button>
      <button type="button" data-action="restart">Restart</button>
      <button type="button" data-action="toggle-ai">Show AI</button>
    `,t.replaceChildren(l,this.canvas),l.querySelector('[data-action="menu"]').addEventListener("click",()=>this.onMenu()),l.querySelector('[data-action="pause"]').addEventListener("click",()=>this.togglePause()),l.querySelector('[data-action="restart"]').addEventListener("click",()=>this.reset()),l.querySelector('[data-action="toggle-ai"]').addEventListener("click",()=>{this.aiBoardVisible=!this.aiBoardVisible}),this.reset(),this.bindInput(),this.lastTs=performance.now(),this.loop(this.lastTs)}static async create(t,r,i,n,a){const s=vi.create(r,{gridType:n}),u=Zo.create(r,n),p=vi.fromProxy(r,u.game),l=await Ko.create();return new Jo(t,s,p,u,l,i,n,a)}bindInput(){this.canvas.addEventListener("pointerdown",t=>this.onPointerDown(t)),this.canvas.addEventListener("pointermove",t=>this.onPointerMove(t)),this.canvas.addEventListener("pointerup",()=>this.onPointerUp()),window.addEventListener("keydown",t=>{t.key==="Escape"&&this.onMenu(),(t.key==="r"||t.key==="R")&&this.reset(),t.key===" "&&(t.preventDefault(),this.togglePause())})}reset(){this.human.reset(),this.human.resume(),this.aiEnv.reset(),this.ai.syncGridFrom(this.human),this.dragStart=this.dragEnd=null,this.aiDragStart=this.aiDragEnd=null,this.humanOver=this.aiOver=this.gameOver=!1,this.overReason="",this.showGameOver=!0,this.resultRecorded=!1,this.gameStart=performance.now()/1e3,this.lastAiMove=performance.now()/1e3+Hs,this.pauseAlpha=0}togglePause(){this.gameOver||(this.human.togglePause(),this.human.paused||(this.lastAiMove=performance.now()/1e3+Hs),this.dragStart=this.dragEnd=null)}onPointerDown(t){const{x:r,y:i}=this.eventToCanvas(t);if(this.gameOver&&this.showGameOver){this.restartRect&&Wc(this.restartRect,r,i)?this.reset():this.closeRect&&Wc(this.closeRect,r,i)&&(this.showGameOver=!1);return}if(this.gameOver||this.humanOver||this.human.paused)return;const n=fa(r,i,this.human.rows,this.human.columns,this.humanLayout);n&&(this.dragStart=n,this.dragEnd=n)}onPointerMove(t){if(!this.dragStart||this.gameOver||this.humanOver||this.human.paused)return;const{x:r,y:i}=this.eventToCanvas(t),n=fa(r,i,this.human.rows,this.human.columns,this.humanLayout);n&&(this.dragEnd=n)}onPointerUp(){if(!this.gameOver&&!this.humanOver&&!this.human.paused){const t=Qo(this.dragStart,this.dragEnd);if(t){const{done:r}=this.human.applyMove(...t);r&&(this.humanOver=!0)}}this.dragStart=this.dragEnd=null}eventToCanvas(t){const r=this.canvas.getBoundingClientRect();return{x:(t.clientX-r.left)/r.width*this.canvas.width,y:(t.clientY-r.top)/r.height*this.canvas.height}}async stepAi(){const t=this.aiEnv.obs(),r=this.aiEnv.actionMasks(),i=await this.agent.predict(t,r,!0),[n,a,s,u]=this.aiEnv.decodeAction(i);this.aiDragStart=[n,a],this.aiDragEnd=[s,u],this.aiSelClearAt=performance.now()/1e3+.2;const{done:p}=this.ai.applyMove(n,a,s,u);p&&(this.aiOver=!0)}async recordResult(){if(this.resultRecorded)return;const t=this.human.score,r=this.ai.score,i={gamemode:"vs_ai",grid_type:this.gridType,self_score:t,opp_score:r,time_elapsed:performance.now()/1e3-this.gameStart,seed:this.human.seed};this.stats.record(i),await this.stats.persist(),this.vsStats=this.stats.getVsStats(),this.resultRecorded=!0}draw(){const t=this.ctx;t.fillStyle=xe("BG"),t.fillRect(0,0,_r,Jn),t.fillStyle=xe("HUD_BG"),t.fillRect(0,0,_r,Dr),t.strokeStyle=xe("CELL_BORDER"),t.beginPath(),t.moveTo(0,Dr),t.lineTo(_r,Dr),t.stroke(),t.fillStyle=xe("TEXT_SECONDARY"),t.font="13px system-ui, sans-serif",t.fillText("YOU",Dt,24),t.fillStyle=xe("TEXT_PRIMARY"),t.font="bold 20px system-ui, sans-serif",t.fillText(String(this.human.score),Dt,48);const r=Dt*2+na+fo;t.fillStyle=xe("TEXT_SECONDARY"),t.fillText("AI",r,24),t.fillStyle=xe("TEXT_PRIMARY"),t.fillText(String(this.ai.score),r,48);const i=this.human.timeRemaining,n=i>30?xe("TIMER_OK"):i>10?xe("TIMER_WARN"):xe("TIMER_DANGER"),s=_r/2-160/2;t.fillStyle=xe("TEXT_SECONDARY"),t.fillText("TIME",s,24),t.fillStyle=n,t.font="bold 20px system-ui, sans-serif",t.fillText(`${Math.floor(i)}s`,s,48);const u=`W ${this.vsStats.wins}  L ${this.vsStats.losses}  T ${this.vsStats.ties}`;if(t.font="13px system-ui, sans-serif",t.fillStyle=xe("TEXT_SECONDARY"),t.fillText(u,_r-Dt-t.measureText(u).width,24),go(t,this.human.grid(),this.humanLayout,this.dragStart,this.dragEnd,(p,l,f,m)=>this.human.validateMove(p,l,f,m)),this.human.paused&&Rg(t,_r,Jn,this.humanLayout,this.human.columns,this.human.rows,this.pauseAlpha),this.aiBoardVisible?go(t,this.ai.grid(),this.aiLayout,this.aiDragStart,this.aiDragEnd,(p,l,f,m)=>this.ai.validateMove(p,l,f,m)):(t.fillStyle="#000",t.fillRect(this.aiLayout.offsetX,Dr+Dt,na,kg)),this.gameOver&&this.showGameOver){const p=Og(t,_r,Jn,this.overReason,this.human.score);this.restartRect=p.restart,this.closeRect=p.close}}destroy(){cancelAnimationFrame(this.raf),this.human.destroy(),this.aiEnv.destroy()}}class v_{constructor(t,r,i){te(this,"root");te(this,"stage");te(this,"runtime");te(this,"stats");te(this,"menu");te(this,"active",null);this.root=t,this.runtime=r,this.stats=i,this.stage=document.createElement("div"),this.stage.id="stage",this.root.replaceChildren(this.stage),this.menu=new Uc(this.stage,n=>void this.handleMenu(n))}clearActive(){var t;(t=this.active)==null||t.destroy(),this.active=null}showMenu(){this.clearActive(),this.menu=new Uc(this.stage,t=>void this.handleMenu(t))}async handleMenu(t){if(!t||t==="dark")return;if(t==="stats"){const i=document.createElement("div");this.root.appendChild(i),new w_(i,this.stats,()=>{i.remove()});return}this.clearActive();const r=this.menu.gridType;if(t==="single_player"){const i=vi.create(this.runtime,{gridType:r});this.active=new b_(this.stage,i,this.stats,"single_player",()=>this.showMenu());return}t==="vs_ai"&&(this.stage.innerHTML='<p class="loading-inline">Loading AI…</p>',this.active=await Jo.create(this.stage,this.runtime,this.stats,r,()=>this.showMenu()))}}function wr(e,t){const r=document.getElementById("loading-status"),i=document.getElementById("loading-fill");r&&(r.textContent=e),i&&t!=null&&(i.style.width=`${Math.min(100,t)}%`)}async function $_(){var e;if((e=navigator.storage)!=null&&e.persist)try{await navigator.storage.persist()}catch{}}async function x_(){var n;wr("Preloading AI model…",10);const e=Cg(a=>wr(a,25));wr("Loading stats…",35),await $_();const t=await mo.create();wr("Loading Python runtime…",50);const r=await Q0(a=>wr(a,70));wr("Waiting for AI model…",85),await e,wr("Ready",100);const i=document.getElementById("app");if(!i)throw new Error("#app missing");(n=document.getElementById("loading-screen"))==null||n.remove(),new v_(i,r,t)}x_().catch(e=>{wr(`Error: ${e}`),console.error(e)});
