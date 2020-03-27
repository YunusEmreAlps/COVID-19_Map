// Chart Component
Vue.component('bar-chart', {
    extends: VueChartJs.Bar,
    // data 
    data: function() {
        return {
            datacollection: {
                labels: ['Day'],
                datasets: [
                    {
                        label: 'COVID-19 Data',
                        backgroundColor: '#f87979',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: '#249EBF',
                        data: []
                    },
                ]
            },
        }
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    display: true
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    display: true
                }
            }],
        },
        legend: {
            display: false
        },
    },
    mounted () {
        // this.chartData is created in the mixin
        this.renderChart(this.datacollection, this.options)
    },
});

// Vue.js
var app = new Vue({
    el:"#app", // element
    data: {
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
        }
    },
    created () {
        this.gdata();
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
            fetch('https://corona.lmao.ninja/countries')
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
            });
        },
    },
});