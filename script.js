Vue.component('bar-chart', {
    extends: VueChartJs.Bar,
    // data 
    data: function() {
        return {
            datacollection: {
                labels: ['Total Cases','Total Recovered', 'Active Cases','Total Deaths', 'Critical', 'Today Cases'],
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
        msg: null,
        counter: 0,
        control: false,
        srch: '',
        countries : []
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
                    this.countries.push(Response[i])
                } 
            });
        },     

    },
});