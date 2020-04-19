Vue.component("line-chart", {
    extends: VueChartJs.Radar,
    props: ["data", "label", "options"], // connection !important
    mounted() { 
      this.renderLineChart();
    },
    // update data 
    computed: {
      chartData: function() {
        return this.data;
      },
      chartLabel: function() {
        return this.label;
      }
    },
    methods: {
      renderLineChart: function() {
      this.renderChart(
        {
          labels:this.chartLabel,
          datasets: [
            {
              label: "COVID-19 Data",
              backgroundColor: "#f87979",
              data: this.chartData
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      );      
      }
    },
   /* watch: {
      data: function() {
        this._chart.destroy();
        //this.renderChart(this.data, this.options);
        this.renderLineChart();
      }
    }*/
  });


// Vue.js
var app = new Vue({
    el:"#app", // element
    data: {
        cont: false,
        totalc: 0, // total cases
        totalr: 0, // total recovered
        totalac: 0, // total active cases
        totald: 0, // total death
        tcritic: 0, // total critic
        todcas: 0, // total today cases
        srch: '',
        countries: [],
        styleObject: {
            fontSize: '16px'
        }, 
        hdata: [],
        dataChart: [],
        labelChart: ['Cases','Recovered','Active','Deaths','Critical','Today Cases']
    },
    created () {
        this.gdata();
        this.hisdata();
    },
    computed: {
        filteredcntr: function(){
            return this.countries.filter((cntry) =>{
               return cntry.country.match(this.srch);
            });
          }
    },
    methods: {
        gdata(){
            fetch('https://corona.lmao.ninja/v2/countries')
            .then(Response => Response.json())
            .then(Response => {
                for(var i=0;i<Response.length; i++){
                    this.countries.push(Response[i]);
                    this.totalc+=this.countries[i].cases;
                    this.totalr+=this.countries[i].recovered;
                    this.totalac+=this.countries[i].active;
                    this.totald+=this.countries[i].deaths;
                    this.tcritic+=this.countries[i].critical;
                    this.todcas+=this.countries[i].todayCases;
                }
                this.dataChart.push(this.totalc);
                this.dataChart.push(this.totalr);
                this.dataChart.push(this.totalac);
                this.dataChart.push(this.totald);
                this.dataChart.push(this.tcritic);
                this.dataChart.push(this.todcas);
                this.cont=true;
            });

        },
        hisdata() {
          fetch('https://corona.lmao.ninja/v2/historical/')
          .then(Response => Response.json())
          .then(Response => {
              for(var i=0;i<Response.length; i++){ 
                this.hdata.push(Response[i].timeline.deaths);
              }                  
          });
        },
        changeData: function(e) {
          // e = e.charAt(0).toUpperCase()+e.slice(1);
          //for(x in this.hdata){ 
            //this.labelChart.push(x);
            // this.dataChart.push(Response.timeline.deaths[x]);
          //}
        }
    },
});