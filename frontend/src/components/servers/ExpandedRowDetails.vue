<template>
  <div class="expanded-row-details">
    <h1 style="padding-left:10px;display:flex;">
      <template v-if="rowData.raw.official">
        <img src="../assets/beammp-logo.png" alt="" style="height: 23px; padding-right: 10px;"> [Official Server]  
      </template>
      <template v-else>
        <img src="../assets/beammp-logo.png" alt="" style="height: 23px; padding-right: 10px;">
      </template>
      <span v-for="(value, name) in rowData.name" :style="value.f">{{ value.s }}</span>
    </h1>
    <div class="columns-2">
      <div>
        <h2 class="text-xl">Information:</h2>
        <hr/>
        <table class="description-table">
          <tr>
            <td>Owner:</td>
            <td>{{rowData.raw.owner|| ""}}</td>
          </tr>
          <tr>
            <td>Map:</td>
            <td>{{rowData.map || ""}}</td>
          </tr>
        </table>
      </div>
      <div>
        <div>
          <h2 class="text-xl">Description:</h2>
          <hr/>
          <p><span v-for="(value, name) in formatDescriptionName(rowData.raw.sdesc)" :style="value.f">{{ value.s }}</span></p>
        </div>
        <div>
          <h2 class="text-xl">Mods ({{modCount(rowData.raw.modlist|| "")}}):</h2>
          <hr/>
          <p>{{modList(rowData.raw.modlist|| "")}} ({{formatBytes(rowData.raw.modstotalsize) || "0B"}})</p>
        </div>
      </div>
    </div>
    <div class="row">
      <h1 class="text-xl">Players ({{rowData.players|| "0"}}):</h1>
      <hr/>
      <p>{{listPlayers(rowData.raw.playerslist|| "")}}</p>
    </div>
  </div>
</template>

<script>

var descStyleMap = {
        '^0': 'color:#000000',
        '^1': 'color:#0000AA',
        '^2': 'color:#00AA00',
        '^3': 'color:#00AAAA',
        '^4': 'color:#AA0000',
        '^5': 'color:#AA00AA',
        '^6': 'color:#FFAA00',
        '^7': 'color:#AAAAAA',
        '^8': 'color:#555555',
        '^9': 'color:#5555FF',
        '^a': 'color:#55FF55',
        '^b': 'color:#55FFFF',
        '^c': 'color:#FF5555',
        '^d': 'color:#FF55FF',
        '^e': 'color:#FFFF55',
        '^f': 'color:#FFFFFF',
        '^l': 'font-weight:bold',
        '^m': 'text-decoration:line-through',
        '^n': 'text-decoration:underline',
        '^o': 'font-style:italic',
      };
export default {
  props: {
    rowData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    modCount(s) {
      if(s.length==0) return 0;
      return s.split(";").length-1;
    },
    modList(s) {
      var modarray = s.split(';');
      //console.log(modarray);
      s = "";

      for (var i=0; i<modarray.length-1; i++){
        var modName = modarray[i].split('/').pop();
        modName = modName.replace(".zip","");
        s += modName;
        //if (i<modarray.length-2)
          s += ", ";
      }
      //console.log(s);
      s = s.substring(0, s.length -2);
      return s
    },
    formatBytes(bytes = 0, decimals = 2) {
      if (bytes == 0 || bytes == undefined) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    listPlayers(s) {
      if (s != undefined || s != "") {
        var re = new RegExp(";", 'g');
        s = s.replace(re, ', ');
        s = s.substring(0, s.length -2);
        return s
      } else {
        return "No players..."
      }
    },  
    applyCode(string, codes) {
      var cssText = ''
      string = string.replace(/\x00*/g, '');
      for (var i = 0, len = codes.length; i < len; i++) {
        cssText += styleMap[codes[i]] + ';';
      }
      return {s: string, f:cssText};
    },
    formatDescriptionName(string) {
      var codes = string.match(/\^.{1}/g) || [],
        indexes = [],
        apply = [],
        tmpStr,
        name = [],
        i, 
        len;
      for (i = 0, len = codes.length; i < len; i++) {
        indexes.push(string.indexOf(codes[i]));
        string = string.replace(codes[i], '\x00\x00');
      }
      if (indexes[0] !== 0) {
        name.push(this.applyCode(string.substring(0, indexes[0]), []))
      }
      for (i = 0; i < len; i++) {
        var indexDelta = indexes[i + 1] - indexes[i];
        if (indexDelta === 2) {
          while (indexDelta === 2) {
            apply.push(codes[i]);
            i++;
            indexDelta = indexes[i + 1] - indexes[i];
          }
          apply.push(codes[i]);
        } else {
          apply.push(codes[i]);
        }
        if (apply.lastIndexOf('^r') > -1) {
          apply = apply.slice(apply.lastIndexOf('^r') + 1);
        }
        tmpStr = string.substring(indexes[i], indexes[i + 1]);
        name.push(this.applyCode(tmpStr, apply))
      }
      return name
    }
  }
};
</script>

<style scoped>/* Add styles for the expanded row details */
.expanded-row-details {
  padding: 10px;
  background-color: #f5f5f5;
}</style>
