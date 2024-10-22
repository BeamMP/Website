<script setup>
  import Table from '@/components/servers/Table.vue'
</script>

<template>
  <div id="app" class="">
    <Table :columns="columns" :data="tableData" />
  </div>
</template>

<script>
import axios from 'axios'

var styleMap = {
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

const isoCountries = {
  'AF': 'Afghanistan',
  'AX': 'Aland Islands',
  'AL': 'Albania',
  'DZ': 'Algeria',
  'AS': 'American Samoa',
  'AD': 'Andorra',
  'AO': 'Angola',
  'AI': 'Anguilla',
  'AQ': 'Antarctica',
  'AG': 'Antigua And Barbuda',
  'AR': 'Argentina',
  'AM': 'Armenia',
  'AW': 'Aruba',
  'AU': 'Australia',
  'AT': 'Austria',
  'AZ': 'Azerbaijan',
  'BS': 'Bahamas',
  'BH': 'Bahrain',
  'BD': 'Bangladesh',
  'BB': 'Barbados',
  'BY': 'Belarus',
  'BE': 'Belgium',
  'BZ': 'Belize',
  'BJ': 'Benin',
  'BM': 'Bermuda',
  'BT': 'Bhutan',
  'BO': 'Bolivia',
  'BA': 'Bosnia And Herzegovina',
  'BW': 'Botswana',
  'BV': 'Bouvet Island',
  'BR': 'Brazil',
  'IO': 'British Indian Ocean Territory',
  'BN': 'Brunei Darussalam',
  'BG': 'Bulgaria',
  'BF': 'Burkina Faso',
  'BI': 'Burundi',
  'KH': 'Cambodia',
  'CM': 'Cameroon',
  'CA': 'Canada',
  'CV': 'Cape Verde',
  'KY': 'Cayman Islands',
  'CF': 'Central African Republic',
  'TD': 'Chad',
  'CL': 'Chile',
  'CN': 'China',
  'CX': 'Christmas Island',
  'CC': 'Cocos (Keeling) Islands',
  'CO': 'Colombia',
  'KM': 'Comoros',
  'CG': 'Congo',
  'CD': 'Congo, Democratic Republic',
  'CK': 'Cook Islands',
  'CR': 'Costa Rica',
  'CI': 'Cote D\'Ivoire',
  'HR': 'Croatia',
  'CU': 'Cuba',
  'CY': 'Cyprus',
  'CZ': 'Czech Republic',
  'DK': 'Denmark',
  'DJ': 'Djibouti',
  'DM': 'Dominica',
  'DO': 'Dominican Republic',
  'EC': 'Ecuador',
  'EG': 'Egypt',
  'SV': 'El Salvador',
  'GQ': 'Equatorial Guinea',
  'ER': 'Eritrea',
  'EE': 'Estonia',
  'ET': 'Ethiopia',
  'FK': 'Falkland Islands (Malvinas)',
  'FO': 'Faroe Islands',
  'FJ': 'Fiji',
  'FI': 'Finland',
  'FR': 'France',
  'GF': 'French Guiana',
  'PF': 'French Polynesia',
  'TF': 'French Southern Territories',
  'GA': 'Gabon',
  'GM': 'Gambia',
  'GE': 'Georgia',
  'DE': 'Germany',
  'GH': 'Ghana',
  'GI': 'Gibraltar',
  'GR': 'Greece',
  'GL': 'Greenland',
  'GD': 'Grenada',
  'GP': 'Guadeloupe',
  'GU': 'Guam',
  'GT': 'Guatemala',
  'GG': 'Guernsey',
  'GN': 'Guinea',
  'GW': 'Guinea-Bissau',
  'GY': 'Guyana',
  'HT': 'Haiti',
  'HM': 'Heard Island & Mcdonald Islands',
  'VA': 'Holy See (Vatican City State)',
  'HN': 'Honduras',
  'HK': 'Hong Kong',
  'HU': 'Hungary',
  'IS': 'Iceland',
  'IN': 'India',
  'ID': 'Indonesia',
  'IR': 'Iran, Islamic Republic Of',
  'IQ': 'Iraq',
  'IE': 'Ireland',
  'IM': 'Isle Of Man',
  'IL': 'Israel',
  'IT': 'Italy',
  'JM': 'Jamaica',
  'JP': 'Japan',
  'JE': 'Jersey',
  'JO': 'Jordan',
  'KZ': 'Kazakhstan',
  'KE': 'Kenya',
  'KI': 'Kiribati',
  'KR': 'Korea',
  'KW': 'Kuwait',
  'KG': 'Kyrgyzstan',
  'LA': 'Lao People\'s Democratic Republic',
  'LV': 'Latvia',
  'LB': 'Lebanon',
  'LS': 'Lesotho',
  'LR': 'Liberia',
  'LY': 'Libyan Arab Jamahiriya',
  'LI': 'Liechtenstein',
  'LT': 'Lithuania',
  'LU': 'Luxembourg',
  'MO': 'Macao',
  'MK': 'Macedonia',
  'MG': 'Madagascar',
  'MW': 'Malawi',
  'MY': 'Malaysia',
  'MV': 'Maldives',
  'ML': 'Mali',
  'MT': 'Malta',
  'MH': 'Marshall Islands',
  'MQ': 'Martinique',
  'MR': 'Mauritania',
  'MU': 'Mauritius',
  'YT': 'Mayotte',
  'MX': 'Mexico',
  'FM': 'Micronesia, Federated States Of',
  'MD': 'Moldova',
  'MC': 'Monaco',
  'MN': 'Mongolia',
  'ME': 'Montenegro',
  'MS': 'Montserrat',
  'MA': 'Morocco',
  'MZ': 'Mozambique',
  'MM': 'Myanmar',
  'NA': 'Namibia',
  'NR': 'Nauru',
  'NP': 'Nepal',
  'NL': 'Netherlands',
  'AN': 'Netherlands Antilles',
  'NC': 'New Caledonia',
  'NZ': 'New Zealand',
  'NI': 'Nicaragua',
  'NE': 'Niger',
  'NG': 'Nigeria',
  'NU': 'Niue',
  'NF': 'Norfolk Island',
  'MP': 'Northern Mariana Islands',
  'NO': 'Norway',
  'OM': 'Oman',
  'PK': 'Pakistan',
  'PW': 'Palau',
  'PS': 'Palestinian Territory, Occupied',
  'PA': 'Panama',
  'PG': 'Papua New Guinea',
  'PY': 'Paraguay',
  'PE': 'Peru',
  'PH': 'Philippines',
  'PN': 'Pitcairn',
  'PL': 'Poland',
  'PT': 'Portugal',
  'PR': 'Puerto Rico',
  'QA': 'Qatar',
  'RE': 'Reunion',
  'RO': 'Romania',
  'RU': 'Russian Federation',
  'RW': 'Rwanda',
  'BL': 'Saint Barthelemy',
  'SH': 'Saint Helena',
  'KN': 'Saint Kitts And Nevis',
  'LC': 'Saint Lucia',
  'MF': 'Saint Martin',
  'PM': 'Saint Pierre And Miquelon',
  'VC': 'Saint Vincent And Grenadines',
  'WS': 'Samoa',
  'SM': 'San Marino',
  'ST': 'Sao Tome And Principe',
  'SA': 'Saudi Arabia',
  'SN': 'Senegal',
  'RS': 'Serbia',
  'SC': 'Seychelles',
  'SL': 'Sierra Leone',
  'SG': 'Singapore',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'SB': 'Solomon Islands',
  'SO': 'Somalia',
  'ZA': 'South Africa',
  'GS': 'South Georgia And Sandwich Isl.',
  'ES': 'Spain',
  'LK': 'Sri Lanka',
  'SD': 'Sudan',
  'SR': 'Suriname',
  'SJ': 'Svalbard And Jan Mayen',
  'SZ': 'Swaziland',
  'SE': 'Sweden',
  'CH': 'Switzerland',
  'SY': 'Syrian Arab Republic',
  'TW': 'Taiwan',
  'TJ': 'Tajikistan',
  'TZ': 'Tanzania',
  'TH': 'Thailand',
  'TL': 'Timor-Leste',
  'TG': 'Togo',
  'TK': 'Tokelau',
  'TO': 'Tonga',
  'TT': 'Trinidad And Tobago',
  'TN': 'Tunisia',
  'TR': 'Turkey',
  'TM': 'Turkmenistan',
  'TC': 'Turks And Caicos Islands',
  'TV': 'Tuvalu',
  'UG': 'Uganda',
  'UA': 'Ukraine',
  'AE': 'United Arab Emirates',
  'GB': 'United Kingdom',
  'US': 'United States',
  'UM': 'United States Outlying Islands',
  'UY': 'Uruguay',
  'UZ': 'Uzbekistan',
  'VU': 'Vanuatu',
  'VE': 'Venezuela',
  'VN': 'Viet Nam',
  'VG': 'Virgin Islands, British',
  'VI': 'Virgin Islands, U.S.',
  'WF': 'Wallis And Futuna',
  'EH': 'Western Sahara',
  'YE': 'Yemen',
  'ZM': 'Zambia',
  'ZW': 'Zimbabwe'
};

export default {
  components: {
    Table,
  },
  data() {
    return {
      columns: [
        { key: "location", label: "Location" },
        { key: "name", label: "Name" },
        { key: "map", label: "Map" },
        { key: "players", label: "Players" },
      ],
      tableData: [],
    };
  },
  methods: {
    getData() {
      axios
        .get(`https://backend.beammp.com/servers-info`)
        .then(res => {
          var servers = []
          var data = res.data;
          var i = 0

          var serversArray = new Array();
          // Parse the data to a nice looking Array
          for (var i = 0; i < data.length; i++) {
            var v = data[i]
            v.strippedName = this.stripCustomFormatting(v.sname);
            serversArray.push(v);
          }
          // Sort the servers to display official servers first
          serversArray.sort(function(a, b) {
            if (a.official && b.official) return a.strippedName.localeCompare(b.strippedName)
            else if (a.official) return -1;
            else if (b.official) return 1;
            return 0;
          });

          serversArray.forEach(s => {
            servers.push({id: i, cc: s.location, location: this.getCountryName(s.location), name: this.formatServerName(s.sname), map: this.smoothMapName(s.map), players: `${s.players}/${s.maxplayers}`, raw: s, style: this.getRowStyle(s)})
            i++
          });
          
          
          this.tableData = servers//res.data
        })
    },
    getRowStyle(server) {
      const s = false ? 'rgba(255, 215, 0, 0.35)!important' : server.featured ? 'rgba(0, 128, 0, 0.25)!important' : server.official ? 'rgba(255, 106, 0, 0.25)!important' : server.partner ? 'rgba(0, 123, 195, 0.3)!important' : 'rgba(0, 0, 0, 0)!important';
      return `background: ${s}`
    },
    stripCustomFormatting(name) {
      var serverStyleArray = [
          "^0",
          "^1",
          "^2",
          "^3",
          "^4",
          "^5",
          "^6",
          "^7",
          "^8",
          "^9",
          "^a",
          "^b",
          "^c",
          "^d",
          "^e",
          "^f",
          "^l",
          "^m",
          "^n",
          "^o",
          "^r",
          "^p"
      ];

      for (var i = 0; i < serverStyleArray.length; i++){
        while (name.includes(serverStyleArray[i])){
          name = name.replace(serverStyleArray[i], "");
        }
      }
      return name;
    },
    getCountryName(countryCode) {
      if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
      } else {
        return countryCode;
      }
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    smoothMapName(map) {
      if (map != "Any Map") {
        map = map.replace("/info.json", "")
        map = map.split('/').pop().replace(/\s*/g, '')
        map = map.replace(/_/g, " ")
        map = map.replace(/-/g, " ")
        map = this.toTitleCase(map)
      }
      return map
    },
    applyCode(string, codes) {
      var cssText = ''
      string = string.replace(/\x00*/g, '');
      for (var i = 0, len = codes.length; i < len; i++) {
        cssText += styleMap[codes[i]] + ';';
      }
      return {s: string, f:cssText};
    },
    formatServerName(string) {
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
  },
  beforeMount() {
    this.getData()
  }
};
</script>